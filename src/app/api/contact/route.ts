import { NextRequest, NextResponse } from "next/server";

const HUBSPOT_API_BASE = "https://api.hubapi.com";

interface ContactRequestBody {
  name: string;
  email: string;
  company?: string;
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
  const body = (await request.json()) as ContactRequestBody;
  const { name, email, company, message } = body;

  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 400 });
  }

  console.log("Contact form submission:", { name, email, company, message });

  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!accessToken) {
    console.warn("HUBSPOT_ACCESS_TOKEN is not set — skipping CRM sync for contact submission. See .env.example.");
    return NextResponse.json({ ok: true, crmSynced: false });
  }

  const { firstname, lastname } = splitName(name);
  const properties: Record<string, string> = { firstname, lastname };
  if (company) properties.company = company;

  try {
    await upsertHubspotContact(accessToken, properties, email);
    return NextResponse.json({ ok: true, crmSynced: true });
  } catch (err) {
    console.error("HubSpot sync failed for contact submission:", err);
    return NextResponse.json({ ok: true, crmSynced: false });
  }
}
