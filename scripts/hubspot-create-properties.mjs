// Creates the custom HubSpot contact properties the website can write when
// HUBSPOT_CUSTOM_PROPERTIES=enabled. Idempotent: existing properties are skipped.
//
// Dry run (default, makes no changes):   node scripts/hubspot-create-properties.mjs
// Create the properties:                 node scripts/hubspot-create-properties.mjs --apply
//
// Requires HUBSPOT_ACCESS_TOKEN with the crm.schemas.contacts.write scope.
// This is a change to your HubSpot portal — review the list before --apply.

const API = "https://api.hubapi.com";
const GROUP = { name: "anovas_website", label: "Anovas website conversions", displayOrder: -1 };

const text = (name, label, description) => ({ name, label, description, type: "string", fieldType: "text", groupName: GROUP.name });

const PROPERTIES = [
  {
    name: "anovas_last_conversion_offer",
    label: "Last website conversion offer",
    description: "Which website offer the contact most recently converted on.",
    type: "enumeration",
    fieldType: "select",
    groupName: GROUP.name,
    options: [
      { label: "Business Systems Diagnostic", value: "diagnostic" },
      { label: "Consultation request", value: "consultation" },
      { label: "Autopilot inquiry", value: "autopilot-inquiry" },
      { label: "Contact form", value: "contact" },
      { label: "Revenue Leaks Guide", value: "revenue-leaks-guide" },
    ],
  },
  { name: "anovas_last_conversion_date", label: "Last website conversion date", description: "Date of the most recent website conversion.", type: "date", fieldType: "date", groupName: GROUP.name },
  { name: "anovas_diagnostic_score", label: "Diagnostic score (AROS)", description: "Overall Business Systems Diagnostic score, 0–100.", type: "number", fieldType: "number", groupName: GROUP.name },
  text("anovas_diagnostic_band", "Diagnostic stage", "Foundation / Building / Growth / Scale."),
  text("anovas_diagnostic_recommendation", "Diagnostic recommended path", "autopilot-r, autopilot-o, services, or anovasos."),
  text("anovas_first_utm_source", "First touch UTM source", "utm_source on the contact's first recorded website visit."),
  text("anovas_first_utm_medium", "First touch UTM medium", "utm_medium on the first recorded visit."),
  text("anovas_first_utm_campaign", "First touch UTM campaign", "utm_campaign on the first recorded visit."),
  text("anovas_first_landing_page", "First landing page", "Path of the first recorded website visit."),
  text("anovas_last_utm_source", "Latest touch UTM source", "utm_source on the most recent attributable visit before converting."),
  text("anovas_last_utm_medium", "Latest touch UTM medium", "utm_medium on the most recent attributable visit."),
  text("anovas_last_utm_campaign", "Latest touch UTM campaign", "utm_campaign on the most recent attributable visit."),
  text("anovas_gclid", "Google Ads click ID", "gclid captured from the URL, for offline conversion imports."),
];

const apply = process.argv.includes("--apply");
const token = process.env.HUBSPOT_ACCESS_TOKEN;

if (!apply) {
  console.log(`Dry run. Would ensure group "${GROUP.name}" and ${PROPERTIES.length} contact properties:`);
  for (const p of PROPERTIES) console.log(`  - ${p.name} (${p.type})`);
  console.log("\nRe-run with --apply to create them.");
  process.exit(0);
}

if (!token) {
  console.error("HUBSPOT_ACCESS_TOKEN is not set.");
  process.exit(1);
}

async function hs(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: res.status, text: await res.text() };
}

const group = await hs("/crm/v3/properties/contacts/groups", GROUP);
console.log(group.status === 201 ? `Created group ${GROUP.name}` : group.status === 409 ? `Group ${GROUP.name} exists` : `Group: ${group.status} ${group.text}`);

let failed = 0;
for (const p of PROPERTIES) {
  const r = await hs("/crm/v3/properties/contacts", p);
  if (r.status === 201) console.log(`Created ${p.name}`);
  else if (r.status === 409) console.log(`Exists  ${p.name}`);
  else {
    failed++;
    console.error(`Failed  ${p.name}: ${r.status} ${r.text}`);
  }
}

if (failed) {
  console.error(`\n${failed} propert${failed === 1 ? "y" : "ies"} failed. Do not enable HUBSPOT_CUSTOM_PROPERTIES until all exist.`);
  process.exit(1);
}
console.log("\nAll properties exist. You can now set HUBSPOT_CUSTOM_PROPERTIES=enabled.");
