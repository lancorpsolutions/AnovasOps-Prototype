import type { Metadata } from "next";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { Container, Eyebrow, IllustrativeBadge } from "@/components/site/section";
import { TrackedLink } from "@/components/site/tracked-link";
import { TrackOnMount } from "@/components/analytics/track-on-mount";
import { PILLAR_META, calcOverall, calcPillarScores, getBand, getRoute, ROUTE_CONTENT } from "@/lib/diagnostic/aros";
import { ROUTES } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "Sample Business Systems Diagnostic Report",
  description:
    "See every section of a full Business Systems Diagnostic report, filled in for a fictional HVAC business with illustrative data.",
  alternates: { canonical: "/diagnostic/sample-report" },
  openGraph: {
    title: "Sample Business Systems Diagnostic Report | Anovas Integrated Systems",
    description: "What a full diagnostic report covers, shown with a fictional business and illustrative data.",
    url: "/diagnostic/sample-report",
    type: "article",
  },
};

// Fictional answers, scored with the same functions the live diagnostic uses.
const SAMPLE_ANSWERS = [3, 3, 2, 2, 1, 2, 3, 2, 3, 3];
const scores = calcPillarScores(SAMPLE_ANSWERS);
const overall = calcOverall(SAMPLE_ANSWERS);
const band = getBand(overall);
const route = getRoute(scores);

const findings: Record<"A" | "R" | "O" | "S", { finding: string; evidence: string }> = {
  A: {
    finding: "Steady referral and Google Maps demand; the website rarely converts.",
    evidence: "Owner reports most new work comes from referrals and the Google profile. The website has a contact form but no booking and no tracking.",
  },
  R: {
    finding: "Leads go cold between first contact and a booked visit.",
    evidence: "After-hours calls go to voicemail. Callbacks happen the next day when the office has time. Close rate isn't tracked.",
  },
  O: {
    finding: "Day-to-day runs without the owner, but scheduling lives in two places.",
    evidence: "A scheduling tool is used for installs; service calls are tracked by text. Crew capacity is checked by phone.",
  },
  S: {
    finding: "A CRM is in use, but follow-up is manual.",
    evidence: "Contacts are entered by hand after calls. No automated reminders or review requests.",
  },
};

const leakMap = [
  { stage: "Inquiries per month", value: "~60", note: "Owner estimate" },
  { stage: "Reached outside business hours", value: "~35%", note: "Owner estimate" },
  { stage: "Called back the same day", value: "Unknown", note: "Not tracked today" },
  { stage: "Inquiries that book a visit", value: "Unknown", note: "Not tracked today" },
];

const roadmap = [
  {
    window: "Days 1–30",
    title: "Stop the after-hours leak",
    items: ["Missed-call text-back on the main line", "Same-day follow-up sequence for unbooked inquiries", "Start measuring response time and booked rate"],
  },
  {
    window: "Days 31–60",
    title: "Make booking the default next step",
    items: ["Add online booking to the website and Google profile", "Booking confirmations and reminders", "Review requests after completed jobs"],
  },
  {
    window: "Days 61–90",
    title: "One view of the operation",
    items: ["Move service calls into the same schedule as installs", "Weekly owner report: inquiries, booked rate, unbilled jobs", "Re-score the diagnostic and compare"],
  },
];

const measures = [
  ["Response time", "Minutes from first inquiry to first reply"],
  ["Booked rate", "Share of inquiries that become a scheduled visit"],
  ["Lead source", "Where each booked job came from (first and latest touch)"],
  ["Unbilled jobs", "Completed jobs without an invoice after 48 hours"],
];

export default function SampleReportPage() {
  const rec = ROUTE_CONTENT[route];
  return (
    <div className="min-h-screen bg-background">
      <TrackOnMount event="sample_report_view" />
      <MarketingNav />
      <main id="main">
        <section className="surface-ink text-white">
          <Container className="py-14 md:py-16">
            <IllustrativeBadge>Sample report · fictional business · illustrative data</IllustrativeBadge>
            <h1 className="mt-5 max-w-3xl text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Business Systems Diagnostic: sample report
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed">
              This is what a full diagnostic report covers. &ldquo;Ridgeline Heating &amp; Air&rdquo; is
              a fictional business; every figure below is illustrative and not a client result.
            </p>
          </Container>
        </section>

        <Container className="py-12 space-y-12">
          <div role="note" className="flex gap-3 rounded-xl border border-orange/30 bg-orange/5 p-4 text-sm text-charcoal">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-orange" aria-hidden="true" />
            <p>
              Illustrative only. A real report uses your diagnostic answers and what we learn on the
              consultation. It doesn&apos;t predict revenue, and we won&apos;t promise outcomes we
              can&apos;t measure.
            </p>
          </div>

          {/* 1. Summary */}
          <section aria-labelledby="summary" className="grid gap-6 md:grid-cols-[16rem_1fr]">
            <div className="surface-ink rounded-2xl p-6 text-white">
              <p className="text-xs uppercase tracking-wide text-white/55">Overall score</p>
              <p className="mt-2 text-6xl font-semibold tracking-tight">{overall}</p>
              <p className="text-sm text-white/60">out of 100 · {band.label}</p>
            </div>
            <div>
              <Eyebrow>1 · Executive summary</Eyebrow>
              <h2 id="summary" className="text-2xl font-semibold tracking-tight text-charcoal">{rec.headline}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-ink">
                Ridgeline has steady demand and a team that runs without the owner. The weakest pillar is
                Revenue: inquiries that arrive after hours or during jobs aren&apos;t answered quickly, and
                nobody measures how many turn into booked visits. That&apos;s the first thing to fix, and
                the first thing to start measuring.
              </p>
            </div>
          </section>

          {/* 2. Pillars */}
          <section aria-labelledby="pillars">
            <Eyebrow>2 · Score breakdown</Eyebrow>
            <h2 id="pillars" className="text-2xl font-semibold tracking-tight text-charcoal">Findings by pillar</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {(["A", "R", "O", "S"] as const).map((p) => (
                <div key={p} className={`rounded-2xl border bg-white p-5 ${p === "R" ? "border-orange/60" : "border-gray-200"}`}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-semibold text-charcoal">{PILLAR_META[p].label}</h3>
                    <span className="font-mono text-sm text-muted-ink">{scores[p].toFixed(1)} / 4</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-orange to-signal-deep" style={{ width: `${(scores[p] / 4) * 100}%` }} />
                  </div>
                  <p className="mt-4 text-sm font-medium text-charcoal">{findings[p].finding}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-ink">{findings[p].evidence}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Leak map */}
          <section aria-labelledby="leaks">
            <Eyebrow>3 · Revenue leak map</Eyebrow>
            <h2 id="leaks" className="text-2xl font-semibold tracking-tight text-charcoal">Where inquiries are lost</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-ink">
              We separate what the owner estimates from what&apos;s measured. &ldquo;Unknown&rdquo; is a finding:
              it means the business can&apos;t see that step yet.
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-muted-ink">
                  <tr><th scope="col" className="px-5 py-3">Stage</th><th scope="col" className="px-5 py-3">Value</th><th scope="col" className="px-5 py-3">Basis</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leakMap.map((row) => (
                    <tr key={row.stage}>
                      <td className="px-5 py-3 text-charcoal">{row.stage}</td>
                      <td className="px-5 py-3 font-semibold text-charcoal">{row.value}</td>
                      <td className="px-5 py-3 text-muted-ink">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Roadmap */}
          <section aria-labelledby="roadmap">
            <Eyebrow>4 · Prioritized roadmap</Eyebrow>
            <h2 id="roadmap" className="text-2xl font-semibold tracking-tight text-charcoal">90 days, in priority order</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {roadmap.map((r) => (
                <li key={r.window} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <p className="font-mono text-xs text-orange">{r.window}</p>
                  <h3 className="mt-2 text-base font-semibold text-charcoal">{r.title}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-ink">
                    {r.items.map((i) => <li key={i}>→ {i}</li>)}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          {/* 5. Recommendation */}
          <section aria-labelledby="rec" className="rounded-2xl border border-gray-200 bg-white p-6">
            <Eyebrow>5 · Recommended system</Eyebrow>
            <h2 id="rec" className="text-2xl font-semibold tracking-tight text-charcoal">{rec.label}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-ink">{rec.body}</p>
            <p className="mt-4 text-sm text-charcoal">
              <span className="font-semibold">For a business this size:</span> Autopilot Basic ($500/month + $1,000 setup)
              covers the 30-day priorities. The full report would explain why, and what would change the recommendation.
            </p>
          </section>

          {/* 6. Measurement */}
          <section aria-labelledby="measure">
            <Eyebrow>6 · Measurement plan</Eyebrow>
            <h2 id="measure" className="text-2xl font-semibold tracking-tight text-charcoal">What we&apos;d track from day one</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {measures.map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <dt className="text-sm font-semibold text-charcoal">{k}</dt>
                  <dd className="mt-1 text-sm text-muted-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="surface-ink rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-semibold tracking-tight">Get this for your business.</h2>
            <p className="mt-2 max-w-xl text-white/70">
              Start with the free diagnostic. If you want the full report, we build it with you on a consultation.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="primary" size="lg">
                <TrackedLink href={ROUTES.diagnostic} location="sample_report" ctaId="diagnostic">
                  Take the Diagnostic <ArrowRight size={16} aria-hidden="true" />
                </TrackedLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/25 bg-white/5 text-white hover:bg-white/10">
                <TrackedLink href={`${ROUTES.book}?from=sample_report`} location="sample_report" ctaId="book">
                  Book a consultation
                </TrackedLink>
              </Button>
            </div>
          </section>
        </Container>
      </main>
      <MarketingFooter />
    </div>
  );
}
