/* eslint-disable @next/next/no-img-element */
import { getDictionary } from "@/i18n/dictionaries";
import { SUPPORTED_LOCALES, SEO_LOCALES, isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { getPost, getAllPosts, getPostSlugs } from "@/lib/posts";
import { getPostViews } from "@/lib/ga4";
import { BlogMarkdown } from "@/components/blog/blog-markdown";
import { Comments } from "@/components/blog/comments";
import { PopularPosts } from "@/components/blog/popular-posts";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  const params: Array<{ lang: string; slug: string }> = [];
  for (const lang of SUPPORTED_LOCALES) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const post = getPost(lang as Locale, slug);
  if (!post) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: `${post.title} — ${dict.header.blog}`,
    description: post.summary ?? post.title,
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: Object.fromEntries([
        ...SEO_LOCALES.map((l) => [l, `/${l}/blog/${slug}`]),
        ["x-default", `/en/blog/${slug}`],
      ]),
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary ?? post.title,
      locale: lang,
      url: `/${lang}/blog/${slug}`,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      ...(post.hero ? { images: [{ url: post.hero }] } : {}),
    },
    twitter: {
      card: post.hero ? "summary_large_image" : "summary",
      title: post.title,
      description: post.summary ?? post.title,
      ...(post.hero ? { images: [post.hero] } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const post = getPost(lang as Locale, slug);
  if (!post) notFound();

  const [dict, session, viewsMap] = await Promise.all([
    getDictionary(lang as Locale),
    auth(),
    getPostViews(),
  ]);
  const views = viewsMap[slug] ?? 0;
  const allPosts = getAllPosts(lang as Locale);
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary ?? post.title,
    ...(post.hero
      ? {
          image: post.hero.startsWith("http")
            ? post.hero
            : `https://naia.nextain.io${post.hero}`,
        }
      : {}),
    datePublished: post.date,
    author: post.author
      ? { "@type": "Person", name: post.author }
      : undefined,
    publisher: { "@type": "Organization", name: "Nextain" },
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8">
        <Link
          href={`/${lang}/blog`}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; {dict.header.blog}
        </Link>
      </div>

      <header>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(lang, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.author && (
            <span>
              ·{" "}
              {post.authorUrl ? (
                <a
                  href={post.authorUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  {post.author}
                </a>
              ) : (
                post.author
              )}
            </span>
          )}
          {views > 0 && (
            <span className="flex items-center gap-1">
              · <Eye className="h-3.5 w-3.5" /> {views.toLocaleString()}
            </span>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-bold">{post.title}</h1>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <BlogMarkdown markdown={post.content} slug={post.slug} />

      <PopularPosts
        lang={lang}
        excludeSlugs={[
          slug,
          ...(prevPost ? [prevPost.slug] : []),
          ...(nextPost ? [nextPost.slug] : []),
        ]}
      />

      {/* License badge */}
      <div className="mt-10 flex items-center gap-3 border-t border-border/40 pt-6 text-xs text-muted-foreground">
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png"
            alt="CC BY-NC-SA 4.0"
            width={88}
            height={31}
          />
        </a>
        <span>
          {lang === "ko"
            ? "이 글은 CC BY-NC-SA 4.0 라이선스로 제공됩니다."
            : "This post is licensed under CC BY-NC-SA 4.0."}
        </span>
      </div>

      <Comments slug={slug} session={session} locale={lang} dict={dict.comments} />

      {/* Prev / Next navigation */}
      <nav className="mt-12 grid grid-cols-1 gap-4 border-t border-border/40 pt-6 sm:grid-cols-2">
        {prevPost ? (
          <Link
            href={`/${lang}/blog/${prevPost.slug}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-border/50 transition-colors hover:border-border"
          >
            {prevPost.hero && (
              <div className="aspect-[3/1] overflow-hidden bg-muted/30">
                <img
                  src={prevPost.hero}
                  alt={prevPost.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex items-center gap-2 p-3">
              <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground line-clamp-2">
                {prevPost.title}
              </span>
            </div>
          </Link>
        ) : (
          <span />
        )}
        {nextPost ? (
          <Link
            href={`/${lang}/blog/${nextPost.slug}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-border/50 transition-colors hover:border-border"
          >
            {nextPost.hero && (
              <div className="aspect-[3/1] overflow-hidden bg-muted/30">
                <img
                  src={nextPost.hero}
                  alt={nextPost.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex items-center justify-end gap-2 p-3">
              <span className="text-sm text-right text-muted-foreground group-hover:text-foreground line-clamp-2">
                {nextPost.title}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
