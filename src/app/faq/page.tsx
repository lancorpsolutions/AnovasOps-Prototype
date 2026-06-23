import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { FaqAccordion, type FaqItem } from "@/components/marketing/faq-accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Anovas Integrated Systems, Anovas Autopilot, AnovasOS, and our AI agent services.",
  keywords: ["Anovas FAQ", "Anovas Autopilot pricing", "AnovasOS pricing", "AI agents for service businesses"],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Anovas Integrated Systems",
    description:
      "Answers to common questions about Anovas Integrated Systems, Anovas Autopilot, AnovasOS, and our AI agent services.",
    url: "/faq",
    type: "website",
  },
};

const sections: { id: string; title: string; items: FaqItem[] }[] = [
  {
    id: "anovas",
    title: "Anovas Integrated Systems",
    items: [
      {
        question: "What is Anovas Integrated Systems?",
        answer: (
          <p>
            Anovas Integrated Systems is an AI-native digital agency based in North Little Rock,
            Arkansas. We are not a traditional marketing agency. We are a Business Growth Operating
            System — we combine consumer-behavior analytics, AI, automation, and strategic execution
            to help local service businesses grow faster with less guesswork.
          </p>
        ),
      },
      {
        question: "Who do you work with?",
        answer: (
          <p>
            We work with local service-based businesses — from solo operators to multi-location
            groups. Our sweet spot is businesses doing $50K to $5M in annual revenue in industries
            like HVAC, plumbing, electrical, roofing, landscaping, cleaning, painting, and
            salon/beauty.
          </p>
        ),
      },
      {
        question: "What makes Anovas different from a typical marketing agency?",
        answer: (
          <p>
            Most agencies sell you deliverables — posts, ads, a website. We sell you outcomes. We
            build the systems that generate leads, follow up automatically, book jobs, collect
            payments, and grow your reputation — then we layer in strategy and content on top. You
            get an operating system for growth, not just a vendor.
          </p>
        ),
      },
      {
        question: "What does working with Anovas look like?",
        answer: (
          <p>
            It starts with a free Revenue Leaks assessment — a quick look at where your business
            stands. From there, we walk you through a Growth Review Call to show you exactly where
            the gaps are. If you want a deeper roadmap, we offer a Growth Blueprint for $997. From
            there, we implement the right platform for your business and stay in your corner as you
            grow.
          </p>
        ),
      },
      {
        question: "Where is Anovas based?",
        answer: <p>North Little Rock, Arkansas. We work with businesses locally and across the country.</p>,
      },
    ],
  },
  {
    id: "autopilot",
    title: "Anovas Autopilot",
    items: [
      {
        question: "What is Anovas Autopilot?",
        answer: (
          <p>
            Anovas Autopilot is your AI-powered back office. It runs five core automations that
            handle the most time-consuming, revenue-critical tasks in your business — automatically,
            around the clock, without you lifting a finger.
          </p>
        ),
      },
      {
        question: "What are the five automations?",
        answer: (
          <>
            <p>Every Autopilot plan includes all five:</p>
            <ol className="list-decimal pl-5 space-y-1 mt-2">
              <li>
                <strong>Missed-Call Text-Back</strong> — texts a lead back within seconds of a
                missed call, before they dial your competitor
              </li>
              <li>
                <strong>Lead and Quote Follow-Up</strong> — automatically follows up on open quotes
                and new leads until they respond
              </li>
              <li>
                <strong>Booking and Reminders</strong> — confirms appointments and sends reminders
                to reduce no-shows
              </li>
              <li>
                <strong>Invoice and Payment Nudges</strong> — follows up on unpaid invoices so you
                stop chasing money
              </li>
              <li>
                <strong>Review Engine</strong> — automatically requests Google reviews from happy
                customers after a job is done
              </li>
            </ol>
          </>
        ),
      },
      {
        question: "What kinds of businesses is Autopilot built for?",
        answer: (
          <p>
            HVAC, plumbing, electrical, roofing, landscaping, cleaning, painting, and contracting.
            If you run a local service business and you are losing time to admin work, missed calls,
            or unpaid invoices, Autopilot was built for you.
          </p>
        ),
      },
      {
        question: "What are the pricing tiers?",
        answer: (
          <>
            <p>There are four tiers:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <strong>Basic</strong> — $1,000 setup + $500/month. Great for solo operators just
                getting started with automation.
              </li>
              <li>
                <strong>Pro</strong> — $2,500 setup + $1,000/month. Our flagship tier, built for
                growing teams with a few techs or staff.
              </li>
              <li>
                <strong>Elite</strong> — $5,000 setup + $2,000/month. For established businesses
                doing over $1M who need higher capacity.
              </li>
              <li>
                <strong>Enterprise</strong> — Custom pricing starting at $5,000/month. For
                multi-location operations with complex needs.
              </li>
            </ul>
            <p className="mt-2">
              All five automations are included in every tier. What scales is capacity — leads,
              users, and locations.
            </p>
          </>
        ),
      },
      {
        question: "How do I know which tier is right for me?",
        answer: (
          <p>
            It comes down to your team size and lead volume. Solo operator? Basic. Growing team
            with a few techs or staff? Pro is the most common fit. Established business doing over a
            million? Elite. We will size it correctly on the audit call — you will not get oversold.
          </p>
        ),
      },
      {
        question: "What does setup actually look like? I do not have time for a big tech project.",
        answer: (
          <p>
            The whole process takes about two weeks. We handle the build. You show up for a short
            audit call at the start and a go-live review at the end. Most owners spend less than two
            hours total on setup.
          </p>
        ),
      },
      {
        question: "I already have someone who handles my calls and scheduling. Why do I need this?",
        answer: (
          <p>
            Autopilot does not replace your team — it covers the gaps they cannot. Missed calls at
            9pm, follow-ups that fall through the cracks, invoices that go unpaid because no one
            chased them. It works around the clock so your people can focus on the work that
            actually needs a human.
          </p>
        ),
      },
      {
        question: "How is this different from just getting a better CRM?",
        answer: (
          <p>
            A CRM stores data. Autopilot acts on it. It texts back missed calls, follows up on
            quotes, sends booking reminders, nudges unpaid invoices, and requests reviews —
            automatically, without anyone clicking a button. It is the difference between a filing
            cabinet and an employee.
          </p>
        ),
      },
      {
        question: "What does it actually cost compared to hiring someone?",
        answer: (
          <p>
            A part-time admin runs $2,500 to $4,000 a month and clocks out at 5. Autopilot Pro is
            $1,000 a month and runs 24/7. The missed-call text-back alone typically recovers enough
            jobs in the first month to cover the fee.
          </p>
        ),
      },
      {
        question: "What happens if I miss a call right now?",
        answer: (
          <p>
            Most of the time, that customer calls the next company on Google. They do not leave a
            voicemail and wait. Autopilot texts them back within seconds — before they dial someone
            else.
          </p>
        ),
      },
      {
        question: "What if I am not ready to commit? Can I try it first?",
        answer: (
          <p>
            We offer a free Revenue Leaks assessment and Growth Review Call — a short session to map
            exactly where your hours are going and what Autopilot would handle for you. No cost, no
            pressure, no pitch until you have seen the numbers yourself.
          </p>
        ),
      },
    ],
  },
  {
    id: "anovasos",
    title: "AnovasOS",
    items: [
      {
        question: "What is AnovasOS?",
        answer: (
          <p>
            AnovasOS is our growth platform. While Autopilot runs your back office, AnovasOS
            generates demand — content, campaigns, SEO, lead nurturing, and consumer intelligence.
            It is the engine that brings new customers to your door.
          </p>
        ),
      },
      {
        question: "How is AnovasOS different from Anovas Autopilot?",
        answer: (
          <p>
            Think of it this way — Autopilot keeps you from losing the leads you already have.
            AnovasOS goes out and gets you more. Together, they cover the full growth cycle: attract,
            convert, and retain.
          </p>
        ),
      },
      {
        question: "What are the AnovasOS pricing tiers?",
        answer: (
          <>
            <p>AnovasOS is live today with three tiers:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>
                <strong>Startup</strong> — $1,000/month. For owner-operators ready to get out of
                the day-to-day firefighting.
              </li>
              <li>
                <strong>Small Business</strong> — $2,500/month. For growing teams that need
                automation and crew accountability.
              </li>
              <li>
                <strong>Enterprise</strong> — $5,000/month. For multi-crew operations that need
                full visibility and priority support.
              </li>
            </ul>
            <p className="mt-2">
              Every plan includes a real optimization review with our team — not just software. See
              full plan details on the{" "}
              <Link href="/services/anovasos" className="text-orange font-medium">
                AnovasOS page
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        question: "Can I use Autopilot and AnovasOS together?",
        answer: (
          <p>
            Yes — and that is the long-term vision. The two platforms are designed to work together
            as a unified growth operating system. Autopilot handles operations and retention.
            AnovasOS handles demand generation. Combined, they form the foundation of what we call
            Anovas Command Center.
          </p>
        ),
      },
      {
        question: "What is Anovas Command Center?",
        answer: (
          <p>
            Anovas Command Center — internally called A.R.I.A. (Anovas Revenue Intelligence Agent) —
            is the future state of the platform where Autopilot and AnovasOS operate as one unified
            system. It will give business owners a single dashboard to manage their entire growth
            operation, powered by AI.
          </p>
        ),
      },
    ],
  },
  {
    id: "ai-agents",
    title: "AI Agent Services",
    items: [
      {
        question: "What are AI agent services?",
        answer: (
          <p>
            Anovas operates with an AI-powered workforce — a team of specialized AI agents that
            handle sales, marketing, operations, customer success, and people management. We build
            and deploy similar agent systems for our clients, so your business can run more with
            less.
          </p>
        ),
      },
      {
        question: "What kinds of tasks can AI agents handle for my business?",
        answer: (
          <p>
            AI agents can qualify and follow up with leads, draft and schedule content, manage
            calendar and task workflows, handle customer onboarding and check-ins, and keep your
            operations running between human touchpoints. Essentially, anything that is repetitive,
            time-sensitive, or falls through the cracks when a human is not available.
          </p>
        ),
      },
      {
        question: "Is this just chatbots?",
        answer: (
          <p>
            No. These are purpose-built agents with defined roles, tools, and decision-making logic.
            They do not just answer questions — they take action. They send emails, update records,
            schedule meetings, draft content, and route work to the right person at the right time.
          </p>
        ),
      },
      {
        question: "Do I need a tech background to use AI agents?",
        answer: (
          <p>
            Not at all. We handle the build, the setup, and the integration. You tell us what is
            costing you the most time or money, and we design the agent workflow around that. You
            interact with the output, not the machinery.
          </p>
        ),
      },
      {
        question: "How do AI agents work alongside my human team?",
        answer: (
          <p>
            They fill the gaps. Your team handles the high-judgment, relationship-driven work.
            Agents handle the volume — follow-ups, reminders, scheduling, reporting, and anything
            that would otherwise fall through the cracks. The result is a leaner, faster operation
            without burning out your people.
          </p>
        ),
      },
      {
        question: "How do I get started?",
        answer: (
          <p>
            Start with the free Revenue Leaks Guide at anovasintegratedsystems.com. It takes a few
            minutes and gives us a clear picture of where automation and AI can have the biggest
            impact on your business right away.
          </p>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            FAQ
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Questions, answered.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Everything you need to know about Anovas Integrated Systems, Anovas Autopilot,
            AnovasOS, and our AI agent services.
          </p>
        </div>
      </section>

      <nav className="border-b border-gray-200 bg-white sticky top-16 z-40">
        <div className="max-w-3xl mx-auto px-6 py-3 flex flex-wrap gap-4 justify-center">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-xs font-medium text-gray-500 hover:text-orange">
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-14">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="text-xl font-bold text-charcoal mb-5">{section.title}</h2>
            <FaqAccordion items={section.items} />
          </section>
        ))}
      </div>

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-3">Still have questions?</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-lg mx-auto">
            Get your free Revenue Leaks assessment and a Growth Review Call to see exactly where
            automation and AI can have the biggest impact on your business.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/revenue-leaks-guide">Get Your Free Growth Score</Link>
          </Button>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
