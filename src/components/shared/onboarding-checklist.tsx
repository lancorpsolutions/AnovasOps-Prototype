"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { CheckCircle2, Circle, X, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

export function OnboardingChecklist() {
  const { users, crews, customers, connectedIntegrations, jobs, automationRules, onboardingDismissed, dismissOnboarding } =
    useStore();

  const steps = [
    { label: "Invite your team", done: users.length > 1, href: "/settings" },
    { label: "Add a crew", done: crews.length > 0, href: "/crews" },
    { label: "Add your customers", done: customers.length > 0, href: "/customers" },
    { label: "Connect a tool", done: connectedIntegrations.length > 0, href: "/integrations" },
    { label: "Create your first job", done: jobs.length > 0, href: "/jobs" },
    { label: "Turn on an automation rule", done: automationRules.some((r) => r.isActive), href: "/automation" },
  ];

  const completedCount = steps.filter((s) => s.done).length;
  const allDone = completedCount === steps.length;

  if (onboardingDismissed || allDone) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 border-t-2 border-t-navy">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-navy flex items-center justify-center">
            <ListChecks size={15} className="text-white" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-charcoal">Get Set Up</h3>
            <p className="text-xs text-gray-500">{completedCount} of {steps.length} steps complete</p>
          </div>
        </div>
        <button onClick={dismissOnboarding} className="text-gray-400 hover:text-gray-600 cursor-pointer">
          <X size={16} />
        </button>
      </div>

      <div className="h-1.5 w-full rounded-full bg-gray-100 mb-4 overflow-hidden">
        <div
          className="h-full bg-orange transition-all"
          style={{ width: `${(completedCount / steps.length) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {steps.map((step) => {
          const StepIcon = step.done ? CheckCircle2 : Circle;
          return (
            <Link
              key={step.label}
              href={step.href}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                step.done
                  ? "border-emerald-200 bg-emerald-50/40 text-gray-500"
                  : "border-gray-200 hover:border-orange/40 hover:bg-orange/5 text-charcoal font-medium"
              )}
            >
              <StepIcon size={15} className={step.done ? "text-emerald-600" : "text-gray-400"} />
              <span className={step.done ? "line-through" : ""}>{step.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
