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
    const { text, targetLang } = await req.json();
    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "No text" }, { status: 400 });
    }

    const langName = targetLang === "ko" ? "Korean" : "English";
    const prompt = `Translate the following social media post to ${langName}. Keep the same tone, style, hashtags, and formatting. Preserve URLs as-is. Output ONLY the translated text.\n\n${text}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 8192 },
        }),
      },
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Translation failed" }, { status: 502 });
    }

    const data = await res.json();
    const translated = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

    return NextResponse.json({ translated });
  } catch (err) {
    console.error("[admin/translate-text] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
