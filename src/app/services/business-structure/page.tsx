import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Business & Corporate Structure Consulting | Anovas Integrated Systems",
  description:
    "Business structure consulting for local service businesses: entity setup, compliance review, and written action plan. Three tiers from $499.",
  alternates: { canonical: "/services/business-structure" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/discovery-call?utm_source=website&utm_medium=cta&utm_content=business-structure";

const tiers = [
  {
    name: "Basic Structure",
    price: "$499",
    period: "one-time",
    badge: null,
    tagline: "For solo operators and new businesses that need a clear foundation to build from.",
    features: [
      "60-minute strategy consultation",
      "Entity type recommendation (LLC, S-Corp, etc.)",
      "Basic compliance and liability review",
      "Written action plan delivered within 48 hours",
      "48-hour follow-up Q&A window",
    ],
    cta: "Book a Discovery Call",
  },
  {
    name: "Pro Structure",
    price: "$750",
    period: "one-time",
    badge: "Most Popular",
    tagline: "For established businesses that need a full review of their current setup.",
    features: [
      "90-minute strategy consultation",
      "Everything in Basic",
      "Review of current entity and ownership setup",
      "Gap and compliance risk identification",
      "Prioritized action list with sequencing",
      "Recommendations for restructuring if needed",
    ],
    cta: "Book a Discovery Call",
  },
  {
    name: "Elite Structure",
    price: "$1,200+",
    period: "one-time",
    badge: null,
    tagline: "For multi-location operations or businesses adding partners, locations, or complexity.",
    features: [
      "Everything in Pro",
      "Multi-entity and holding structure review",
      "Partner or ownership structure analysis",
      "Expansion and scaling recommendations",
      "Ongoing advisory access (30 days post-delivery)",
      "Referral coordination with legal/financial specialists",
    ],
    cta: "Book a Discovery Call",
  },
];

const goodFor = [
  "Solo operators ready to formalize their business",
  "Existing businesses unsure if their current structure is right",
  "Owners expanding to multiple locations or adding partners",
  "Contractors who've never had a professional review their setup",
];

export default function BusinessStructurePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-6">
            <ArrowLeft size={13} /> Back to Services
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/20 text-orange-light">
              <Building2 size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">One-Time · From $499</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Business &amp; Corporate Structure
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            A single focused engagement that maps your current structure, surfaces the gaps, and gives you a clear written action plan, so you know exactly what to fix and in what order.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Plans</p>
          <h2 className="text-xl font-bold text-charcoal mb-2">Three tiers, all including a written action plan within 48 hours.</h2>
          <p className="text-sm text-gray-500 mb-8">One-time flat fee. No recurring commitment.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => {
              const featured = tier.badge === "Most Popular";
              return (
                <div
                  key={tier.name}
                  className={
                    featured
                      ? "rounded-2xl border-2 border-orange bg-navy p-6 flex flex-col relative shadow-[0_0_40px_-8px_rgba(242,88,30,0.35)]"
                      : "rounded-2xl border border-gray-200 bg-background p-6 flex flex-col"
                  }
                >
                  {featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange to-orange-light text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                      Most Popular
                    </span>
                  )}
                  <p className={`text-base font-bold mb-0.5 ${featured ? "text-white" : "text-charcoal"}`}>{tier.name}</p>
                  <p className={`text-2xl font-black mb-0.5 ${featured ? "text-orange" : "text-charcoal"}`}>{tier.price}</p>
                  <p className={`text-xs font-semibold mb-1 ${featured ? "text-orange/60" : "text-gray-400"}`}>{tier.period}</p>
                  <p className={`text-xs mt-1 mb-4 pb-4 border-b leading-relaxed ${featured ? "text-white/50 border-white/10" : "text-gray-500 border-gray-100"}`}>
                    {tier.tagline}
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-xs ${featured ? "text-white/80" : "text-gray-600"}`}>
                        <CheckCircle size={13} className="text-orange shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      featured
                        ? "mt-6 block text-center text-xs font-semibold bg-gradient-to-r from-orange to-orange-light text-white rounded-lg py-2.5 hover:opacity-90 transition-opacity"
                        : "mt-6 block text-center text-xs font-semibold border border-gray-300 text-charcoal rounded-lg py-2.5 hover:border-orange hover:text-orange transition-colors"
                    }
                  >
                    {tier.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Right For You */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-6">Right For You If</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {goodFor.map((item) => (
            <div key={item} className="rounded-xl border border-gray-200 bg-white p-4 flex items-start gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-orange shrink-0 mt-2" />
              <p className="text-sm text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-3">Ready to Get Started?</p>
          <h2 className="text-2xl font-bold text-white mb-3">Book your consultation.</h2>
          <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
            We&apos;ll schedule your session and send a short intake form so we can review your current setup before we talk.
          </p>
          <Button asChild variant="primary" size="lg">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              Book a Discovery Call <ArrowRight size={16} />
            </a>
          </Button>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
