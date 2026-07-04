import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Graphic Design — Anovas Integrated Systems",
  description:
    "Monthly graphic design retainer and one-off projects for local service businesses — social graphics, flyers, door hangers, truck wraps, and marketing collateral.",
  alternates: { canonical: "/services/graphic-design" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const retainerIncludes = [
  "Social media graphics (volume based on content plan)",
  "Print materials — flyers, door hangers, postcards",
  "Ad creative for paid campaigns",
  "Branded presentation and proposal templates",
  "Monthly design requests — quoted per volume",
  "All files delivered in print and digital formats",
  "One revision round per piece included",
];

const projectTypes = [
  "Social media graphics",
  "Flyers, door hangers, direct mail",
  "Business cards and letterhead",
  "Truck wrap concepts",
  "Trade show banners and displays",
  "Ad creative (Facebook, Instagram, Google)",
  "Email headers and digital collateral",
];

export default function GraphicDesignPage() {
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
              <PenTool size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Monthly Retainer · One-Off Projects</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Graphic Design</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            On-demand graphic design for social media, print, and digital — handled by Dez, briefed through a consistent process, and approved by Josh before anything reaches a client or goes live.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {/* Retainer */}
        <div className="rounded-2xl border-2 border-orange bg-navy p-7 flex flex-col relative shadow-[0_0_40px_-8px_rgba(242,88,30,0.35)]">
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange to-orange-light text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
            Monthly Retainer
          </span>
          <p className="text-white font-bold text-lg mb-0.5">Design On Tap</p>
          <p className="text-2xl font-black text-orange mb-0.5">$500<span className="text-base font-semibold text-orange/60">/mo</span></p>
          <p className="text-[11px] text-white/30 mb-4 pb-4 border-b border-white/10">No setup fee · Cancel anytime</p>
          <p className="text-xs text-white/50 leading-relaxed mb-5">
            Ongoing design support for businesses that need consistent output every month. Work is scoped at the start of each month based on what&apos;s on your content calendar.
          </p>
          <ul className="space-y-2.5 flex-1">
            {retainerIncludes.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-white/80">
                <CheckCircle size={13} className="text-orange shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block text-center text-xs font-semibold bg-gradient-to-r from-orange to-orange-light text-white rounded-lg py-2.5 hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>

        {/* One-off */}
        <div className="rounded-2xl border border-gray-200 bg-white p-7 flex flex-col">
          <p className="text-charcoal font-bold text-lg mb-0.5">One-Off Projects</p>
          <p className="text-2xl font-black text-orange mb-0.5">Quoted per project</p>
          <p className="text-[11px] text-gray-400 mb-4 pb-4 border-b border-gray-100">3–5 business days turnaround</p>
          <p className="text-xs text-gray-500 leading-relaxed mb-5">
            Need a single asset or a small run? We quote each project based on type and complexity. One revision round included; additional rounds at $75/hr.
          </p>
          <ul className="space-y-2.5 flex-1">
            {projectTypes.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                <span className="h-1.5 w-1.5 rounded-full bg-orange shrink-0 mt-1.5" />
                {f}
              </li>
            ))}
          </ul>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block text-center text-xs font-semibold border border-gray-300 text-charcoal rounded-lg py-2.5 hover:border-orange hover:text-orange transition-colors"
          >
            Request a Quote
          </a>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-white/60 text-sm mb-6">Not sure whether retainer or project is right for you? Book a quick call.</p>
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
