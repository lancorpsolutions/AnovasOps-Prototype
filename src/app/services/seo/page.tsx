import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Local SEO Management — Anovas Integrated Systems",
  description:
    "Monthly local SEO, AEO, and GEO management for local service businesses — GMB optimization, SEO content, citation building, keyword tracking, and monthly ranking reports.",
  alternates: { canonical: "/services/seo" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const disciplines = [
  {
    abbr: "SEO",
    name: "Search Engine Optimization",
    desc: "Local keyword rankings, Google Maps visibility, citation building, on-page optimization, and GMB content — the foundation of local search presence.",
  },
  {
    abbr: "AEO",
    name: "Answer Engine Optimization",
    desc: "Structured content optimized for Google AI Overviews, featured snippets, and voice search — capturing the queries that return a spoken answer instead of a link list.",
  },
  {
    abbr: "GEO",
    name: "Generative Engine Optimization",
    desc: "Positioning your business to appear in AI-generated answers from ChatGPT, Perplexity, and similar platforms — where more buying decisions are now being researched.",
  },
];

const included = [
  "Google My Business optimization and weekly posts",
  "On-page SEO updates and technical fixes",
  "SEO content production (blog posts, service pages)",
  "Citation building and cleanup across major directories",
  "Local keyword tracking and rank monitoring",
  "AEO content structure and schema markup",
  "GEO content positioning and AI platform citations",
  "Monthly ranking and performance report",
];

export default function SeoPage() {
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
              <Search size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Monthly Retainer · $500 Setup + $750/mo</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">SEO / AEO / GEO</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Search has three channels now — Google, AI-powered answer engines, and generative results from tools like ChatGPT. We manage all three so your business shows up where the decision is being made.
          </p>
        </div>
      </section>

      {/* Three disciplines */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-8">Three Disciplines, One Monthly Service</p>
        <div className="grid md:grid-cols-3 gap-5">
          {disciplines.map((d) => (
            <div key={d.abbr} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-2xl font-black text-orange mb-2">{d.abbr}</p>
              <p className="text-sm font-semibold text-charcoal mb-2">{d.name}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="rounded-2xl border-2 border-orange bg-navy p-8 relative shadow-[0_0_40px_-8px_rgba(242,88,30,0.35)]">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-6 pb-6 border-b border-white/10">
              <div>
                <p className="text-white font-bold text-lg mb-1">Local SEO Management</p>
                <p className="text-xs text-white/40 leading-relaxed max-w-sm">
                  Full SEO + AEO + GEO coverage — handled monthly, reported monthly, and adjusted as your rankings and market evolve.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-3xl font-black text-orange">$750<span className="text-base font-semibold text-orange/60">/mo</span></p>
                <p className="text-xs text-white/30">$500 one-time setup</p>
              </div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {included.map((f) => (
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
              className="mt-8 block text-center text-sm font-semibold bg-gradient-to-r from-orange to-orange-light text-white rounded-xl py-3 hover:opacity-90 transition-opacity"
            >
              Book a Discovery Call <ArrowRight size={15} className="inline ml-1" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-white/60 text-sm mb-6">Not sure where your current visibility stands? We&apos;ll audit it on the call before you commit.</p>
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
