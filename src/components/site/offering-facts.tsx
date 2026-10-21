import { Check } from "lucide-react";
import type { OfferingFacts } from "@/lib/site/offerings";

/** "At a glance" panel: who it's for, what type of offering it is, and what each side provides. */
export function OfferingFactsPanel({ offering }: { offering: OfferingFacts }) {
  const rows: [string, React.ReactNode][] = [
    ["Who it's for", offering.whoFor],
    ["The problem", offering.problem],
    ["What it is", offering.type],
    ["Implementation", offering.implementation],
    ["Ongoing support", offering.support],
    ["Pricing", offering.pricing],
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <dl className="rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-ink">{label}</dt>
            <dd className="text-sm leading-relaxed text-charcoal">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="grid gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-ink mb-3">What&apos;s included</p>
          <ul className="space-y-2">
            {offering.included.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-charcoal">
                <Check size={16} className="mt-0.5 shrink-0 text-orange" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-dashed border-gray-300 bg-background p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-ink mb-3">What we&apos;ll need from you</p>
          <ul className="space-y-2">
            {offering.youProvide.map((item) => (
              <li key={item} className="text-sm text-charcoal">• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
