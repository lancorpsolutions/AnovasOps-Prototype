import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Anovas Integrated Systems",
  description: "How Anovas Integrated Systems and AnovasOS collect, use, store, and protect your information.",
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-navy mt-9 mb-3">{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-bold text-charcoal mt-5 mb-2">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-600 leading-relaxed mb-3">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-5 text-sm text-gray-600 leading-relaxed mb-3 space-y-1">{children}</ul>;
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-lg border border-orange/40 bg-orange/5 px-4 py-3 mb-8">
          <p className="text-xs font-bold text-orange uppercase tracking-wide mb-1">
            Attorney Review Draft — Do Not Publish Without Legal Sign-Off
          </p>
          <p className="text-xs text-gray-500">Version: v1.0 — June 15, 2026</p>
        </div>

        <h1 className="text-2xl font-bold text-navy mb-1">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-1">Anovas Integrated Systems</p>
        <p className="text-xs text-gray-400 mb-1">Effective Date: [To be set upon publication]</p>
        <p className="text-xs text-gray-400 mb-8">Last Updated: June 15, 2026</p>
        <p className="text-xs text-gray-400 mb-8">
          Anovas Integrated Systems LLC · North Little Rock, Arkansas ·{" "}
          <a href="mailto:support@anovasintegratedsystems.com" className="underline">
            support@anovasintegratedsystems.com
          </a>
        </p>

        <H2>1. Introduction</H2>
        <P>
          Anovas Integrated Systems LLC respects your privacy and is committed to protecting the
          personal and business information you share with us. This Privacy Policy explains how
          we collect, use, store, share, and protect information when you use our website,
          products (Anovas Autopilot, AnovasOS), and professional services.
        </P>
        <P>
          By using our Services, you agree to the collection and use of information in accordance
          with this Privacy Policy.
        </P>

        <H2>2. Who This Policy Applies To</H2>
        <Ul>
          <li>
            <strong>Business clients and their representatives</strong> who use Anovas Autopilot
            or AnovasOS.
          </li>
          <li>
            <strong>Prospective clients</strong> who complete the AROS Growth Score, submit
            inquiry forms, download a lead magnet, or interact with our website or marketing
            materials.
          </li>
          <li>
            <strong>End users</strong> (customers of our clients) whose contact information is
            processed by Anovas on behalf of our clients as part of Anovas Autopilot automations.
          </li>
        </Ul>
        <P>
          <strong>AnovasOS is a business-to-business platform</strong> and is not intended for
          personal or consumer use. We do not knowingly collect personal information from
          individuals under the age of 18.
        </P>

        <H2>3. Information We Collect</H2>
        <H3>3.1 Information You Provide Directly</H3>
        <Ul>
          <li>
            Account and contact information: name, business name, email, phone, business address,
            and business type.
          </li>
          <li>Business diagnostic data: responses to our AROS Growth Score assessment.</li>
          <li>
            Lead magnet downloads: name, email, and company name submitted when requesting a free
            guide or resource, and which resource you requested.
          </li>
          <li>
            Service communications: messages, approvals, instructions, and content you provide
            during service delivery.
          </li>
          <li>
            Payment information: billing name, address, and payment method. Full payment card
            numbers are processed and stored exclusively by Stripe and/or PayPal and are never
            stored on Anovas servers.
          </li>
        </Ul>

        <H3>3.2 Customer Data Processed on Your Behalf</H3>
        <P>
          As part of Anovas Autopilot, you may provide us with contact information for your
          customers and leads. We process this data solely on your behalf and under your
          instruction. You are the data controller. We are the data processor. You are
          responsible for ensuring you have obtained all legally required consents.
        </P>

        <H3>3.3 Information Collected Automatically</H3>
        <Ul>
          <li>Usage data: pages visited, time spent, links clicked, referring URLs.</li>
          <li>
            Device and browser data: IP address, browser type, operating system, device
            identifiers.
          </li>
          <li>Cookie data: as described in our Cookie Policy.</li>
        </Ul>

        <H3>3.4 Information from Third-Party Sources</H3>
        <P>
          We may receive information from HubSpot (CRM), n8n (workflow automation), and Microsoft
          365 (communications).
        </P>

        <H2>4. How We Use Your Information</H2>
        <Ul>
          <li>Deliver and manage Services, including sending requested lead magnets and resources.</li>
          <li>Process payments through our payment processors.</li>
          <li>Communicate with you regarding onboarding, billing, and support.</li>
          <li>Improve our Services by analyzing usage patterns.</li>
          <li>Sales and marketing follow-up (you may opt out at any time).</li>
          <li>Comply with legal obligations.</li>
          <li>Detect, prevent, and address fraud and abuse.</li>
        </Ul>

        <H2>5. How We Store Your Information</H2>
        <H3>5.1 Primary Database</H3>
        <P>
          Personal and business data is stored in <strong>Supabase</strong>, a cloud database
          provider operating in the United States, with encryption at rest and in transit.
        </P>
        <H3>5.2 Payment Data</H3>
        <P>
          Stored and managed exclusively by <strong>Stripe</strong> and/or <strong>PayPal</strong>{" "}
          on PCI-DSS-compliant infrastructure. Anovas stores only non-sensitive billing
          identifiers.
        </P>
        <H3>5.3 CRM and Communications</H3>
        <P>
          Client contact and pipeline data, including lead magnet submissions, is stored in{" "}
          <strong>HubSpot</strong>. Business communications are processed through{" "}
          <strong>Microsoft 365</strong>. Workflow execution logs are stored in{" "}
          <strong>n8n</strong> cloud.
        </P>
        <H3>5.4 Data Location</H3>
        <P>
          All primary vendors are US-based. We do not intentionally transfer personal data outside
          the United States.
        </P>

        <H2>6. How We Share Your Information</H2>
        <P>
          We do not sell your personal information. We do not share your information with third
          parties for their own marketing purposes. We share information only:
        </P>
        <Ul>
          <li>
            With <strong>service delivery partners</strong> (Supabase, HubSpot, Stripe, PayPal,
            n8n, Microsoft 365) solely to deliver the Services.
          </li>
          <li>
            Per <strong>your instructions</strong> for integrations or implementations you direct.
          </li>
          <li>
            Under <strong>legal requirements</strong> (subpoena, court order, legal process).
          </li>
          <li>
            In connection with a <strong>business transfer</strong> (merger, acquisition, or sale
            of assets), with notice provided.
          </li>
        </Ul>

        <H2>7. Data Retention</H2>
        <Ul>
          <li>
            <strong>Active client data:</strong> duration of service engagement plus three (3)
            years.
          </li>
          <li>
            <strong>Prospect and lead data (including lead magnet submissions):</strong> up to two
            (2) years from date of last contact.
          </li>
          <li>
            <strong>Customer data processed on your behalf (Autopilot):</strong> duration of
            service agreement plus twelve (12) months, then deleted or anonymized.
          </li>
          <li>
            <strong>Payment records:</strong> as required by applicable tax and financial
            regulations (generally seven years).
          </li>
        </Ul>

        <H2>8. Your Rights and Choices</H2>
        <H3>8.1 Access and Correction</H3>
        <P>
          Request access to or correction of your personal information at{" "}
          <a href="mailto:support@anovasintegratedsystems.com" className="underline">
            support@anovasintegratedsystems.com
          </a>
          .
        </P>
        <H3>8.2 Deletion</H3>
        <P>
          Request deletion of your personal information, subject to our legal obligations to
          retain certain records.
        </P>
        <H3>8.3 Opt-Out of Marketing</H3>
        <P>
          Unsubscribe from marketing emails via the unsubscribe link in any marketing email or by
          emailing us. Transactional communications related to your active service will continue.
        </P>
        <H3>8.4 Do Not Track</H3>
        <P>Our website does not currently respond to &quot;Do Not Track&quot; browser signals.</P>
        <H3>8.5 California Residents</H3>
        <P>
          California residents may have additional rights under the CCPA, including the right to
          know, delete, and opt out of the sale of personal information. We do not sell personal
          information. Contact us to exercise your rights.
        </P>

        <H2>9. Security</H2>
        <P>We implement reasonable technical and organizational measures including:</P>
        <Ul>
          <li>Encryption of data in transit (TLS) and at rest.</li>
          <li>
            Access controls limiting data access to authorized personnel and service providers.
          </li>
          <li>PCI-DSS-compliant payment processors for all payment data.</li>
        </Ul>
        <P>No method of electronic storage is 100% secure. We cannot guarantee absolute security.</P>

        <H2>10. Third-Party Links</H2>
        <P>
          Our website and Services may contain links to third-party sites. This Privacy Policy
          does not apply to those sites.
        </P>

        <H2>11. Children</H2>
        <P>
          Our Services are not directed to individuals under 18. If you believe we have
          inadvertently collected information from a minor, contact us immediately at{" "}
          <a href="mailto:support@anovasintegratedsystems.com" className="underline">
            support@anovasintegratedsystems.com
          </a>{" "}
          and we will delete it.
        </P>

        <H2>12. Changes to This Privacy Policy</H2>
        <P>
          We will notify you of material changes by email or website notice at least fourteen (14)
          days before changes take effect. Continued use after the effective date constitutes
          acceptance.
        </P>

        <H2>13. Contact Us</H2>
        <P>
          <strong>Anovas Integrated Systems LLC</strong>
          <br />
          North Little Rock, Arkansas
          <br />
          <a href="mailto:support@anovasintegratedsystems.com" className="underline">
            support@anovasintegratedsystems.com
          </a>
        </P>
      </div>
    </div>
  );
}
