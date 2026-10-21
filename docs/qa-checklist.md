# QA Checklist

✅ = verified in this environment (2026-10-21, local production build, headless Chromium) ·
⬜ = must be verified on a Vercel preview / production with real credentials.

## Automated gates

| Command | Result |
|---|---|
| `npm run typecheck` | ✅ Pass |
| `npm test` (Node test runner, 24 tests: lead validation, attribution, PII sanitizer, AROS scoring, HubSpot note escaping) | ✅ 24/24 |
| `npm run build` | ✅ Pass (`/book`, `/diagnostic/sample-report` static; `/api/leads` dynamic) |
| `npm run lint` | ⚠️ 21 errors / 7 warnings, **identical to the pre-change baseline**, all in the AnovasOS dashboard (`src/lib/store.tsx`, `components/layout/*`). Zero lint findings in changed or new files. |
| `BASE_URL=… node tests/e2e/smoke.mjs` | ✅ 106/106 checks |
| axe-core 4.10 WCAG 2.1 A/AA on `/`, `/aros-growth-score`, `/book`, `/diagnostic/sample-report`, `/services/anovasos`, `/services/autopilot`, `/contact`, `/revenue-leaks-guide` | ✅ 0 violations (Calendly iframe excluded) |

The smoke test needs Playwright (`PLAYWRIGHT_PATH` if it isn't a project dependency) and must run
**without** `HUBSPOT_ACCESS_TOKEN` set, because it submits a test lead.

## Journeys (smoke test covers these)

- ✅ 17 public pages return 200 with one `<h1>`, no console errors, and no horizontal scroll at 390, 768, and 1440 px
- ✅ Every internal link found on those pages resolves (< 400)
- ✅ Mobile menu opens, shows all destinations including Contact, closes on Escape
- ✅ Workflow demo tabs move with arrow keys; auto-advance stops on hover/focus/interaction and under `prefers-reduced-motion`
- ✅ Diagnostic: 10 questions → contact step → submit → results; `diagnostic_start`, `diagnostic_complete`, `lead_form_submit` each fire once; no PII in `dataLayer`
- ✅ Diagnostic "Skip and just show my score" shows results and fires no `lead_form_submit`
- ✅ Contact form shows an error, not success, when the API fails (simulated 500)
- ✅ API: 400 on invalid email, unknown offer (including `toString`), malformed JSON; honeypot silently dropped; repeated `submissionId` de-duplicated
- ✅ No third-party scripts load when no analytics IDs are configured

## Manual checks done
- ✅ Visual review (screenshots) of home, diagnostic (question, contact, results), sample report, book, Autopilot at 390 and 1440 px
- ✅ Lab performance, mobile viewport, 4× CPU throttle, ~1.6 Mbps / 150 ms (localhost, so not a field measurement): home LCP 964 ms, CLS 0.002; diagnostic LCP 864 ms, CLS 0.000
- ✅ Contrast: primary button white-on-orange raised from 3.99:1 to 5.04:1
- ✅ No secrets in client bundles: `HUBSPOT_ACCESS_TOKEN` is read only in `src/lib/leads/hubspot.ts`, imported only by route handlers

## Must verify on preview/production (⬜)

### HubSpot (use a test email you control, e.g. `you+anovas-test@yourdomain.com`)
- ⬜ Diagnostic submission creates a contact with firstname, lastname, company, industry, lifecycle `lead`, lead status `NEW`
- ⬜ The contact has a note with offer, score, pillars, recommendation, first/latest touch, submission ID
- ⬜ With `HUBSPOT_DEFAULT_OWNER_ID`: owner set on new contacts, and a task is due next business day
- ⬜ No `[leads] note failed` / `task failed` 403s in Vercel logs (otherwise add the scope named in the error)
- ⬜ Re-submitting with the same email updates the contact without duplicating it, and adds a second note
- ⬜ An existing customer's lifecycle stage is **not** changed by a new form
- ⬜ With token unset or invalid: visitor still sees success; `LEAD_FALLBACK_WEBHOOK_URL` receives the lead
- ⬜ Autopilot inquiry still triggers the n8n workflow (`N8N_AUTOPILOT_LEAD_WEBHOOK_URL`)
- ⬜ After `setup:hubspot-properties --apply` and `HUBSPOT_CUSTOM_PROPERTIES=enabled`: `anovas_*` properties populate
- ⬜ Delete the test contacts afterwards

### Analytics
- ⬜ With `NEXT_PUBLIC_GA_MEASUREMENT_ID`: banner appears; nothing loads before Accept; GA4 DebugView shows `generate_lead`, `diagnostic_*`, `meeting_booked`
- ⬜ Decline → no `gtag`/`_hsq` after reload; "Cookie settings" in footer reopens the banner
- ⬜ With `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`: after accept + submit, the contact shows page views and Original Source
- ⬜ HubSpot "collected forms" did not create a duplicate form submission
- ⬜ A real Calendly booking on `/book` fires `meeting_booked` once (DebugView)

### Production
- ⬜ Canonical host: `anovasintegratedsystems.com` vs `www.` (`NEXT_PUBLIC_SITE_URL` must match the primary domain)
- ⬜ `/sitemap.xml` and `/robots.txt` on the production domain
- ⬜ Real-device check: iOS Safari and Android Chrome (diagnostic, mobile menu, booking iframe height)
- ⬜ Field Core Web Vitals after a week of traffic (Vercel Speed Insights or Search Console)
- ⬜ AnovasOS login/signup and dashboard unchanged (no dashboard code was modified; only shared tokens: orange is slightly darker)
