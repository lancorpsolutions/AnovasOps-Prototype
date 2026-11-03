import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anovasintegratedsystems.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/anovasos", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/autopilot", priority: 0.9, changeFrequency: "monthly" },
    { path: "/aros-growth-score", priority: 0.8, changeFrequency: "monthly" },
    { path: "/revenue-leaks-guide", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
  ];

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let posts: MetadataRoute.Sitemap = [];
  try {
    posts = (await getPublishedPosts()).map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.publishedDate ? new Date(post.publishedDate) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (err) {
    console.error("[sitemap] failed to load blog posts", err);
  }

  return [...pages, ...posts];
}
