import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
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

      <nav className="border-b border-gray-200 bg-white sticky top-16 z-40">
        <div className="max-w-3xl mx-auto px-6 py-3 flex flex-wrap gap-4 justify-center">
          {faqSections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-xs font-medium text-gray-500 hover:text-orange">
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-14">
        {faqSections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="text-xl font-bold text-charcoal mb-5">{section.title}</h2>
            <FaqAccordion items={section.items} />
          </section>
        ))}
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
