import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  Workflow,
  ShieldCheck,
  Clock,
  Users2,
  Receipt,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "AnovasOS | The Operating System for Home Service Businesses",
  description:
    "AnovasOS gives HVAC, plumbing, electrical, roofing, landscaping, and pest control operators one place to see what's happening, fix what's stuck, and protect revenue.",
};

const painPoints = [
  {
    icon: Clock,
    title: "Quotes go cold",
    summary: "No one follows up before the customer books a competitor.",
  },
  {
    icon: AlertTriangle,
    title: "Jobs slip behind",
    summary: "Materials, customers, or crews stall a job and nobody notices until it's late.",
  },
  {
    icon: Users2,
    title: "Crews are a blind spot",
    summary: "Jobs sit unassigned, or crews get stacked too tight, and quality slips.",
  },
  {
    icon: Receipt,
    title: "Finished work sits unbilled",
    summary: "Completed jobs wait days before anyone sends the invoice.",
  },
];

const features = [
  {
    icon: LayoutDashboard,
    title: "One command center",
    summary:
      "See every quote, job, crew, and invoice in one live dashboard instead of piecing it together from texts and spreadsheets.",
  },
  {
    icon: Workflow,
    title: "Automation that runs the boring parts",
    summary:
      "Automation rules and SOPs handle the follow-ups, reminders, and handoffs so nothing falls through the cracks.",
  },
  {
    icon: ShieldCheck,
    title: "Risk caught before it costs you",
    summary:
      "Operational risk tracking flags cold quotes, slipping jobs, and overloaded crews while there's still time to fix them.",
  },
];

const steps = [
  {
    step: "01",
    title: "Connect your operation",
    summary: "Bring in your jobs, crews, customers, and invoices — AnovasOS gives them a home.",
  },
  {
    step: "02",
    title: "See what's actually stuck",
    summary: "The command center surfaces cold quotes, slipping jobs, and capacity issues in real time.",
  },
  {
    step: "03",
    title: "Fix it before it becomes a loss",
    summary: "Automation rules and SOPs close the gap, so revenue stops leaking quietly.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="bg-navy text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            Built for Home Service Businesses
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
            Run your business like nothing slips through the cracks.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            AnovasOS is the operating system for HVAC, plumbing, electrical, roofing, landscaping,
            and pest control teams — one place to see what&apos;s happening, fix what&apos;s stuck,
            and protect revenue before small issues become bigger problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/anovasos/signup">
                Get Started <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/10">
              <Link href="/revenue-leaks-guide">Get the Free Revenue Leaks Guide</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold text-charcoal mb-2 text-center">
          Sound familiar?
        </h2>
        <p className="text-sm text-gray-500 mb-10 max-w-xl mx-auto text-center">
          These are the quiet revenue leaks we see across home service businesses every day.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {painPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-orange/10 text-orange mb-3">
                  <Icon size={18} />
                </span>
                <p className="text-sm font-semibold text-charcoal mb-1.5">{point.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{point.summary}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold text-charcoal mb-2 text-center">What AnovasOS gives you</h2>
          <p className="text-sm text-gray-500 mb-10 max-w-xl mx-auto text-center">
            Visibility, automation, and accountability — built specifically for trades businesses.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-xl border border-gray-200 bg-background p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-navy text-white mb-4">
                    <Icon size={18} />
                  </span>
                  <p className="text-sm font-semibold text-charcoal mb-2">{feature.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{feature.summary}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold text-charcoal mb-10 text-center">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step}>
              <p className="text-orange font-bold text-2xl mb-2">{s.step}</p>
              <p className="text-sm font-semibold text-charcoal mb-1.5">{s.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{s.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-light text-white">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <p className="text-base md:text-lg font-semibold mb-2">
            See what is happening, fix what is stuck, and protect revenue before small issues
            become bigger problems.
          </p>
          <p className="text-white/50 text-xs mb-6">
            AnovasOS is the operating system for home service businesses, built by Anovas
            Integrated Systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/anovasos/signup">
                Get Started <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/10">
              <Link href="/pricing">See Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
