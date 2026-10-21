import { test } from "node:test";
import assert from "node:assert/strict";
import { buildNoteBody } from "../src/lib/leads/hubspot";

test("note body escapes HTML and includes diagnostic and attribution context", () => {
  const body = buildNoteBody({
    offer: "diagnostic",
    submissionId: "sub-12345678",
    name: "Jane",
    email: "jane@example.com",
    company: "<b>Titan</b>",
    diagnostic: { score: 47, band: "Building Stage", pillars: { A: 2.7, R: 1.7, O: 2.5, S: 3 }, recommendation: "autopilot-r" },
    attribution: { first: { utm_source: "google", utm_medium: "cpc" } },
  });
  assert.ok(body.includes("&lt;b&gt;Titan&lt;/b&gt;"));
  assert.ok(!body.includes("<b>Titan"));
  assert.ok(body.includes("47/100 (Building Stage)"));
  assert.ok(body.includes("google / cpc"));
  assert.ok(body.includes("sub-12345678"));
});
