/* eslint-disable @next/next/no-img-element */
import { getDictionary } from "@/i18n/dictionaries";
import { SUPPORTED_LOCALES, SEO_LOCALES, isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/posts";
import { getPostViews } from "@/lib/ga4";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: `${dict.header.blog} — ${dict.meta.title}`,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}/blog`,
      languages: Object.fromEntries([
        ...SEO_LOCALES.map((l) => [l, `/${l}/blog`]),
        ["x-default", "/en/blog"],
      ]),
    },
    openGraph: {
      title: `${dict.header.blog} — ${dict.meta.title}`,
      description: dict.meta.description,
      locale: lang,
      url: `/${lang}/blog`,
      images: [{ url: "/branding/character/naia-default-character.png", width: 800, height: 800, alt: "Naia" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.header.blog} — ${dict.meta.title}`,
      description: dict.meta.description,
      images: ["/branding/character/naia-default-character.png"],
    },
  };
}

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const [posts, viewsMap] = await Promise.all([
    getAllPosts(lang as Locale),
    getPostViews(),
  ]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold">{dict.header.blog}</h1>
      <p className="mt-2 text-muted-foreground">
        {lang === "ko"
          ? "프로젝트 소식, 철학, 기술 이야기"
          : "Project news, philosophy, and tech stories"}
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          {lang === "ko" ? "아직 포스트가 없습니다." : "No posts yet."}
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-background transition-colors hover:border-border"
            >
              <Link href={`/${lang}/blog/${post.slug}`} className="flex flex-col flex-1">
                {post.hero && (
                  <div className="aspect-[2/1] overflow-hidden bg-muted/30">
                    <img
                      src={post.hero}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(lang, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {post.author && <span>· {post.author}</span>}
                    {(viewsMap[post.slug] ?? 0) > 0 && (
                      <span className="flex items-center gap-0.5">
                        · <Eye className="h-3 w-3" /> {viewsMap[post.slug].toLocaleString()}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-1.5 text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 flex-1">
                      {post.summary}
                    </p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
