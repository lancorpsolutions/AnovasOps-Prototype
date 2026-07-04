import { NextRequest, NextResponse } from "next/server";

const HUBSPOT_API_BASE = "https://api.hubapi.com";

interface ContactRequestBody {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  industry?: string;
  teamSize?: string;
  tier?: string;
  biggestPain?: string;
  // AROS Growth Score fields
  arosScore?: number;
  scoreBand?: string;
  pillarA?: number;
  pillarR?: number;
  pillarO?: number;
  pillarS?: number;
  recommendation?: string;
  // legacy generic contact form field
  message?: string;
}

function splitName(fullName: string) {
  const trimmed = fullName.trim();
  const parts = trimmed.split(/\s+/);
  return {
    firstname: parts[0] || trimmed,
    lastname: parts.slice(1).join(" ") || "",
  };
}

async function upsertHubspotContact(
  accessToken: string,
  properties: Record<string, string>,
  email: string
) {
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

async function fireN8nWebhook(payload: Record<string, string | undefined>) {
  const webhookUrl = process.env.N8N_AUTOPILOT_LEAD_WEBHOOK_URL;
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("n8n webhook call failed:", err);
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as ContactRequestBody;
  const {
    name, email, company, phone, industry, teamSize, tier, biggestPain,
    arosScore, scoreBand, pillarA, pillarR, pillarO, pillarS, recommendation,
    message,
  } = body;

  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 400 });
  }

  const isAutopilotInquiry = !!(industry || teamSize || tier || arosScore !== undefined);

  console.log("Contact form submission:", { name, email, company, isAutopilotInquiry });

  // Fire n8n webhook for Autopilot inquiries (async — don't await, don't block response)
  if (isAutopilotInquiry) {
    fireN8nWebhook({ name, email, company, phone, industry, teamSize, tier, biggestPain });
  }

  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!accessToken) {
    console.warn("HUBSPOT_ACCESS_TOKEN not set — skipping CRM sync.");
    return NextResponse.json({ ok: true, crmSynced: false });
  }

  const { firstname, lastname } = splitName(name);
  const properties: Record<string, string> = {
    firstname,
    lastname,
    lifecyclestage: "lead",
    hs_lead_status: "NEW",
  };
  if (company) properties.company = company;
  if (phone) properties.phone = phone;
  if (industry) properties.industry = industry;

  // Stash Autopilot-specific context in HubSpot's notes field
  if (isAutopilotInquiry) {
    const parts = [
      arosScore !== undefined && `AROS Score: ${arosScore}/100 (${scoreBand})`,
      pillarA !== undefined && `A:${pillarA} R:${pillarR} O:${pillarO} S:${pillarS}`,
      recommendation && `Recommended: ${recommendation}`,
      teamSize && `Team size: ${teamSize}`,
      tier && `Interested tier: ${tier}`,
      biggestPain && `Biggest pain: ${biggestPain}`,
    ].filter(Boolean);
    if (parts.length) properties.hs_content_membership_notes = parts.join(" | ");
    properties.lead_source = arosScore !== undefined ? "AROS Growth Score" : "Autopilot Inquiry";
  } else if (message) {
    properties.hs_content_membership_notes = message;
  }

  try {
    await upsertHubspotContact(accessToken, properties, email);
    return NextResponse.json({ ok: true, crmSynced: true });
  } catch (err) {
    console.error("HubSpot sync failed:", err);
    return NextResponse.json({ ok: true, crmSynced: false });
  }
}
