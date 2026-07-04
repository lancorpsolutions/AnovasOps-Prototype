import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on growing local and home service businesses: automation, lead follow-up, branding, and the strategy behind AnovasOS and Anovas Autopilot.",
  keywords: [
    "home service business blog",
    "local service business growth tips",
    "contractor marketing automation",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog",
    description:
      "Insights on growing local and home service businesses: automation, lead follow-up, branding, and growth strategy.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            Blog
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Insights for growing local and home service businesses.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Practical guidance on automation, lead follow-up, branding, and the growth strategy
            behind AnovasOS and Anovas Autopilot.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/10 text-orange mx-auto mb-6">
          <Newspaper size={26} />
        </span>
        <h2 className="text-xl font-bold text-charcoal mb-3">New posts are on the way.</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-lg mx-auto mb-8">
          We&apos;re building out our library of guides and articles. In the meantime, grab the
          free Revenue Leaks Guide or talk to our team about what&apos;s slowing your business down.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="primary" size="lg">
            <Link href="/revenue-leaks-guide">
              Get the Free Revenue Leaks Guide <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Talk to Us</Link>
          </Button>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
