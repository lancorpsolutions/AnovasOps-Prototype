import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  Bot,
  Compass,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: {
    absolute: "Anovas Integrated Systems | Software & Growth Systems for Local Service Businesses",
  },
  description:
    "Anovas Integrated Systems builds the software and runs the strategy behind growing local and home service businesses — from AI back-office automation to full-scale growth marketing.",
  keywords: [
    "home service business software",
    "local service business growth platform",
    "AI back office automation for contractors",
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
      "Demand generation, content creation, campaign management, SEO, lead nurturing, and consumer intelligence — one command center for growing your business.",
    href: "/services/anovasos",
  },
  {
    icon: Bot,
    name: "Anovas Autopilot",
    tagline: "AI back-office automation",
    summary:
      "Missed-call text-back, lead and quote follow-up, booking reminders, invoice nudges, and review generation — running automatically in the background.",
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
  "Software and strategy under one roof — not just another tool",
  "A real team behind the platform, not a support ticket queue",
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
            businesses, and back it with a real team that helps you put it to work — so nothing
            slips through the cracks and nothing gets left on the table.
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
            Pick the product that fits where your business is today — or lean on our team to
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
              service businesses across the U.S. — from owner-operators running their first few
              crews to multi-location operations that need executive-level visibility.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Whether you need software that runs the back office, a growth engine that fills the
              pipeline, or a team to build the whole strategy with you, Anovas Integrated Systems
              is the operator behind the operator.
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
