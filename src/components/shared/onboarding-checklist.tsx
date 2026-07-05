"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { CheckCircle2, Circle, X, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

export function OnboardingChecklist() {
  const { users, crews, customers, connectedIntegrations, jobs, automationRules, onboardingDismissed, dismissOnboarding } =
    useStore();

  const steps = [
    { label: "Invite your team", done: users.length > 1, href: "/anovasos/settings" },
    { label: "Add a crew", done: crews.length > 0, href: "/anovasos/crews" },
    { label: "Add your customers", done: customers.length > 0, href: "/anovasos/customers" },
    { label: "Connect a tool", done: connectedIntegrations.length > 0, href: "/anovasos/integrations" },
    { label: "Create your first job", done: jobs.length > 0, href: "/anovasos/jobs" },
    { label: "Turn on an automation rule", done: automationRules.some((r) => r.isActive), href: "/anovasos/automation" },
  ];

  const completedCount = steps.filter((s) => s.done).length;
  const allDone = completedCount === steps.length;

  if (onboardingDismissed || allDone) return null;

  return (
    <div className="rounded-xl p-5 bg-gradient-to-br from-orange to-orange-light shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-white/20 flex items-center justify-center">
            <ListChecks size={15} className="text-white" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-white">Get Set Up</h3>
            <p className="text-xs text-white/70">{completedCount} of {steps.length} steps complete</p>
          </div>
        </div>
        <button onClick={dismissOnboarding} className="text-white/60 hover:text-white cursor-pointer">
          <X size={16} />
        </button>
      </div>

      <div className="h-1.5 w-full rounded-full bg-white/20 mb-4 overflow-hidden">
        <div
          className="h-full bg-white transition-all"
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
                  ? "border-white/20 bg-white/10 text-white/60"
                  : "border-white/30 bg-white/10 hover:bg-white/20 text-white font-medium"
              )}
            >
              <StepIcon size={15} className={step.done ? "text-white/50" : "text-white"} />
              <span className={step.done ? "line-through" : ""}>{step.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
