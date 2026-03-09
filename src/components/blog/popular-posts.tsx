/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface PopularPost {
  slug: string;
  title: string;
  hero?: string;
  date: string;
}

interface PopularPostsProps {
  lang: string;
  excludeSlugs: string[];
}

export function PopularPosts({ lang, excludeSlugs }: PopularPostsProps) {
  const [posts, setPosts] = useState<PopularPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const excluded = new Set(excludeSlugs);

    fetch(`/api/blog/popular?lang=${lang}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.popular?.length) {
          setPosts(
            (data.popular as PopularPost[])
              .filter((p) => !excluded.has(p.slug))
              .slice(0, 4),
          );
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [excludeSlugs]);

  if (!loading && posts.length === 0) return null;

  const heading =
    lang === "ko" ? "인기 포스팅" : "Popular Posts";

  return (
    <section className="mt-12 border-t border-border/40 pt-8">
      <h2 className="text-lg font-semibold text-foreground">{heading}</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="flex h-20 animate-pulse items-center gap-3 rounded-lg border border-border/50 p-3"
              >
                <div className="h-14 w-14 shrink-0 rounded bg-muted/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 rounded bg-muted/50" />
                  <div className="h-3 w-1/2 rounded bg-muted/50" />
                </div>
              </div>
            ))
          : posts.map((p) => (
              <Link
                key={p.slug}
                href={`/${lang}/blog/${p.slug}`}
                className="group flex items-center gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:border-border"
              >
                {p.hero ? (
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded bg-muted/30">
                    <img
                      src={p.hero}
                      alt={p.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="h-14 w-14 shrink-0 rounded bg-muted/20" />
                )}
                <span className="text-sm text-muted-foreground group-hover:text-foreground line-clamp-2 transition-colors">
                  {p.title}
                </span>
              </Link>
            ))}
      </div>
    </section>
  );
}
