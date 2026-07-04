import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Google My Business Management — Anovas Integrated Systems",
  description:
    "Monthly GMB management for local service businesses — keyword-optimized posts, review responses, photo updates, Q&A monitoring, and citation accuracy across directories.",
  alternates: { canonical: "/services/google-my-business" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const included = [
  "2 keyword-optimized posts per week",
  "New photo uploads (monthly)",
  "Review responses within 24 hours",
  "Q&A section monitoring and responses",
  "Profile accuracy checks across major directories",
  "Category and service optimization",
  "Monthly performance snapshot",
];

const tiers = [
  {
    name: "Single Location",
    price: "$300/mo",
    tagline: "Full GMB management for one location.",
    features: included,
  },
  {
    name: "Multi-Location",
    price: "$225/mo per location",
    tagline: "For businesses with 2+ locations. Minimum 2 locations.",
    features: [
      ...included,
      "Centralized reporting across all locations",
      "Cross-location consistency audit",
    ],
  },
];

export default function GoogleMyBusinessPage() {
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
              <MapPin size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Monthly Retainer</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Google My Business Management</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Your GMB profile is often the first thing a prospect sees before they call. We keep it active, accurate, and optimized — posts, photos, reviews, and Q&amp;A handled every week.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        {tiers.map((tier) => (
          <div key={tier.name} className="rounded-2xl border border-gray-200 bg-white p-7">
            <p className="text-lg font-bold text-charcoal mb-0.5">{tier.name}</p>
            <p className="text-2xl font-black text-orange mb-1">{tier.price}</p>
            <p className="text-xs text-gray-500 mb-5 pb-5 border-b border-gray-100">{tier.tagline}</p>
            <ul className="space-y-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle size={14} className="text-orange shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 block text-center text-sm font-semibold bg-gradient-to-r from-orange to-orange-light text-white rounded-xl py-3 hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
          </div>
        ))}
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-white/60 text-sm mb-6">Questions or managing multiple locations? Book a call first.</p>
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
