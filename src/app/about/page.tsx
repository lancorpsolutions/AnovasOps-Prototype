import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Zap, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "About Anovas Integrated Systems | AnovasOS",
  description:
    "Anovas Integrated Systems builds AnovasOS, the operating system for home service businesses — giving operators visibility, automation, and accountability in one place.",
};

const values = [
  {
    icon: Eye,
    title: "Visibility first",
    summary:
      "You can't fix what you can't see. Every feature starts with surfacing what's actually happening in the business.",
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
      "Every workflow is designed around how home service businesses actually run — not generic project management.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="bg-navy text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            About Us
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            We build the operating system home service businesses run on.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Anovas Integrated Systems builds AnovasOS for HVAC, plumbing, electrical, roofing,
            landscaping, and pest control operators who are done finding out about problems after
            the money is already gone.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold text-charcoal mb-4">Our mission</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          Home service businesses run on a lot of moving parts: quotes, schedules, crews,
          invoices, and customers, all happening at once. When that information lives in
          spreadsheets, group chats, and someone&apos;s memory, revenue leaks quietly — a cold
          quote here, a slipping job there, an invoice nobody sent.
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">
          AnovasOS exists to close that gap. We give operators one place to see what&apos;s
          actually happening across the business, automate the follow-ups and handoffs that
          shouldn&apos;t require a human, and catch operational risk before it turns into lost
          revenue.
        </p>
      </section>

      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold text-charcoal mb-10 text-center">How we work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="rounded-xl border border-gray-200 bg-background p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-orange/10 text-orange mb-4">
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
          HVAC, plumbing, electrical, roofing, landscaping, and pest control teams — from
          owner-operators running their first few crews to multi-crew operations that need
          executive-level visibility and accountability across the board.
        </p>
      </section>

      <section className="bg-navy-light text-white">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <p className="text-base md:text-lg font-semibold mb-6">
            Ready to see what&apos;s actually happening in your business?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/anovasos/signup">
                Get Started <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/10">
              <Link href="/contact">Talk to Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
