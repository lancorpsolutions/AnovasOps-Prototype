// AROS Growth Score: the questions and scoring behind the Business Systems
// Diagnostic. Pure module (no React, relative imports only) so the scoring can
// be unit tested.

import type { Pillar } from "../leads/schema";

export type { Pillar };
export type Route = "autopilot-r" | "autopilot-o" | "services" | "anovasos";
export type PillarScores = Record<Pillar, number>;

export const QUESTIONS = [
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

export const QUESTION_COUNT = QUESTIONS.length;

export const PILLAR_META = {
  A: { label: "Acquisition", desc: "How consistently you attract and capture new leads" },
  R: { label: "Revenue", desc: "How effectively you convert leads and retain customers" },
  O: { label: "Operations", desc: "How independently and efficiently your business runs" },
  S: { label: "Systems", desc: "How automated and data-driven your workflows are" },
};

export function calcPillarScores(answers: number[]): PillarScores {
  return {
    A: (answers[0] + answers[1] + answers[2]) / 3,
    R: (answers[3] + answers[4] + answers[5]) / 3,
    O: (answers[6] + answers[7]) / 2,
    S: (answers[8] + answers[9]) / 2,
  };
}

/**
 * Overall score on a true 0–100 scale. Each answer scores 1–4, so ten answers
 * sum to 10–40. (The previous sum/40 formula floored every score at 25.)
 */
export function calcOverall(answers: number[]) {
  const sum = answers.reduce((a, b) => a + b, 0);
  const min = QUESTION_COUNT;
  const max = QUESTION_COUNT * 4;
  return Math.max(0, Math.min(100, Math.round(((sum - min) / (max - min)) * 100)));
}

export type BandKey = "foundation" | "building" | "growth" | "scale";

export function getBand(score: number): { key: BandKey; label: string; desc: string } {
  if (score <= 25) return { key: "foundation", label: "Foundation Stage", desc: "Real gaps in the basics; they're costing you leads and money every week whether you see it or not." };
  if (score <= 50) return { key: "building", label: "Building Stage", desc: "You've got momentum, but inconsistent systems are bleeding revenue. The right fixes here have outsized ROI." };
  if (score <= 75) return { key: "growth", label: "Growth Stage", desc: "Strong foundation. Targeted improvements in your weakest pillar will unlock the next level of growth." };
  return { key: "scale", label: "Scale Stage", desc: "You're running a well-built operation. The next move is scaling what's already working, faster and without adding to your plate." };
}

export function getRoute(scores: PillarScores): Route {
  const ranked = (["R", "O", "A", "S"] as Pillar[])
    .map((k) => ({ k, v: scores[k] }))
    .sort((a, b) => a.v - b.v);
  const lowest = ranked[0].k;
  if (lowest === "R") return "autopilot-r";
  if (lowest === "O") return "autopilot-o";
  if (lowest === "A") return "services";
  return "anovasos";
}

export const ROUTE_CONTENT: Record<Route, {
  label: string; headline: string; body: string;
  primaryCta: string; learnHref: string;
}> = {
  "autopilot-r": {
    label: "Anovas Autopilot",
    headline: "Your biggest gap: leads going cold",
    body: "You're generating interest but losing it before it converts. Slow response times, missed calls, and no follow-up system are the culprit, and every one is a job that went to a competitor. Anovas Autopilot responds to every missed call, follows up on every quote, and nudges every outstanding invoice automatically, so revenue stops leaking while you're heads-down on the job.",
    primaryCta: "Book an Autopilot walkthrough",
    learnHref: "/services/autopilot",
  },
  "autopilot-o": {
    label: "Anovas Autopilot",
    headline: "Your biggest gap: the business runs on you",
    body: "If you step away, things start to slip: scheduling, follow-ups, customer communication. That's not a people problem, it's a systems problem. Anovas Autopilot handles the revenue protection layer that shouldn't require a human: booking confirmations, appointment reminders, post-job review requests, and invoice nudges. Less of the day-to-day in your head, more of it running on its own.",
    primaryCta: "Book an Autopilot walkthrough",
    learnHref: "/services/autopilot",
  },
  services: {
    label: "Digital Presence Services",
    headline: "Your biggest gap: not enough of the right leads",
    body: "You do good work but the pipeline is too thin or too unpredictable. The root cause is almost always visibility: a weak web presence, a GMB profile that isn't working, no local search footprint. We fix that with website builds, local SEO, and brand identity that actually earns trust before anyone calls you. We focus on local service businesses, not generic SMBs.",
    primaryCta: "Book a Discovery Call",
    learnHref: "/services",
  },
  anovasos: {
    label: "AnovasOS",
    headline: "Your biggest gap: growth that doesn't compound",
    body: "Your fundamentals are solid: leads come in, jobs get done, customers are happy. But every growth initiative still runs through you, and without a system to track, measure, and execute consistently, you're leaving compounding on the table. AnovasOS puts your pipeline, jobs, crews, invoices, automation rules, and risk flags in one command center, so you can see what's working, hand off the routine work, and actually get out of the day-to-day.",
    primaryCta: "Book an AnovasOS walkthrough",
    learnHref: "/services/anovasos",
  },
};

