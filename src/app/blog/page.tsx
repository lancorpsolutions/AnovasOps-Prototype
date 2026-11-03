import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { formatPostDate, getPublishedPosts, type BlogPostSummary } from "@/lib/blog";

// Posts are published from Notion (by Nia or by hand). Re-check at most once a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "The O.S. by Anovas: practical guides on AI, automation, operations, and growth for service businesses.",
  keywords: [
    "service business blog",
    "small business automation",
    "AI for service businesses",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "The O.S. | Anovas Blog",
    description:
      "Practical guides on AI, automation, operations, and growth for service businesses.",
    url: "/blog",
    type: "website",
  },
};

async function loadPosts(): Promise<BlogPostSummary[]> {
  try {
    return await getPublishedPosts();
  } catch (err) {
    // Never take the page down because Notion is unreachable; log for Vercel.
    console.error("[blog] failed to load posts from Notion", err);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await loadPosts();

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <section className="relative overflow-hidden hero-glow bg-gradient-to-br from-navy via-navy to-navy-light text-white">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-orange-light text-xs font-semibold uppercase tracking-widest mb-4">
            The O.S. Blog
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Systems that run the business, so you don&apos;t have to.
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Practical guides on AI, automation, operations, and growth for service businesses.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="max-w-3xl mx-auto px-6 py-24 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/10 text-orange mx-auto mb-6">
            <Newspaper size={26} />
          </span>
          <h2 className="text-xl font-bold text-charcoal mb-3">New posts are on the way.</h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-lg mx-auto mb-8">
            We&apos;re building out our library of guides and articles. In the meantime, grab the
            free Revenue Leaks Guide or talk to our team about what&apos;s slowing your business down.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/revenue-leaks-guide">
                Get the Free Revenue Leaks Guide <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Talk to Us</Link>
            </Button>
          </div>
        </section>
      ) : (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-orange/40 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {post.category && (
                    <span className="rounded-full bg-orange/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-orange">
                      {post.category}
                    </span>
                  )}
                  {post.episodeUrl && (
                    <span className="rounded-full bg-navy/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-navy">
                      Episode
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-charcoal leading-snug mb-2 group-hover:text-orange">
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{post.summary}</p>
                )}
                <p className="mt-auto text-xs text-gray-400">
                  {post.author}
                  {formatPostDate(post.publishedDate) ? ` · ${formatPostDate(post.publishedDate)}` : ""}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <MarketingFooter />
    </div>
  );
}
