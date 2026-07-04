import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Website Design & Development — Anovas Integrated Systems",
  description:
    "Mobile-optimized, lead-converting websites for local service businesses — built in 2–3 weeks with contact forms, booking integration, GMB links, and SEO-ready copy.",
  alternates: { canonical: "/services/website-design" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const included = [
  "Custom design — mobile-optimized and built to convert",
  "Service pages, contact page, and about page",
  "Working contact form with email notification",
  "Google My Business link integration",
  "Social media links and profiles connected",
  "Basic on-page SEO setup",
  "Booking integration (where applicable)",
  "Copy drafted and reviewed before a single page is built",
  "2–3 week delivery from approved copy",
];

const process = [
  { step: "01", title: "Brief & Intake", body: "We send a short intake form covering your services, service areas, and brand assets." },
  { step: "02", title: "Copy First", body: "All website copy is drafted and reviewed before build starts — so the site is built around your message, not retrofitted around a template." },
  { step: "03", title: "Design & Build", body: "The site is built to brief — mobile-first, fast, and optimized for lead capture." },
  { step: "04", title: "Review & Launch", body: "You review a staging version. Revisions handled. We launch on your timeline." },
];

export default function WebsiteDesignPage() {
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
              <Globe size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Project · $1,500 Setup + $150/mo</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Website Design &amp; Development</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            A site that looks like you mean business and converts visitors into calls. Copy first, design second — built in 2–3 weeks, mobile-optimized, and ready to generate leads from day one.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-6">How It Works</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {process.map((p) => (
            <div key={p.step} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-2xl font-black text-orange/30 mb-2">{p.step}</p>
              <p className="text-sm font-semibold text-charcoal mb-1">{p.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{p.body}</p>
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
                <p className="text-white font-bold text-lg mb-1">Website Design &amp; Build</p>
                <p className="text-xs text-white/40 leading-relaxed max-w-sm">
                  Everything you need to go from no web presence (or a bad one) to a site that actively generates leads.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-3xl font-black text-orange">$1,500</p>
                <p className="text-xs text-white/30">one-time setup</p>
                <p className="text-base font-bold text-orange mt-1">+ $150/mo</p>
                <p className="text-xs text-white/30">hosting &amp; maintenance</p>
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
          <p className="text-white/60 text-sm mb-6">Questions about your project? Let&apos;s talk it through before you commit to anything.</p>
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
