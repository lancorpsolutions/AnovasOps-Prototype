import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  PhoneMissed,
  Hourglass,
  EyeOff,
  Unplug,
  Search,
  ClipboardCheck,
  Rocket,
  TrendingUp,
  FileText,
  Gauge,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { Container, Eyebrow, IllustrativeBadge, Section, SectionHeader, TypeBadge } from "@/components/site/section";
import { TrackedLink } from "@/components/site/tracked-link";
import { WorkflowDemo } from "@/components/site/workflow-demo";
import { CtaBand } from "@/components/site/cta-band";
import { OFFERINGS } from "@/lib/site/offerings";
import { ROUTES } from "@/lib/site/config";

export const metadata: Metadata = {
  title: {
    absolute: "Anovas Integrated Systems | Connected Business Systems for Service Businesses",
  },
  description:
    "Connect your marketing, CRM, automation, and operations into one growth system. AnovasOS, Anovas Autopilot, and hands-on implementation for local and home service businesses.",
  keywords: [
    "business systems for home service businesses",
    "CRM and automation for contractors",
    "missed call text back software",
    "HVAC plumbing electrical roofing software",
    "business systems diagnostic",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Systems That Work. Businesses That Scale. | Anovas Integrated Systems",
    description:
      "Connect marketing, CRM, automation, and operations into a growth system built for local and home service businesses.",
    url: "/",
    type: "website",
  },
};

const problems = [
  {
    icon: PhoneMissed,
    title: "Calls and inquiries go unanswered",
    body: "Your crew is on a job, the phone rings, and the customer calls the next company on the list.",
    fix: "Anovas Autopilot",
  },
  {
    icon: Hourglass,
    title: "Quotes go cold",
    body: "Estimates go out and nobody follows up until the customer has already booked someone else.",
    fix: "Anovas Autopilot",
  },
  {
    icon: EyeOff,
    title: "Nobody sees the whole operation",
    body: "Jobs, crews, and invoices live in texts and spreadsheets, so problems surface after they cost money.",
    fix: "AnovasOS",
  },
  {
    icon: Unplug,
    title: "Tools that don't talk to each other",
    body: "Website, CRM, scheduling, and billing each hold part of the story, and you're the integration.",
    fix: "Implementation services",
  },
];

const workflowSteps = [
  { title: "Capture", body: "Every call, form, and message is caught, including after hours.", owner: "Website + Autopilot" },
  { title: "Record", body: "The lead lands in your CRM once, with its source, so nothing is retyped or duplicated.", owner: "Your CRM" },
  { title: "Follow up", body: "An automatic reply goes out in seconds, and your team gets a task.", owner: "Autopilot" },
  { title: "Book", body: "Appointments are confirmed and reminded, and the next step is logged.", owner: "Autopilot" },
  { title: "Report", body: "Jobs, crews, invoices, and risks show up in one command center.", owner: "AnovasOS" },
];

const process = [
  {
    icon: Search,
    title: "Diagnose",
    body: "Take the free diagnostic or book a call. We score Acquisition, Revenue, Operations, and Systems to find where you're leaking revenue.",
  },
  {
    icon: ClipboardCheck,
    title: "Plan",
    body: "We map the biggest gap to the right fix: AnovasOS, Autopilot, a service, or a combination. Scope, timeline, and price are agreed up front.",
  },
  {
    icon: Rocket,
    title: "Implement",
    body: "Our team builds and configures the work: software setup, automations, website, campaigns. You approve; you don't assemble.",
  },
  {
    icon: TrendingUp,
    title: "Support",
    body: "Recurring optimization reviews and reporting. As the business changes, the system changes with it.",
  },
];

const exampleScopes = [
  {
    title: "After-hours lead capture",
    problem: "Calls after 5 PM go to voicemail and rarely get returned.",
    scope: ["Missed-call text-back on the main line", "Follow-up sequence for unbooked inquiries", "Booking confirmations and reminders"],
    offering: "Anovas Autopilot",
  },
  {
    title: "One view of jobs and billing",
    problem: "Finished jobs wait days to be invoiced and crew workload is a guess.",
    scope: ["Pipeline, jobs, and crews in AnovasOS", "Automation rules for job-complete → invoice", "Weekly risk report for the owner"],
    offering: "AnovasOS",
  },
  {
    title: "More of the right local leads",
    problem: "Strong reviews, but the website and Google profile don't produce inquiries.",
    scope: ["Conversion-focused website with booking", "Google Business Profile management", "Local SEO with monthly reporting"],
    offering: "Implementation & Growth Services",
  },
];

const faqs = [
  {
    question: "Do I have to replace the tools I already use?",
    answer:
      "Not necessarily. The diagnostic and consultation look at what you already run. We'll tell you what we'd keep, what we'd connect, and what we'd replace, and what each option involves, before you commit to anything.",
  },
  {
    question: "Is this software or a service?",
    answer:
      "Both, and we're explicit about which is which. AnovasOS is a software subscription with recurring reviews from our team. Anovas Autopilot is a managed automation service: we build it and run it with you. Implementation and growth services are scoped projects or retainers.",
  },
  {
    question: "What does it cost?",
    answer:
      "Pricing is published. Anovas Autopilot starts at $500/month plus a $1,000 setup fee. AnovasOS plans run from $1,000 to $5,000/month. Professional services are priced on each service page. The diagnostic is free.",
  },
  {
    question: "How long does setup take?",
    answer:
      "It depends on scope. Standard Autopilot onboarding runs about two weeks on the Basic plan, and we give you a timeline for any project before it starts.",
  },
  {
    question: "What happens after I take the diagnostic?",
    answer:
      "You see your score and recommended first fix on screen right away. If you leave your details, our team follows up, typically within one business day, to walk through the results. There's no obligation to buy anything.",
  },
  {
    question: "Do you only work with businesses in Arkansas?",
    answer:
      "No. We're based in Little Rock, Arkansas, and work with local and home service businesses across the United States.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main id="main">
        {/* 1. Hero */}
        <section className="surface-ink relative overflow-hidden text-white" aria-labelledby="hero-title">
          <div className="grid-lines absolute inset-0" aria-hidden="true" />
          <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <Eyebrow tone="ink">For local &amp; home service businesses</Eyebrow>
              <h1 id="hero-title" className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl xl:text-[3.6rem]">
                Systems That Work.
                <br />
                <span className="bg-gradient-to-r from-orange-light to-signal bg-clip-text text-transparent">
                  Businesses That Scale.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                Connect your marketing, CRM, automation, and operations into a growth system designed to
                help your business capture more opportunities and run more efficiently.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="primary" size="lg" className="h-12 px-6 text-base">
                  <TrackedLink href={ROUTES.diagnostic} location="home_hero" ctaId="diagnostic">
                    Get Your Business Systems Diagnostic <ArrowRight size={18} aria-hidden="true" />
                  </TrackedLink>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 border-white/25 bg-white/5 px-6 text-base text-white hover:bg-white/10">
                  <TrackedLink href="#how-it-works" location="home_hero" ctaId="how_it_works">
                    See How It Works
                  </TrackedLink>
                </Button>
              </div>
              <p className="mt-4 text-sm text-white/55">Free · about 3 minutes · your score appears on screen</p>
              <ul className="mt-10 grid max-w-xl gap-3 border-t border-white/10 pt-6 text-sm text-white/65 sm:grid-cols-3">
                <li><span className="block font-semibold text-white">Software + service</span>from one team</li>
                <li><span className="block font-semibold text-white">Published pricing</span>on every offering</li>
                <li><span className="block font-semibold text-white">Built for the trades</span>HVAC, plumbing, roofing &amp; more</li>
              </ul>
            </div>
            <WorkflowDemo />
          </Container>
        </section>

        {/* 2. Problems */}
        <Section tone="light" labelledBy="problems-title">
          <SectionHeader
            id="problems-title"
            eyebrow="The problem"
            title="Most service businesses don't have a lead problem. They have a systems problem."
            lead="Revenue leaks in the gaps between tools, people, and follow-up. These are the four we see most."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex flex-col rounded-2xl border border-gray-200 bg-background p-6">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange/10 text-orange">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold text-charcoal">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-ink">{p.body}</p>
                  <p className="mt-5 border-t border-gray-200 pt-3 text-xs text-muted-ink">
                    Fixed by <span className="font-semibold text-charcoal">{p.fix}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* 3. Connected workflow */}
        <Section id="how-it-works" tone="ink" labelledBy="how-title" className="overflow-hidden">
          <div className="grid-lines absolute inset-0" aria-hidden="true" />
          <div className="relative">
            <SectionHeader
              id="how-title"
              tone="ink"
              eyebrow="How it works"
              title="One lead, five connected steps."
              lead="Each step hands off to the next automatically. That handoff is the part most businesses are missing, and it's what we build."
            />
            <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-5">
              {workflowSteps.map((s, i) => (
                <li key={s.title} className="bg-ink/95 p-6">
                  <p className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{s.body}</p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wide text-orange-light">{s.owner}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-white/50">
              The walkthrough at the top of this page uses sample data to show the flow. Your diagnostic shows which
              of these steps is weakest in your business.
            </p>
          </div>
        </Section>

        {/* 4. Offerings */}
        <Section tone="muted" labelledBy="offerings-title">
          <SectionHeader
            id="offerings-title"
            eyebrow="What we offer"
            title="Two products and the team that puts them to work."
            lead="Use one, or let us connect all three around how your business actually runs."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {Object.values(OFFERINGS).map((o) => (
              <Link
                key={o.key}
                href={o.href}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <TypeBadge>{o.type}</TypeBadge>
                <h3 className="mt-4 text-xl font-semibold text-charcoal">{o.name}</h3>
                <p className="text-sm font-medium text-orange">{o.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-ink">{o.summary}</p>
                <p className="mt-4 text-sm text-charcoal"><span className="font-semibold">Best for:</span> {o.whoFor}</p>
                <p className="mt-auto flex items-center gap-1.5 pt-6 text-xs text-muted-ink">
                  <Tag size={13} aria-hidden="true" /> {o.pricing}
                </p>
                <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-navy group-hover:gap-2 transition-all">
                  Learn about {o.name} <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Section>

        {/* 5. Evidence */}
        <Section tone="light" labelledBy="evidence-title">
          <SectionHeader
            id="evidence-title"
            eyebrow="Evidence, not hype"
            title="What you can check before you ever talk to us."
            lead="We don't publish testimonials, logos, or results we can't verify. Client case studies will appear here as clients approve them. Until then, here's what you can inspect yourself."
          />
          <div className="mb-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: Gauge, title: "Your own diagnostic", body: "A scored assessment of your business across four pillars, shown on screen.", href: ROUTES.diagnostic, cta: "Take it free" },
              { icon: FileText, title: "A sample report", body: "Every section of the full diagnostic report, filled in for a fictional business.", href: ROUTES.sampleReport, cta: "View the sample" },
              { icon: Tag, title: "Published pricing", body: "Plan prices and what each includes, listed on every offering page.", href: ROUTES.autopilot, cta: "See pricing" },
            ].map((e) => {
              const Icon = e.icon;
              return (
                <TrackedLink key={e.title} href={e.href} location="home_evidence" ctaId={e.href} className="group rounded-2xl border border-gray-200 p-6 hover:border-orange/50">
                  <Icon size={22} className="text-orange" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold text-charcoal">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-ink">{e.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy">{e.cta} <ArrowRight size={14} aria-hidden="true" /></span>
                </TrackedLink>
              );
            })}
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold text-charcoal">Example implementation scopes</h3>
            <span className="rounded-full bg-navy/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy">Examples, not case studies</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {exampleScopes.map((s) => (
              <div key={s.title} className="rounded-2xl border border-gray-200 bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange">{s.offering}</p>
                <h4 className="mt-2 text-base font-semibold text-charcoal">{s.title}</h4>
                <p className="mt-2 text-sm text-muted-ink"><span className="font-medium text-charcoal">Situation:</span> {s.problem}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-charcoal">
                  {s.scope.map((item) => <li key={item}>→ {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* 6. Implementation and support */}
        <Section tone="muted" labelledBy="process-title">
          <SectionHeader
            id="process-title"
            eyebrow="Working with us"
            title="You get a working system, not a login and a getting-started guide."
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-sm text-muted-ink">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-charcoal">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-ink">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </Section>

        {/* 7. Diagnostic */}
        <Section tone="light" labelledBy="diagnostic-title">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                id="diagnostic-title"
                eyebrow="Business Systems Diagnostic"
                title="Find your biggest gap in about three minutes."
                lead="Ten questions, scored with our AROS framework: Acquisition, Revenue, Operations, and Systems. You get an overall score, a score for each pillar, and the one fix we'd start with."
                className="mb-8"
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="primary" size="lg">
                  <TrackedLink href={ROUTES.diagnostic} location="home_diagnostic" ctaId="diagnostic">
                    Start the Diagnostic <ArrowRight size={16} aria-hidden="true" />
                  </TrackedLink>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <TrackedLink href={ROUTES.sampleReport} location="home_diagnostic" ctaId="sample_report">
                    View a sample report
                  </TrackedLink>
                </Button>
              </div>
            </div>
            <div className="surface-ink rounded-2xl p-6 text-white shadow-xl" aria-label="Example diagnostic result">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold">Example result</p>
                <IllustrativeBadge>Sample data</IllustrativeBadge>
              </div>
              <div className="flex items-end gap-3">
                <p className="text-6xl font-semibold tracking-tight">47</p>
                <p className="pb-2 text-sm text-white/55">/ 100 · Building Stage</p>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  ["Acquisition", 2.7],
                  ["Revenue", 1.7],
                  ["Operations", 2.5],
                  ["Systems", 3.0],
                ].map(([label, v]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-xs text-white/65"><span>{label}</span><span>{(v as number).toFixed(1)} / 4</span></div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/10">
                      <div className="h-1.5 rounded-full bg-gradient-to-r from-orange-light to-signal" style={{ width: `${((v as number) / 4) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-lg border border-orange/40 bg-orange/10 p-3 text-sm text-white/85">
                <span className="font-semibold text-orange-light">Start with:</span> lead response and follow-up (Revenue).
              </p>
            </div>
          </div>
        </Section>

        {/* 8. FAQ */}
        <Section tone="muted" labelledBy="faq-title">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <SectionHeader
              id="faq-title"
              eyebrow="Questions"
              title="Straight answers before you commit."
              lead={<>More in the <Link href="/faq" className="font-medium text-navy underline">full FAQ</Link>.</>}
            />
            <FaqAccordion items={faqs} />
          </div>
        </Section>

        {/* 9. Final conversion */}
        <CtaBand location="home_final" />
      </main>
      <MarketingFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
}
