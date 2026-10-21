// Server-side lead pipeline shared by /api/leads and the legacy adapters.

import { after } from "next/server";
import { LeadInput, validateLead } from "./schema";
import { CrmStatus, recordActivity, syncContact } from "./hubspot";

export interface LeadResponse {
  status: number;
  body: {
    ok: boolean;
    submissionId?: string;
    crm?: CrmStatus;
    duplicate?: boolean;
    errors?: Record<string, string>;
  };
}

// Best-effort, per-instance protections. On serverless each instance has its
// own memory, so these reduce abuse and double submits but aren't global.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 8;
const recentByIp = new Map<string, number[]>();
const seenSubmissions = new Map<string, number>();

function rateLimited(ip: string, now = Date.now()) {
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);
  if (recentByIp.size > 5000) recentByIp.clear();
  return hits.length > RATE_MAX;
}

function alreadySeen(submissionId: string, now = Date.now()) {
  for (const [id, t] of seenSubmissions) if (now - t > RATE_WINDOW_MS) seenSubmissions.delete(id);
  if (seenSubmissions.has(submissionId)) return true;
  seenSubmissions.set(submissionId, now);
  return false;
}

async function postJson(url: string, payload: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
}

/** Legacy n8n automation for Autopilot/diagnostic inquiries (unchanged payload shape). */
function n8nPayload(lead: LeadInput) {
  return {
    name: lead.name,
    email: lead.email,
    company: lead.company,
    phone: lead.phone,
    industry: lead.industry,
    biggestPain: lead.message,
    offer: lead.offer,
    arosScore: lead.diagnostic?.score,
    scoreBand: lead.diagnostic?.band,
    recommendation: lead.diagnostic?.recommendation,
  };
}

export async function processLead(raw: unknown, ip: string): Promise<LeadResponse> {
  const result = validateLead(raw);
  if (!result.ok) {
    // Pretend success to bots so they don't retry with variations.
    if (result.spam) return { status: 200, body: { ok: true } };
    return { status: 400, body: { ok: false, errors: result.errors } };
  }
  const lead = result.data;

  if (rateLimited(ip)) {
    return { status: 429, body: { ok: false, errors: { form: "Too many submissions. Please try again in a few minutes." } } };
  }
  if (alreadySeen(lead.submissionId)) {
    return { status: 200, body: { ok: true, submissionId: lead.submissionId, duplicate: true } };
  }

  const crm = await syncContact(lead);

  if (crm.status === "failed") {
    console.error(`[leads] HubSpot sync failed submission=${lead.submissionId} offer=${lead.offer}: ${crm.error}`);
  } else if (crm.status === "not_configured") {
    console.warn(`[leads] HUBSPOT_ACCESS_TOKEN not set; submission=${lead.submissionId} offer=${lead.offer} not synced.`);
  }

  after(async () => {
    if (crm.status === "synced" && crm.contactId) await recordActivity(lead, crm.contactId);

    // Fallback so a lead is never only in server logs when CRM sync fails.
    const fallback = process.env.LEAD_FALLBACK_WEBHOOK_URL;
    if (crm.status !== "synced" && fallback) {
      try {
        await postJson(fallback, { reason: crm.status, receivedAt: new Date().toISOString(), lead });
      } catch (err) {
        console.error(`[leads] fallback webhook failed submission=${lead.submissionId}:`, err);
      }
    }

    const n8n = process.env.N8N_AUTOPILOT_LEAD_WEBHOOK_URL;
    if (n8n && (lead.offer === "autopilot-inquiry" || lead.offer === "diagnostic")) {
      try {
        await postJson(n8n, n8nPayload(lead));
      } catch (err) {
        console.error(`[leads] n8n webhook failed submission=${lead.submissionId}:`, err);
      }
    }
  });

  return { status: 200, body: { ok: true, submissionId: lead.submissionId, crm: crm.status } };
}

export function clientIp(headers: Headers) {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}
