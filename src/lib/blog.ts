/**
 * The O.S. blog — posts live in the Notion database "The O.S. — Blog Posts".
 * Nia (the n8n marketing agent) creates entries there as Draft; only entries
 * whose Status is "Published" are shown on the website.
 *
 * Required env (server-only):
 *   NOTION_TOKEN             Internal integration secret with access to the database
 *   NOTION_BLOG_DATABASE_ID  Optional override; defaults to The O.S. — Blog Posts
 */

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";
const DEFAULT_DATABASE_ID = "0b5bf11828ea4ed2a838ea5032d652da";

export type BlogPostSummary = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string | null;
  pillar: string | null;
  vertical: string | null;
  author: string;
  publishedDate: string | null;
  episodeUrl: string | null;
};

export type BlogPost = BlogPostSummary & { markdown: string };

/* ---------- Notion API shapes (only the parts we read) ---------- */

type RichText = { plain_text: string };
type NotionProperty =
  | { type: "title"; title: RichText[] }
  | { type: "rich_text"; rich_text: RichText[] }
  | { type: "select"; select: { name: string } | null }
  | { type: "date"; date: { start: string } | null }
  | { type: "url"; url: string | null }
  | { type: string };
type NotionPage = {
  id: string;
  created_time: string;
  properties: Record<string, NotionProperty>;
};
type NotionBlock = {
  id: string;
  type: string;
  has_children: boolean;
  [key: string]: unknown;
};

function isConfigured() {
  return Boolean(process.env.NOTION_TOKEN);
}

async function notion<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const res = await fetch(`${NOTION_API}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`Notion API ${res.status} on ${path}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

/* ---------- property helpers ---------- */

function text(prop: NotionProperty | undefined): string {
  if (!prop) return "";
  if (prop.type === "title" && "title" in prop) return prop.title.map((t) => t.plain_text).join("");
  if (prop.type === "rich_text" && "rich_text" in prop) return prop.rich_text.map((t) => t.plain_text).join("");
  return "";
}

function select(prop: NotionProperty | undefined): string | null {
  return prop && prop.type === "select" && "select" in prop ? (prop.select?.name ?? null) : null;
}

function date(prop: NotionProperty | undefined): string | null {
  return prop && prop.type === "date" && "date" in prop ? (prop.date?.start ?? null) : null;
}

function url(prop: NotionProperty | undefined): string | null {
  return prop && prop.type === "url" && "url" in prop ? prop.url || null : null;
}

export function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "post"
  );
}

/* ---------- posts ---------- */

/** All posts with Status = Published, newest first. Returns [] if Notion isn't configured. */
export async function getPublishedPosts(): Promise<BlogPostSummary[]> {
  if (!isConfigured()) return [];
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID || DEFAULT_DATABASE_ID;

  const pages: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion<{ results: NotionPage[]; has_more: boolean; next_cursor: string | null }>(
      `/databases/${databaseId}/query`,
      {
        method: "POST",
        body: {
          filter: { property: "Status", select: { equals: "Published" } },
          sorts: [{ property: "Published Date", direction: "descending" }],
          page_size: 100,
          ...(cursor ? { start_cursor: cursor } : {}),
        },
      },
    );
    pages.push(...res.results);
    cursor = res.has_more && res.next_cursor ? res.next_cursor : undefined;
  } while (cursor);

  const seen = new Map<string, number>();
  return pages
    .map((page) => {
      const p = page.properties;
      const title = text(p["Title"]).trim() || "Untitled";
      return {
        id: page.id,
        slug: "",
        title,
        summary: text(p["Summary"]).trim(),
        category: select(p["Category"]),
        pillar: select(p["Content Pillar"]),
        vertical: text(p["Vertical / Niche"]).trim() || null,
        author: text(p["Author"]).trim() || "Josh Rucker",
        publishedDate: date(p["Published Date"]) ?? page.created_time,
        episodeUrl: url(p["Series Episode URL"]),
      };
    })
    .sort((a, b) => (b.publishedDate ?? "").localeCompare(a.publishedDate ?? ""))
    .map((post) => {
      // Stable, readable slugs; disambiguate duplicate titles oldest-first.
      const base = slugify(post.title);
      const n = (seen.get(base) ?? 0) + 1;
      seen.set(base, n);
      return { ...post, slug: n === 1 ? base : `${base}-${n}` };
    });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPublishedPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  const blocks = await getAllBlocks(post.id);
  return { ...post, markdown: blocksToMarkdown(blocks) };
}

/* ---------- body: Notion blocks -> markdown ---------- */

async function getAllBlocks(blockId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;
  do {
    const qs = new URLSearchParams({ page_size: "100", ...(cursor ? { start_cursor: cursor } : {}) });
    const res = await notion<{ results: NotionBlock[]; has_more: boolean; next_cursor: string | null }>(
      `/blocks/${blockId}/children?${qs}`,
    );
    blocks.push(...res.results);
    cursor = res.has_more && res.next_cursor ? res.next_cursor : undefined;
  } while (cursor);
  return blocks;
}

function blockText(block: NotionBlock): string {
  const data = block[block.type] as { rich_text?: RichText[] } | undefined;
  return (data?.rich_text ?? []).map((t) => t.plain_text).join("");
}

/**
 * Nia's n8n tool writes the markdown body into paragraph blocks in fixed
 * 1,900-character slices (cut mid-sentence), padding unused slots with " ".
 * A slice that is exactly that long continues straight into the next block,
 * so it's joined with no separator. Everything else (including blocks Josh
 * edits by hand in Notion) is treated as normal block content.
 */
export const NIA_CHUNK_SIZE = 1900;

export function blocksToMarkdown(blocks: NotionBlock[]): string {
  let out = "";
  let glueNext = false;
  let numbered = 0;
  let prevType = "";

  for (const block of blocks) {
    const raw = blockText(block);
    if (block.type === "paragraph" && raw.trim() === "") {
      glueNext = false;
      prevType = "";
      continue;
    }

    let piece: string;
    switch (block.type) {
      case "heading_1":
        piece = `# ${raw}`;
        break;
      case "heading_2":
        piece = `## ${raw}`;
        break;
      case "heading_3":
        piece = `### ${raw}`;
        break;
      case "bulleted_list_item":
        piece = `- ${raw}`;
        break;
      case "numbered_list_item":
        piece = `${++numbered}. ${raw}`;
        break;
      case "quote":
        piece = raw
          .split("\n")
          .map((l) => `> ${l}`)
          .join("\n");
        break;
      case "code":
        piece = "```\n" + raw + "\n```";
        break;
      case "divider":
        piece = "---";
        break;
      default:
        piece = raw;
    }
    if (block.type !== "numbered_list_item") numbered = 0;

    const sameList = block.type === prevType && block.type.endsWith("_list_item");
    if (out === "") out = piece;
    else if (glueNext) out += piece;
    else out += (sameList ? "\n" : "\n\n") + piece;

    glueNext = block.type === "paragraph" && raw.length === NIA_CHUNK_SIZE;
    prevType = block.type;
  }
  return out.trim();
}

/** "November 3, 2026" in Central time; date-only values are treated as that calendar day. */
export function formatPostDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago" });
}

/** Turn a YouTube link into an embeddable URL; null for anything else. */
export function youtubeEmbedUrl(link: string | null): string | null {
  if (!link) return null;
  try {
    const u = new URL(link);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    let id: string | null = null;
    if (host === "youtu.be") id = u.pathname.slice(1);
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else {
        const m = u.pathname.match(/^\/(shorts|embed|live)\/([^/?#]+)/);
        if (m) id = m[2];
      }
    }
    return id && /^[\w-]{6,}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}
