"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const BUSINESS_TYPES = [
  "HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping",
  "Pest Control", "Auto Repair", "General Contractor", "Other",
];

const QUESTIONS = [
  // A — Acquisition
  {
    pillar: "A",
    text: "How are most of your new customers finding you right now?",
    options: [
      "Mostly word of mouth and referrals; I don't do much active marketing",
      "I have a Google listing but I'm not sure how well it's working",
      "I'm active on social media and get some leads from it",
      "I have multiple lead sources working consistently: GMB, social, ads, and referrals",
    ],
  },
  {
    pillar: "A",
    text: "When someone searches for your type of business in your city, what happens?",
    options: [
      "Honestly I don't know; I've never checked",
      "I show up sometimes but I'm not near the top",
      "I show up in Google Maps results pretty regularly",
      "I consistently rank at the top for my main services in my area",
    ],
  },
  {
    pillar: "A",
    text: "Do you have a website with a way for people to contact or book you directly?",
    options: [
      "No website, or just a Facebook page",
      "I have a website but it's outdated or I'm not sure it's generating leads",
      "Yes, a website with a contact form",
      "Yes, a website with a contact form, booking system, and it generates leads regularly",
    ],
  },
  // R — Revenue
  {
    pillar: "R",
    text: "What happens when a new lead reaches out to you?",
    options: [
      "I get back to them when I can; sometimes it takes a day or two",
      "I try to respond same day but it's not always consistent",
      "I respond within a few hours and follow up if I don't hear back",
      "An automated system responds immediately and follows up on its own",
    ],
  },
  {
    pillar: "R",
    text: "Do you know what percentage of your leads turn into paying customers?",
    options: [
      "No idea; I don't track that",
      "I have a rough guess but nothing documented",
      "I track it loosely and have a general sense of my close rate",
      "Yes, I track my close rate and actively work to improve it",
    ],
  },
  {
    pillar: "R",
    text: "Do customers come back for repeat work or refer others to you?",
    options: [
      "Sometimes, but I don't do anything specific to encourage it",
      "I ask for referrals occasionally but it's not systematic",
      "I have a process for asking for reviews and referrals after jobs",
      "Repeat business and referrals are a consistent, significant part of my revenue",
    ],
  },
  // O — Operations
  {
    pillar: "O",
    text: "Can your business run without you being physically present?",
    options: [
      "No, everything depends on me",
      "It can handle small things but I'm needed for most decisions",
      "My team handles day-to-day work but I handle problems and sales",
      "Yes, I have systems and a team that can operate independently",
    ],
  },
  {
    pillar: "O",
    text: "How do you manage jobs, scheduling, and your team day-to-day?",
    options: [
      "Mostly in my head, text messages, and phone calls",
      "A mix of notes, spreadsheets, and my phone calendar",
      "I use a scheduling tool but it's not fully set up or used consistently",
      "A job management system my whole team uses consistently",
    ],
  },
  // S — Systems
  {
    pillar: "S",
    text: "Do you use a CRM or any tool to track your leads and customers?",
    options: [
      "No, customers are tracked in my head or in my phone",
      "Spreadsheets or notes, nothing purpose-built",
      "I have a CRM but I don't use it consistently",
      "Yes, I actively use a CRM to manage leads, follow-ups, and customer history",
    ],
  },
  {
    pillar: "S",
    text: "How much of your business runs automatically vs. requiring your manual attention?",
    options: [
      "Almost nothing is automated; I do everything manually",
      "A few things run automatically but most requires my attention",
      "I have some automation in place but there's a lot more I could do",
      "My key workflows, leads, follow-ups, scheduling, reporting, run without me",
    ],
  },
] as const;

const PILLAR_META = {
  A: { label: "Acquisition", desc: "How consistently you attract and capture new leads" },
  R: { label: "Revenue", desc: "How effectively you convert leads and retain customers" },
  O: { label: "Operations", desc: "How independently and efficiently your business runs" },
  S: { label: "Systems", desc: "How automated and data-driven your workflows are" },
};

type Pillar = "A" | "R" | "O" | "S";
type Route = "autopilot-r" | "autopilot-o" | "services" | "anovasos";

function calcPillarScores(answers: number[]) {
  return {
    A: (answers[0] + answers[1] + answers[2]) / 3,
    R: (answers[3] + answers[4] + answers[5]) / 3,
    O: (answers[6] + answers[7]) / 2,
    S: (answers[8] + answers[9]) / 2,
  };
}

function calcOverall(answers: number[]) {
  return Math.round((answers.reduce((a, b) => a + b, 0) / 40) * 100);
}

function getBand(score: number) {
  if (score <= 25) return { label: "Foundation Stage", dot: "bg-red-500", text: "text-red-400", bar: "bg-red-500", desc: "Real gaps in the basics; they're costing you leads and money every week whether you see it or not." };
  if (score <= 50) return { label: "Building Stage", dot: "bg-orange", text: "text-orange", bar: "bg-orange", desc: "You've got momentum, but inconsistent systems are bleeding revenue. The right fixes here have outsized ROI." };
  if (score <= 75) return { label: "Growth Stage", dot: "bg-yellow-400", text: "text-yellow-400", bar: "bg-yellow-400", desc: "Strong foundation. Targeted improvements in your weakest pillar will unlock the next level of growth." };
  return { label: "Scale Stage", dot: "bg-emerald-500", text: "text-emerald-400", bar: "bg-emerald-500", desc: "You're running a well-built operation. The next move is scaling what's already working, faster and without adding to your plate." };
}

function getRoute(scores: { A: number; R: number; O: number; S: number }): Route {
  const ranked = (["R", "O", "A", "S"] as Pillar[])
    .map((k) => ({ k, v: scores[k] }))
    .sort((a, b) => a.v - b.v);
  const lowest = ranked[0].k;
  if (lowest === "R") return "autopilot-r";
  if (lowest === "O") return "autopilot-o";
  if (lowest === "A") return "services";
  return "anovasos";
}

const ROUTE_CONTENT: Record<Route, {
  label: string; headline: string; body: string;
  primaryCta: string; primaryHref: string; learnHref: string;
}> = {
  "autopilot-r": {
    label: "Anovas Autopilot",
    headline: "Your biggest gap: leads going cold",
    body: "You're generating interest but losing it before it converts. Slow response times, missed calls, and no follow-up system are the culprit, and every one is a job that went to a competitor. Anovas Autopilot responds to every missed call, follows up on every quote, and nudges every outstanding invoice automatically, so revenue stops leaking while you're heads-down on the job.",
    primaryCta: "Book an Autopilot Demo",
    primaryHref: CALENDLY,
    learnHref: "/services/autopilot",
  },
  "autopilot-o": {
    label: "Anovas Autopilot",
    headline: "Your biggest gap: the business runs on you",
    body: "If you step away, things start to slip: scheduling, follow-ups, customer communication. That's not a people problem, it's a systems problem. Anovas Autopilot handles the revenue protection layer that shouldn't require a human: booking confirmations, appointment reminders, post-job review requests, and invoice nudges. Less of the day-to-day in your head, more of it running on its own.",
    primaryCta: "Book an Autopilot Demo",
    primaryHref: CALENDLY,
    learnHref: "/services/autopilot",
  },
  services: {
    label: "Digital Presence Services",
    headline: "Your biggest gap: not enough of the right leads",
    body: "You do good work but the pipeline is too thin or too unpredictable. The root cause is almost always visibility: a weak web presence, a GMB profile that isn't working, no local search footprint. We fix that with website builds, local SEO, and brand identity that actually earns trust before anyone calls you. Our team has done this specifically for local service businesses, not generic SMBs.",
    primaryCta: "Book a Discovery Call",
    primaryHref: CALENDLY,
    learnHref: "/services",
  },
  anovasos: {
    label: "AnovasOS",
    headline: "Your biggest gap: growth that doesn't compound",
    body: "Your fundamentals are solid: leads come in, jobs get done, customers are happy. But every growth initiative still runs through you, and without a system to track, measure, and execute consistently, you're leaving compounding on the table. AnovasOS brings AI-powered marketing execution, performance dashboards, and reporting under one roof, so you can see what's working, hand off the execution, and actually get out of the day-to-day.",
    primaryCta: "Book an AnovasOS Demo",
    primaryHref: CALENDLY,
    learnHref: "/services/anovasos",
  },
};

// ─── Sub-components ────────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F2581E" />
            <stop offset="100%" stopColor="#1F9FE0" />
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
      <div className="absolute text-center">
        <p className="text-4xl font-black text-white leading-none">{score}</p>
        <p className="text-[10px] text-white/40 mt-0.5">out of 100</p>
      </div>
    </div>
  );
}

function PillarBar({ pillar, score }: { pillar: Pillar; score: number }) {
  const pct = Math.round((score / 4) * 100);
  const barColor = score < 2 ? "bg-red-500" : score < 2.75 ? "bg-orange" : score < 3.5 ? "bg-yellow-400" : "bg-emerald-500";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-white">{PILLAR_META[pillar].label}</span>
        <span className="text-[11px] text-white/40">{score.toFixed(1)} / 4</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10">
        <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-[11px] text-white/40">{PILLAR_META[pillar].desc}</p>
    </div>
  );
}

// ─── Intake step ────────────────────────────────────────────────────────────

interface Intake {
  firstName: string; lastName: string;
  businessName: string; businessType: string;
  phone: string; email: string;
}

function IntakeStep({ intake, setIntake, onSubmit }: {
  intake: Intake;
  setIntake: React.Dispatch<React.SetStateAction<Intake>>;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const set = (key: keyof Intake) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setIntake((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="max-w-lg mx-auto w-full">
      <form onSubmit={onSubmit} className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="gs-first" className="text-white/70">First Name</Label>
            <Input id="gs-first" value={intake.firstName} onChange={set("firstName")} placeholder="Jane" required className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-orange" />
          </div>
          <div>
            <Label htmlFor="gs-last" className="text-white/70">Last Name</Label>
            <Input id="gs-last" value={intake.lastName} onChange={set("lastName")} placeholder="Smith" required className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-orange" />
          </div>
          <div>
            <Label htmlFor="gs-biz" className="text-white/70">Business Name</Label>
            <Input id="gs-biz" value={intake.businessName} onChange={set("businessName")} placeholder="Titan HVAC" required className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-orange" />
          </div>
          <div>
            <Label htmlFor="gs-type" className="text-white/70">Business Type</Label>
            <Select id="gs-type" value={intake.businessType} onChange={set("businessType")} className="bg-white/5 border-white/10 text-white focus:border-orange">
              {BUSINESS_TYPES.map((t) => <option key={t} value={t} className="bg-navy text-white">{t}</option>)}
            </Select>
          </div>
          <div>
            <Label htmlFor="gs-phone" className="text-white/70">Phone</Label>
            <Input id="gs-phone" type="tel" value={intake.phone} onChange={set("phone")} placeholder="(501) 555-0100" required className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-orange" />
          </div>
          <div>
            <Label htmlFor="gs-email" className="text-white/70">Email</Label>
            <Input id="gs-email" type="email" value={intake.email} onChange={set("email")} placeholder="jane@titanhvac.com" required className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-orange" />
          </div>
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
          Start My Free Growth Score <ArrowRight size={16} />
        </Button>
        <p className="text-[11px] text-white/30 text-center">
          Free diagnostic, takes about 3 minutes. You&apos;ll see your results instantly before we ever talk.
        </p>
      </form>
    </div>
  );
}

// ─── Quiz step ──────────────────────────────────────────────────────────────

const OPTION_LABELS = ["A", "B", "C", "D"];

function QuizStep({ q, qNum, total, pending, onSelect, onBack }: {
  q: typeof QUESTIONS[number];
  qNum: number;
  total: number;
  pending: number | null;
  onSelect: (score: number, idx: number) => void;
  onBack: () => void;
}) {
  const pct = ((qNum - 1) / total) * 100;
  return (
    <div className="max-w-xl mx-auto w-full space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-white/40">
          <span>Question {qNum} of {total}</span>
          <span>{PILLAR_META[q.pillar as Pillar].label}</span>
        </div>
        <div className="h-1 rounded-full bg-white/10">
          <div
            className="h-1 rounded-full bg-gradient-to-r from-orange to-blue transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <p className="text-lg md:text-xl font-bold text-white leading-snug">{q.text}</p>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          const score = idx + 1;
          const isSelected = pending === idx;
          const isDimmed = pending !== null && pending !== idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(score, idx)}
              disabled={pending !== null}
              className={`w-full flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all ${
                isSelected
                  ? "border-orange bg-orange/15 text-white"
                  : isDimmed
                  ? "border-white/5 bg-white/3 text-white/30"
                  : "border-white/10 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold mt-0.5 transition-colors ${
                isSelected ? "bg-orange text-white" : "bg-white/10 text-white/50"
              }`}>
                {OPTION_LABELS[idx]}
              </span>
              <span className="leading-relaxed">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
      >
        <ArrowLeft size={13} /> Back
      </button>
    </div>
  );
}

// ─── Results step ────────────────────────────────────────────────────────────

function ResultsStep({ overall, band, scores, route, firstName }: {
  overall: number;
  band: ReturnType<typeof getBand>;
  scores: { A: number; R: number; O: number; S: number };
  route: Route;
  firstName: string;
}) {
  const rec = ROUTE_CONTENT[route];
  const name = firstName ? `, ${firstName}` : "";

  return (
    <div className="max-w-2xl mx-auto w-full space-y-8">
      {/* Score header */}
      <div className="text-center space-y-3">
        <ScoreRing score={overall} />
        <div>
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 ${band.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${band.dot}`} />
            {band.label}
          </span>
        </div>
        <p className="text-sm text-white/60 max-w-sm mx-auto">{band.desc}</p>
        {firstName && (
          <p className="text-base font-semibold text-white">
            Here&apos;s where your business stands{name}.
          </p>
        )}
      </div>

      {/* Pillar breakdown */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Score Breakdown</p>
        {(["A", "R", "O", "S"] as Pillar[]).map((p) => (
          <PillarBar key={p} pillar={p} score={scores[p]} />
        ))}
      </div>

      {/* Recommendation */}
      <div className="rounded-2xl border-2 border-orange bg-orange/5 p-6 space-y-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-orange mb-1">Our Recommendation</p>
          <p className="text-xs font-semibold text-white/50 mb-0.5">{rec.label}</p>
          <p className="text-lg font-bold text-white">{rec.headline}</p>
        </div>
        <p className="text-sm text-white/70 leading-relaxed">{rec.body}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="primary" size="lg" className="flex-1">
            <a href={rec.primaryHref} target="_blank" rel="noopener noreferrer">
              {rec.primaryCta} <ArrowRight size={15} />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="flex-1 border-white/20 text-white hover:bg-white/10">
            <Link href={rec.learnHref}>
              Learn More
            </Link>
          </Button>
        </div>
      </div>

      {/* Revenue Audit upsell */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Upgrade to Full Diagnosis</p>
          <p className="text-sm font-bold text-white mb-1">We do the audit for you, with a custom roadmap.</p>
          <p className="text-xs text-white/50 leading-relaxed">
            The AROS Revenue Audit goes beyond the score. We analyze your business top-to-bottom, benchmark it against comparable operations, and deliver a custom growth roadmap on a strategy call, with specific actions in priority order.
          </p>
        </div>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-semibold text-orange hover:text-orange-light transition-colors whitespace-nowrap"
        >
          Book the Revenue Audit →
        </a>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function GrowthScoreQuiz() {
  const [phase, setPhase] = useState<"intake" | "quiz" | "results">("intake");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(0));
  const [pending, setPending] = useState<number | null>(null);
  const [intake, setIntake] = useState<Intake>({
    firstName: "", lastName: "", businessName: "",
    businessType: BUSINESS_TYPES[0], phone: "", email: "",
  });

  function handleIntakeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPhase("quiz");
  }

  function selectAnswer(score: number, idx: number) {
    if (pending !== null) return;
    setPending(idx);
    setTimeout(() => {
      const next = [...answers];
      next[currentQ] = score;
      setAnswers(next);
      setPending(null);
      if (currentQ < 9) {
        setCurrentQ((q) => q + 1);
      } else {
        setPhase("results");
        fireSubmit(next);
      }
    }, 350);
  }

  function goBack() {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
    else setPhase("intake");
  }

  async function fireSubmit(final: number[]) {
    const scores = calcPillarScores(final);
    const overall = calcOverall(final);
    const band = getBand(overall);
    const route = getRoute(scores);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${intake.firstName} ${intake.lastName}`.trim(),
          email: intake.email,
          company: intake.businessName,
          phone: intake.phone,
          industry: intake.businessType,
          arosScore: overall,
          scoreBand: band.label,
          pillarA: +scores.A.toFixed(1),
          pillarR: +scores.R.toFixed(1),
          pillarO: +scores.O.toFixed(1),
          pillarS: +scores.S.toFixed(1),
          recommendation: route,
        }),
      });
    } catch { /* results still show -- silent failure */ }
  }

  if (phase === "intake") {
    return <IntakeStep intake={intake} setIntake={setIntake} onSubmit={handleIntakeSubmit} />;
  }

  if (phase === "quiz") {
    return (
      <QuizStep
        q={QUESTIONS[currentQ]}
        qNum={currentQ + 1}
        total={10}
        pending={pending}
        onSelect={selectAnswer}
        onBack={goBack}
      />
    );
  }

  const scores = calcPillarScores(answers);
  const overall = calcOverall(answers);
  const band = getBand(overall);
  const route = getRoute(scores);
  return (
    <ResultsStep
      overall={overall}
      band={band}
      scores={scores}
      route={route}
      firstName={intake.firstName}
    />
  );
}
