import { test } from "node:test";
import assert from "node:assert/strict";
import { validateLead, cleanText, splitName } from "../src/lib/leads/schema";

const base = { offer: "diagnostic", submissionId: "3f1c2a9e-1111-4222-8333-944455556666", name: "Jane Smith", email: "Jane@Example.com" };

test("accepts a valid lead and normalizes email", () => {
  const r = validateLead(base);
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.data.email, "jane@example.com");
});

test("rejects invalid email and short name", () => {
  const r = validateLead({ ...base, email: "not-an-email", name: "J" });
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.ok(r.errors.email);
    assert.ok(r.errors.name);
  }
});

test("rejects unknown offers, including prototype keys", () => {
  for (const offer of ["nope", "toString", "__proto__"]) {
    const r = validateLead({ ...base, offer });
    assert.equal(r.ok, false, offer);
  }
});

test("flags honeypot submissions as spam", () => {
  const r = validateLead({ ...base, website: "http://spam.example" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.spam, true);
});

test("requires a message for contact and consultation offers", () => {
  const r = validateLead({ ...base, offer: "contact" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.ok(r.errors.message);
});

test("rejects a malformed submission id", () => {
  assert.equal(validateLead({ ...base, submissionId: "x" }).ok, false);
  assert.equal(validateLead({ ...base, submissionId: "<script>alert(1)</script>" }).ok, false);
});

test("keeps diagnostic results only for the diagnostic offer and validates ranges", () => {
  const diagnostic = { score: 47, band: "Building Stage", pillars: { A: 2.67, R: 1.67, O: 2.5, S: 3 }, recommendation: "autopilot-r" };
  const ok = validateLead({ ...base, diagnostic });
  assert.equal(ok.ok, true);
  if (ok.ok) assert.deepEqual(ok.data.diagnostic?.pillars, { A: 2.7, R: 1.7, O: 2.5, S: 3 });

  const guide = validateLead({ ...base, offer: "revenue-leaks-guide", diagnostic });
  if (guide.ok) assert.equal(guide.data.diagnostic, undefined);

  const bad = validateLead({ ...base, diagnostic: { ...diagnostic, score: 500 } });
  if (bad.ok) assert.equal(bad.data.diagnostic, undefined);
});

test("cleanText strips control characters and caps length", () => {
  assert.equal(cleanText("  hi\u0000there\u0007 ", 100), "hithere");
  assert.equal(cleanText("abcdef", 3), "abc");
  assert.equal(cleanText("   ", 10), undefined);
  assert.equal(cleanText(42, 10), undefined);
});

test("only keeps known attribution keys", () => {
  const r = validateLead({ ...base, attribution: { first: { utm_source: "google", evil: "x" } } });
  assert.equal(r.ok, true);
  if (r.ok) assert.deepEqual(r.data.attribution?.first, { utm_source: "google" });
});

test("splitName handles single and multi-part names", () => {
  assert.deepEqual(splitName("Cher"), { firstname: "Cher", lastname: "" });
  assert.deepEqual(splitName("Mary Ann  Lee"), { firstname: "Mary", lastname: "Ann Lee" });
});
