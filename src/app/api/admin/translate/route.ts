import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const POST_ROOT = path.join(process.cwd(), "public/posts");
const SLUG_RE = /^[a-z0-9][-a-z0-9]*$/;
const LOCALE_RE = /^[a-z]{2}$/;

const LANG_NAMES: Record<string, string> = {
  ko: "Korean", en: "English", ja: "Japanese", zh: "Chinese (Simplified)",
  fr: "French", de: "German", ru: "Russian", es: "Spanish",
  pt: "Portuguese", vi: "Vietnamese", id: "Indonesian", ar: "Arabic",
  hi: "Hindi", bn: "Bengali",
};

function safePath(base: string, ...segments: string[]): string | null {
  const resolved = path.resolve(base, ...segments);
  if (!resolved.startsWith(base)) return null;
  return resolved;
}

function buildTranslationPrompt(sourceLang: string, targetLang: string, content: string): string {
  const sourceName = LANG_NAMES[sourceLang] ?? sourceLang;
  const targetName = LANG_NAMES[targetLang] ?? targetLang;

  return `You are an expert technical translator. Translate the following blog post from ${sourceName} to ${targetName}.

## Rules
- Translate the ENTIRE content including frontmatter fields (title, summary) but keep field names in English
- Preserve ALL markdown formatting exactly (headings, lists, tables, links, images, code blocks)
- Preserve brand names as-is: Naia OS, Nextain, CafeLua, Alpha, GitHub, Vercel, etc.
- Preserve URLs, file paths, and image paths exactly as-is
- Preserve HTML comments (<!-- ko --> etc.) exactly as-is
- Preserve code blocks and inline code exactly as-is
- Keep the frontmatter date, tags, author, and hero fields unchanged
- Write naturally in ${targetName}, not word-by-word translation
- Output ONLY the translated content, no explanations or markdown wrappers

## Source (${sourceName})
${content}`;
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
    const { slug, sourceLang, targetLang } = body;

    if (typeof slug !== "string" || !SLUG_RE.test(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
    if (typeof sourceLang !== "string" || !LOCALE_RE.test(sourceLang)) {
      return NextResponse.json({ error: "Invalid sourceLang" }, { status: 400 });
    }
    if (typeof targetLang !== "string" || !LOCALE_RE.test(targetLang)) {
      return NextResponse.json({ error: "Invalid targetLang" }, { status: 400 });
    }
    if (sourceLang === targetLang) {
      return NextResponse.json({ error: "Source and target are the same" }, { status: 400 });
    }

    const slugDir = safePath(POST_ROOT, slug);
    if (!slugDir) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const sourceFile = path.join(slugDir, `index.${sourceLang}.md`);
    if (!fs.existsSync(sourceFile)) {
      return NextResponse.json({ error: `Source file not found: index.${sourceLang}.md` }, { status: 404 });
    }

    const sourceContent = fs.readFileSync(sourceFile, "utf8");
    const prompt = buildTranslationPrompt(sourceLang, targetLang, sourceContent);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 16384 },
        }),
      },
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("[admin/translate] Gemini error:", err);
      return NextResponse.json({ error: "Translation failed" }, { status: 502 });
    }

    const data = await res.json();
    let translated = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Strip markdown code block wrappers if present
    translated = translated.replace(/^```(?:markdown|md)?\n/, "").replace(/\n```$/, "");

    // Save translated file
    const targetFile = path.join(slugDir, `index.${targetLang}.md`);
    fs.writeFileSync(targetFile, translated, "utf8");

    return NextResponse.json({
      ok: true,
      targetLang,
      saved: true,
      chars: translated.length,
    });
  } catch (err) {
    console.error("[admin/translate] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
