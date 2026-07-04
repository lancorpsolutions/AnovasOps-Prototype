import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Brand Identity Design — Anovas Integrated Systems",
  description:
    "Complete brand identity packages for local service businesses — logo, color palette, typography, and a brand style guide. Delivered with source files and a walkthrough call.",
  alternates: { canonical: "/services/brand-identity" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const deliverables = [
  "Primary logo + alternate versions (stacked, icon-only)",
  "Brand color palette (primary + secondary)",
  "Typography system (heading + body font pairing)",
  "Brand style guide — usage rules, don'ts, examples",
  "Source files: SVG, PNG, PDF",
  "Walkthrough call on delivery to explain usage",
  "One round of revisions included",
];

const goodFor = [
  "Businesses with no existing logo or brand",
  "Operations rebranding after growth or a name change",
  "Contractors whose current brand doesn't match the quality of their work",
  "Businesses building a website, truck wrap, or print materials and needing a consistent foundation",
];

export default function BrandIdentityPage() {
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
              <Sparkles size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Project · Priced Per Scope</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Brand Identity Design</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            A brand that earns trust before anyone picks up the phone. Logo, palette, typography, and a style guide that keeps everything consistent — whether it&apos;s your truck wrap, your website, or your social profiles.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">What&apos;s Included</p>
          <ul className="space-y-3">
            {deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle size={15} className="text-orange shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">Right For You If</p>
          <ul className="space-y-3 mb-8">
            {goodFor.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="h-1.5 w-1.5 rounded-full bg-orange shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-xs font-semibold text-charcoal mb-1">Pricing</p>
            <p className="text-lg font-bold text-charcoal">Quoted per project</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Scope varies based on what you already have, what you need, and how complex your brand system needs to be. Book a call and we&apos;ll give you a number before any work starts.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-3">Ready to Get Started?</p>
          <h2 className="text-2xl font-bold text-white mb-3">Let&apos;s talk scope.</h2>
          <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
            A 20-minute discovery call is all we need to scope your brand project and give you a flat-fee quote.
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
