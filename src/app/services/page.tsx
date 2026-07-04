import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  Bot,
  Building2,
  Sparkles,
  PenTool,
  Globe,
  Search,
  MapPin,
  Share2,
  FileText,
  Megaphone,
  Gauge,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Services — Anovas Integrated Systems",
  description:
    "AnovasOS, Anovas Autopilot, and a full suite of professional services — brand identity, website design, local SEO, social media management, content creation, paid advertising, and Google My Business management — built for local service businesses.",
  keywords: [
    "local service business marketing agency",
    "website design for contractors",
    "local SEO for HVAC plumbing electrical roofing",
    "social media management for service businesses",
    "brand identity design for contractors",
    "Google My Business management",
    "paid advertising for local service businesses",
    "AnovasOS",
    "Anovas Autopilot",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Anovas Integrated Systems",
    description:
      "AnovasOS, Anovas Autopilot, and professional services — brand identity, web design, SEO, social media, content, and paid advertising for local service businesses.",
    url: "/services",
    type: "website",
  },
};

const products = [
  {
    icon: LayoutDashboard,
    name: "AnovasOS",
    tagline: "Business growth platform",
    summary:
      "The full growth management platform for local service businesses — AI-powered marketing execution, analytics, reporting, and ongoing management in one command center.",
    bullets: [
      "Live dashboard for jobs, crews, and revenue",
      "AI agents handling 70%+ of execution",
      "Automation rules, SOPs, and operational risk tracking",
    ],
    href: "/services/anovasos",
    cta: "Explore AnovasOS",
  },
  {
    icon: Bot,
    name: "Anovas Autopilot",
    tagline: "AI back-office automation",
    summary:
      "An AI-powered back office automation platform that handles missed calls, lead follow-up, booking reminders, invoice nudges, and review generation — automatically, in the background.",
    bullets: [
      "Missed-call text-back",
      "Lead and quote follow-up sequences",
      "Booking, invoice, and review automation",
    ],
    href: "/services/autopilot",
    cta: "Explore Autopilot",
  },
];

const professionalServices = [
  {
    icon: Building2,
    name: "Business & Corporate Structure",
    summary:
      "A 90-minute consultation with a written action plan delivered within 48 hours. We walk through your current entity setup, identify gaps and compliance risks, and give you a clear prioritized action list — whether you're forming your first LLC or restructuring an established operation.",
    tag: "One-Time",
    href: "/services/business-structure",
  },
  {
    icon: Sparkles,
    name: "Brand Identity Design",
    summary:
      "A complete brand identity package — logo, color palette, typography system, and a brand style guide that keeps every piece of collateral consistent. Delivered with source files (SVG, PNG, PDF) and a walkthrough call so you know exactly how to use it.",
    tag: "Project",
    href: "/services/brand-identity",
  },
  {
    icon: PenTool,
    name: "Graphic Design",
    summary:
      "One-off and ongoing graphic design for social media, print, and digital — social graphics, flyers, door hangers, truck wraps, trade show materials, and marketing collateral. Every project starts with a detailed brief and nothing ships without a QA review.",
    tag: "Project / Retainer",
    href: "/services/graphic-design",
  },
  {
    icon: Globe,
    name: "Website Design & Development",
    summary:
      "A mobile-optimized, lead-converting website built in 2–3 weeks — complete with working contact forms, booking integration, GMB link, and social connections. Copy is drafted and reviewed before a single page is built.",
    tag: "Project",
    href: "/services/website-design",
  },
  {
    icon: Search,
    name: "SEO / AEO / GEO",
    summary:
      "Monthly search optimization that goes beyond traditional SEO — covering local keyword rankings and citations (SEO), optimizing for AI-powered answer engines like Google SGE and voice search (AEO), and positioning your business in AI-generated results from ChatGPT and Perplexity (GEO). Monthly reporting included.",
    tag: "Monthly Retainer",
    href: "/services/seo",
  },
  {
    icon: MapPin,
    name: "Google My Business Management",
    summary:
      "Monthly GMB management — 2 keyword-optimized posts per week, photo updates, review responses within 24 hours, Q&A monitoring, and profile accuracy checks across directories. Your GMB is often the first thing a prospect sees; we make sure it's working for you.",
    tag: "Monthly Retainer",
    href: "/services/google-my-business",
  },
  {
    icon: Share2,
    name: "Social Media Management",
    summary:
      "End-to-end monthly social media management — content calendar, post production, graphics, scheduling, and performance reporting. Three tiers from $500/mo. Nothing goes live without your approval on copy and graphics.",
    tag: "Monthly Retainer",
    href: "/services/social-media",
  },
  {
    icon: FileText,
    name: "Content Creation",
    summary:
      "Blog posts, service pages, email sequences, and ad copy — written in your brand voice and reviewed before delivery. Available standalone or bundled with SEO or social media at a reduced rate.",
    tag: "Project / Retainer",
    href: "/services/content-creation",
  },
  {
    icon: Megaphone,
    name: "Paid Advertising",
    summary:
      "Facebook, Instagram, and Google ad campaigns built, launched, and managed for you — including ad copy, creative, audience targeting, and monthly performance reporting. No set-it-and-forget-it: campaigns are actively monitored and optimized every month.",
    tag: "Monthly Retainer",
    href: "/services/paid-advertising",
  },
];

const faqs = [
  {
    question: "What professional services does Anovas Integrated Systems offer?",
    answer:
      "We offer business and corporate structure consulting, brand identity design, graphic design, website design and development, SEO/AEO/GEO, Google My Business management, social media management, content creation, and paid advertising — all built specifically for local service businesses.",
  },
  {
    question: "Who are these services built for?",
    answer:
      "Local and home service businesses across the U.S. — HVAC, plumbing, electrical, roofing, landscaping, pest control, auto repair, general contracting, and similar trades — from solo operators running their first few crews to multi-location operations.",
  },
  {
    question: "Do I need AnovasOS or Autopilot to use your professional services?",
    answer:
      "No. Services like website design, brand identity, local SEO, and social media management can be engaged on their own. Many clients start with a website build or SEO retainer and add AnovasOS or Autopilot as they grow.",
  },
  {
    question: "What's the difference between SEO, AEO, and GEO?",
    answer:
      "SEO (Search Engine Optimization) improves your rankings on Google's traditional results and Maps. AEO (Answer Engine Optimization) optimizes for AI-powered search features like Google's AI Overviews and voice search. GEO (Generative Engine Optimization) positions your business to appear in AI-generated answers from tools like ChatGPT, Perplexity, and similar platforms. We manage all three because search is no longer just one channel.",
  },
  {
    question: "How do I know which services my business actually needs?",
    answer:
      "Start with the AROS Growth Score — a free 10-question diagnostic that benchmarks your business across Acquisition, Revenue, Operations, and Systems, and tells you exactly where the biggest gap is. From there we can recommend the right combination of services.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      {/* Hero */}
      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            Services &amp; Offerings
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Everything your business needs to grow — under one roof.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Two AI-powered platforms plus a full suite of professional services — brand, web,
            SEO, social, content, and paid advertising — built exclusively for local service
            businesses. No generalist agency handoffs. One team handles all of it.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">
            Platforms
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
            Two products built for the trades.
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            AnovasOS manages your growth. Autopilot runs your back office. Both are built exclusively for local service businesses — not adapted from generic SMB software.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.name}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow p-8 flex flex-col"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-light text-white mb-5 shadow-sm">
                  <Icon size={22} />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-orange mb-1.5">
                  {product.tagline}
                </p>
                <p className="text-lg font-bold text-charcoal mb-3">{product.name}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{product.summary}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {product.bullets.map((b) => (
                    <li key={b} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange shrink-0 mt-1.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="primary" size="lg" className="w-full">
                  <Link href={product.href}>
                    {product.cta} <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Professional Services */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">
              Professional Services
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
              The full digital foundation, built and managed for you.
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Brand, web, search, social, content, and advertising — done right, done consistently,
              and done by a team that only works with service businesses.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {professionalServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.name}
                  href={service.href}
                  className="rounded-xl border border-gray-200 bg-background p-5 hover:shadow-md hover:border-orange/40 transition-all flex flex-col group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-orange/10 text-orange shrink-0">
                      <Icon size={17} />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 bg-gray-100 rounded-full px-2 py-0.5 ml-2 mt-0.5 whitespace-nowrap">
                      {service.tag}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-charcoal mb-1.5">{service.name}</p>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">{service.summary}</p>
                  <p className="text-xs font-semibold text-orange mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                    View packages <ChevronRight size={12} />
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* AROS Growth Score CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange/20">
            <Gauge size={22} className="text-orange-light" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-orange-light mb-1">
              Free Diagnostic Tool
            </p>
            <p className="text-lg font-bold text-white mb-1">Not sure where to start?</p>
            <p className="text-sm text-white/60 leading-relaxed">
              The AROS Growth Score benchmarks your business across four pillars in 10 questions
              and tells you exactly which gap is costing you the most — then recommends the right
              service to fix it.
            </p>
          </div>
          <Button asChild variant="primary" size="lg" className="shrink-0">
            <Link href="/aros-growth-score">
              Take the Free Growth Score <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal">
            Common questions about our services.
          </h2>
        </div>
        <div className="space-y-5">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-charcoal mb-1.5">{faq.question}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <MarketingFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </div>
  );
}
