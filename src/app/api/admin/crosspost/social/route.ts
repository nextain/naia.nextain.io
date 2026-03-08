import { NextRequest, NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);

const VALID_PLATFORMS = ["facebook", "linkedin", "instagram", "x", "naver", "velog", "reddit"];

export async function POST(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const body = await req.json();
    const { platform, text, title, image, url, subreddit } = body;

    if (typeof platform !== "string" || !VALID_PLATFORMS.includes(platform)) {
      return NextResponse.json({ error: `Invalid platform. Valid: ${VALID_PLATFORMS.join(", ")}` }, { status: 400 });
    }
    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "No text" }, { status: 400 });
    }

    const scriptPath = path.join(process.cwd(), "scripts/social-post/index.ts");
    const args = ["tsx", scriptPath, "--platform", platform, "--text", text];

    if (typeof title === "string" && title.trim()) {
      args.push("--title", title);
    }
    if (typeof image === "string" && image.trim()) {
      args.push("--image", image);
    }
    if (typeof url === "string" && url.trim()) {
      args.push("--url", url);
    }
    if (typeof subreddit === "string" && subreddit.trim()) {
      args.push("--subreddit", subreddit);
    }

    const { stdout, stderr } = await execFileAsync("npx", args, {
      cwd: process.cwd(),
      timeout: 120_000,
      env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: undefined },
    });

    if (stderr) {
      console.error("[admin/crosspost/social] stderr:", stderr);
    }

    // Parse last JSON line from stdout
    const lines = stdout.trim().split("\n");
    const lastLine = lines[lines.length - 1];
    try {
      const result = JSON.parse(lastLine);
      if (result.ok) {
        return NextResponse.json(result);
      }
      return NextResponse.json(result, { status: 500 });
    } catch {
      return NextResponse.json({ error: "Script output parse error", stdout: lastLine }, { status: 500 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // execFile error includes stdout/stderr
    const stderr = (err as any)?.stderr ?? "";
    const stdout = (err as any)?.stdout ?? "";
    console.error("[admin/crosspost/social] error:", message);
    // Try to parse script JSON output from stdout even on error
    if (stdout) {
      const lines = stdout.trim().split("\n");
      const lastLine = lines[lines.length - 1];
      try {
        const result = JSON.parse(lastLine);
        return NextResponse.json(result, { status: 500 });
      } catch {}
    }
    return NextResponse.json({ error: message.slice(0, 500), stderr: stderr.slice(0, 500) }, { status: 500 });
  }
}
