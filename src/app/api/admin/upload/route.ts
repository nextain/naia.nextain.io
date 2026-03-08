import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, mkdirSync, readFileSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import os from "node:os";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
const CONVERTIBLE = [".png", ".jpg", ".jpeg", ".gif"];
const SLUG_RE = /^[a-z0-9][-a-z0-9]*$/;
const POST_ROOT = path.join(process.cwd(), "public/posts");

function safePath(base: string, ...segments: string[]): string | null {
  const resolved = path.resolve(base, ...segments);
  if (!resolved.startsWith(base)) return null;
  return resolved;
}

function convertToWebP(inputBuffer: Buffer, originalName: string): { buffer: Buffer; name: string } {
  const ext = path.extname(originalName).toLowerCase();
  if (!CONVERTIBLE.includes(ext)) {
    return { buffer: inputBuffer, name: originalName };
  }

  const tmpIn = path.join(os.tmpdir(), `upload-${Date.now()}${ext}`);
  const baseName = path.basename(originalName, ext);
  const tmpOut = path.join(os.tmpdir(), `upload-${Date.now()}.webp`);

  try {
    writeFileSync(tmpIn, inputBuffer);
    execFileSync("magick", [tmpIn, "-quality", "80", tmpOut]);
    const webpBuffer = readFileSync(tmpOut);
    return { buffer: webpBuffer, name: `${baseName}.webp` };
  } finally {
    try { unlinkSync(tmpIn); } catch {}
    try { unlinkSync(tmpOut); } catch {}
  }
}

export async function POST(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const slug = formData.get("slug") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!slug || !SLUG_RE.test(slug) || slug.length > 200) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 400 },
      );
    }

    const name = file.name.toLowerCase();
    const ext = name.slice(name.lastIndexOf("."));
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}` },
        { status: 400 },
      );
    }

    const dir = safePath(POST_ROOT, slug);
    if (!dir) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }
    mkdirSync(dir, { recursive: true });

    const rawBuffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");

    // Auto-convert to WebP
    const { buffer, name: finalName } = convertToWebP(rawBuffer, safeName);

    const filePath = safePath(dir, finalName);
    if (!filePath) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    writeFileSync(filePath, buffer);

    const publicPath = `/posts/${slug}/${finalName}`;
    const converted = finalName !== safeName;
    return NextResponse.json({ ok: true, path: publicPath, converted, originalSize: rawBuffer.length, finalSize: buffer.length });
  } catch (err) {
    console.error("[admin/upload]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
