"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { track } from "@/lib/analytics/client";
import { LeadSubmitError, newSubmissionId, submitLead } from "@/lib/leads/client";
import {
  BandKey,
  PILLAR_META,
  Pillar,
  PillarScores,
  QUESTIONS,
  QUESTION_COUNT,
  ROUTE_CONTENT,
  Route,
  calcOverall,
  calcPillarScores,
  getBand,
  getRoute,
} from "@/lib/diagnostic/aros";
import { ROUTES } from "@/lib/site/config";

const BUSINESS_TYPES = [
  "HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping",
  "Pest Control", "Auto Repair", "General Contractor", "Other",
];

const BAND_STYLES: Record<BandKey, { dot: string; text: string }> = {
  foundation: { dot: "bg-red-500", text: "text-red-300" },
  building: { dot: "bg-orange-light", text: "text-orange-light" },
  growth: { dot: "bg-yellow-400", text: "text-yellow-300" },
  scale: { dot: "bg-emerald-500", text: "text-emerald-300" },
};

const darkInput = "bg-white/5 border-white/15 text-white placeholder:text-white/35 focus:border-orange-light";

// ─── Sub-components ────────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center" role="img" aria-label={`Score ${score} out of 100`}>
      <svg width="130" height="130" viewBox="0 0 130 130" aria-hidden="true">
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e07b3f" />
            <stop offset="100%" stopColor="#5fc3f5" />
          </linearGradient>
        </defs>
        <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <circle
          cx="65" cy="65" r={r}
          fill="none"
          stroke="url(#sg)"
          strokeWidth="9"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 65 65)"
        />
      </svg>
      <div className="absolute text-center" aria-hidden="true">
        <p className="text-4xl font-black text-white leading-none">{score}</p>
        <p className="text-[10px] text-white/50 mt-0.5">out of 100</p>
      </div>
    </div>
  );
}

function PillarBar({ pillar, score }: { pillar: Pillar; score: number }) {
  const pct = Math.round((score / 4) * 100);
  const barColor = score < 2 ? "bg-red-500" : score < 2.75 ? "bg-orange-light" : score < 3.5 ? "bg-yellow-400" : "bg-emerald-500";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">{PILLAR_META[pillar].label}</span>
        <span className="text-xs text-white/55">{score.toFixed(1)} / 4</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10">
        <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-white/50">{PILLAR_META[pillar].desc}</p>
    </div>
  );
}

// ─── Quiz step ──────────────────────────────────────────────────────────────

const OPTION_LABELS = ["A", "B", "C", "D"];

function QuizStep({ qIndex, pending, selected, onSelect, onBack }: {
  qIndex: number;
  pending: number | null;
  selected: number;
  onSelect: (idx: number) => void;
  onBack: () => void;
}) {
  const q = QUESTIONS[qIndex];
  const pct = (qIndex / QUESTION_COUNT) * 100;
  return (
    <div className="max-w-xl mx-auto w-full space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-white/55">
          <span>Question {qIndex + 1} of {QUESTION_COUNT}</span>
          <span>{PILLAR_META[q.pillar as Pillar].label}</span>
        </div>
        <div className="h-1 rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={QUESTION_COUNT} aria-valuenow={qIndex} aria-label="Diagnostic progress">
          <div className="h-1 rounded-full bg-gradient-to-r from-orange-light to-signal transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <fieldset>
        <legend className="text-lg md:text-xl font-bold text-white leading-snug mb-5">{q.text}</legend>
        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            const isPending = pending === idx;
            const wasSelected = pending === null && selected === idx + 1;
            const isDimmed = pending !== null && pending !== idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelect(idx)}
                disabled={pending !== null}
                aria-pressed={isPending || wasSelected}
                className={`w-full flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all ${
                  isPending || wasSelected
                    ? "border-orange-light bg-orange/20 text-white"
                    : isDimmed
                    ? "border-white/5 bg-white/[0.03] text-white/35"
                    : "border-white/10 bg-white/5 text-white/85 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold mt-0.5 transition-colors ${
                  isPending || wasSelected ? "bg-orange text-white" : "bg-white/10 text-white/60"
                }`}>
                  {OPTION_LABELS[idx]}
                </span>
                <span className="leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {qIndex > 0 && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Back
        </button>
      )}
    </div>
  );
}

// ─── Contact step (after the questions) ────────────────────────────────────

interface Contact {
  firstName: string; lastName: string;
  businessName: string; businessType: string;
  phone: string; email: string; website: string;
}

function ContactStep({ contact, setContact, onSubmit, onSkip, onBack, submitting, error, fieldErrors }: {
  contact: Contact;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
  onSubmit: (e: React.FormEvent) => void;
  onSkip: () => void;
  onBack: () => void;
  submitting: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
}) {
  const set = (key: keyof Contact) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setContact((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="max-w-lg mx-auto w-full">
      <form
        onSubmit={onSubmit}
        data-hs-do-not-collect="true"
        className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 space-y-4"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-light">Your score is ready</p>
          <h2 className="mt-2 text-xl font-bold text-white">Where should we send a walkthrough of your results?</h2>
          <p className="mt-1.5 text-sm text-white/60">
            We&apos;ll save your score and a member of our team will follow up to walk through it, typically within one business day.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="gs-first" className="text-white/75">First name</Label>
            <Input id="gs-first" autoComplete="given-name" value={contact.firstName} onChange={set("firstName")} required className={darkInput} />
          </div>
          <div>
            <Label htmlFor="gs-last" className="text-white/75">Last name</Label>
            <Input id="gs-last" autoComplete="family-name" value={contact.lastName} onChange={set("lastName")} className={darkInput} />
          </div>
          <div>
            <Label htmlFor="gs-biz" className="text-white/75">Business name</Label>
            <Input id="gs-biz" autoComplete="organization" value={contact.businessName} onChange={set("businessName")} required className={darkInput} />
          </div>
          <div>
            <Label htmlFor="gs-type" className="text-white/75">Business type</Label>
            <Select id="gs-type" value={contact.businessType} onChange={set("businessType")} className={darkInput}>
              {BUSINESS_TYPES.map((t) => <option key={t} value={t} className="bg-navy text-white">{t}</option>)}
            </Select>
          </div>
          <div>
            <Label htmlFor="gs-email" className="text-white/75">Work email</Label>
            <Input
              id="gs-email" type="email" autoComplete="email" value={contact.email} onChange={set("email")} required
              aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "gs-email-err" : undefined} className={darkInput}
            />
            {fieldErrors.email && <p id="gs-email-err" className="mt-1 text-xs text-red-300">{fieldErrors.email}</p>}
          </div>
          <div>
            <Label htmlFor="gs-phone" className="text-white/75">Phone <span className="text-white/40">(optional)</span></Label>
            <Input
              id="gs-phone" type="tel" autoComplete="tel" value={contact.phone} onChange={set("phone")}
              aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? "gs-phone-err" : undefined} className={darkInput}
            />
            {fieldErrors.phone && <p id="gs-phone-err" className="mt-1 text-xs text-red-300">{fieldErrors.phone}</p>}
          </div>
        </div>
        {/* Honeypot: hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="gs-website">Website</label>
          <input id="gs-website" tabIndex={-1} autoComplete="off" value={contact.website} onChange={set("website")} />
        </div>

        {error && <p role="alert" className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
          {submitting ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : null}
          {submitting ? "Saving…" : "See my results"}
          {!submitting && <ArrowRight size={16} aria-hidden="true" />}
        </Button>
        <div className="flex items-center justify-between gap-3 text-sm">
          <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-white/50 hover:text-white/80">
            <ArrowLeft size={14} aria-hidden="true" /> Back
          </button>
          <button type="button" onClick={onSkip} className="text-white/55 underline underline-offset-2 hover:text-white/85">
            Skip and just show my score
          </button>
        </div>
        <p className="text-xs text-white/40">
          We use your details only to follow up about your diagnostic. See our{" "}
          <Link href="/privacy" className="underline hover:text-white/70">Privacy Policy</Link>.
        </p>
      </form>
    </div>
  );
}

// ─── Results step ────────────────────────────────────────────────────────────

function ResultsStep({ overall, scores, route, firstName, saved }: {
  overall: number;
  scores: PillarScores;
  route: Route;
  firstName: string;
  saved: boolean;
}) {
  const band = getBand(overall);
  const style = BAND_STYLES[band.key];
  const rec = ROUTE_CONTENT[route];

  return (
    <div className="max-w-2xl mx-auto w-full space-y-8">
      <div className="text-center space-y-3">
        <ScoreRing score={overall} />
        <div>
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 ${style.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
            {band.label}
          </span>
        </div>
        <p className="text-sm text-white/65 max-w-sm mx-auto">{band.desc}</p>
        <h2 className="text-lg font-semibold text-white">
          Here&apos;s where your business stands{firstName ? `, ${firstName}` : ""}.
        </h2>
        {saved && <p className="text-sm text-signal">Saved. Our team will follow up to walk through it.</p>}
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Score breakdown</p>
        {(["A", "R", "O", "S"] as Pillar[]).map((p) => (
          <PillarBar key={p} pillar={p} score={scores[p]} />
        ))}
      </div>

      <div className="rounded-2xl border-2 border-orange-light/70 bg-orange/10 p-6 space-y-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-light mb-1">Where we&apos;d start</p>
          <p className="text-xs font-semibold text-white/55 mb-0.5">{rec.label}</p>
          <p className="text-lg font-bold text-white">{rec.headline}</p>
        </div>
        <p className="text-sm text-white/75 leading-relaxed">{rec.body}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="primary" size="lg" className="flex-1">
            <Link
              href={`${ROUTES.book}?from=diagnostic&path=${route}`}
              onClick={() => track("primary_cta_click", { cta_location: "diagnostic_results", cta_id: "book", recommendation: route })}
            >
              {rec.primaryCta} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1 border-white/20 bg-transparent text-white hover:bg-white/10">
            <Link href={rec.learnHref}>Learn about {rec.label}</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/45 mb-1">Want the full picture?</p>
          <p className="text-sm font-bold text-white mb-1">The full diagnostic report goes deeper than the score.</p>
          <p className="text-sm text-white/60 leading-relaxed">
            A prioritized roadmap with specific actions, built with you on a strategy call.
          </p>
        </div>
        <Link href={ROUTES.sampleReport} className="shrink-0 text-sm font-semibold text-orange-light hover:text-white transition-colors whitespace-nowrap">
          See a sample report →
        </Link>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function GrowthScoreQuiz() {
  const [phase, setPhase] = useState<"quiz" | "contact" | "results">("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(QUESTION_COUNT).fill(0));
  const [pending, setPending] = useState<number | null>(null);
  const [contact, setContact] = useState<Contact>({
    firstName: "", lastName: "", businessName: "",
    businessType: BUSINESS_TYPES[0], phone: "", email: "", website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const submissionId = useRef(newSubmissionId());
  const topRef = useRef<HTMLDivElement>(null);

  const scores = calcPillarScores(answers);
  const overall = calcOverall(answers);
  const route = getRoute(scores);

  /** Brings the new step into view and moves focus to it for keyboard and screen-reader users. */
  function scrollTop() {
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: "start" });
      topRef.current?.focus({ preventScroll: true });
    });
  }

  function selectAnswer(idx: number) {
    if (pending !== null) return;
    if (currentQ === 0) track("diagnostic_start", { diagnostic: "aros" }, submissionId.current);
    setPending(idx);
    setTimeout(() => {
      const next = [...answers];
      next[currentQ] = idx + 1;
      setAnswers(next);
      setPending(null);
      if (currentQ < QUESTION_COUNT - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        const finalScores = calcPillarScores(next);
        const finalOverall = calcOverall(next);
        track(
          "diagnostic_complete",
          { diagnostic: "aros", score: finalOverall, score_band: getBand(finalOverall).key, recommendation: getRoute(finalScores) },
          submissionId.current
        );
        setPhase("contact");
        scrollTop();
      }
    }, 300);
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setFieldErrors({});
    try {
      await submitLead(
        "diagnostic",
        {
          name: `${contact.firstName} ${contact.lastName}`.trim(),
          email: contact.email,
          company: contact.businessName,
          phone: contact.phone || undefined,
          industry: contact.businessType,
          website: contact.website,
          diagnostic: { score: overall, band: getBand(overall).label, pillars: scores, recommendation: route },
        },
        submissionId.current
      );
      setSaved(true);
      setPhase("results");
      scrollTop();
    } catch (err) {
      if (err instanceof LeadSubmitError) {
        setError(err.message);
        setFieldErrors(err.fieldErrors);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div ref={topRef} tabIndex={-1} className="scroll-mt-24 outline-none">
      {phase === "quiz" && (
        <QuizStep
          qIndex={currentQ}
          pending={pending}
          selected={answers[currentQ]}
          onSelect={selectAnswer}
          onBack={() => setCurrentQ((q) => Math.max(0, q - 1))}
        />
      )}
      {phase === "contact" && (
        <ContactStep
          contact={contact}
          setContact={setContact}
          onSubmit={handleContactSubmit}
          onSkip={() => { setPhase("results"); scrollTop(); }}
          onBack={() => { setCurrentQ(QUESTION_COUNT - 1); setPhase("quiz"); }}
          submitting={submitting}
          error={error}
          fieldErrors={fieldErrors}
        />
      )}
      {phase === "results" && (
        <ResultsStep overall={overall} scores={scores} route={route} firstName={contact.firstName} saved={saved} />
      )}
    </div>
  );
}
