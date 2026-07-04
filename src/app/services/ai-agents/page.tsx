import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Bot, CheckCircle, Zap, Users, BarChart2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "AI Agent Services | Anovas Integrated Systems",
  description:
    "Custom AI agents for local service businesses. We build and deploy purpose-built agent systems that handle lead follow-up, content, scheduling, reporting, and operations, so your business handles more volume without adding headcount.",
  alternates: { canonical: "/services/ai-agents" },
};

const CALENDLY = "https://calendly.com/d/cysq-pnv-zpx/sales-demo-call";

const capabilities = [
  {
    icon: Zap,
    title: "Lead Qualification & Follow-Up",
    body: "Agents that respond to inbound leads, qualify them against your criteria, and route warm prospects to your team, without anyone on your staff having to monitor a inbox.",
  },
  {
    icon: Users,
    title: "Customer Onboarding & Check-Ins",
    body: "Automated sequences that walk new customers through next steps, collect what you need, and check in at key points in the job lifecycle.",
  },
  {
    icon: BarChart2,
    title: "Operational Reporting",
    body: "Agents that pull data from your tools, format it into a daily or weekly brief, and surface the numbers that matter, so you're not building reports manually.",
  },
  {
    icon: Clock,
    title: "Calendar & Task Workflows",
    body: "Scheduling agents that handle booking coordination, send reminders, and update your team's task queues without a human in the loop.",
  },
];

const tiers = [
  {
    name: "Starter Agent",
    price: "$1,500",
    period: "one-time build + $300/mo",
    badge: null,
    tagline: "One focused agent for your highest-friction task.",
    features: [
      "Single-purpose agent (e.g. lead follow-up or review requests)",
      "Integrated with your existing tools",
      "Custom intake and briefing session",
      "2-week build timeline",
      "Monthly monitoring and tuning",
    ],
    cta: "Book a Discovery Call",
  },
  {
    name: "Agent Stack",
    price: "$4,500",
    period: "one-time build + $750/mo",
    badge: "Most Popular",
    tagline: "Three coordinated agents covering your core workflows.",
    features: [
      "Up to 3 purpose-built agents",
      "Cross-agent handoffs and escalation logic",
      "CRM and communication tool integrations",
      "4-week build and QA timeline",
      "Monthly performance review included",
      "Priority support",
    ],
    cta: "Book a Discovery Call",
  },
  {
    name: "Full Deployment",
    price: "Custom",
    period: "scoped per engagement",
    badge: null,
    tagline: "An AI-powered workforce built around your entire operation.",
    features: [
      "Unlimited agent scope",
      "Full workflow audit and design",
      "Sales, ops, marketing, and admin coverage",
      "Dedicated build team",
      "Ongoing optimization and expansion",
    ],
    cta: "Book a Discovery Call",
  },
];

const faqs = [
  {
    q: "Is this just chatbots?",
    a: "No. These are purpose-built agents with defined roles, tools, and decision-making logic. They take action: sending messages, updating records, scheduling meetings, drafting content, and routing work to the right person at the right time.",
  },
  {
    q: "Do I need a tech background to use AI agents?",
    a: "Not at all. We handle the build, setup, and integration. You tell us what is costing you the most time or money, and we design the agent workflow around that. You interact with the output, not the machinery.",
  },
  {
    q: "How do agents work alongside my existing team?",
    a: "They fill the gaps. Your team handles high-judgment, relationship-driven work. Agents handle the volume: follow-ups, reminders, scheduling, reporting, and anything that would otherwise fall through the cracks.",
  },
  {
    q: "What tools do agents connect to?",
    a: "Most CRMs, scheduling platforms, email and SMS tools, Google Workspace, and job management software common in the trades. We scope integrations during the discovery call and confirm compatibility before any build begins.",
  },
];

export default function AIAgentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-6">
            <ArrowLeft size={13} /> Back to Services
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/20 text-orange-light">
              <Bot size={22} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-light">AI Agent Services</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            A purpose-built AI workforce for your operation.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            We build and deploy AI agents that handle the volume your team cannot: lead follow-up, scheduling, reporting, and customer communication, running around the clock without adding headcount.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-6">What Agents Handle</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className="rounded-xl border border-gray-200 bg-white p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-orange/10 text-orange mb-3">
                  <Icon size={17} />
                </span>
                <p className="text-sm font-semibold text-charcoal mb-1.5">{cap.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{cap.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-3">Plans</p>
          <h2 className="text-xl font-bold text-charcoal mb-2">Three tiers, all including a custom build and monthly support.</h2>
          <p className="text-sm text-gray-500 mb-8">Every engagement starts with a scoping call. We confirm fit before anything is built.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => {
              const featured = tier.badge === "Most Popular";
              return (
                <div
                  key={tier.name}
                  className={
                    featured
                      ? "rounded-2xl border-2 border-orange bg-navy p-6 flex flex-col relative shadow-[0_0_40px_-8px_rgba(242,88,30,0.35)]"
                      : "rounded-2xl border border-gray-200 bg-background p-6 flex flex-col"
                  }
                >
                  {featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange to-orange-light text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                      Most Popular
                    </span>
                  )}
                  <p className={`text-base font-bold mb-0.5 ${featured ? "text-white" : "text-charcoal"}`}>{tier.name}</p>
                  <p className={`text-2xl font-black mb-0.5 ${featured ? "text-orange" : "text-charcoal"}`}>{tier.price}</p>
                  <p className={`text-xs font-semibold mb-1 ${featured ? "text-orange/60" : "text-gray-400"}`}>{tier.period}</p>
                  <p className={`text-xs mt-1 mb-4 pb-4 border-b leading-relaxed ${featured ? "text-white/50 border-white/10" : "text-gray-500 border-gray-100"}`}>
                    {tier.tagline}
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-xs ${featured ? "text-white/80" : "text-gray-600"}`}>
                        <CheckCircle size={13} className="text-orange shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      featured
                        ? "mt-6 block text-center text-xs font-semibold bg-gradient-to-r from-orange to-orange-light text-white rounded-lg py-2.5 hover:opacity-90 transition-opacity"
                        : "mt-6 block text-center text-xs font-semibold border border-gray-300 text-charcoal rounded-lg py-2.5 hover:border-orange hover:text-orange transition-colors"
                    }
                  >
                    {tier.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-orange text-xs font-semibold uppercase tracking-widest mb-6">Common Questions</p>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-charcoal mb-1.5">{faq.q}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-white/60 text-sm mb-6">Tell us what&apos;s costing you the most time. We&apos;ll scope the right agent workflow around it.</p>
          <Button asChild variant="primary" size="lg">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              Book a Discovery Call <ArrowRight size={16} />
            </a>
          </Button>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
