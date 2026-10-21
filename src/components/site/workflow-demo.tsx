"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Inbox, UserRound, MessageSquareText, CalendarCheck2, BarChart3, Check, Clock } from "lucide-react";
import { IllustrativeBadge } from "./section";
import { cn } from "@/lib/utils";

// Illustrative walkthrough of one lead moving through a connected system.
// All names, times, and numbers are sample data, and the component says so.

const STEPS = [
  { key: "inquiry", label: "Inquiry captured", system: "Website form", icon: Inbox },
  { key: "crm", label: "Lead enters the CRM", system: "Your CRM", icon: UserRound },
  { key: "followup", label: "Follow-up runs", system: "Anovas Autopilot", icon: MessageSquareText },
  { key: "booked", label: "Appointment booked", system: "Anovas Autopilot", icon: CalendarCheck2 },
  { key: "report", label: "Shows up in reporting", system: "AnovasOS", icon: BarChart3 },
] as const;

const AUTO_ADVANCE_MS = 3600;
const REDUCE_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCE_MOTION);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Server render assumes reduced motion, so nothing animates before hydration. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCE_MOTION).matches, () => true);
}

function Field({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
      <p className="text-[10px] uppercase tracking-wide text-white/45">{label}</p>
      <p className={cn("text-sm", accent ? "text-signal" : "text-white")}>{value}</p>
    </div>
  );
}

function Panel({ step }: { step: (typeof STEPS)[number]["key"] }) {
  switch (step) {
    case "inquiry":
      return (
        <div className="space-y-3">
          <p className="text-xs text-white/50">6:42 PM · after hours · ridgelinehvac.example</p>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Name" value="Dana R." />
            <Field label="Service" value="AC not cooling" />
            <Field label="ZIP" value="72204" />
            <Field label="Source" value="Google profile" accent />
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/80">
            &ldquo;Upstairs unit is blowing warm air. Can someone come out this week?&rdquo;
          </div>
        </div>
      );
    case "crm":
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal/15 text-sm font-semibold text-signal">DR</span>
            <div>
              <p className="text-sm font-semibold text-white">Dana R.</p>
              <p className="text-xs text-white/50">Contact created · matched by email, no duplicate</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Lifecycle stage" value="Lead" />
            <Field label="Lead status" value="New" />
            <Field label="Owner" value="Service desk" />
            <Field label="First touch" value="google / organic" accent />
          </div>
        </div>
      );
    case "followup":
      return (
        <div className="space-y-3">
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-orange px-3.5 py-2.5 text-sm text-white">
            Hi Dana, thanks for reaching out to Ridgeline. We can get a tech to you Thursday morning. Reply 1 for 9am or 2 for 11am.
          </div>
          <p className="text-right text-[11px] text-white/45">Sent automatically · 38 seconds after the inquiry</p>
          <div className="max-w-[60%] rounded-2xl rounded-bl-sm bg-white/10 px-3.5 py-2.5 text-sm text-white">1</div>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70">
            <Check size={14} className="text-signal" aria-hidden="true" /> Follow-up task created for the service desk
          </div>
        </div>
      );
    case "booked":
      return (
        <div className="space-y-3">
          <div className="rounded-xl border border-signal/30 bg-signal/10 p-4">
            <p className="text-[10px] uppercase tracking-wide text-signal">Appointment confirmed</p>
            <p className="mt-1 text-lg font-semibold text-white">Thu · 9:00 AM</p>
            <p className="text-sm text-white/70">AC diagnostic · Dana R. · 72204</p>
          </div>
          <div className="space-y-2 text-xs text-white/70">
            <p className="flex items-center gap-2"><Clock size={14} className="text-white/45" aria-hidden="true" /> Reminder scheduled: Wed 5:00 PM</p>
            <p className="flex items-center gap-2"><Check size={14} className="text-signal" aria-hidden="true" /> CRM updated: next step recorded</p>
          </div>
        </div>
      );
    case "report":
      return (
        <div className="space-y-3">
          <p className="text-xs text-white/50">This week · sample business</p>
          <div className="grid grid-cols-3 gap-2">
            <Field label="Inquiries" value="14" />
            <Field label="Answered < 5 min" value="12" accent />
            <Field label="Booked" value="7" />
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3" aria-hidden="true">
            <div className="flex h-16 items-end gap-1.5">
              {[3, 5, 2, 6, 4, 7, 5].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-signal-deep/60 to-signal" style={{ height: `${h * 13}%` }} />
              ))}
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-white/40">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
            </div>
          </div>
        </div>
      );
  }
}

export function WorkflowDemo({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userControlled, setUserControlled] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (paused || userControlled || reduceMotion) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [active, paused, userControlled, reduceMotion]);

  function select(i: number, focus = false) {
    setUserControlled(true);
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const keys: Record<string, number> = {
      ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: STEPS.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select((keys[e.key] + STEPS.length) % STEPS.length, true);
  }

  const step = STEPS[active];

  return (
    <div
      className={cn("rounded-2xl border border-white/10 bg-navy/80 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <IllustrativeBadge>Illustrative walkthrough · sample data</IllustrativeBadge>
      </div>

      <div className="grid gap-0 sm:grid-cols-[minmax(0,13rem)_1fr]">
        <div role="tablist" aria-label="Workflow steps" aria-orientation="vertical" onKeyDown={onKeyDown} className="relative flex gap-1 overflow-x-auto border-b border-white/10 p-3 sm:flex-col sm:overflow-visible sm:border-b-0 sm:border-r">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const selected = i === active;
            const done = i < active;
            return (
              <button
                key={s.key}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                id={`wf-tab-${s.key}`}
                aria-selected={selected}
                aria-controls="wf-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
                  selected ? "bg-white/10" : "hover:bg-white/5"
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                    selected ? "bg-orange text-white" : done ? "bg-signal/15 text-signal" : "bg-white/5 text-white/50"
                  )}
                >
                  <Icon size={15} aria-hidden="true" />
                </span>
                <span className="hidden sm:block">
                  <span className={cn("block text-[13px] font-medium", selected ? "text-white" : "text-white/70")}>{s.label}</span>
                  <span className="block text-[11px] text-white/40">{s.system}</span>
                </span>
                <span className="sr-only sm:hidden">{s.label}</span>
              </button>
            );
          })}
        </div>

        <div id="wf-panel" role="tabpanel" aria-labelledby={`wf-tab-${step.key}`} className="min-h-[17rem] p-5">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <p className="text-sm font-semibold text-white">
              <span className="text-white/40">{String(active + 1).padStart(2, "0")} · </span>
              {step.label}
            </p>
            <p className="text-[11px] uppercase tracking-wide text-white/40">{step.system}</p>
          </div>
          <div key={step.key} className="rise-in">
            <Panel step={step.key} />
          </div>
        </div>
      </div>
    </div>
  );
}
