import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Business & Corporate Structure Consulting — Anovas Integrated Systems",
  description:
    "A 90-minute consultation with a written action plan delivered within 48 hours — entity setup, compliance gaps, and a prioritized action list for local service businesses.",
  alternates: { canonical: "/services/business-structure" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const included = [
  "90-minute strategy consultation (video or phone)",
  "Review of current entity structure and ownership setup",
  "Identification of compliance gaps and liability exposures",
  "Prioritized written action plan delivered within 48 hours",
  "Recommendations for entity type, structure, and next steps",
  "Follow-up Q&A window (48 hours post-delivery)",
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
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">One-Time · $500</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Business &amp; Corporate Structure
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            A single focused session that maps your current structure, surfaces the gaps, and gives you a clear written action plan — so you know exactly what to fix and in what order.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">What&apos;s Included</p>
          <ul className="space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle size={15} className="text-orange shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">Right For You If</p>
          <ul className="space-y-3">
            {goodFor.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="h-1.5 w-1.5 rounded-full bg-orange shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-xs font-semibold text-charcoal mb-1">Flat Fee</p>
            <p className="text-3xl font-black text-charcoal">$500</p>
            <p className="text-xs text-gray-500 mt-1">One-time · No recurring commitment</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-3">Ready to Get Started?</p>
          <h2 className="text-2xl font-bold text-white mb-3">Book your consultation.</h2>
          <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
            We&apos;ll schedule your 90-minute session and send a short intake form so we can review your current setup before we talk.
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
