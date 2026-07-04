import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Content Creation — Anovas Integrated Systems",
  description:
    "SEO-optimized blog posts, service pages, email sequences, and ad copy written for local service businesses. Available as a project or monthly retainer.",
  alternates: { canonical: "/services/content-creation" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const contentTypes = [
  { name: "Blog post (800–1,200 words)", price: "From $250" },
  { name: "Service page (500–800 words)", price: "From $200" },
  { name: "Email sequence (3-part)", price: "From $350" },
  { name: "Ad copy set (3 variations)", price: "From $175" },
  { name: "Full website copy (5 pages)", price: "From $900" },
];

const retainerTiers = [
  {
    name: "Starter",
    price: "$750/mo",
    badge: null,
    tagline: "For businesses that want a consistent blog and occasional copy needs.",
    features: [
      "2 SEO blog posts/month",
      "1 additional content piece",
      "Keyword research included",
      "Brand voice matching",
      "1 revision round per piece",
    ],
  },
  {
    name: "Standard",
    price: "$1,250/mo",
    badge: "Best Value",
    tagline: "For businesses actively investing in content as a lead channel.",
    features: [
      "4 SEO blog posts/month",
      "2 additional content pieces",
      "Everything in Starter",
      "Internal linking strategy",
      "Content calendar planning",
      "2 revision rounds per piece",
    ],
  },
  {
    name: "Growth",
    price: "$1,750/mo",
    badge: null,
    tagline: "For businesses with high-volume content needs across multiple channels.",
    features: [
      "6 blog posts/month",
      "4 additional content pieces",
      "Everything in Standard",
      "Email sequence (monthly)",
      "Ad copy refresh (monthly)",
      "SEO performance tracking",
    ],
  },
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
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">Project · Monthly Retainer</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Content Creation</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Blog posts, service pages, email sequences, and ad copy — written in your brand voice and reviewed before delivery. Our Content Agent drafts; Josh approves everything.
          </p>
        </div>
      </section>

      {/* Project pricing */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">One-Off Projects</p>
        <h2 className="text-xl font-bold text-charcoal mb-6">Need a specific piece?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contentTypes.map((item) => (
            <div key={item.name} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-semibold text-charcoal">{item.name}</p>
              <p className="text-sm font-bold text-orange mt-1">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Retainer tiers */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Monthly Retainer</p>
          <h2 className="text-xl font-bold text-charcoal mb-8">Content on a consistent schedule.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {retainerTiers.map((tier) => {
              const featured = tier.badge === "Best Value";
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
                      Best Value
                    </span>
                  )}
                  <p className={`text-base font-bold mb-0.5 ${featured ? "text-white" : "text-charcoal"}`}>{tier.name}</p>
                  <p className="text-2xl font-black text-orange">{tier.price}</p>
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
                    Get Started
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-white/60 text-sm mb-6">Need content bundled with SEO or social? We do that too.</p>
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
