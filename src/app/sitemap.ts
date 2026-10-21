import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anovasintegratedsystems.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/anovasos", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/autopilot", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/ai-agents", priority: 0.7, changeFrequency: "monthly" },
    ...[
      "brand-identity", "website-design", "seo", "google-my-business", "social-media",
      "content-creation", "graphic-design", "paid-advertising", "business-structure",
    ].map((slug) => ({ path: `/services/${slug}`, priority: 0.6, changeFrequency: "monthly" as const })),
    { path: "/aros-growth-score", priority: 0.9, changeFrequency: "monthly" },
    { path: "/diagnostic/sample-report", priority: 0.7, changeFrequency: "monthly" },
    { path: "/book", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/revenue-leaks-guide", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
