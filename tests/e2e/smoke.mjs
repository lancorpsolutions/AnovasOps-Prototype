// Browser smoke test for the marketing site's key journeys.
//
//   BASE_URL=http://localhost:3000 node tests/e2e/smoke.mjs
//
// Requires Playwright to be resolvable (set PLAYWRIGHT_PATH to its install
// directory if it isn't a project dependency). Run against a local or preview
// build WITHOUT HUBSPOT_ACCESS_TOKEN set: the diagnostic journey submits a
// test lead to /api/leads.

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH ?? "playwright");
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const PAGES = [
  "/", "/aros-growth-score", "/book", "/diagnostic/sample-report", "/services", "/services/anovasos",
  "/services/autopilot", "/services/ai-agents", "/services/seo", "/contact", "/faq", "/about", "/blog",
  "/revenue-leaks-guide", "/privacy", "/terms", "/cookies",
];
const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const failures = [];
const check = (ok, msg) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}`);
  if (!ok) failures.push(msg);
};

const browser = await chromium.launch();

// 1. Every page renders without console errors or horizontal scroll.
const internalLinks = new Set();
for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  for (const path of PAGES) {
    const errors = [];
    const onConsole = (m) => m.type() === "error" && !m.text().includes("calendly") && errors.push(m.text());
    page.on("console", onConsole);
    page.on("pageerror", (e) => errors.push(String(e)));
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const h1 = await page.locator("h1").count();
    check(res.status() === 200 && errors.length === 0 && overflow <= 1 && h1 === 1,
      `${vp.name} ${path} status=${res.status()} errors=${errors.length} overflow=${overflow}px h1=${h1}${errors.length ? " :: " + errors[0].slice(0, 120) : ""}`);
    if (vp.name === "desktop") {
      for (const href of await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")))) {
        internalLinks.add(href.split("#")[0] || "/");
      }
    }
    page.removeListener("console", onConsole);
  }
  await page.close();
}

// 2. No broken internal links.
for (const href of internalLinks) {
  const res = await fetch(BASE + href, { redirect: "manual" });
  check(res.status < 400, `link ${href} -> ${res.status}`);
}

// 3. Mobile menu opens, exposes Contact, closes on Escape.
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  check(await page.locator("#mobile-menu").isVisible(), "mobile menu opens");
  check(await page.locator("#mobile-menu").getByRole("link", { name: "Contact" }).isVisible(), "mobile menu shows Contact");
  await page.keyboard.press("Escape");
  check(!(await page.locator("#mobile-menu").isVisible()), "mobile menu closes on Escape");
  await page.close();
}

// 4. Workflow demo is keyboard operable.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const first = page.getByRole("tab").first();
  await first.focus();
  await page.keyboard.press("ArrowDown");
  const selected = await page.locator("[role=tab][aria-selected=true]").getAttribute("id");
  check(selected === "wf-tab-crm", `workflow demo arrow key moves to step 2 (got ${selected})`);
  await page.close();
}

// 5. Diagnostic journey: questions → contact → results; events fire once, without PII.
async function runDiagnostic({ submit }) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + "/aros-growth-score?utm_source=smoke&utm_medium=test", { waitUntil: "networkidle" });
  for (let i = 0; i < 10; i++) {
    await page.locator("fieldset button").nth(i % 4).click();
    await page.waitForTimeout(400);
  }
  check(await page.getByText("Your score is ready").isVisible(), "diagnostic reaches contact step after 10 answers");
  let apiResponse = null;
  if (submit) {
    await page.fill("#gs-first", "Smoke");
    await page.fill("#gs-last", "Test");
    await page.fill("#gs-biz", "Smoke Test Co");
    await page.fill("#gs-email", "smoke-test@example.com");
    const [res] = await Promise.all([
      page.waitForResponse((r) => r.url().endsWith("/api/leads")),
      page.getByRole("button", { name: "See my results" }).click(),
    ]);
    apiResponse = { status: res.status(), body: await res.json() };
    check(apiResponse.status === 200 && apiResponse.body.ok === true, `lead API accepted submission (crm=${apiResponse.body.crm})`);
  } else {
    await page.getByRole("button", { name: "Skip and just show my score" }).click();
  }
  await page.getByText("Score breakdown").waitFor();
  check(true, `diagnostic results shown (${submit ? "submitted" : "skipped"})`);
  const events = await page.evaluate(() => (window.dataLayer || []).filter((e) => e && e.event).map((e) => e));
  const count = (n) => events.filter((e) => e.event === n).length;
  check(count("diagnostic_start") === 1, `diagnostic_start fired once (${count("diagnostic_start")})`);
  check(count("diagnostic_complete") === 1, `diagnostic_complete fired once (${count("diagnostic_complete")})`);
  check(count("lead_form_submit") === (submit ? 1 : 0), `lead_form_submit fired ${submit ? "once" : "zero times"} (${count("lead_form_submit")})`);
  const serialized = JSON.stringify(events);
  check(!serialized.includes("smoke-test@example.com") && !serialized.includes("Smoke Test Co"), "no PII in dataLayer");
  await page.close();
}
await runDiagnostic({ submit: true });
await runDiagnostic({ submit: false });

// 6. Contact form shows server validation errors instead of false success.
{
  const page = await browser.newPage();
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await page.route("**/api/leads", (route) =>
    route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ ok: false }) })
  );
  await page.fill("#contact-name", "Smoke Test");
  await page.fill("#contact-email", "smoke-test@example.com");
  await page.fill("#contact-message", "Testing the failure state.");
  await page.getByRole("button", { name: "Send message" }).click();
  await page.locator("form [role=alert]").waitFor();
  check(!(await page.getByText("We've got your message").isVisible()), "contact form shows an error, not success, on a 500");
  const lfs = await page.evaluate(() => (window.dataLayer || []).filter((e) => e.event === "lead_form_submit").length);
  check(lfs === 0, "lead_form_submit not fired on failure");
  await page.close();
}

// 7. API validation, spam, and duplicate handling.
{
  const post = (body) => fetch(BASE + "/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const id = `smoke-${Date.now()}`;
  const good = { offer: "contact", submissionId: id, name: "Smoke Test", email: "smoke-test@example.com", message: "hi" };
  check((await post({ ...good, email: "bad" })).status === 400, "API rejects invalid email with 400");
  check((await post({ ...good, offer: "toString" })).status === 400, "API rejects unknown offer");
  const spam = await (await post({ ...good, submissionId: `${id}-s`, website: "x" })).json();
  check(spam.ok === true && !spam.submissionId, "API silently drops honeypot submissions");
  await post(good);
  const dup = await (await post(good)).json();
  check(dup.duplicate === true, "API de-duplicates a repeated submissionId");
  check((await fetch(BASE + "/api/leads", { method: "POST", body: "not json" })).status === 400, "API rejects malformed JSON");
}

// 8. No consent banner when no analytics vendor is configured.
{
  const page = await browser.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const scripts = await page.$$eval("script[src]", (s) => s.map((x) => x.src).filter((u) => !u.startsWith(location.origin)));
  check(scripts.length === 0, `no third-party scripts on home (${scripts.join(", ") || "none"})`);
  await page.close();
}

await browser.close();
console.log(`\n${failures.length ? `${failures.length} FAILED` : "ALL PASSED"}`);
process.exit(failures.length ? 1 : 0);
