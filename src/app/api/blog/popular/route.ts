import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { getPostViews } from "@/lib/ga4";

export const revalidate = 300;

export async function GET() {
  const slugViews = await getPostViews();

  if (Object.keys(slugViews).length === 0) {
    return NextResponse.json({ popular: [] });
  }

  const posts = getAllPosts("en");
  const slugIndex = new Map(posts.map((p) => [p.slug, p]));

  const popular: Array<{
    slug: string;
    title: string;
    hero?: string;
    date: string;
    views: number;
  }> = [];

  for (const [slug, views] of Object.entries(slugViews)) {
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
