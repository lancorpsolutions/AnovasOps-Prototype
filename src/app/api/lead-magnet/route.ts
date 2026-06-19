import { NextRequest, NextResponse } from "next/server";
import { LEAD_MAGNETS, LeadMagnetSlug } from "@/lib/lead-magnets";

const HUBSPOT_API_BASE = "https://api.hubapi.com";
// Default to a built-in HubSpot property since this portal has no custom
// "lead magnet" property yet. Override with HUBSPOT_LEAD_MAGNET_PROPERTY
// once a dedicated custom property is created in HubSpot.
const LEAD_MAGNET_PROPERTY = process.env.HUBSPOT_LEAD_MAGNET_PROPERTY || "hs_analytics_last_touch_converting_campaign";

interface LeadMagnetRequestBody {
  name: string;
  email: string;
  company?: string;
  leadMagnet: LeadMagnetSlug;
}

function splitName(fullName: string) {
  const trimmed = fullName.trim();
  const parts = trimmed.split(/\s+/);
  return {
    firstname: parts[0] || trimmed,
    lastname: parts.slice(1).join(" ") || "",
  };
}

async function upsertHubspotContact(accessToken: string, properties: Record<string, string>, email: string) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const updateRes = await fetch(
    `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
    { method: "PATCH", headers, body: JSON.stringify({ properties }) }
  );

  if (updateRes.ok) return true;
  if (updateRes.status !== 404) {
    throw new Error(`HubSpot update failed: ${updateRes.status} ${await updateRes.text()}`);
  }

  const createRes = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify({ properties: { ...properties, email } }),
  });

  if (!createRes.ok) {
    throw new Error(`HubSpot create failed: ${createRes.status} ${await createRes.text()}`);
  }
  return true;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as LeadMagnetRequestBody;
  const { name, email, company, leadMagnet } = body;

  if (!name || !email || !leadMagnet || !(leadMagnet in LEAD_MAGNETS)) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 400 });
  }

  const magnet = LEAD_MAGNETS[leadMagnet];
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!accessToken) {
    console.warn(
      "HUBSPOT_ACCESS_TOKEN is not set — skipping CRM sync for lead magnet submission. See .env.example."
    );
    return NextResponse.json({ ok: true, crmSynced: false, pdfPath: magnet.pdfPath });
  }

  const { firstname, lastname } = splitName(name);
  const properties: Record<string, string> = {
    firstname,
    lastname,
    [LEAD_MAGNET_PROPERTY]: magnet.title,
  };
  if (company) properties.company = company;

  try {
    await upsertHubspotContact(accessToken, properties, email);
    return NextResponse.json({ ok: true, crmSynced: true, pdfPath: magnet.pdfPath });
  } catch (err) {
    console.error("HubSpot sync failed for lead magnet submission:", err);
    return NextResponse.json({ ok: true, crmSynced: false, pdfPath: magnet.pdfPath });
  }
}
