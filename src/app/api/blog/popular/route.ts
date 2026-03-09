import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { getPostViews } from "@/lib/ga4";
import { isLocale, type Locale } from "@/i18n/config";

export const revalidate = 300;

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang");
  const locale: Locale = lang && isLocale(lang) ? (lang as Locale) : "en";

  const localeViews = await getPostViews();

  if (Object.keys(localeViews).length === 0) {
    return NextResponse.json({ popular: [] });
  }

  // Aggregate total views across all locales for ranking
  const totalViews: Record<string, number> = {};
  for (const [key, views] of Object.entries(localeViews)) {
    const slug = key.includes("/") ? key.split("/")[1] : key;
    totalViews[slug] = (totalViews[slug] || 0) + views;
  }

  const posts = getAllPosts(locale);
  const slugIndex = new Map(posts.map((p) => [p.slug, p]));

  const popular: Array<{
    slug: string;
    title: string;
    hero?: string;
    date: string;
    views: number;
  }> = [];

  for (const [slug, views] of Object.entries(totalViews)) {
    const post = slugIndex.get(slug);
    if (post) {
      popular.push({
        slug: post.slug,
        title: post.title,
        hero: post.hero,
        date: post.date,
        views,
      });
    }
  }
  popular.sort((a, b) => b.views - a.views);

  return NextResponse.json(
    { popular: popular.slice(0, 20) },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    },
  );
}
