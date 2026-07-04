import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  PhoneMissed,
  MessageSquareText,
  CalendarClock,
  Receipt,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { AutopilotInquiryForm } from "@/components/forms/autopilot-inquiry-form";

export const metadata: Metadata = {
  title: "Anovas Autopilot — Revenue Protection System for Local Service Businesses",
  description:
    "Anovas Autopilot is a revenue protection system for local service businesses — missed-call text-back, lead follow-up, booking reminders, invoice nudges, and review generation running automatically around the clock.",
  keywords: [
    "Anovas Autopilot",
    "revenue protection system for contractors",
    "missed call text back software",
    "lead follow-up automation for service businesses",
    "review generation software for contractors",
    "invoice reminder automation",
  ],
  alternates: { canonical: "/services/autopilot" },
  openGraph: {
    title: "Anovas Autopilot — Revenue Protection System for Local Service Businesses",
    description:
      "Missed-call text-back, lead and quote follow-up, booking reminders, invoice nudges, and review generation — protecting your revenue around the clock.",
    url: "/services/autopilot",
    type: "website",
  },
};

const autopilotJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Anovas Autopilot",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Anovas Autopilot is a revenue protection system for local service businesses, delivering missed-call text-back, lead and quote follow-up, booking and reminder automation, invoice and payment nudges, and review generation.",
  brand: { "@type": "Organization", name: "Anovas Integrated Systems" },
  offers: [
    { "@type": "Offer", name: "Basic" },
    { "@type": "Offer", name: "Pro" },
    { "@type": "Offer", name: "Elite" },
    { "@type": "Offer", name: "Enterprise" },
  ],
};

const automations = [
  {
    icon: PhoneMissed,
    title: "Missed-call text-back",
    summary: "Every missed call gets an instant text response, so a busy phone line never costs you a lead.",
  },
  {
    icon: MessageSquareText,
    title: "Lead and quote follow-up",
    summary: "Quotes and leads get automatically followed up on, so they don't go cold while you're on a job.",
  },
  {
    icon: CalendarClock,
    title: "Booking and reminder automation",
    summary: "Appointments get confirmed and reminded automatically, cutting down on no-shows.",
  },
  {
    icon: Receipt,
    title: "Invoice and payment nudges",
    summary: "Outstanding invoices get gentle automated nudges, so finished work doesn't sit unpaid.",
  },
  {
    icon: Star,
    title: "Review generation",
    summary: "Happy customers get prompted to leave a review automatically, building your reputation on autopilot.",
  },
];

const tiers = [
  {
    name: "Basic",
    price: "$500/mo",
    setup: "$1,000 setup",
    badge: null,
    tagline: "For solo operators and single-crew businesses just getting started with automation.",
    features: [
      "All five core automations included",
      "Up to 100 leads/mo capacity",
      "Single user access",
      "Missed-call text-back",
      "Lead & quote follow-up sequences",
      "Booking confirmations & reminders",
      "Invoice nudges & payment follow-up",
      "Automated review requests",
      "Standard onboarding (2 weeks)",
    ],
  },
  {
    name: "Pro",
    price: "$1,000/mo",
    setup: "$2,500 setup",
    badge: "Most Popular",
    tagline: "For growing teams with a few techs or staff who need higher capacity and more coverage.",
    features: [
      "Everything in Basic",
      "Up to 500 leads/mo capacity",
      "Up to 5 user seats",
      "Advanced follow-up sequences",
      "Priority booking management",
      "Multi-step invoice escalation",
      "Performance reporting dashboard",
      "Bi-weekly optimization check-in",
      "Priority email support",
    ],
  },
  {
    name: "Elite",
    price: "$2,000/mo",
    setup: "$5,000 setup",
    badge: null,
    tagline: "For established businesses doing over $1M who need full automation depth and higher capacity.",
    features: [
      "Everything in Pro",
      "Unlimited lead capacity",
      "Up to 15 user seats",
      "Custom automation sequences",
      "Multi-location support",
      "Dedicated onboarding specialist",
      "Weekly optimization check-in",
      "Phone & priority support",
      "Custom reporting",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    setup: "Custom",
    badge: null,
    tagline: "For multi-location operations with complex needs and high lead volume.",
    features: [
      "Everything in Elite",
      "Unlimited users & locations",
      "Custom CRM & tool integrations",
      "Dedicated account manager",
      "SLA-backed support",
      "White-glove onboarding",
      "Executive reporting",
      "Quarterly strategy reviews",
      "Custom pricing",
    ],
  },
];

function FlameIcon() {
  return (
    <svg width="11" height="14" viewBox="0 0 11 14" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
      <path
        d="M5.5 0C5.5 0 9 3.5 9 7C9 9.4 7.4 11.5 5.5 11.5C3.6 11.5 2 9.4 2 7C2 5.5 2.8 4 3.5 3C3.5 4.5 4.5 5.5 4.5 5.5C4.5 4 5.5 2 5.5 0Z"
        fill="#F2581E"
      />
      <path
        d="M5.5 9C4.7 9 4 9.7 4 10.5C4 11.3 4.7 12 5.5 12C6.3 12 7 11.3 7 10.5C7 9.7 6.3 9 5.5 9Z"
        fill="#FF7A33"
      />
    </svg>
  );
}

function TierBullet({ text, inverted = false }: { text: string; inverted?: boolean }) {
  return (
    <li className="flex items-start gap-2.5">
      <FlameIcon />
      <span className={`text-xs leading-relaxed ${inverted ? "text-white/80" : "text-gray-600"}`}>{text}</span>
    </li>
  );
}

export default function AutopilotPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            A Product of Anovas Integrated Systems
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
            Your revenue, protected on autopilot.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            Anovas Autopilot is a revenue protection system for local service businesses — catching
            the missed calls, cold leads, unpaid invoices, and missing reviews that quietly
            cost you revenue when nobody&apos;s watching.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <a href="#get-started">
                Get Your Autopilot Setup <ArrowRight size={16} />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/30 text-white hover:bg-white/10">
              <Link href="/revenue-leaks-guide">Get the Free Revenue Leaks Guide</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Five automations */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">
            Five Core Automations
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
            It runs the parts of the day that don&apos;t need a human.
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Every Autopilot plan includes all five automations. What scales between tiers is capacity, users, and support.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {automations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange to-orange-light text-white mb-4 shadow-sm">
                  <Icon size={18} />
                </span>
                <p className="text-sm font-semibold text-charcoal mb-2">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.summary}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Tiers</p>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
              Four tiers, sized to your operation.
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              All five automations are included in every tier. Capacity, user seats, and support depth scale as you grow.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {tiers.map((tier) => {
              const isFeatured = tier.badge === "Most Popular";
              return (
                <div
                  key={tier.name}
                  className={
                    isFeatured
                      ? "rounded-2xl border-2 border-orange bg-navy p-6 flex flex-col relative shadow-[0_0_40px_-8px_rgba(242,88,30,0.45)]"
                      : "rounded-2xl border border-gray-200 bg-background p-6 flex flex-col"
                  }
                >
                  {isFeatured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange to-orange-light text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                      ⚡ Flagship
                    </span>
                  )}
                  <div className="mb-4">
                    <p className={`text-base font-bold ${isFeatured ? "text-white" : "text-charcoal"}`}>{tier.name}</p>
                    <p className="text-xl font-bold text-orange mt-0.5">{tier.price}</p>
                    <p className={`text-[11px] ${isFeatured ? "text-white/40" : "text-gray-400"}`}>{tier.setup}</p>
                  </div>
                  <p className={`text-xs leading-relaxed mb-4 pb-4 ${isFeatured ? "text-white/60 border-b border-white/10" : "text-gray-500 border-b border-gray-100"}`}>
                    {tier.tagline}
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {tier.features.map((f) => <TierBullet key={f} text={f} inverted={isFeatured} />)}
                  </ul>
                  <a
                    href="#get-started"
                    className={
                      isFeatured
                        ? "mt-6 block text-center text-xs font-semibold bg-gradient-to-r from-orange to-orange-light text-white rounded-lg py-2.5 px-4 hover:opacity-90 transition-opacity shadow-sm"
                        : "mt-6 block text-center text-xs font-semibold border border-gray-300 text-charcoal rounded-lg py-2.5 px-4 hover:border-orange hover:text-orange transition-colors"
                    }
                  >
                    Get Started with {tier.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Autopilot */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light text-white p-8 shadow-md">
          <p className="text-sm font-semibold mb-4 text-white/90">Why businesses run on Autopilot</p>
          <ul className="space-y-3">
            {[
              "Built for local service businesses, not generic SMB software",
              "Five automations working together, not five disconnected tools",
              "Most owners spend less than 2 hours total on setup — we handle the build",
              "The missed-call text-back alone typically recovers enough jobs in month one to cover the fee",
              "Backed by the same team that builds AnovasOS and our growth services",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-orange/20 shrink-0 mt-0.5">
                  <Zap size={10} className="text-orange-light" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Inline inquiry form */}
      <section id="get-started" className="max-w-2xl mx-auto px-6 pb-20">
        <div className="text-center mb-8">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Get Started</p>
          <h2 className="text-2xl font-bold text-charcoal mb-3">
            Let&apos;s size the right plan for your operation.
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Tell us about your business and we&apos;ll walk you through exactly what gets automated — no pressure, no pitch until you&apos;ve seen what it looks like for you.
          </p>
        </div>
        <AutopilotInquiryForm />
      </section>

      <MarketingFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autopilotJsonLd) }}
      />
    </div>
  );
}
