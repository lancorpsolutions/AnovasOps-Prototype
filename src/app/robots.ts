import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anovasintegratedsystems.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/anovasos/login", "/anovasos/signup"],
      disallow: ["/anovasos", "/anovasos/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
