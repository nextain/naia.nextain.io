import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/config";
import { DEFAULT_LOCALE } from "@/i18n/config";

type Frontmatter = {
  title?: string;
  date?: string;
  summary?: string;
  tags?: string[] | string;
  hero?: string;
  author?: string;
  draft?: boolean;
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  hero?: string;
  locale: Locale;
  sourceLocale: Locale;
  draft: boolean;
  author?: string;
  authorUrl?: string;
  tags: string[];
};

export type Post = PostMeta & { content: string };

const POST_ROOT = path.join(process.cwd(), "public/posts");

const LOCALE_PREFERENCE: Record<string, Locale[]> = {
  ko: ["ko"],
  en: ["en", "ko"],
};

function safeRead(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function parseFrontmatter(source: string): { data: Frontmatter; content: string } {
  if (!source.startsWith("---")) return { data: {}, content: source.trim() };

  const endIndex = source.indexOf("\n---", 3);
  if (endIndex === -1) return { data: {}, content: source.trim() };

  const rawFrontmatter = source.slice(3, endIndex).trim();
  const body = source.slice(endIndex + 4).trimStart();
  const data: Record<string, unknown> = {};

  for (const line of rawFrontmatter.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }

    if (value.startsWith("[") && value.endsWith("]")) {
      try {
        data[key] = JSON.parse(value.replace(/'/g, '"'));
        continue;
      } catch {
        // fall through
      }
    }

    if (value === "true") data[key] = true;
    else if (value === "false") data[key] = false;
    else data[key] = value;
  }

  return { data: data as Frontmatter, content: body.trim() };
}

function parseAuthor(value: string | undefined): { name: string; url?: string } | null {
  if (!value) return null;
  const match = value.match(/^\s*([^()]+?)\s*(?:\((https?:\/\/[^)]+)\))?\s*$/);
  const name = (match?.[1] || value).trim();
  const url = match?.[2]?.trim();
  if (!name) return null;
  return { name, url };
}

function normalizeTags(tags?: string[] | string): string[] {
  if (!tags) return [];
  const raw = Array.isArray(tags) ? tags : tags.split(",");
  const cleaned = raw
    .map((tag) => tag.trim().replace(/^#/, ""))
    .filter((tag) => tag.length > 0);
  return Array.from(new Set(cleaned));
}

function normalizeHero(hero: string | undefined, slug: string): string | undefined {
  if (!hero) return undefined;
  const trimmed = hero.trim();
  if (trimmed.startsWith("http") || trimmed.startsWith("/")) return trimmed;
  return `/posts/${slug}/${trimmed}`;
}

function findFileForLocale(
  slug: string,
  locale: Locale,
): { content: string; foundLocale: Locale } | null {
  const preferences = LOCALE_PREFERENCE[locale] || [locale, DEFAULT_LOCALE];
  const slugDir = path.join(POST_ROOT, slug);

  if (!fs.existsSync(slugDir) || !fs.statSync(slugDir).isDirectory()) return null;

  for (const candidateLocale of preferences) {
    const filePath = path.join(slugDir, `index.${candidateLocale}.md`);
    const content = safeRead(filePath);
    if (content && content.trim().length > 0) {
      return { content, foundLocale: candidateLocale };
    }
  }

  // Fallback: index.md
  const fallbackContent = safeRead(path.join(slugDir, "index.md"));
  if (fallbackContent && fallbackContent.trim().length > 0) {
    return { content: fallbackContent, foundLocale: DEFAULT_LOCALE };
  }

  return null;
}

function buildPost(slug: string, locale: Locale): Post | null {
  const resolved = findFileForLocale(slug, locale);
  if (!resolved) return null;

  const { data, content } = parseFrontmatter(resolved.content);

  const title = data.title || slug;
  const date = data.date || new Date().toISOString();
  const draft = typeof data.draft === "boolean" ? data.draft : false;
  const author = parseAuthor(data.author);

  return {
    slug,
    title,
    date,
    summary: data.summary,
    hero: normalizeHero(data.hero, slug),
    locale,
    sourceLocale: data.draft !== undefined ? resolved.foundLocale : resolved.foundLocale,
    draft,
    author: author?.name,
    authorUrl: author?.url,
    tags: normalizeTags(data.tags),
    content: content.trim(),
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POST_ROOT)) return [];
  try {
    return fs
      .readdirSync(POST_ROOT)
      .filter((entry) => fs.statSync(path.join(POST_ROOT, entry)).isDirectory())
      .sort();
  } catch {
    return [];
  }
}

export function getPost(
  locale: Locale,
  slug: string,
  opts?: { includeDrafts?: boolean },
): Post | null {
  const post = buildPost(slug, locale);
  if (!post) return null;
  if (post.draft && !opts?.includeDrafts) return null;
  return post;
}

export function getAllPosts(locale: Locale, opts?: { includeDrafts?: boolean }): Post[] {
  return getPostSlugs()
    .map((slug) => getPost(locale, slug, { includeDrafts: opts?.includeDrafts }))
    .filter((post): post is Post => Boolean(post && post.title && post.content.length > 0))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
