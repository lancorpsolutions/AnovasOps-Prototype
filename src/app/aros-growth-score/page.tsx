import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { GrowthScoreQuiz } from "@/components/marketing/growth-score-quiz";

export const metadata: Metadata = {
  title: "Business Systems Diagnostic (AROS Growth Score) for Service Businesses",
  description:
    "Free 3-minute Business Systems Diagnostic. Answer 10 questions and get a score across Acquisition, Revenue, Operations, and Systems, plus a clear recommendation for what to fix first.",
  keywords: [
    "business systems diagnostic",
    "free business diagnostic for contractors",
    "AROS Growth Score",
    "local service business assessment",
    "how to grow my contracting business",
    "business growth score",
  ],
  alternates: { canonical: "/aros-growth-score" },
  openGraph: {
    title: "Business Systems Diagnostic: Free AROS Growth Score",
    description:
      "10 questions. Instant score. A clear picture of where your business is leaving revenue on the table, and what to fix first.",
    url: "/aros-growth-score",
    type: "website",
  },
};

export default function ArosGrowthScorePage() {
  return (
    <div className="min-h-screen bg-ink">
      <MarketingNav />
      <main id="main">

      {/* Hero */}
      <section className="surface-ink relative overflow-hidden">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="relative max-w-2xl mx-auto px-6 pt-20 pb-12 text-center">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-orange-light mb-5">
            <span className="h-px w-6 bg-orange-light/50" />
            Business Systems Diagnostic · Free
            <span className="h-px w-6 bg-orange-light/50" />
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight mb-4">
            Find the system that&apos;s costing you the most.
          </h1>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Ten questions, scored with our AROS Growth Score across Acquisition, Revenue,
            Operations, and Systems. About 3 minutes. Your score appears on screen, and leaving
            your details is optional.
          </p>

          {/* Pillar chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              { letter: "A", label: "Acquisition" },
              { letter: "R", label: "Revenue" },
              { letter: "O", label: "Operations" },
              { letter: "S", label: "Systems" },
            ].map(({ letter, label }) => (
              <span key={letter} className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/70">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange/20 text-[9px] font-black text-orange">
                  {letter}
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="max-w-3xl mx-auto px-6 pb-24 pt-4">
        <GrowthScoreQuiz />
      </section>

      </main>

      <MarketingFooter />
    </div>
  );
}
