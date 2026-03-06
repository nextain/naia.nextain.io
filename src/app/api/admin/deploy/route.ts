import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const SLUG_RE = /^[a-z0-9][-a-z0-9]*$/;

export async function POST(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const { slug, message } = body;

    if (!slug || !message) {
      return NextResponse.json({ error: "Missing slug or message" }, { status: 400 });
    }

    if (typeof slug !== "string" || !SLUG_RE.test(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    if (typeof message !== "string" || message.length > 200) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const cwd = process.cwd();

    await execFileAsync("git", ["add", `public/posts/${slug}/`], { cwd });
    const { stdout: diffResult } = await execFileAsync("git", ["diff", "--cached", "--name-only"], { cwd });

    if (!diffResult.trim()) {
      return NextResponse.json({ error: "No changes to commit" }, { status: 400 });
    }

    await execFileAsync("git", ["commit", "-m", message], { cwd });
    await execFileAsync("git", ["push"], { cwd });

    return NextResponse.json({ ok: true, committed: diffResult.trim().split("\n") });
  } catch (err) {
    console.error("[admin/deploy] error:", err);
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
