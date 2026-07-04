import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Content Creation — Anovas Integrated Systems",
  description:
    "SEO-optimized blog posts, service pages, email sequences, and ad copy written for local service businesses. Available as a standalone project or bundled with SEO and social media.",
  alternates: { canonical: "/services/content-creation" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const contentTypes = [
  {
    name: "Blog Posts",
    desc: "SEO-optimized articles targeting local search keywords — written in your brand voice, structured for AI answer engines, and reviewed before delivery.",
  },
  {
    name: "Service Pages",
    desc: "Conversion-focused pages for each service you offer — written to rank and built to turn readers into callers.",
  },
  {
    name: "Email Sequences",
    desc: "Lead follow-up, onboarding, and re-engagement sequences — written for the trades, not repurposed from generic templates.",
  },
  {
    name: "Ad Copy",
    desc: "Facebook, Instagram, and Google ad copy — headline, body, and CTA variations ready for testing.",
  },
];

const process = [
  "Content Agent drafts all copy based on your brand voice and service details",
  "Josh reviews and approves everything before it reaches you",
  "One revision round included on every piece",
  "Delivered in whatever format you need — Google Doc, HTML, plain text",
];

export default function ContentCreationPage() {
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
              <FileText size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Project · Retainer · Custom Pricing</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Content Creation</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Blog posts, service pages, email sequences, and ad copy — written in your brand voice and reviewed before delivery. Available standalone or bundled with SEO and social media.
          </p>
        </div>
      </section>

      {/* Content types */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-8">What We Write</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {contentTypes.map((c) => (
            <div key={c.name} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-charcoal mb-2">{c.name}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works + pricing */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">How It Works</p>
            <ul className="space-y-3">
              {process.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle size={15} className="text-orange shrink-0 mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal mb-1">Pricing</p>
              <p className="text-xl font-bold text-charcoal mb-3">Custom quote</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Pricing is based on content type, volume, and whether you need a one-time project or ongoing monthly output. Available standalone or bundled with an SEO or social media retainer at a reduced rate.
              </p>
            </div>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm font-semibold bg-gradient-to-r from-orange to-orange-light text-white rounded-xl py-3 hover:opacity-90 transition-opacity"
            >
              Book a Discovery Call <ArrowRight size={15} className="inline ml-1" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-white/60 text-sm mb-6">Already running SEO or social with us? Content is often bundled at a lower rate — ask on the call.</p>
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
