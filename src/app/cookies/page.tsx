import Link from "next/link";

export const metadata = {
  title: "Cookie Policy",
  alternates: { canonical: "/cookies" },
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-xs text-gray-400 mb-6">
          <Link href="/anovasos/login" className="text-orange font-medium">
            ← Back
          </Link>
        </p>

        <h1 className="text-2xl font-bold text-charcoal mb-1">
          Cookie Policy — Anovas Integrated Systems
        </h1>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Effective Date:</strong> June 23, 2026
        </p>
        <p className="text-sm text-gray-500 mb-8">
          <strong>Last Updated:</strong> June 23, 2026
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Anovas Integrated Systems LLC · North Little Rock, Arkansas ·{" "}
          support@anovasintegratedsystems.com
        </p>

        <Section title="1. What Are Cookies?">
          <p>
            Cookies are small text files placed on your device when you visit a website. They
            allow the website to recognize your device, remember your preferences, and gather
            information about how you interact with the site.
          </p>
        </Section>

        <Section title="2. How We Use Cookies">
          <p>
            <strong>2.1 Strictly Necessary Cookies.</strong> Essential for the website and
            platform to function. Cannot be opted out of.
          </p>
          <ul>
            <li>Session tokens keeping you logged into your account.</li>
            <li>Security cookies detecting and preventing fraudulent activity.</li>
            <li>Load balancing cookies routing your requests to the correct server.</li>
          </ul>
          <p>
            <strong>2.2 Functional Cookies.</strong> Allow us to remember your preferences and
            personalize your experience.
          </p>
          <ul>
            <li>Remembering your account settings and preferences.</li>
            <li>Storing your timezone or language preferences.</li>
          </ul>
          <p>
            <strong>2.3 Analytics Cookies.</strong> Help us understand how visitors use our
            website so we can improve it. Data is aggregated and anonymous.
          </p>
          <ul>
            <li>Tracking which pages are most visited.</li>
            <li>Measuring time spent on pages.</li>
            <li>Identifying navigation paths through the site.</li>
          </ul>
          <p>
            <strong>2.4 Marketing and Advertising Cookies.</strong> Used to deliver relevant
            information about our Services after you leave our website, or to measure marketing
            campaign effectiveness.
          </p>
          <ul>
            <li>Tracking whether you came from a specific ad or link.</li>
            <li>Retargeting pixels allowing us to show relevant ads on other platforms.</li>
          </ul>
        </Section>

        <Section title="3. Third-Party Cookies">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-3 py-2 font-semibold text-charcoal">Provider</th>
                <th className="px-3 py-2 font-semibold text-charcoal">Purpose</th>
                <th className="px-3 py-2 font-semibold text-charcoal">Learn More</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-3 py-2">Stripe</td>
                <td className="px-3 py-2">Payment processing</td>
                <td className="px-3 py-2">stripe.com/privacy</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-3 py-2">PayPal</td>
                <td className="px-3 py-2">Payment processing</td>
                <td className="px-3 py-2">paypal.com/privacy</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-3 py-2">HubSpot</td>
                <td className="px-3 py-2">CRM and marketing analytics</td>
                <td className="px-3 py-2">legal.hubspot.com/privacy-policy</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-3 py-2">Microsoft</td>
                <td className="px-3 py-2">Website analytics</td>
                <td className="px-3 py-2">privacy.microsoft.com</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-2">
            Update this table to reflect the actual third-party scripts deployed on your
            production website before publishing.
          </p>
        </Section>

        <Section title="4. Your Cookie Choices">
          <p>
            <strong>4.1 Browser Settings.</strong> Most browsers allow you to view, block, or
            delete cookies through their settings. Blocking cookies may affect the functionality
            of our website and your ability to log in.
          </p>
          <ul>
            <li>Chrome: support.google.com/chrome/answer/95647</li>
            <li>Firefox: support.mozilla.org</li>
            <li>Safari: support.apple.com</li>
            <li>Edge: support.microsoft.com</li>
          </ul>
          <p>
            <strong>4.2 Opt-Out of Analytics.</strong> If we use Google Analytics, you can opt
            out by installing the Google Analytics Opt-out Browser Add-on at
            tools.google.com/dlpage/gaoptout.
          </p>
          <p>
            <strong>4.3 Cookie Consent Banner.</strong> Where required by law, we will present a
            cookie consent banner when you first visit our website. You can update your
            preferences at any time through the cookie settings link in our website footer.
          </p>
          <p className="text-xs text-gray-400">
            Implementation note: A cookie consent management platform (Cookiebot, OneTrust free
            tier, or Termly) should be implemented on the production website before launch if you
            are targeting any EU or UK visitors.
          </p>
        </Section>

        <Section title="5. Do Not Track">
          <p>
            Our website does not currently respond to &quot;Do Not Track&quot; browser signals.
          </p>
        </Section>

        <Section title="6. Data Collected via Cookies">
          <p>
            The data collected through cookies may include IP address, browser type and version,
            operating system, pages visited and time spent, referring URL, and device type and
            screen resolution. This data is used in accordance with our Privacy Policy.
          </p>
        </Section>

        <Section title="7. Cookies in Our Products">
          <p>
            Anovas Autopilot and AnovasOS use session cookies and authentication tokens when you
            access the platform. These are strictly necessary and cannot be disabled without
            preventing access to the platform.
          </p>
        </Section>

        <Section title="8. Changes to This Cookie Policy">
          <p>
            We may update this Cookie Policy for operational, legal, or regulatory reasons. The
            date at the top indicates when it was last updated.
          </p>
        </Section>

        <Section title="9. Contact Us">
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
