# Launch Summary — Website Revenue Engine, Pass 1

Branch `ccr-29101c74-13vtfg`. Not deployed: nothing was pushed to production, no DNS or HubSpot
portal changes were made, and no test records were written to HubSpot.

Companion docs: [`website-audit.md`](website-audit.md) · [`implementation-plan.md`](implementation-plan.md) ·
[`analytics-and-conversion-spec.md`](analytics-and-conversion-spec.md) · [`qa-checklist.md`](qa-checklist.md)

## 1. Executive summary

The site had a working look but a broken funnel. Verified against the live HubSpot portal, every
Growth Score and Autopilot inquiry was rejected by HubSpot (it wrote a `lead_source` property that
doesn't exist), while visitors were shown a success message. There was no analytics or
attribution of any kind, the diagnostic's scoring couldn't go below 25, and the mobile nav hid
Contact.

This pass rebuilds the lead pipeline on verified HubSpot properties, adds a consent-aware
measurement layer, and redesigns the homepage around one primary offer: the **Business Systems
Diagnostic** (the existing AROS Growth Score, repositioned). It also adds a booking page, a labeled
sample report, and an illustrative workflow demo, and states plainly what is software, what is
service, and what is sample data.

## 2. Files changed

**New**
- `src/lib/leads/schema.ts`, `hubspot.ts`, `process.ts`, `client.ts`: lead validation, HubSpot sync, pipeline, browser submit
- `src/app/api/leads/route.ts`: unified lead endpoint
- `src/lib/analytics/events.ts`, `attribution.ts`, `client.ts`: taxonomy, attribution, consent, `track()`
- `src/components/analytics/analytics-provider.tsx`, `cookie-settings-button.tsx`, `track-on-mount.tsx`
- `src/lib/diagnostic/aros.ts`: questions and scoring (extracted, with the score-floor fix)
- `src/lib/site/config.ts`, `offerings.ts`: routes and booking URL; offering facts (single source of truth)
- `src/components/site/section.tsx`, `tracked-link.tsx`, `cta-band.tsx`, `offering-facts.tsx`, `workflow-demo.tsx`, `booking-embed.tsx`
- `src/components/forms/honeypot.tsx`
- `src/app/book/page.tsx`, `src/app/diagnostic/sample-report/page.tsx`
- `scripts/hubspot-create-properties.mjs` (dry-run by default; **not run**)
- `tests/*.test.ts`, `tests/register.mjs`, `tests/e2e/smoke.mjs`
- `docs/*`

**Modified**
- `src/app/page.tsx`: full homepage rebuild
- `src/components/marketing/marketing-nav.tsx`, `marketing-footer.tsx`: accessible nav + mobile menu; expanded footer
- `src/components/marketing/growth-score-quiz.tsx`, `src/app/aros-growth-score/page.tsx`: diagnostic flow
- `src/components/forms/contact-form.tsx`, `lead-capture-form.tsx`, `autopilot-inquiry-form.tsx`: real error states, honeypot, shared submit
- `src/app/api/contact/route.ts`, `src/app/api/lead-magnet/route.ts`: now thin adapters (backward compatible)
- `src/app/services/anovasos/page.tsx`, `services/autopilot/page.tsx`, `services/page.tsx`, `src/lib/faq-data.tsx`, `public/llms.txt`: product-truth corrections, facts panels, CTA fixes
- `src/app/globals.css`: tokens, focus-visible, reduced motion, surfaces
- `src/app/layout.tsx`: analytics provider, description
- `src/app/sitemap.ts`, `src/app/cookies/page.tsx`, `.env.example`, `package.json` (scripts only)
- All marketing pages: `<main id="main">` landmark for the skip link

No dependencies were added. No AnovasOS dashboard code was modified.

## 3. Page architecture and visual system

**Homepage sequence:** (1) hero with value proposition, target customer, primary CTA "Get Your
Business Systems Diagnostic", secondary "See How It Works", and the interactive workflow demo ·
(2) four problems, each mapped to the offering that fixes it · (3) five connected steps (`#how-it-works`)
· (4) three offerings, each with a **type badge** (software / managed service / professional services),
audience, and published price · (5) evidence you can check yourself, plus example scopes labeled
"Examples, not case studies" · (6) implementation and support process · (7) diagnostic with an
example result · (8) objection FAQ (with FAQPage JSON-LD) · (9) final CTA band.

**New routes:** `/book`, `/diagnostic/sample-report`. All existing URLs preserved (`/aros-growth-score` kept for SEO).

**Visual system:** the existing brand is kept: phoenix mark, navy, burnt orange. Added: a deep `ink`
surface with restrained radial gradients and a masked grid; a sky-blue `signal` accent (taken from
the existing score ring) used only for system/data elements and the "Illustrative" badge; larger,
tighter display type; consistent section and heading components; and a visible focus ring site-wide.
Motion is limited to the demo's auto-advance and a 350 ms fade, both disabled under reduced motion.

## 4. Conversion paths

| Path | Entry | Captures | Next step |
|---|---|---|---|
| Business Systems Diagnostic (primary) | Hero, nav, every CTA band | Score + contact (optional skip) | `/book?from=diagnostic`, sample report |
| Consultation | `/book`, results page, offering pages | Calendly booking | n/a |
| Autopilot Admin Audit | `/services/autopilot#get-started` | Inquiry → HubSpot + n8n | Link to `/book` on success |
| Contact | `/contact` | Message → HubSpot | Link to `/book` on success |
| Revenue Leaks Guide | `/revenue-leaks-guide` | Email → HubSpot (subscriber) | Diagnostic link after download |

Demonstrations: the **workflow demo**, **sample report**, and **homepage example result** are all
simulated with sample data and labeled on screen. The AnovasOS application exists (Supabase-backed,
login required) but there is no public demo account. `anovas-autopilot/` is a sample-data dashboard
and is not linked as proof.

## 5. HubSpot status

**Implemented, not externally verified.** The default write set uses only standard properties
confirmed to exist in portal 245271977 (read-only query): `email, firstname, lastname, company,
phone, industry, message`, plus `lifecyclestage` and `hs_lead_status` on create only, and
`hubspot_owner_id` if configured. The fix for the `lead_source` failure is therefore verified by
property lookup, but no live write was attempted (no token, and no authorization to write test
records to production).

Each lead gets an associated **note** with full context, and optionally a **follow-up task** for a
configured owner. Retries 3× on 429/5xx. Dedupe is by email (HubSpot) plus `submissionId` (server).
Lifecycle stage never moves backward. Deals are not auto-created (see spec §4). Company association
is left to HubSpot's "auto-create and associate companies" setting.

**Required to go live:** `HUBSPOT_ACCESS_TOKEN` (Private App: `crm.objects.contacts.read/write`).
**Recommended:** `HUBSPOT_DEFAULT_OWNER_ID`, `LEAD_FALLBACK_WEBHOOK_URL`, then the custom-properties
script and `HUBSPOT_CUSTOM_PROPERTIES=enabled`.

## 6. Analytics

All eight browser events are implemented. Three have been verified in-browser for firing,
de-duplication, and absence of PII: `diagnostic_start`, `diagnostic_complete`, `lead_form_submit`.
None has been verified in GA4, because no measurement ID exists. `qualified_lead`, `deal_created`,
and `deal_won` are defined as HubSpot stage changes. Full detail is in the spec.

## 7. Results actually obtained

- Typecheck: pass · Unit tests: 24/24 · Build: pass · Smoke (Playwright): 106/106
- axe WCAG 2.1 AA: 0 violations on 8 key pages
- Lint: 28 pre-existing dashboard issues, unchanged; 0 in new/changed files
- Lab perf (localhost, throttled mobile): LCP < 1 s, CLS ≤ 0.002

## 8. Blockers and unverified assumptions

- No HubSpot token, GA4 property, or preview URL in this environment, so no live integration test.
- HubSpot scope for notes/tasks with a contacts-only Private App: verify on the first live test.
- Calendly `calendly.event_scheduled` postMessage from a raw iframe embed: per Calendly's embed behavior; needs a real booking.
- Canonical host (`www.` or apex) and company city (Little Rock vs North Little Rock).
- The new **AnovasOS description** follows the application code. If AnovasOS really includes the
  marketing capabilities previously described (demand gen, content, SEO, consumer intelligence),
  restore them in `src/lib/site/offerings.ts` and the FAQ.
- Removed claims ("70%+ of execution", "recovers enough jobs in month one to cover the fee",
  "less than 2 hours setup"): restore only with evidence.
- "What we'll need from you" lists are reasonable inferences from the onboarding flow. Confirm them with delivery.
- Cookie and privacy wording changes need legal review.

## 9. Environment variables (names only)

Server: `HUBSPOT_ACCESS_TOKEN`, `HUBSPOT_DEFAULT_OWNER_ID`, `HUBSPOT_CUSTOM_PROPERTIES`,
`LEAD_FALLBACK_WEBHOOK_URL`, `N8N_AUTOPILOT_LEAD_WEBHOOK_URL`, `PAYPAL_CLIENT_ID`,
`PAYPAL_CLIENT_SECRET`, `PAYPAL_API_BASE`.
Public: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BOOKING_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`,
`NEXT_PUBLIC_HUBSPOT_PORTAL_ID`, `NEXT_PUBLIC_HUBSPOT_REGION`, `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_PAYPAL_*`.
Removed: `HUBSPOT_LEAD_MAGNET_PROPERTY` (it wrote to an analytics system property; replaced by
`anovas_last_conversion_offer`).

## 10. Launch checklist

1. Open a PR from this branch and review the Vercel **preview**.
2. In Vercel → Preview env: set `HUBSPOT_ACCESS_TOKEN`, `HUBSPOT_DEFAULT_OWNER_ID`, `LEAD_FALLBACK_WEBHOOK_URL`.
3. Run the HubSpot section of `qa-checklist.md` on the preview with a test email; delete the test contacts afterwards.
4. Create the GA4 stream; set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`; verify consent and DebugView.
5. Make one real Calendly test booking on `/book`, then cancel it.
6. Legal sign-off on `/cookies` and `/privacy`.
7. Copy the env vars to **Production**, merge, and confirm the production deploy.
8. Post-launch at 24 h: check Vercel logs for `[leads]` errors, compare HubSpot contact count with GA4 `generate_lead`.

## 11. Rollback

- **Code:** revert the merge commit (`git revert -m 1 <merge-sha>`) and push, or use Vercel →
  Deployments → previous production deployment → "Promote to Production" (instant, no rebuild).
- **Data:** the site only creates or updates contacts, notes, and tasks. Nothing is deleted. Rolling
  back leaves existing records intact. If custom properties were created, they're harmless when unused.
- **Partial:** each integration can be turned off independently by unsetting its env var (token →
  no CRM sync; GA/portal IDs → no vendor scripts; `HUBSPOT_CUSTOM_PROPERTIES` → standard properties only).
- The legacy `/api/contact` and `/api/lead-magnet` endpoints still accept their old payloads.

## 12. Highest-priority follow-ups (from observed evidence)

1. **Connect HubSpot and run the live test.** Until then, website leads only reach logs or the fallback webhook.
2. **Install GA4 + the HubSpot tracking code.** There is no traffic data at all today, so baselines start at launch.
3. **Publish real proof** as clients approve it (case study template: problem → scope → measured before/after from HubSpot).
4. **A public AnovasOS walkthrough**: a seeded, read-only demo account or a recorded walkthrough would replace the illustrative demo with the real product.
5. Bring the nine professional-service pages and `/about`, `/faq`, `/blog` onto the new section components (they inherit the nav, footer, and tokens but keep the old layouts and some AA-failing grey text).
6. Server-side booking confirmation (Calendly webhook or HubSpot Meetings), so `meeting_booked` doesn't depend on consent.
7. Durable rate limiting (Vercel KV/Upstash) if spam appears; the current limiter is per-instance.
8. Clear the 21 pre-existing dashboard lint errors.
