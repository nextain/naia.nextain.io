import { NextRequest, NextResponse } from "next/server";
import { getPost } from "@/lib/posts";

const SLUG_RE = /^[a-z0-9][-a-z0-9]*$/;

const STYLES: Record<string, string> = {
  announcement:
    "Excited but grounded. Share what's new, why it matters, and what's next. Enthusiastic without hype.",
  technical:
    "Informative and practical. Focus on architecture decisions, trade-offs, and concrete results.",
  story:
    "Narrative-driven. Tell the human story behind the project — motivation, challenges, discoveries.",
  naia:
    "Write as Naia, the Glass Cat. Playful, curious, slightly cat-like. First person. Warm and approachable.",
  community:
    "Community member sharing genuinely. No marketing tone. Acknowledge complexity, invite discussion.",
};

const PLATFORM_INSTRUCTIONS: Record<string, string> = {
  devto:
    "Write a full Dev.to article in English. Include a compelling intro, well-structured body with headings, and a closing call-to-action. Use markdown formatting.",
  reddit:
    "Write a Reddit self-post in English. Keep it concise (3-5 paragraphs). Conversational tone. End with the blog link and a discussion question. No markdown headings — just paragraphs.",
};

function buildPrompt(
  platform: string,
  style: string,
  title: string,
  blogContent: string,
  summary: string | undefined,
): string {
  const styleDesc = STYLES[style] ?? STYLES.community;
  const platformDesc = PLATFORM_INSTRUCTIONS[platform] ?? PLATFORM_INSTRUCTIONS.reddit;

  return `You are writing a social media post for the Naia OS project.

Naia OS is a Linux-based AI companion desktop OS. The project tagline is "Your AI lives here."

## Style
${styleDesc}

## Platform
${platformDesc}

## Source blog post
Title: ${title}
${summary ? `Summary: ${summary}` : ""}

Content:
${blogContent.slice(0, 6000)}

## Instructions
- Write ONLY the post content, no meta commentary
- Use English
- Do not fabricate features or claims not in the source
- For Reddit: include "Read the full post: https://naia.nextain.io/en/blog/SLUG" at the end (replace SLUG)
- For Dev.to: the full article will be posted with canonical_url, so write the complete article`;
}

export async function POST(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { slug, platform, style } = body;

    if (typeof slug !== "string" || !SLUG_RE.test(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
    if (!["devto", "reddit"].includes(platform)) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }
    if (!STYLES[style]) {
      return NextResponse.json({ error: "Invalid style", styles: Object.keys(STYLES) }, { status: 400 });
    }

    const post = getPost("en", slug) ?? getPost("ko", slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const prompt = buildPrompt(platform, style, post.title, post.content, post.summary);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
        }),
      },
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("[admin/crosspost/generate] Gemini error:", err);
      return NextResponse.json({ error: "AI generation failed" }, { status: 502 });
    }

    const data = await res.json();
    const generated = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    return NextResponse.json({
      generated: generated.replace(/SLUG/g, slug),
      style,
      platform,
    });
  } catch (err) {
    console.error("[admin/crosspost/generate] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
