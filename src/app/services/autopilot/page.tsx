import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  PhoneMissed,
  MessageSquareText,
  CalendarClock,
  Receipt,
  Star,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Anovas Autopilot | AI Back-Office Automation from Anovas Integrated Systems",
  description:
    "Anovas Autopilot is an AI-powered back office automation platform for local service businesses — missed-call text-back, lead follow-up, booking reminders, invoice nudges, and review generation.",
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
  { name: "Basic", summary: "The core automations, sized for a single crew or small operation." },
  { name: "Pro", summary: "Higher capacity and more automation coverage for a growing team." },
  { name: "Elite", summary: "Full automation depth for established, multi-crew operations." },
  { name: "Enterprise", summary: "Custom capacity and configuration for large or multi-location businesses." },
];

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
            Your back office, running on autopilot.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            Anovas Autopilot is an AI-powered back office automation platform for local service
            businesses — handling the missed calls, follow-ups, reminders, and nudges that quietly
            cost you revenue when nobody&apos;s watching.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">
                Get a Custom Quote <ArrowRight size={16} />
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
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">
            Five Core Automations
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
            It runs the parts of the day that don&apos;t need a human.
          </h2>
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

      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Tiers</p>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
              Four tiers, sized to your operation.
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Autopilot scales with you — capacity and automation coverage grow tier to tier.
              Pricing is tailored to your business, so let&apos;s talk through what fits.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl border border-gray-200 bg-background p-6 hover:shadow-md transition-shadow"
              >
                <p className="text-base font-bold text-charcoal mb-2">{tier.name}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{tier.summary}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">
                Talk to Us About Pricing <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light text-white p-8 shadow-md">
          <p className="text-sm font-semibold mb-4 text-white/90">Why businesses run on Autopilot</p>
          <ul className="space-y-3">
            {[
              "Built for local service businesses, not generic SMB software",
              "Five automations working together, not five disconnected tools",
              "Backed by the same team that builds AnovasOS and our growth services",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange/20 text-orange-light shrink-0 mt-0.5">
                  <Check size={12} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy-light to-navy text-white">
        <div className="relative max-w-4xl mx-auto px-6 py-14 text-center">
          <p className="text-base md:text-lg font-semibold mb-6">
            Ready to put your back office on autopilot?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">
                Contact Us <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/30 text-white hover:bg-white/10">
              <Link href="/services/anovasos">See AnovasOS</Link>
            </Button>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
