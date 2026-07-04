import type { Metadata } from "next";
import { ShieldAlert, Clock, Users2, Receipt, AlertTriangle } from "lucide-react";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";

export const metadata: Metadata = {
  title: "5 Hidden Revenue Leaks in Home Service Businesses | Free Guide",
  description:
    "A free guide for HVAC, plumbing, electrical, roofing, landscaping, and pest control operators on the 5 revenue leaks quietly draining their business, and how to plug them.",
  keywords: [
    "revenue leaks home service business",
    "free guide for contractors",
    "HVAC plumbing electrical business growth guide",
  ],
  alternates: { canonical: "/revenue-leaks-guide" },
  openGraph: {
    title: "5 Hidden Revenue Leaks in Home Service Businesses | Free Guide",
    description:
      "A free guide on the 5 revenue leaks quietly draining local service businesses, and how to plug them.",
    url: "/revenue-leaks-guide",
    type: "website",
  },
};

const leaks = [
  {
    icon: Clock,
    title: "The Cold Estimate",
    summary: "Quotes that go quiet because no one follows up before the customer books a competitor.",
  },
  {
    icon: AlertTriangle,
    title: "The Schedule Slip",
    summary: "Jobs that drift behind plan while waiting on materials, customers, or crews, unnoticed until it's late.",
  },
  {
    icon: Users2,
    title: "The Capacity Blind Spot",
    summary: "Jobs sitting unassigned, or crews stacked so tight that quality and morale start to slip.",
  },
  {
    icon: Receipt,
    title: "The Finished-But-Unbilled Job",
    summary: "Completed work that sits for days before anyone generates the invoice.",
  },
  {
    icon: ShieldAlert,
    title: "The Quiet Collections Gap",
    summary: "Overdue invoices and unresolved escalations with no owner, until they turn into churn.",
  },
];

export default function RevenueLeaksLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
              Free Guide for Home Service Operators
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              5 Hidden Revenue Leaks in Home Service Businesses
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
              And how to plug them before they cost you another job, another invoice, or another
              customer. Built for HVAC, plumbing, electrical, roofing, landscaping, and pest
              control teams who are tired of finding out about problems after the money&apos;s gone.
            </p>
            <p className="text-white/40 text-xs">
              Brought to you by{" "}
              <span className="font-bold text-white">
                Anovas<span className="text-orange-light">OS</span>
              </span>{" "}
              , Anovas Integrated Systems
            </p>
          </div>
          <div className="md:max-w-sm md:ml-auto w-full">
            <LeadCaptureForm leadMagnet="revenue-leaks-guide" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-xl font-bold text-charcoal mb-2">What&apos;s inside</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-2xl">
          Five real-world revenue leaks we see across home service businesses every day, what
          each one looks like on the ground, and the specific fix to plug it.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaks.map((leak, i) => {
            const Icon = leak.icon;
            return (
              <div key={leak.title} className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-orange/10 text-orange shrink-0">
                    <Icon size={15} />
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                    Leak {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-sm font-semibold text-charcoal mb-1.5">{leak.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{leak.summary}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-navy-light text-white">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <p className="text-base md:text-lg font-semibold mb-2">
            See what is happening, fix what is stuck, and protect revenue before small issues
            become bigger problems.
          </p>
          <p className="text-white/50 text-xs">
            AnovasOS is the operating system for home service businesses, built by Anovas
            Integrated Systems.
          </p>
          <p className="text-white/30 text-[11px] mt-4">
            <a href="/privacy" className="underline hover:text-white/60">
              Privacy Policy
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
