import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { BlogMarkdown } from "@/components/marketing/blog-markdown";
import { formatPostDate, getPostBySlug, getPublishedPosts, youtubeEmbedUrl } from "@/lib/blog";

// Re-check Notion at most once a minute; posts published after the last
// build are rendered on first request.
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch (err) {
    console.error("[blog] generateStaticParams failed", err);
    return [];
  }
}

async function load(slug: string) {
  try {
    return await getPostBySlug(slug);
  } catch (err) {
    console.error(`[blog] failed to load post "${slug}"`, err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await load(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.summary || undefined,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary || undefined,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedDate ?? undefined,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await load(slug);
  if (!post) notFound();

  const embed = youtubeEmbedUrl(post.episodeUrl);
  const date = formatPostDate(post.publishedDate);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary || undefined,
    datePublished: post.publishedDate ?? undefined,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Anovas Integrated Systems" },
    ...(post.episodeUrl ? { video: { "@type": "VideoObject", name: post.title, contentUrl: post.episodeUrl } } : {}),
  };

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <article className="max-w-3xl mx-auto px-6 py-14">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-orange mb-8">
          <ArrowLeft size={14} /> All posts
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {post.category && (
            <span className="rounded-full bg-orange/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-orange">
              {post.category}
            </span>
          )}
          {post.vertical && (
            <span className="rounded-full bg-navy/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-navy">
              {post.vertical}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-10">
          By {post.author}
          {date ? ` · ${date}` : ""}
        </p>

        {/* The O.S. pairs each post with its mini-series episode, shown above the article. */}
        {embed ? (
          <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl bg-navy shadow-lg">
            <iframe
              src={embed}
              title={`${post.title} episode`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : post.episodeUrl ? (
          <a
            href={post.episodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-10 flex items-center gap-3 rounded-2xl bg-navy p-5 text-white hover:bg-navy-light"
          >
            <PlayCircle size={28} className="text-orange-light shrink-0" />
            <span className="text-sm font-semibold">Watch this episode of The O.S.</span>
          </a>
        ) : null}

        <BlogMarkdown markdown={post.markdown} />

        <div className="mt-14 rounded-2xl bg-gradient-to-br from-navy to-navy-light p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">See where your business is leaking time and money.</h2>
          <p className="text-sm text-white/70 mb-6">The free AROS Growth Score takes about five minutes.</p>
          <Button asChild variant="primary" size="lg">
            <Link href="/aros-growth-score">
              Get Your Free Growth Score <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <MarketingFooter />
    </div>
  );
}
