import { test } from "node:test";
import assert from "node:assert/strict";
import { touchFromVisit, mergeAttribution, describeTouch } from "../src/lib/analytics/attribution";

const now = new Date("2026-10-21T12:00:00Z");
const HOST = "anovasintegratedsystems.com";

test("captures UTM and click IDs, keeps only the path of the landing page", () => {
  const t = touchFromVisit(`https://${HOST}/services?utm_source=google&utm_medium=cpc&gclid=abc&email=jane@x.com`, "", HOST, now);
  assert.ok(t);
  assert.equal(t!.utm_source, "google");
  assert.equal(t!.gclid, "abc");
  assert.equal(t!.landing_page, "/services");
  assert.ok(!JSON.stringify(t).includes("jane@x.com"));
});

test("ignores internal navigation and direct visits", () => {
  assert.equal(touchFromVisit(`https://${HOST}/about`, `https://www.${HOST}/`, HOST, now), null);
  assert.equal(touchFromVisit(`https://${HOST}/about`, "", HOST, now), null);
});

test("records an external referrer host", () => {
  const t = touchFromVisit(`https://${HOST}/`, "https://www.facebook.com/some/path", HOST, now);
  assert.equal(t?.referrer, "facebook.com");
});

test("first touch is never overwritten; last touch moves", () => {
  const first = touchFromVisit(`https://${HOST}/?utm_source=newsletter`, "", HOST, now);
  const a = mergeAttribution({}, first, `https://${HOST}/`, now);
  const second = touchFromVisit(`https://${HOST}/?utm_source=google&utm_medium=cpc`, "", HOST, now);
  const b = mergeAttribution(a, second, `https://${HOST}/`, now);
  assert.equal(b.first?.utm_source, "newsletter");
  assert.equal(b.last?.utm_source, "google");
  const c = mergeAttribution(b, null, `https://${HOST}/about`, now);
  assert.equal(c.last?.utm_source, "google");
});

test("a direct first visit is recorded as (direct)", () => {
  const a = mergeAttribution({}, null, `https://${HOST}/pricing`, now);
  assert.equal(a.first?.utm_source, "(direct)");
  assert.equal(a.first?.landing_page, "/pricing");
});

test("describeTouch builds a readable label", () => {
  assert.equal(describeTouch({ utm_source: "google", utm_medium: "cpc", utm_campaign: "spring" }), "google / cpc / spring");
  assert.equal(describeTouch(undefined), "unknown");
});
