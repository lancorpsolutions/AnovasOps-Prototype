"use client";

import { Header } from "@/components/layout/header";
import { useStore } from "@/lib/store";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Startup",
    price: "$1,000/month",
    features: [
      "Up to 3 workflows/templates",
      "Basic command center",
      "Basic operational risk tracking",
      "Basic SOP library",
      "Monthly optimization review",
    ],
  },
  {
    name: "Small Business",
    price: "$2,500/month",
    features: [
      "Up to 10 workflows/templates",
      "Advanced dashboard",
      "Automation rules",
      "Operational risk reporting",
      "SOP library",
      "Crew accountability tracking",
      "Bi-weekly optimization review",
    ],
  },
  {
    name: "Enterprise",
    price: "$5,000/month",
    features: [
      "Unlimited workflows/templates",
      "Advanced reporting",
      "Custom automations",
      "Executive dashboards",
      "Full SOP system",
      "Priority support",
      "Weekly optimization review",
    ],
  },
];

const serviceTypes = ["HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping", "Pest Control", "General Contracting"];

export default function SettingsPage() {
  const { company, users } = useStore();

  return (
    <div>
      <Header title="Settings" subtitle="Manage company details, team, service types, and subscription plan." />
      <div className="p-6 space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Company Name" value={company.name} />
          <Field label="Industry" value={company.industry} />
          <Field label="Team Size" value={String(company.size)} />
          <Field label="Subscription Tier" value={company.subscriptionTier} />
          <Field label="Tools Used" value={company.toolsUsed.join(", ")} />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-charcoal mb-3">Service Types</h3>
          <div className="flex flex-wrap gap-2">
            {serviceTypes.map((s) => (
              <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-charcoal mb-3">Users</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                <div>
                  <p className="text-sm font-medium text-charcoal">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-navy/5 text-navy font-medium">{u.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-charcoal mb-3">Subscription Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const active = plan.name === company.subscriptionTier;
              return (
                <div
                  key={plan.name}
                  className={cn(
                    "rounded-xl border bg-white p-5 shadow-sm",
                    active ? "border-orange ring-2 ring-orange/20" : "border-gray-200"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-base font-bold text-charcoal">{plan.name}</h4>
                    {active && <span className="text-xs bg-orange text-white px-2 py-0.5 rounded-full">Current</span>}
                  </div>
                  <p className="text-sm font-medium text-orange mb-3">{plan.price}</p>
                  <ul className="space-y-1.5">
                    {plan.features.map((f) => (
                      <li key={f} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <Check size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-charcoal">{value}</p>
    </div>
  );
}
