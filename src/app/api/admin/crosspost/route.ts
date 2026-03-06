import { NextRequest, NextResponse } from "next/server";
import { getPost } from "@/lib/posts";
import { publishToDevTo } from "@/lib/crosspost/devto";

const SLUG_RE = /^[a-z0-9][-a-z0-9]*$/;

export async function POST(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const { slug, targets, subreddit, overrideTitle, overrideBody } = body;

    if (typeof slug !== "string" || !SLUG_RE.test(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const post = getPost("en", slug) ?? getPost("ko", slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const title = (typeof overrideTitle === "string" && overrideTitle.trim()) ? overrideTitle.trim() : post.title;
    const results: Record<string, unknown> = {};

    if (targets?.includes("devto")) {
      const heroUrl = post.hero?.startsWith("http")
        ? post.hero
        : post.hero
          ? `https://naia.nextain.io${post.hero}`
          : undefined;

      const markdown = (typeof overrideBody === "string" && overrideBody.trim()) ? overrideBody.trim() : post.content;

      const devtoResult = await publishToDevTo({
        title,
        markdown,
        tags: post.tags,
        slug: post.slug,
        summary: post.summary,
        heroUrl,
      });
      results.devto = { url: devtoResult.url };
    }

    if (targets?.includes("reddit")) {
      const text = (typeof overrideBody === "string" && overrideBody.trim()) ? overrideBody.trim() : (post.summary ?? post.title);

      const params = new URLSearchParams({
        type: "self",
        title,
        text,
      });
      const submitUrl = `https://www.reddit.com/r/${subreddit ?? "linux_gaming"}/submit?${params.toString()}`;
      results.reddit = { submitUrl };
    }

    return NextResponse.json(results);
  } catch (err) {
    console.error("[admin/crosspost] error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
