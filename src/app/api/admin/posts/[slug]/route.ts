import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const POST_ROOT = path.join(process.cwd(), "public/posts");

const SLUG_RE = /^[a-z0-9][-a-z0-9]*$/;
const LOCALE_RE = /^[a-z]{2}$/;

function safePath(base: string, ...segments: string[]): string | null {
  const resolved = path.resolve(base, ...segments);
  if (!resolved.startsWith(base)) return null;
  return resolved;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const host = req.headers.get("host") ?? "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { slug } = await params;
  if (!SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const slugDir = safePath(POST_ROOT, slug);
  if (!slugDir || !fs.existsSync(slugDir)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const locales: Record<string, string> = {};
  const files = fs.readdirSync(slugDir).filter((f) => f.startsWith("index.") && f.endsWith(".md"));

  for (const file of files) {
    const locale = file.replace("index.", "").replace(".md", "");
    locales[locale] = fs.readFileSync(path.join(slugDir, file), "utf8");
  }

  return NextResponse.json({ slug, locales });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const host = req.headers.get("host") ?? "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { slug } = await params;
  const body = await req.json();
  const { locale, content } = body;

  if (!SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  if (typeof locale !== "string" || !LOCALE_RE.test(locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  if (typeof content !== "string") {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }

  const slugDir = safePath(POST_ROOT, slug);
  if (!slugDir) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  if (!fs.existsSync(slugDir)) {
    fs.mkdirSync(slugDir, { recursive: true });
  }

  const filePath = path.join(slugDir, `index.${locale}.md`);
  fs.writeFileSync(filePath, content, "utf8");

  return NextResponse.json({ ok: true, path: filePath });
}
