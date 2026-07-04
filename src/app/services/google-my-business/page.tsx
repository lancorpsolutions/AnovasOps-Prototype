import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Google My Business Management — Anovas Integrated Systems",
  description:
    "Monthly GMB management for local service businesses — keyword-optimized posts, review responses, photo updates, Q&A monitoring, and citation accuracy. Included in Local SEO or as a standalone add-on.",
  alternates: { canonical: "/services/google-my-business" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const included = [
  "2 keyword-optimized posts per week",
  "New photo uploads (monthly)",
  "Review responses within 24 hours",
  "Q&A section monitoring and responses",
  "Profile accuracy checks across major directories",
  "Category and service area optimization",
  "Monthly performance snapshot",
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
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Included in Local SEO · Also Available Standalone</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Google My Business Management</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Your GMB profile is often the first thing a prospect sees before they call. We keep it active, accurate, and optimized — posts, photos, reviews, and Q&amp;A handled every week.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-4">What&apos;s Managed Monthly</p>
          <ul className="space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle size={15} className="text-orange shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-orange/30 bg-orange/5 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-orange mb-2">Included in Local SEO Management</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              GMB management is included as part of our{" "}
              <Link href="/services/seo" className="text-orange font-semibold hover:underline">
                Local SEO Management
              </Link>{" "}
              retainer ($500 setup + $750/mo). If you&apos;re already doing SEO with us, your GMB is covered.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-charcoal mb-2">Standalone GMB Management</p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Need GMB management without the full SEO retainer? We offer standalone GMB management for clients who already have SEO handled elsewhere or want to start here first.
            </p>
            <p className="text-xs text-gray-500">Pricing quoted on request based on number of locations.</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-3">Ready to Get Started?</p>
          <h2 className="text-2xl font-bold text-white mb-3">Let&apos;s talk about your GMB.</h2>
          <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
            Book a call and we&apos;ll audit your current profile and tell you exactly what&apos;s missing before you commit.
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
