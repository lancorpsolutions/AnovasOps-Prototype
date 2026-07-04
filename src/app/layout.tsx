import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anovasintegratedsystems.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anovas Integrated Systems | Software & Growth Services for Service Businesses",
    template: "%s | Anovas Integrated Systems",
  },
  description:
    "Anovas Integrated Systems builds AnovasOS and Anovas Autopilot, and provides business formation, branding, web design, and growth strategy for HVAC, plumbing, electrical, roofing, landscaping, and other local and home service businesses.",
  keywords: [
    "home service business software",
    "local service business growth platform",
    "revenue protection system for contractors",
    "missed call text back software",
    "HVAC plumbing electrical roofing software",
    "business formation services",
    "branding and web design for contractors",
    "AnovasOS",
    "Anovas Autopilot",
    "Anovas Integrated Systems",
  ],
  authors: [{ name: "Anovas Integrated Systems" }],
  creator: "Anovas Integrated Systems",
  publisher: "Anovas Integrated Systems",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Anovas Integrated Systems",
    locale: "en_US",
    url: siteUrl,
    title: "Anovas Integrated Systems | Software & Growth Services for Service Businesses",
    description:
      "AnovasOS, Anovas Autopilot, and a full suite of professional services for local and home service businesses across the U.S.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anovas Integrated Systems",
    description:
      "Software and growth services for local and home service businesses: AnovasOS, Anovas Autopilot, branding, web design, and strategy.",
  },
  icons: {
    icon: "/branding/anovas-phoenix-icon.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Anovas Integrated Systems",
  legalName: "Anovas Integrated Systems LLC",
  url: siteUrl,
  logo: `${siteUrl}/branding/ais-logo-full-transparent.png`,
  email: "support@anovasintegratedsystems.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Little Rock",
    addressRegion: "AR",
    addressCountry: "US",
  },
  areaServed: "US",
  sameAs: [],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "SoftwareApplication", name: "AnovasOS" } },
    { "@type": "Offer", itemOffered: { "@type": "SoftwareApplication", name: "Anovas Autopilot" } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
