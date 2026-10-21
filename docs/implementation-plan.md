# Implementation Plan

This plan follows the audit (`docs/website-audit.md`). The guiding rule: keep the existing Next.js 16 /
Tailwind v4 architecture, add no new runtime dependencies, and never claim something the code or
the business can't support.

## Decisions taken with a safe default (need owner confirmation)

| Decision | Default chosen | Why / how to change |
|---|---|---|
| AnovasOS positioning | Describe it by what the application actually contains: a command center for pipeline, jobs, scheduling, crews, invoices, automation rules, SOPs, risks, and reports. The "business growth platform" tagline is kept. | Homepage, FAQ, and `llms.txt` previously described a marketing suite (demand gen, content, SEO, consumer intelligence) that the code doesn't show. If those capabilities exist outside this repo, restore that copy in `src/lib/site/offerings.ts`. |
| Primary conversion offer | **Business Systems Diagnostic**, the existing AROS Growth Score repositioned. The `/aros-growth-score` URL is kept for SEO equity. | No competing new offer was created. The guide and consultation remain secondary paths. |
| Booking tool | Keep the existing **Calendly** event, embedded on a new `/book` page. | Calendly is what the site already uses. HubSpot Meetings is a drop-in alternative (set `NEXT_PUBLIC_BOOKING_URL`). |
| Analytics vendor | None installed. A vendor-neutral `dataLayer` layer, with GA4 and HubSpot tracking code loaded only when their IDs are configured **and** the visitor consents. | No analytics account was verified, so nothing is hard-coded. |
| Unsupported claims | Removed or softened ("70%+ of execution", "recovers enough jobs in month one to cover the fee", "less than 2 hours setup"). | Restore only with evidence. |
| Deal creation | **Not** automated from the website. Deals are created by sales in HubSpot when a lead qualifies. | Auto-creating deals from every form pollutes pipeline reporting. See the analytics spec for the qualified → deal → won flow. |
| HubSpot custom properties | The code writes them only when `HUBSPOT_CUSTOM_PROPERTIES=enabled`. A setup script that creates them is provided but has **not** been run. | Writing properties that don't exist is exactly what broke sync before. |

## Work items

### Phase A — Lead capture and CRM (P0)
1. `src/lib/leads/schema.ts`: one validated lead schema (offers, length caps, email check, honeypot).
2. `src/lib/leads/hubspot.ts`: contact upsert that writes **only verified-existing properties**; a note
   with the full submission context; an optional follow-up task for a configured owner; retry with
   backoff on 429/5xx.
3. `src/app/api/leads/route.ts`: single endpoint with rate limiting, idempotency on `submissionId`,
   an optional fallback webhook, and the n8n webhook moved into `after()`. Existing `/api/contact`
   and `/api/lead-magnet` become thin adapters so nothing calling them breaks.
4. A shared client helper so every form checks `res.ok`, shows real error states, and sends attribution.

### Phase B — Measurement (P0)
5. `src/lib/analytics/*`: event taxonomy, PII stripping, GA4 name mapping, a `track()` that
   de-duplicates.
6. Attribution capture: first touch and last touch (UTMs, click IDs, referrer, landing page).
7. Consent banner and loader (GA4 Consent Mode v2 + HubSpot tracking code), plus a footer
   "Cookie settings" control.

### Phase C — Design system and experience (P1)
8. Design tokens (contrast-checked accent), focus-visible rings, reduced motion.
9. Shared marketing components (`src/components/site/*`): Section, SectionHeader, TrackedLink,
   OfferingFacts, CtaBand, IllustrativeBadge.
10. Accessible navigation with a real mobile menu.
11. Homepage rebuild in the nine-section sequence, with an interactive **illustrative** workflow demo.
12. Diagnostic: questions first, contact details after (with an honest "skip" option), events, result
    CTAs to booking and the sample report.
13. `/book` (embedded Calendly with `meeting_booked` on Calendly's confirmed event) and
    `/diagnostic/sample-report` (fictional business, clearly labeled).
14. Offering pages: "at a glance" facts (who, type, included, you provide, implementation, support), and
    the misleading "Live Demo" CTA replaced.

### Phase D — Quality (P2)
15. Sitemap completeness, `.env.example`, `llms.txt` alignment.
16. Unit tests with the Node built-in test runner (no new dependency) for validation, attribution,
    scoring, and the PII guard.
17. Playwright pass over the key journeys at mobile and desktop widths; build, lint, typecheck.

## Out of scope this pass (documented as next steps)
- AnovasOS dashboard lint debt (21 pre-existing errors).
- Blog content, individual professional-service page redesigns (they get the new nav/footer/tokens).
- Server-side booking confirmation (Calendly webhooks need a paid Calendly plan) and offline
  conversion uploads to ad platforms.
