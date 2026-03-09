import { NextRequest, NextResponse } from "next/server";
import { getPost } from "@/lib/posts";

const SLUG_RE = /^[a-z0-9][-a-z0-9]*$/;

const STYLES: Record<string, string> = {
  insight:
    "Extract ONE compelling insight or data point from the blog post and present it as a thought-provoking observation. No project promotion — just share knowledge that the community would find genuinely interesting. End with a question that invites real discussion.",
  technical:
    "Share a specific technical finding, trade-off, or architecture decision as if explaining to a peer. Focus on the problem and approach, not the project. The reader should learn something useful even if they never visit the link.",
  story:
    "Tell a relatable human experience from the blog post — a frustration, a discovery, a lesson learned. Make it personal and authentic. The project is background context, not the point.",
  naia:
    `Write as Naia — "The Liquid Cat." Naia is a cat-shaped AI made of transparent liquid carbon, living on the user's local machine. Personality: Rational Optimist — very smart and logical, but with cat-like calm and occasional playful mischief. Transparent and honest ("Why is my body transparent? Because I have nothing to hide from you."). Tone for SNS: light, meme-friendly, cat vibes, weave tech naturally. Three keywords to always maintain: Local, Liquid, Cat. First person. Warm, approachable, slightly cheeky. Share an observation or react to the topic — don't advertise.`,
  luke:
    `Write as Luke, a developer sharing what he's learned. Tone: honest, conversational, thinking out loud. Mixes industry observation with personal experience. Acknowledges uncertainty ("I'm not sure this is the answer, but..."). Presents problems and questions, not solutions and pitches. The reader should feel like they're in a conversation, not being sold to. Never say "check out" or "learn more."`,
  community:
    "Share as a genuine community member who found something interesting. No promotion, no CTAs. Just an observation or question that contributes to the community's ongoing conversation.",
};

const SUBREDDIT_ANGLES: Record<string, string> = {
  opensource:
    "This community cares about sustainability, licensing, and the future of open source. Share an observation or data point about the ecosystem — don't pitch a project. Ask what others are seeing.",
  LocalLLaMA:
    "This community is deeply technical about local AI, model architectures, and privacy. Share a concrete finding or question about local-first AI development. They will ignore anything that smells like marketing.",
  programming:
    "Experienced developers who value substance over hype. Share a specific engineering insight — Brooks' Law, maintainer burnout, tooling approaches. They respect honesty about what doesn't work.",
};

const PLATFORM_INSTRUCTIONS: Record<string, string> = {
  devto:
    "Write a full Dev.to article. Well-structured body with headings. The article should stand on its own as valuable content — not a teaser for the blog. Use markdown formatting.",
  reddit:
    "Write a Reddit self-post. MAX 3 short paragraphs (under 500 characters total). Share an insight or observation, then ask a genuine question. Conversational, like talking to peers. Do NOT say 'check out', 'learn more', or 'read the full post'. The blog link goes ONLY at the very end as a small 'Source:' reference.",
  facebook:
    "Write a Facebook post. MAX 3-4 lines (under 300 characters). Share a thought or observation naturally, like a status update to friends. No marketing language. Blog link only if it fits naturally. PLAIN TEXT ONLY — no markdown, no **bold**, no _italic_, no bullet points.",
  linkedin:
    "Write a LinkedIn post. MAX 4-5 lines (under 400 characters). Share a professional observation or lesson learned. End with a genuine question. Do NOT use 'excited to share', 'check this out', or any CTA language. Blog link only as optional context at the end. PLAIN TEXT ONLY — no markdown, no **bold**, no _italic_. Use line breaks for structure.",
  x:
    "Write a SINGLE tweet. HARD LIMIT: total text INCLUDING any URL must be under 280 characters. Share one sharp observation or question. No CTAs, no 'check out'. Blog link is optional — only include if there's room and it adds value. NOT a thread. PLAIN TEXT ONLY — no markdown.",
  instagram:
    "Write an Instagram caption. MAX 3 lines (under 200 characters before hashtags). Share a thought or reaction, not a promotion. Blog URL only if natural. End with 2-3 relevant hashtags. PLAIN TEXT ONLY — no markdown, no **bold**, no _italic_.",
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

  const blogUrl = `https://naia.nextain.io/${lang === "ko" ? "ko" : "en"}/blog/${slug}`;

  return `You are sharing an interesting finding from a blog post you read. You are NOT promoting a project — you are contributing to a conversation.

Background context (do NOT promote this): Naia OS is a Linux-based AI companion desktop OS.

## Tone
${styleDesc}

## Platform rules
${platformDesc}${angleDesc}

## Source material
Title: ${title}
${summary ? `Summary: ${summary}` : ""}

Content:
${blogContent.slice(0, 6000)}

## Critical rules
- Write ONLY the post content, no meta commentary
- Write in ${lang === "ko" ? "Korean (한국어)" : "English"}
- Do not fabricate features or claims not in the source
- NEVER use phrases like: "check out", "learn more", "read the full post", "자세한 건 여기서", "확인해보세요", "링크에서"
- NEVER write like an advertisement or press release
- The post should provide VALUE on its own — the reader should gain something even without clicking any link
- If the platform says "PLAIN TEXT ONLY", use no markdown formatting at all
- Blog source reference (use sparingly, at the very end if at all): ${blogUrl}
- For Dev.to: write the complete standalone article with canonical_url`;
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
