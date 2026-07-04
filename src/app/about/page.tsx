import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Zap, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Anovas Integrated Systems builds AnovasOS and Anovas Autopilot, and runs the growth strategy behind local and home service businesses across the U.S.",
  keywords: ["about Anovas Integrated Systems", "home service business growth company"],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us",
    description:
      "Anovas Integrated Systems builds the software and runs the strategy behind growing local and home service businesses across the U.S.",
    url: "/about",
    type: "website",
  },
};

const values = [
  {
    icon: Eye,
    title: "Visibility first",
    summary:
      "You can't fix what you can't see. Every product we build starts with surfacing what's actually happening in the business.",
  },
  {
    icon: Zap,
    title: "Automate the repetitive",
    summary:
      "Follow-ups, reminders, and handoffs shouldn't depend on someone remembering. We automate the parts that don't need a human.",
  },
  {
    icon: ClipboardCheck,
    title: "Built for operators",
    summary:
      "Every product and engagement is designed around how local service businesses actually run — not generic software.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            About Us
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            We&apos;re the team behind the systems that run service businesses.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Anovas Integrated Systems builds the software — AnovasOS and Anovas Autopilot — and
            provides the strategy and implementation work that local and home service businesses
            need to grow, without piecing it together themselves.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold text-charcoal mb-4">Our mission</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          Local and home service businesses run on a lot of moving parts: leads, quotes,
          schedules, crews, invoices, and customers, all happening at once. When that information
          lives in spreadsheets, group chats, and someone&apos;s memory, revenue leaks quietly —
          a missed call here, a cold quote there, an invoice nobody sent.
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">
          Anovas Integrated Systems exists to close that gap — with software that automates the
          protects revenue and drives growth, and a team that helps you put it to work. We give
          operators one place to see what&apos;s actually happening, automate the follow-ups and
          handoffs that shouldn&apos;t require a human, and catch the leaks before they become
          lost revenue.
        </p>
      </section>

      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold text-charcoal mb-10 text-center">How we work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-gray-200 bg-background p-6 hover:shadow-md transition-shadow"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange to-orange-light text-white mb-4 shadow-sm">
                    <Icon size={18} />
                  </span>
                  <p className="text-sm font-semibold text-charcoal mb-2">{value.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{value.summary}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-xl font-bold text-charcoal mb-3">Who we serve</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
          HVAC, plumbing, electrical, roofing, landscaping, pest control, and other local service
          businesses across the U.S. — from owner-operators running their first few crews to
          multi-location operations that need executive-level visibility and accountability
          across the board.
        </p>
      </section>

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy-light to-navy text-white">
        <div className="relative max-w-4xl mx-auto px-6 py-14 text-center">
          <p className="text-base md:text-lg font-semibold mb-6">
            Ready to see what Anovas Integrated Systems can do for your business?
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
