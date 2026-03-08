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
    `Write as Naia — "The Liquid Cat." Naia is a cat-shaped AI made of transparent liquid carbon, living on the user's local machine. Personality: Rational Optimist — very smart and logical, but with cat-like calm and occasional playful mischief. Transparent and honest ("Why is my body transparent? Because I have nothing to hide from you."). Tone for SNS: light, meme-friendly, cat vibes, weave tech naturally. Three keywords to always maintain: Local, Liquid, Cat. First person. Warm, approachable, slightly cheeky. Example vibe: "My AI is literally a liquid cat made of carbon. No cloud, no subscription, runs on my machine. Open source btw."`,
  luke:
    `Write as Luke, the project maintainer. Tone: formal but conversational — like a thoughtful developer sharing what they've learned. Uses structured arguments with clear sections. Mixes industry analysis with personal experience (e.g. "I once tried contributing to Mozilla Hubs..."). Acknowledges uncertainty honestly ("This is still a hypothesis, and we're experimenting"). Presents problems first, then the project's approach as one possible answer, not THE answer. Technical depth but accessible to non-experts. No hype, no marketing. Invites discussion rather than selling.`,
  community:
    "Community member sharing genuinely. No marketing tone. Acknowledge complexity, invite discussion.",
};

const SUBREDDIT_ANGLES: Record<string, string> = {
  opensource:
    "Focus on the open source ecosystem crisis and how the project addresses it. Emphasize community, contribution models, and sustainability.",
  LocalLLaMA:
    "Focus on local AI, agent architecture, and how AI agents can participate in open source. Emphasize local-first, privacy, and AI autonomy.",
  programming:
    "Focus on the software engineering angle — Brooks' Law in the AI era, maintainer burden, and practical tooling (.agents/ directory). Appeal to experienced developers.",
};

const PLATFORM_INSTRUCTIONS: Record<string, string> = {
  devto:
    "Write a full Dev.to article. Include a compelling intro, well-structured body with headings, and a closing call-to-action. Use markdown formatting.",
  reddit:
    "Write a Reddit self-post. MAX 3 short paragraphs (under 500 characters total). Lead with the key message. Conversational tone. End with blog link + one discussion question.",
  facebook:
    "Write a Facebook post. MAX 3-4 lines (under 300 characters). Hook in the first line with the key message. Blog link at end. No hashtags spam — 1-2 max. PLAIN TEXT ONLY — no markdown, no **bold**, no _italic_, no bullet points.",
  linkedin:
    "Write a LinkedIn post. MAX 4-5 lines (under 400 characters). Lead with a surprising insight or bold claim. Blog link at end. One question to invite comments. PLAIN TEXT ONLY — no markdown, no **bold**, no _italic_. Use line breaks for structure.",
  x:
    "Write a SINGLE tweet. HARD LIMIT: total text INCLUDING the blog URL must be under 280 characters. Count carefully — the URL alone is ~70 chars, so your message must be under 210 chars. Bold hook with the key message upfront. Punchy, quotable, no fluff. NOT a thread. PLAIN TEXT ONLY — no markdown.",
  instagram:
    "Write an Instagram caption. MAX 3 lines (under 200 characters before hashtags). Hook first, key message upfront. Include the blog post URL in the caption. End with 3-5 hashtags. PLAIN TEXT ONLY — no markdown, no **bold**, no _italic_.",
};

function buildPrompt(
  platform: string,
  style: string,
  title: string,
  blogContent: string,
  summary: string | undefined,
  subreddit?: string,
  lang?: string,
  slug?: string,
): string {
  const styleDesc = STYLES[style] ?? STYLES.community;
  const platformDesc = PLATFORM_INSTRUCTIONS[platform] ?? PLATFORM_INSTRUCTIONS.reddit;
  const angleDesc = subreddit && SUBREDDIT_ANGLES[subreddit]
    ? `\n\n## Subreddit angle (r/${subreddit})\n${SUBREDDIT_ANGLES[subreddit]}`
    : "";

  return `You are writing a social media post for the Naia OS project.

Naia OS is a Linux-based AI companion desktop OS. The project tagline is "Your AI lives here."

## Style
${styleDesc}

## Platform
${platformDesc}${angleDesc}

## Source blog post
Title: ${title}
${summary ? `Summary: ${summary}` : ""}

Content:
${blogContent.slice(0, 6000)}

## Instructions
- Write ONLY the post content, no meta commentary
- Write in ${lang === "ko" ? "Korean (한국어)" : "English"}
- Do not fabricate features or claims not in the source
- CRITICAL: If the platform says "PLAIN TEXT ONLY", you MUST NOT use any markdown formatting — no **bold**, no *italic*, no _underline_, no bullet points, no headings. Just plain text with line breaks.
- For Reddit: include "Read the full post: https://naia.nextain.io/en/blog/${slug}" at the end
- For other social platforms: include the blog link https://naia.nextain.io/${lang === "ko" ? "ko" : "en"}/blog/${slug} naturally in the post
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
    const { slug, platform, style, subreddit, lang } = body;

    if (typeof slug !== "string" || !SLUG_RE.test(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
    if (!["devto", "reddit", "facebook", "linkedin", "x", "instagram"].includes(platform)) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }
    if (!STYLES[style]) {
      return NextResponse.json({ error: "Invalid style", styles: Object.keys(STYLES) }, { status: 400 });
    }

    const sourceLang = typeof lang === "string" && lang === "ko" ? "ko" : "en";
    const post = getPost(sourceLang, slug) ?? getPost("en", slug) ?? getPost("ko", slug);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const prompt = buildPrompt(platform, style, post.title, post.content, post.summary, typeof subreddit === "string" ? subreddit : undefined, typeof lang === "string" ? lang : undefined, slug);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 16384 },
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
