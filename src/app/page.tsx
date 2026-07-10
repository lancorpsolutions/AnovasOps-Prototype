import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  Bot,
  Compass,
  Check,
  Search,
  ClipboardCheck,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: {
    absolute: "Anovas Integrated Systems | Software & Growth Systems for Local Service Businesses",
  },
  description:
    "Anovas Integrated Systems builds the software and runs the strategy behind growing local and home service businesses, from revenue protection to full-scale growth marketing.",
  keywords: [
    "home service business software",
    "local service business growth platform",
    "revenue protection system for contractors",
    "missed call text back software",
    "HVAC plumbing electrical roofing software",
    "service business growth strategy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anovas Integrated Systems | Software & Growth Systems for Local Service Businesses",
    description:
      "We build AI-powered automation and growth software for local and home service businesses, backed by a real team that helps you put it to work.",
    url: "/",
    type: "website",
  },
};

const offerings = [
  {
    icon: LayoutDashboard,
    name: "AnovasOS",
    tagline: "Business growth platform",
    summary:
      "Demand generation, content creation, campaign management, SEO, lead nurturing, and consumer intelligence. One command center for growing your business.",
    href: "/services/anovasos",
  },
  {
    icon: Bot,
    name: "Anovas Autopilot",
    tagline: "Revenue Protection System",
    summary:
      "Missed-call text-back, lead and quote follow-up, booking reminders, invoice nudges, and review generation, running automatically in the background.",
    href: "/services/autopilot",
  },
  {
    icon: Compass,
    name: "Services",
    tagline: "Strategy, design & implementation",
    summary:
      "Business formation guidance, graphic design and branding, website design, the AROS Growth Score, Growth Blueprint, and Fractional Growth Advisor engagements.",
    href: "/services",
  },
];

const proof = [
  "Built specifically for local and home service businesses",
  "Software and strategy under one roof, not just another tool",
  "A real team behind the platform, not a support ticket queue",
];

const process = [
  {
    icon: Search,
    step: "01",
    title: "Tell us where you're at",
    summary:
      "Take the free AROS Growth Score or book a call. We benchmark your business across Acquisition, Revenue, Operations, and Systems to find out exactly where you're leaking revenue.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "We build the plan",
    summary:
      "No generic packages. We map what's actually costing you money to the right fix, whether that's AnovasOS, Autopilot, a professional service, or a combination, and lay out the scope and timeline up front.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "We implement it",
    summary:
      "Our team builds and configures the work, software setup, automations, brand, website, campaigns, so it's running and doing its job. You're not left with a login and a getting-started guide.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "We stay on it",
    summary:
      "Ongoing monitoring, reporting, and adjustments. As your business changes, the system and the strategy change with it. We don't disappear after launch.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-28 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            Anovas Integrated Systems
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 max-w-3xl mx-auto">
            The software and strategy behind growing service businesses.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            We build AI-powered automation and growth software for local and home service
            businesses, and back it with a real team that helps you put it to work, so nothing
            slips through the cracks and nothing gets left on the table. Revenue protection,
            demand generation, and the professional services that hold it all together, run by
            one team instead of five vendors who don&apos;t talk to each other.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/services">
                Explore Our Services <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/30 text-white hover:bg-white/10">
              <Link href="/revenue-leaks-guide">Get the Free Revenue Leaks Guide</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">What We Offer</p>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
            One company, three ways to grow.
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Pick the product that fits where your business is today, or lean on our team to
            build the whole system around you.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {offerings.map((offering) => {
            const Icon = offering.icon;
            return (
              <Link
                key={offering.name}
                href={offering.href}
                className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all p-6 flex flex-col"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-light text-white mb-4 shadow-sm">
                  <Icon size={20} />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-orange mb-1.5">
                  {offering.tagline}
                </p>
                <p className="text-base font-bold text-charcoal mb-2">{offering.name}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-5 flex-1">{offering.summary}</p>
                <span className="text-xs font-semibold text-navy flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Who We Serve</p>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4">
              Built for local and home service operators.
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              HVAC, plumbing, electrical, roofing, landscaping, pest control, and other local
              service businesses across the U.S., from owner-operators running their first few
              crews to multi-location operations that need executive-level visibility.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Whether you need a revenue protection system, a growth engine that fills the
              pipeline, or a team to build the whole strategy with you, Anovas Integrated Systems
              is the operator behind the operator.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Not sure which of that applies to you? That&apos;s the point of the AROS Growth
              Score, a free 10-question diagnostic that tells you exactly which gap, acquisition,
              revenue, operations, or systems, is costing you the most right now.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light text-white p-8 shadow-md">
            <p className="text-sm font-semibold mb-5 text-white/90">Why businesses choose Anovas</p>
            <ul className="space-y-3">
              {proof.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange/20 text-orange-light shrink-0 mt-0.5">
                    <Check size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">How To Get Started</p>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
            From first conversation to a system that runs itself.
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            No long onboarding, no black box. Here&apos;s exactly what working with us looks like.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-light text-white shadow-sm">
                    <Icon size={20} />
                  </span>
                  <span className="text-2xl font-bold text-gray-100">{step.step}</span>
                </div>
                <p className="text-sm font-bold text-charcoal mb-2">{step.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{step.summary}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="primary" size="lg">
            <Link href="/aros-growth-score">
              Take the Free Growth Score <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Talk to Our Team</Link>
          </Button>
        </div>
      </section>

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy-light to-navy text-white">
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-base md:text-lg font-semibold mb-2">
            Ready to see what Anovas Integrated Systems can do for your business?
          </p>
          <p className="text-white/50 text-xs mb-6">
            Explore our services or talk to our team about what fits your operation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/services">
                Explore Our Services <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/30 text-white hover:bg-white/10">
              <Link href="/contact">Talk to Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
