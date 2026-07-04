import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Paid Advertising — Anovas Integrated Systems",
  description:
    "Facebook, Instagram, and Google ad campaigns built, launched, and actively managed for local service businesses. Custom pricing based on platforms and ad spend.",
  alternates: { canonical: "/services/paid-advertising" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const platforms = [
  {
    name: "Facebook & Instagram",
    desc: "Awareness, lead generation, and retargeting campaigns — targeted by zip code, service area, and homeowner demographics.",
  },
  {
    name: "Google Ads",
    desc: "Search campaigns targeting high-intent keywords — people actively searching for your services right now in your area.",
  },
  {
    name: "Retargeting",
    desc: "Follow-up campaigns that reach people who visited your site but didn't call — keeping you top-of-mind until they're ready.",
  },
];

const included = [
  "Campaign strategy and setup",
  "Ad copy written and tested",
  "Creative production (graphics + video concepts)",
  "Audience targeting and geo-fencing",
  "A/B testing and ongoing optimization",
  "Monthly performance reporting",
  "You own your ad accounts — always",
];

export default function PaidAdvertisingPage() {
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
              <Megaphone size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Monthly Retainer · Ad Spend Billed Separately</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Paid Advertising</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Facebook, Instagram, and Google campaigns built and actively managed — not set-and-forgotten. Ad copy, creative, targeting, and optimization are included. You own your accounts. Ad spend goes directly to the platforms.
          </p>
        </div>
      </section>

      {/* Platforms */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-8">Platforms We Manage</p>
        <div className="grid md:grid-cols-3 gap-5">
          {platforms.map((p) => (
            <div key={p.name} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-charcoal mb-2">{p.name}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Included + pricing */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">What&apos;s Included in Management</p>
            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle size={15} className="text-orange shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-charcoal mb-1">Pricing</p>
              <p className="text-xl font-bold text-charcoal mb-3">Custom quote</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                Management fee is based on number of platforms, campaign complexity, and ad spend volume. Ad spend is billed directly by the platform — not marked up.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                We&apos;ll recommend the right starting budget for your market and service type on the discovery call.
              </p>
            </div>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-center text-sm font-semibold bg-gradient-to-r from-orange to-orange-light text-white rounded-xl py-3 hover:opacity-90 transition-opacity"
            >
              Book a Discovery Call <ArrowRight size={15} className="inline ml-1" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-white/60 text-sm mb-6">Not sure which platform to start with? We&apos;ll tell you what we&apos;d recommend for your market and budget on the call.</p>
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
