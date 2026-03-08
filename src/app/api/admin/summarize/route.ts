import { NextRequest, NextResponse } from "next/server";

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
    const { content, lang } = await req.json();
    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json({ error: "No content" }, { status: 400 });
    }

    const langName = lang === "ko" ? "Korean (한국어)" : "English";
    const prompt = `You are a blog editor. Write a summary (2-3 full sentences, 150-250 characters in Korean or 100-200 words in English) for this blog post.

Requirements:
- First sentence: a surprising fact or bold claim that hooks the reader
- Second sentence: what the post reveals or argues (create curiosity)
- Third sentence (optional): what the reader will learn or why it matters
- NOT a title or headline — write complete sentences
- NOT generic ("이 글에서는..." / "In this post...") — be specific and provocative

Write in ${langName}. Output ONLY the summary sentences. No quotes, no explanation.

---
${content.slice(0, 6000)}`;

    // Strip quotes from AI output to prevent frontmatter breakage

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.5, maxOutputTokens: 2048 },
        }),
      },
    );

    if (!res.ok) {
      return NextResponse.json({ error: "AI generation failed" }, { status: 502 });
    }

    const data = await res.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
    // Clean up: remove wrapping quotes, collapse newlines
    const summary = raw.replace(/^["']|["']$/g, "").replace(/\n+/g, " ").trim();

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("[admin/summarize] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
