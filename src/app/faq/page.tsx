import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { FaqTabs } from "@/components/marketing/faq-tabs";
import { faqSections } from "@/lib/faq-data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Anovas Integrated Systems, Anovas Autopilot, AnovasOS, and our AI agent services.",
  keywords: ["Anovas FAQ", "Anovas Autopilot pricing", "AnovasOS pricing", "AI agents for service businesses"],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Anovas Integrated Systems",
    description:
      "Answers to common questions about Anovas Integrated Systems, Anovas Autopilot, AnovasOS, and our AI agent services.",
    url: "/faq",
    type: "website",
  },
};


export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            FAQ
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Questions, answered.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Everything you need to know about Anovas Integrated Systems, Anovas Autopilot,
            AnovasOS, and our AI agent services.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <FaqTabs sections={faqSections} />
      </div>

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-3">Still have questions?</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-lg mx-auto">
            Get your free Revenue Leaks assessment and a Growth Review Call to see exactly where
            automation and AI can have the biggest impact on your business.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/revenue-leaks-guide">Get Your Free Growth Score</Link>
          </Button>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
