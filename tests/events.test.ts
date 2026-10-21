import { test } from "node:test";
import assert from "node:assert/strict";
import { sanitizeParams, ga4Name, EVENTS } from "../src/lib/analytics/events";

test("strips PII keys and PII-looking values", () => {
  const out = sanitizeParams({
    email: "jane@example.com",
    first_name: "Jane",
    company: "Titan HVAC",
    phone: "501-555-0100",
    note: "reach me at jane@example.com",
    other: "(501) 555-0100",
    offer: "diagnostic",
    score: 47,
    is_conversion: true,
  });
  assert.deepEqual(out, { offer: "diagnostic", score: 47, is_conversion: true });
});

test("caps long string values", () => {
  assert.equal(String(sanitizeParams({ x: "a".repeat(500) }).x).length, 100);
});

test("lead_form_submit maps to the GA4 recommended generate_lead", () => {
  assert.equal(ga4Name("lead_form_submit"), "generate_lead");
  assert.equal(EVENTS.primary_cta_click.conversion, false);
  assert.equal(EVENTS.meeting_booked.conversion, true);
});
