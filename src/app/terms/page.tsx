import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 prose-legal">
        <p className="text-xs text-gray-400 mb-6">
          <Link href="/anovasos/login" className="text-orange font-medium">
            ← Back
          </Link>
        </p>

        <h1 className="text-2xl font-bold text-charcoal mb-1">
          Terms of Service | Anovas Integrated Systems
        </h1>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Effective Date:</strong> June 23, 2026
        </p>
        <p className="text-sm text-gray-500 mb-8">
          <strong>Last Updated:</strong> June 23, 2026
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Anovas Integrated Systems LLC · Little Rock, Arkansas ·{" "}
          support@anovasintegratedsystems.com
        </p>

        <Section title="1. Agreement to Terms">
          <p>
            These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement
            between you (&quot;Client,&quot; &quot;you,&quot; or &quot;your&quot;) and Anovas
            Integrated Systems LLC (&quot;Anovas,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), governing your access to and use of our products, services, and
            website located at anovasintegratedsystems.com (collectively, the
            &quot;Services&quot;).
          </p>
          <p>
            By accessing or using any of our Services, you agree to be bound by these Terms. If
            you do not agree, do not access or use our Services.
          </p>
        </Section>

        <Section title="2. Description of Services">
          <p>
            <strong>Anovas Autopilot</strong> is an revenue protection system
            designed for local service businesses. It delivers five core automations:
            missed-call text-back, lead and quote follow-up, booking and reminder automation,
            invoice and payment nudges, and review generation. Available in Basic, Pro, Elite,
            and Enterprise tiers, each with defined capacity limits.
          </p>
          <p>
            <strong>AnovasOS</strong> is a business growth platform that provides demand
            generation, content creation, campaign management, SEO, lead nurturing, and consumer
            intelligence services. AnovasOS is a business-to-business platform intended
            exclusively for use by businesses and their authorized representatives.
          </p>
          <p>
            <strong>Professional Services</strong> include the AROS Growth Score (free
            diagnostic), the Growth Blueprint (strategic analysis), implementation services,
            website design, and Fractional Growth Advisor engagements.
          </p>
        </Section>

        <Section title="3. Eligibility">
          <p>
            <strong>3.1 Business Use Only (AnovasOS).</strong> AnovasOS is intended solely for
            use by businesses and their authorized representatives. By accessing AnovasOS, you
            represent and warrant that you are accessing the platform on behalf of a business
            entity and that you have authority to bind that entity to these Terms.
          </p>
          <p>
            <strong>3.2 General Eligibility (Anovas Autopilot and All Services).</strong> You
            must be at least 18 years of age to use any Anovas service. By using our Services,
            you represent that you are at least 18 years old and have the legal capacity to
            enter into a binding contract.
          </p>
          <p>
            <strong>3.3 Geographic Scope.</strong> Our Services are currently offered primarily
            to businesses located in the United States. We make no representation that the
            Services are appropriate or available for use in other locations.
          </p>
        </Section>

        <Section title="4. Accounts and Registration">
          <p>
            <strong>4.1 Account Creation.</strong> Certain Services require you to create an
            account. You agree to provide accurate, current, and complete information during
            registration and to keep your account information updated.
          </p>
          <p>
            <strong>4.2 Account Security.</strong> You are responsible for maintaining the
            confidentiality of your account credentials and for all activity that occurs under
            your account. Notify us immediately at support@anovasintegratedsystems.com of any
            unauthorized use.
          </p>
          <p>
            <strong>4.3 One Account Per Business.</strong> Each business entity may maintain one
            active account unless otherwise agreed in writing.
          </p>
        </Section>

        <Section title="5. Fees, Payment, and Billing">
          <p>
            <strong>5.1 Service Fees.</strong> All fees are in U.S. dollars as described in the
            applicable service agreement, order form, or pricing page at the time of purchase.
          </p>
          <p>
            <strong>5.2 Setup Fees.</strong> Certain tiers of Anovas Autopilot and implementation
            services require a one-time setup fee, payable in full prior to the commencement of
            onboarding.
          </p>
          <p>
            <strong>5.3 Subscription Fees.</strong> Monthly subscription fees are billed in
            advance on a recurring basis on the same calendar date each month.
          </p>
          <p>
            <strong>5.4 Payment Processing.</strong> Payment is processed through Stripe and/or
            PayPal. Anovas does not store full payment card numbers on our servers. All payment
            data is handled by our PCI-compliant payment processors.
          </p>
          <p>
            <strong>5.5 Late Payment.</strong> If payment is not received within seven (7) days
            of the due date, Anovas reserves the right to suspend access to the Services until
            the outstanding balance is paid in full.
          </p>
          <p>
            <strong>5.6 Taxes.</strong> All fees are exclusive of applicable taxes. You are
            responsible for all taxes, duties, or governmental charges associated with your
            purchase.
          </p>
        </Section>

        <Section title="6. Cancellation and Refunds">
          <p>
            <strong>6.1 Cancellation.</strong> You may cancel your subscription at any time by
            providing written notice to support@anovasintegratedsystems.com. Cancellations take
            effect at the end of the current billing period.
          </p>
          <p>
            <strong>6.2 Setup Fees.</strong> Setup and implementation fees are non-refundable
            once onboarding has commenced.
          </p>
          <p>
            <strong>6.3 Subscription Refunds.</strong> Monthly subscription fees are generally
            non-refundable. If you believe you have been charged in error, contact us within
            thirty (30) days and we will review in good faith.
          </p>
          <p>
            <strong>6.4 Refund Discretion.</strong> Anovas reserves the right to issue refunds or
            credits at its sole discretion on a case-by-case basis.
          </p>
        </Section>

        <Section title="7. Client Responsibilities">
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate business information.</li>
            <li>Respond to Anovas requests for approvals and information in a timely manner.</li>
            <li>
              Ensure your use of our Services complies with all applicable laws, including TCPA
              and CAN-SPAM.
            </li>
            <li>Obtain all necessary consents before providing us with your customers&apos; contact information.</li>
            <li>Not use our Services to send unsolicited communications, spam, or harassing messages.</li>
            <li>Not use our Services for any unlawful, fraudulent, or abusive purpose.</li>
          </ul>
        </Section>

        <Section title="8. Anovas Responsibilities">
          <p>Anovas agrees to:</p>
          <ul>
            <li>Deliver the Services as described in the applicable service agreement.</li>
            <li>
              Maintain the confidentiality of your business information and customer data per
              our Privacy Policy.
            </li>
            <li>Provide reasonable notice of material changes to the Services or these Terms.</li>
            <li>Make reasonable efforts to maintain Service availability and address technical issues.</li>
          </ul>
        </Section>

        <Section title="9. Intellectual Property">
          <p>
            <strong>9.1 Our IP.</strong> All content, technology, workflows, AI models, agent
            configurations, and software created by Anovas remain the sole property of Anovas
            Integrated Systems LLC.
          </p>
          <p>
            <strong>9.2 Your Content.</strong> You retain ownership of all content and data you
            provide to Anovas. By providing it, you grant Anovas a limited, non-exclusive license
            to use and process it solely to deliver the Services.
          </p>
          <p>
            <strong>9.3 Deliverables.</strong> Custom deliverables created specifically for you
            (website designs, custom workflows) are owned by you upon full payment, unless
            otherwise specified in your service agreement.
          </p>
        </Section>

        <Section title="10. Confidentiality">
          <p>
            Each party agrees to keep the other party&apos;s confidential business information
            strictly confidential and not disclose it to third parties without prior written
            consent, except as required by law. This obligation survives termination.
          </p>
        </Section>

        <Section title="11. Data and Privacy">
          <p>
            Your use of our Services is governed by our Privacy Policy, incorporated into these
            Terms by reference. You acknowledge that Anovas uses third-party providers including
            n8n, HubSpot, Supabase, Microsoft 365, Stripe, and PayPal in delivering the Services.
          </p>
        </Section>

        <Section title="12. Disclaimers">
          <p>
            <strong>12.1 No Guarantee of Results.</strong> Anovas does not guarantee specific
            business outcomes, revenue results, lead volumes, or growth metrics.
          </p>
          <p>
            <strong>12.2 Not Legal, Financial, or Accounting Advice.</strong> Nothing in our
            Services constitutes legal, financial, accounting, or tax advice.
          </p>
          <p>
            <strong>12.3 As-Is.</strong> Except as expressly stated, the Services are provided
            &quot;as is&quot; without warranties of any kind.
          </p>
        </Section>

        <Section title="13. Limitation of Liability">
          <p>
            Anovas&apos; total liability for any claim shall not exceed the total fees paid by
            you in the three (3) months immediately preceding the claim. In no event shall Anovas
            be liable for any indirect, incidental, consequential, punitive, or special damages.
          </p>
        </Section>

        <Section title="14. Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless Anovas and its officers, employees,
            and agents from and against any claims, damages, losses, and expenses arising out of:
            (a) your use of the Services; (b) your violation of these Terms; (c) your violation
            of any applicable law; or (d) your content or your customers&apos; content.
          </p>
        </Section>

        <Section title="15. Term and Termination">
          <p>15.1 These Terms remain in effect for as long as you use our Services.</p>
          <p>15.2 You may terminate at any time by canceling your subscription.</p>
          <p>
            15.3 Anovas may suspend or terminate your access immediately if you violate these
            Terms, fail to pay fees, or if your use poses a legal or reputational risk.
          </p>
          <p>15.4 Sections 9, 10, 12, 13, 14, and 16 survive termination.</p>
        </Section>

        <Section title="16. Governing Law and Dispute Resolution">
          <p>
            These Terms are governed by the laws of the State of Arkansas. Disputes shall first
            be subject to good-faith negotiation. If negotiation fails, disputes shall be
            resolved by binding arbitration in Pulaski County, Arkansas, under AAA rules.
          </p>
        </Section>

        <Section title="17. Changes to These Terms">
          <p>
            Anovas reserves the right to modify these Terms at any time. We will provide at least
            fourteen (14) days&apos; notice before changes take effect. Continued use after the
            effective date constitutes acceptance.
          </p>
        </Section>

        <Section title="18. Miscellaneous">
          <p>
            <strong>Entire Agreement.</strong> These Terms, together with any service agreements
            and our Privacy Policy, constitute the entire agreement between you and Anovas.
          </p>
          <p>
            <strong>Severability.</strong> If any provision is found unenforceable, the remaining
            provisions remain in full force.
          </p>
          <p>
            <strong>Waiver.</strong> Failure to enforce any right does not constitute a waiver.
          </p>
          <p>
            <strong>Assignment.</strong> You may not assign these Terms without our prior written
            consent.
          </p>
          <p>
            <strong>Force Majeure.</strong> Anovas is not liable for delays caused by
            circumstances beyond our reasonable control.
          </p>
          <p>
            <strong>Contact.</strong> support@anovasintegratedsystems.com
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h2 className="text-base font-semibold text-charcoal mb-2">{title}</h2>
      <div className="space-y-2 text-sm text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
}
