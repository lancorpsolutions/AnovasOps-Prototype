# Anovas Integrated Systems — website + AnovasOS

Next.js 16 (App Router) + Tailwind v4. One app serves the marketing site (`/`, `/services/*`,
`/aros-growth-score`, `/book`, …) and the authenticated AnovasOS dashboard (`/anovasos/*`, Supabase).
`anovas-autopilot/` is a separate Next app with its own Vercel project.

## Develop

```bash
npm install
cp .env.example .env.local   # fill in what you need; every integration is optional locally
npm run dev
```

| Command | What it does |
|---|---|
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (dashboard has known pre-existing issues; see `docs/qa-checklist.md`) |
| `npm test` | Unit tests (Node test runner, no extra dependencies) |
| `BASE_URL=http://localhost:3000 node tests/e2e/smoke.mjs` | Browser smoke test (needs Playwright; run without `HUBSPOT_ACCESS_TOKEN`) |
| `npm run setup:hubspot-properties` | Dry-run of the HubSpot custom properties; add `-- --apply` to create them |

## How leads and measurement work

- Every site form posts to `/api/leads` (`src/lib/leads/*`), which validates the input, upserts the
  HubSpot contact, adds a note (and a task if an owner is configured), and falls back to a webhook if
  HubSpot fails.
- Analytics events go to `window.dataLayer`. GA4 and the HubSpot tracking code load only after
  consent and only when their IDs are set (`src/lib/analytics/*`).

Details: `docs/analytics-and-conversion-spec.md`. Launch steps and rollback: `docs/launch-summary.md`.
