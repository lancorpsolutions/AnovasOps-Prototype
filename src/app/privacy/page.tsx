import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | AnovasOS",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-xs text-gray-400 mb-6">
          <Link href="/login" className="text-orange font-medium">
            ← Back
          </Link>
        </p>

        <div className="border border-amber-300 bg-amber-50 text-amber-900 text-xs font-medium rounded-lg px-4 py-3 mb-8">
          ATTORNEY REVIEW DRAFT — DO NOT PUBLISH WITHOUT LEGAL SIGN-OFF
          <br />
          Version: v1.0 — June 15, 2026
        </div>

        <h1 className="text-2xl font-bold text-charcoal mb-1">
          Privacy Policy — Anovas Integrated Systems
        </h1>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Effective Date:</strong> [To be set upon publication]
        </p>
        <p className="text-sm text-gray-500 mb-8">
          <strong>Last Updated:</strong> June 15, 2026
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Anovas Integrated Systems LLC · North Little Rock, Arkansas ·{" "}
          support@anovasintegratedsystems.com
        </p>

        <Section title="1. Introduction">
          <p>
            Anovas Integrated Systems LLC respects your privacy and is committed to protecting
            the personal and business information you share with us. This Privacy Policy
            explains how we collect, use, store, share, and protect information when you use our
            website, products (Anovas Autopilot, AnovasOS), and professional services.
          </p>
          <p>
            By using our Services, you agree to the collection and use of information in
            accordance with this Privacy Policy.
          </p>
        </Section>

        <Section title="2. Who This Policy Applies To">
          <ul>
            <li>
              <strong>Business clients and their representatives</strong> who use Anovas
              Autopilot or AnovasOS.
            </li>
            <li>
              <strong>Prospective clients</strong> who complete the AROS Growth Score, submit
              inquiry forms, or interact with our website or marketing materials.
            </li>
            <li>
              <strong>End users</strong> (customers of our clients) whose contact information is
              processed by Anovas on behalf of our clients as part of Anovas Autopilot
              automations.
            </li>
          </ul>
          <p>
            <strong>AnovasOS is a business-to-business platform</strong> and is not intended for
            personal or consumer use. We do not knowingly collect personal information from
            individuals under the age of 18.
          </p>
        </Section>

        <Section title="3. Information We Collect">
          <p>
            <strong>3.1 Information You Provide Directly</strong>
          </p>
          <ul>
            <li>
              Account and contact information: name, business name, email, phone, business
              address, and business type.
            </li>
            <li>Business diagnostic data: responses to our AROS Growth Score assessment.</li>
            <li>
              Service communications: messages, approvals, instructions, and content you provide
              during service delivery.
            </li>
            <li>
              Payment information: billing name, address, and payment method. Full payment card
              numbers are processed and stored exclusively by Stripe and/or PayPal and are never
              stored on Anovas servers.
            </li>
          </ul>
          <p>
            <strong>3.2 Customer Data Processed on Your Behalf.</strong> As part of Anovas
            Autopilot, you may provide us with contact information for your customers and leads.
            We process this data solely on your behalf and under your instruction. You are the
            data controller. We are the data processor. You are responsible for ensuring you have
            obtained all legally required consents.
          </p>
          <p>
            <strong>3.3 Information Collected Automatically.</strong>
          </p>
          <ul>
            <li>Usage data: pages visited, time spent, links clicked, referring URLs.</li>
            <li>
              Device and browser data: IP address, browser type, operating system, device
              identifiers.
            </li>
            <li>Cookie data: as described in our Cookie Policy.</li>
          </ul>
          <p>
            <strong>3.4 Information from Third-Party Sources.</strong> We may receive information
            from HubSpot (CRM), n8n (workflow automation), and Microsoft 365 (communications).
          </p>
        </Section>

        <Section title="4. How We Use Your Information">
          <ul>
            <li>Deliver and manage Services.</li>
            <li>Process payments through our payment processors.</li>
            <li>Communicate with you regarding onboarding, billing, and support.</li>
            <li>Improve our Services by analyzing usage patterns.</li>
            <li>Sales and marketing follow-up (you may opt out at any time).</li>
            <li>Comply with legal obligations.</li>
            <li>Detect, prevent, and address fraud and abuse.</li>
          </ul>
        </Section>

        <Section title="5. How We Store Your Information">
          <p>
            <strong>5.1 Primary Database.</strong> Personal and business data is stored in{" "}
            <strong>Supabase</strong>, a cloud database provider operating in the United States,
            with encryption at rest and in transit.
          </p>
          <p>
            <strong>5.2 Payment Data.</strong> Stored and managed exclusively by{" "}
            <strong>Stripe</strong> and/or <strong>PayPal</strong> on PCI-DSS-compliant
            infrastructure. Anovas stores only non-sensitive billing identifiers.
          </p>
          <p>
            <strong>5.3 CRM and Communications.</strong> Client contact and pipeline data is
            stored in <strong>HubSpot</strong>. Business communications are processed through{" "}
            <strong>Microsoft 365</strong>. Workflow execution logs are stored in{" "}
            <strong>n8n</strong> cloud.
          </p>
          <p>
            <strong>5.4 Data Location.</strong> All primary vendors are US-based. We do not
            intentionally transfer personal data outside the United States.
          </p>
        </Section>

        <Section title="6. How We Share Your Information">
          <p>
            We do not sell your personal information. We do not share your information with
            third parties for their own marketing purposes. We share information only:
          </p>
          <ul>
            <li>
              With <strong>service delivery partners</strong> (Supabase, HubSpot, Stripe,
              PayPal, n8n, Microsoft 365) solely to deliver the Services.
            </li>
            <li>
              Per <strong>your instructions</strong> for integrations or implementations you
              direct.
            </li>
            <li>
              Under <strong>legal requirements</strong> (subpoena, court order, legal process).
            </li>
            <li>
              In connection with a <strong>business transfer</strong> (merger, acquisition, or
              sale of assets), with notice provided.
            </li>
          </ul>
        </Section>

        <Section title="7. Data Retention">
          <ul>
            <li>
              <strong>Active client data:</strong> duration of service engagement plus three (3)
              years.
            </li>
            <li>
              <strong>Prospect and lead data:</strong> up to two (2) years from date of last
              contact.
            </li>
            <li>
              <strong>Customer data processed on your behalf (Autopilot):</strong> duration of
              service agreement plus twelve (12) months, then deleted or anonymized.
            </li>
            <li>
              <strong>Payment records:</strong> as required by applicable tax and financial
              regulations (generally seven years).
            </li>
          </ul>
        </Section>

        <Section title="8. Your Rights and Choices">
          <p>
            <strong>8.1 Access and Correction.</strong> Request access to or correction of your
            personal information at support@anovasintegratedsystems.com.
          </p>
          <p>
            <strong>8.2 Deletion.</strong> Request deletion of your personal information, subject
            to our legal obligations to retain certain records.
          </p>
          <p>
            <strong>8.3 Opt-Out of Marketing.</strong> Unsubscribe from marketing emails via the
            unsubscribe link in any marketing email or by emailing us. Transactional
            communications related to your active service will continue.
          </p>
          <p>
            <strong>8.4 Do Not Track.</strong> Our website does not currently respond to
            &quot;Do Not Track&quot; browser signals.
          </p>
          <p>
            <strong>8.5 California Residents.</strong> California residents may have additional
            rights under the CCPA, including the right to know, delete, and opt out of the sale
            of personal information. We do not sell personal information. Contact us to exercise
            your rights.
          </p>
        </Section>

        <Section title="9. Security">
          <p>We implement reasonable technical and organizational measures including:</p>
          <ul>
            <li>Encryption of data in transit (TLS) and at rest.</li>
            <li>
              Access controls limiting data access to authorized personnel and service providers.
            </li>
            <li>PCI-DSS-compliant payment processors for all payment data.</li>
          </ul>
          <p>
            No method of electronic storage is 100% secure. We cannot guarantee absolute
            security.
          </p>
        </Section>

        <Section title="10. Third-Party Links">
          <p>
            Our website and Services may contain links to third-party sites. This Privacy Policy
            does not apply to those sites.
          </p>
        </Section>

        <Section title="11. Children">
          <p>
            Our Services are not directed to individuals under 18. If you believe we have
            inadvertently collected information from a minor, contact us immediately at
            support@anovasintegratedsystems.com and we will delete it.
          </p>
        </Section>

        <Section title="12. Changes to This Privacy Policy">
          <p>
            We will notify you of material changes by email or website notice at least fourteen
            (14) days before changes take effect. Continued use after the effective date
            constitutes acceptance.
          </p>
        </Section>

        <Section title="13. Contact Us">
          <p>
            <strong>Anovas Integrated Systems LLC</strong>
            <br />
            North Little Rock, Arkansas
            <br />
            support@anovasintegratedsystems.com
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
