/**
 * Auth setup — opens ONE browser with tabs for all platforms.
 * Log in to each tab, then close the browser to save all sessions at once.
 *
 * Usage: npx tsx scripts/social-post/auth-setup.ts [platform|all]
 */
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const AUTH_DIR = path.join(__dirname, ".auth");
const ALL_AUTH = path.join(AUTH_DIR, "_all.json");

const PLATFORMS: Record<string, string> = {
  facebook: "https://www.facebook.com/",
  linkedin: "https://www.linkedin.com/feed/",
  instagram: "https://www.instagram.com/",
  x: "https://x.com/home",
  naver: "https://blog.naver.com/",
  velog: "https://velog.io/",
  reddit: "https://www.reddit.com/",
};

async function main() {
  fs.mkdirSync(AUTH_DIR, { recursive: true });

  const target = process.argv[2] ?? "all";
  const platforms = target === "all" ? Object.keys(PLATFORMS) : [target];

  console.log("브라우저를 엽니다. 각 탭에서 로그인 후 브라우저를 닫아주세요.");
  console.log(`플랫폼: ${platforms.join(", ")}\n`);

  const hasExisting = fs.existsSync(ALL_AUTH);
  const browser = await chromium.launch({ headless: false });
  const context = hasExisting
    ? await browser.newContext({ storageState: ALL_AUTH })
    : await browser.newContext();

  // Open each platform in a new tab
  for (const p of platforms) {
    const url = PLATFORMS[p];
    if (!url) continue;
    const page = await context.newPage();
    await page.goto(url).catch(() => {});
    console.log(`  탭 열림: ${p} → ${url}`);
  }

  // Close the default blank page
  const pages = context.pages();
  if (pages.length > platforms.length) {
    await pages[0].close().catch(() => {});
  }

  console.log("\n모든 탭에서 로그인 확인 후 브라우저를 닫아주세요...");

  // Wait for ALL pages to close (user closes browser)
  await Promise.all(context.pages().map((p) => p.waitForEvent("close", { timeout: 0 }).catch(() => {})));

  // Save combined auth state
  try {
    await context.storageState({ path: ALL_AUTH });
    console.log(`\n✓ 전체 세션 저장 → ${ALL_AUTH}`);
  } catch {
    console.log("\n⚠ 세션 저장 실패 — 브라우저가 너무 빨리 닫혔을 수 있습니다.");
  }

  await browser.close().catch(() => {});
  console.log("완료!");
}

main().catch(console.error);
