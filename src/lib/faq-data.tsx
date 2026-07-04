import Link from "next/link";
import type { FaqItem } from "@/components/marketing/faq-accordion";

export type FaqSection = { id: string; title: string; items: FaqItem[] };

export const faqSections: FaqSection[] = [
  {
    id: "anovas",
    title: "Anovas Integrated Systems",
    items: [
      {
        question: "What is Anovas Integrated Systems?",
        answer: (
          <p>
            Anovas Integrated Systems is an AI-native growth agency built exclusively for local
            service businesses. We combine AI automation, demand generation, and professional
            services — brand, web, SEO, social, content, and advertising — into one integrated
            system. You get a growth partner, not a vendor.
          </p>
        ),
      },
      {
        question: "Who do you work with?",
        answer: (
          <p>
            Local and home service businesses across the U.S. — HVAC, plumbing, electrical,
            roofing, landscaping, pest control, general contracting, and similar trades. We work
            with solo operators running their first few crews and multi-location operations that
            need systems to support growth.
          </p>
        ),
      },
      {
        question: "What makes Anovas different from a typical marketing agency?",
        answer: (
          <p>
            Most agencies sell deliverables — posts, ads, a website. We sell outcomes. We build
            the systems that generate leads, follow up automatically, book jobs, and grow your
            reputation, then layer in strategy and content on top. Everything is built specifically
            for the trades — not adapted from generic SMB software or playbooks.
          </p>
        ),
      },
      {
        question: "What does working with Anovas look like?",
        answer: (
          <p>
            Start with the free{" "}
            <Link href="/aros-growth-score" className="text-orange font-medium">
              AROS Growth Score
            </Link>{" "}
            — a 10-question diagnostic that benchmarks your business across Acquisition, Revenue,
            Operations, and Systems and tells you exactly where the biggest gap is. From there we
            recommend the right services and get to work. No long contracts, no overpromising.
          </p>
        ),
      },
      {
        question: "Where is Anovas based?",
        answer: <p>Little Rock, Arkansas. We work with businesses locally and nationally.</p>,
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
            Anovas Autopilot is your revenue protection system — an always-on follow-up engine that
            handles the most time-consuming, revenue-critical tasks in your business automatically,
            around the clock. See full plan details on the{" "}
            <Link href="/services/autopilot" className="text-orange font-medium">
              Autopilot page
            </Link>
            .
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
            If you run a local service business and you are losing revenue to missed calls, cold
            quotes, or unpaid invoices, Autopilot was built for you.
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
                <strong>Basic</strong> — $1,000 setup + $500/month. For solo operators getting
                started with automation.
              </li>
              <li>
                <strong>Pro</strong> — $2,500 setup + $1,000/month. Our most popular tier, built
                for growing teams.
              </li>
              <li>
                <strong>Elite</strong> — $5,000 setup + $2,000/month. For established businesses
                doing over $1M in revenue.
              </li>
              <li>
                <strong>Enterprise</strong> — Custom pricing from $5,000/month. For multi-location
                operations with complex needs.
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
            It comes down to team size and lead volume. Solo operator? Start with Basic. Growing
            team with a few techs or staff? Pro is the most common fit. Established business doing
            over a million? Elite. We will size it correctly on the discovery call.
          </p>
        ),
      },
      {
        question: "What does setup actually look like?",
        answer: (
          <p>
            About two weeks. We handle the build. You show up for a short intake call at the start
            and a go-live review at the end. Most owners spend less than two hours total on setup.
          </p>
        ),
      },
      {
        question: "I already have someone who handles my calls. Why do I need this?",
        answer: (
          <p>
            Autopilot does not replace your team — it covers the gaps they cannot. Missed calls
            after hours, follow-ups that fall through the cracks, invoices that sit unpaid because
            no one chased them. It works around the clock so your people can focus on the work that
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
        question: "What does it cost compared to hiring someone?",
        answer: (
          <p>
            A part-time admin runs $2,500–$4,000 a month and clocks out at 5. Autopilot Pro is
            $1,000 a month and runs 24/7. The missed-call text-back alone typically recovers enough
            jobs in the first month to cover the cost.
          </p>
        ),
      },
      {
        question: "What happens right now when I miss a call?",
        answer: (
          <p>
            Most of the time, that customer calls the next company on Google. They do not leave a
            voicemail and wait. Autopilot texts them back within seconds — before they dial someone
            else.
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
            AnovasOS is the growth management platform for local service businesses — AI-powered
            marketing execution, analytics, reporting, and ongoing management in one command center.
            While Autopilot protects your revenue, AnovasOS generates demand and gives you full
            visibility into what is working.
          </p>
        ),
      },
      {
        question: "How is AnovasOS different from Anovas Autopilot?",
        answer: (
          <p>
            Autopilot keeps you from losing the leads you already have. AnovasOS goes out and gets
            you more. Together they cover the full growth cycle: attract, convert, and retain. Most
            clients start with one and add the other as they scale.
          </p>
        ),
      },
      {
        question: "What are the AnovasOS pricing tiers?",
        answer: (
          <>
            <p>AnovasOS has three tiers:</p>
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
              full details on the{" "}
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
            Yes — and that is how most clients eventually run. Autopilot handles operations and
            retention. AnovasOS handles demand generation and visibility. Combined, they cover your
            entire growth operation from one place.
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
            Anovas operates with an AI-powered workforce — specialized agents that handle sales,
            marketing, operations, customer success, and administrative tasks. We build and deploy
            similar agent systems for clients, so your business can handle more volume without
            adding headcount.
          </p>
        ),
      },
      {
        question: "What kinds of tasks can AI agents handle for my business?",
        answer: (
          <p>
            Lead qualification and follow-up, content drafting and scheduling, calendar and task
            workflows, customer onboarding and check-ins, and operational reporting. Essentially
            anything that is repetitive, time-sensitive, or falls through the cracks when a human
            is not available.
          </p>
        ),
      },
      {
        question: "Is this just chatbots?",
        answer: (
          <p>
            No. These are purpose-built agents with defined roles, tools, and decision-making
            logic. They do not just answer questions — they take action. They send messages, update
            records, schedule meetings, draft content, and route work to the right person at the
            right time.
          </p>
        ),
      },
      {
        question: "Do I need a tech background to use AI agents?",
        answer: (
          <p>
            Not at all. We handle the build, setup, and integration. You tell us what is costing
            you the most time or money, and we design the agent workflow around that. You interact
            with the output, not the machinery.
          </p>
        ),
      },
      {
        question: "How do AI agents work alongside my existing team?",
        answer: (
          <p>
            They fill the gaps. Your team handles high-judgment, relationship-driven work. Agents
            handle the volume — follow-ups, reminders, scheduling, reporting, and anything that
            would otherwise fall through the cracks. The result is a leaner, faster operation
            without burning out your people.
          </p>
        ),
      },
      {
        question: "How do I get started?",
        answer: (
          <p>
            Take the free{" "}
            <Link href="/aros-growth-score" className="text-orange font-medium">
              AROS Growth Score
            </Link>{" "}
            — a 10-question diagnostic that identifies where automation and AI would have the
            biggest impact on your business. From there we can scope the right solution.
          </p>
        ),
      },
    ],
  },
];
