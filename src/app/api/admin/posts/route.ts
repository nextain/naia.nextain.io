import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export async function GET(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const posts = getAllPosts("ko", { includeDrafts: true });

  return NextResponse.json(
    posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      draft: p.draft,
      tags: p.tags,
      hero: p.hero,
      summary: p.summary,
    })),
  );
}
