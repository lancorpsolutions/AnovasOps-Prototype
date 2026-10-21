// HubSpot CRM sync for website leads. Server-only: import this module only from
// route handlers so the private app token never reaches the browser bundle.
//
// Contact properties written by default are standard properties that were
// verified to exist in the portal (see docs/website-audit.md §4). Custom
// "anovas_*" properties are written only when HUBSPOT_CUSTOM_PROPERTIES=enabled,
// after scripts/hubspot-create-properties.mjs has created them. Writing a
// property that doesn't exist makes HubSpot reject the whole request, which is
// what silently broke diagnostic sync before.

import { LEAD_OFFERS, type LeadInput, splitName } from "./schema";
import { describeTouch } from "../analytics/attribution";

const API = "https://api.hubapi.com";

// HubSpot-defined association type IDs.
const NOTE_TO_CONTACT = 202;
const TASK_TO_CONTACT = 204;

export type CrmStatus = "synced" | "not_configured" | "failed";

export interface CrmResult {
  status: CrmStatus;
  contactId?: string;
  created?: boolean;
  error?: string;
}

class HubspotError extends Error {
  status: number;
  constructor(status: number, body: string) {
    super(`HubSpot ${status}: ${body.slice(0, 300)}`);
    this.status = status;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** fetch with up to 3 attempts on 429, 5xx, and network errors. */
async function hubspotFetch(token: string, path: string, init: RequestInit, attempts = 3): Promise<Response> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(`${API}${path}`, {
        ...init,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(8000),
      });
      if (res.status !== 429 && res.status < 500) return res;
      lastError = new HubspotError(res.status, await res.text());
      const retryAfter = Number(res.headers.get("retry-after"));
      await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter * 1000, 2000) : 300 * 3 ** i);
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) await sleep(300 * 3 ** i);
    }
  }
  throw lastError;
}

function customPropertiesEnabled() {
  return process.env.HUBSPOT_CUSTOM_PROPERTIES === "enabled";
}

function buildProperties(lead: LeadInput, isCreate: boolean): Record<string, string> {
  const { firstname, lastname } = splitName(lead.name);
  const props: Record<string, string> = { firstname };
  if (lastname) props.lastname = lastname;
  if (lead.company) props.company = lead.company;
  if (lead.phone) props.phone = lead.phone;
  if (lead.industry) props.industry = lead.industry;
  if (lead.message) props.message = lead.message;

  if (isCreate) {
    props.email = lead.email;
    // Lifecycle stage can't move backwards in HubSpot, so only set it on create.
    props.lifecyclestage = LEAD_OFFERS[lead.offer].followUp ? "lead" : "subscriber";
    props.hs_lead_status = "NEW";
    const owner = process.env.HUBSPOT_DEFAULT_OWNER_ID;
    if (owner) props.hubspot_owner_id = owner;
  }

  if (customPropertiesEnabled()) {
    props.anovas_last_conversion_offer = lead.offer;
    props.anovas_last_conversion_date = new Date().toISOString().slice(0, 10);
    if (lead.diagnostic) {
      props.anovas_diagnostic_score = String(lead.diagnostic.score);
      props.anovas_diagnostic_band = lead.diagnostic.band;
      props.anovas_diagnostic_recommendation = lead.diagnostic.recommendation;
    }
    const last = lead.attribution?.last;
    if (last) {
      if (last.utm_source) props.anovas_last_utm_source = last.utm_source;
      if (last.utm_medium) props.anovas_last_utm_medium = last.utm_medium;
      if (last.utm_campaign) props.anovas_last_utm_campaign = last.utm_campaign;
    }
    const first = lead.attribution?.first;
    if (isCreate && first) {
      if (first.utm_source) props.anovas_first_utm_source = first.utm_source;
      if (first.utm_medium) props.anovas_first_utm_medium = first.utm_medium;
      if (first.utm_campaign) props.anovas_first_utm_campaign = first.utm_campaign;
      if (first.landing_page) props.anovas_first_landing_page = first.landing_page;
    }
    const gclid = last?.gclid ?? first?.gclid;
    if (gclid) props.anovas_gclid = gclid;
  }
  return props;
}

async function upsertContact(token: string, lead: LeadInput): Promise<{ id: string; created: boolean }> {
  const update = await hubspotFetch(
    token,
    `/crm/v3/objects/contacts/${encodeURIComponent(lead.email)}?idProperty=email`,
    { method: "PATCH", body: JSON.stringify({ properties: buildProperties(lead, false) }) }
  );
  if (update.ok) return { id: ((await update.json()) as { id: string }).id, created: false };
  if (update.status !== 404) throw new HubspotError(update.status, await update.text());

  const create = await hubspotFetch(token, "/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties: buildProperties(lead, true) }),
  });
  if (create.ok) return { id: ((await create.json()) as { id: string }).id, created: true };

  // A parallel request may have created the contact between PATCH and POST.
  if (create.status === 409) {
    const retry = await hubspotFetch(
      token,
      `/crm/v3/objects/contacts/${encodeURIComponent(lead.email)}?idProperty=email`,
      { method: "PATCH", body: JSON.stringify({ properties: buildProperties(lead, false) }) }
    );
    if (retry.ok) return { id: ((await retry.json()) as { id: string }).id, created: false };
    throw new HubspotError(retry.status, await retry.text());
  }
  throw new HubspotError(create.status, await create.text());
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function buildNoteBody(lead: LeadInput): string {
  const rows: [string, string | undefined][] = [
    ["Website conversion", LEAD_OFFERS[lead.offer].label],
    ["Page", lead.pageUri],
    ["Company", lead.company],
    ["Industry", lead.industry],
    ["Phone", lead.phone],
    ["Message", lead.message],
  ];
  if (lead.diagnostic) {
    const d = lead.diagnostic;
    rows.push(
      ["Diagnostic score", `${d.score}/100 (${d.band})`],
      ["Pillars", `Acquisition ${d.pillars.A} · Revenue ${d.pillars.R} · Operations ${d.pillars.O} · Systems ${d.pillars.S} (of 4)`],
      ["Recommended path", d.recommendation]
    );
  }
  rows.push(
    ["First touch", describeTouch(lead.attribution?.first)],
    ["Latest touch", describeTouch(lead.attribution?.last)],
    ["First landing page", lead.attribution?.first?.landing_page],
    ["Submission ID", lead.submissionId]
  );
  return rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<strong>${escapeHtml(k)}:</strong> ${escapeHtml(v!)}`)
    .join("<br>");
}

async function createNote(token: string, contactId: string, lead: LeadInput) {
  const res = await hubspotFetch(token, "/crm/v3/objects/notes", {
    method: "POST",
    body: JSON.stringify({
      properties: { hs_timestamp: new Date().toISOString(), hs_note_body: buildNoteBody(lead) },
      associations: [
        { to: { id: contactId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: NOTE_TO_CONTACT }] },
      ],
    }),
  });
  if (!res.ok) throw new HubspotError(res.status, await res.text());
}

/** Next business day at 15:00 UTC (≈ 9–10am US Central). */
function nextBusinessDay(from = new Date()) {
  const d = new Date(from);
  d.setUTCDate(d.getUTCDate() + 1);
  while (d.getUTCDay() === 0 || d.getUTCDay() === 6) d.setUTCDate(d.getUTCDate() + 1);
  d.setUTCHours(15, 0, 0, 0);
  return d;
}

async function createFollowUpTask(token: string, contactId: string, lead: LeadInput, ownerId: string) {
  const subject = `Follow up: ${LEAD_OFFERS[lead.offer].label} — ${lead.company ?? lead.name}`;
  const res = await hubspotFetch(token, "/crm/v3/objects/tasks", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        hs_timestamp: nextBusinessDay().toISOString(),
        hs_task_subject: subject.slice(0, 250),
        hs_task_body: "Created automatically from a website conversion. Context is in the contact's latest note.",
        hs_task_status: "NOT_STARTED",
        hs_task_priority: lead.offer === "consultation" || lead.offer === "diagnostic" ? "HIGH" : "MEDIUM",
        hs_task_type: "TODO",
        hubspot_owner_id: ownerId,
      },
      associations: [
        { to: { id: contactId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: TASK_TO_CONTACT }] },
      ],
    }),
  });
  if (!res.ok) throw new HubspotError(res.status, await res.text());
}

/** Upserts the contact. Awaited so the response can report sync status. */
export async function syncContact(lead: LeadInput): Promise<CrmResult> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) return { status: "not_configured" };
  try {
    const { id, created } = await upsertContact(token, lead);
    return { status: "synced", contactId: id, created };
  } catch (err) {
    return { status: "failed", error: err instanceof Error ? err.message : String(err) };
  }
}

/** Note + optional follow-up task. Run after the response is sent. */
export async function recordActivity(lead: LeadInput, contactId: string) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) return;
  try {
    await createNote(token, contactId, lead);
  } catch (err) {
    console.error(`[leads] note failed submission=${lead.submissionId}:`, err instanceof Error ? err.message : err);
  }
  const ownerId = process.env.HUBSPOT_DEFAULT_OWNER_ID;
  if (ownerId && LEAD_OFFERS[lead.offer].followUp) {
    try {
      await createFollowUpTask(token, contactId, lead, ownerId);
    } catch (err) {
      console.error(`[leads] task failed submission=${lead.submissionId}:`, err instanceof Error ? err.message : err);
    }
  }
}
