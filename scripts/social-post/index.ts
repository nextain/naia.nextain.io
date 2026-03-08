/**
 * Social media posting via Playwright.
 *
 * Usage: npx tsx scripts/social-post/index.ts --platform facebook --text "..." [--title "..."] [--image /path/to/img] [--url "..."]
 * Output: JSON { ok: true, url: "..." } or { ok: false, error: "..." }
 */
import { chromium, type BrowserContext, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

const AUTH_DIR = path.join(__dirname, ".auth");

const { values } = parseArgs({
  options: {
    platform: { type: "string" },
    text: { type: "string" },
    title: { type: "string", default: "" },
    image: { type: "string", default: "" },
    url: { type: "string", default: "" },
    subreddit: { type: "string", default: "" },
    headed: { type: "boolean", default: false },
  },
});

const platform = values.platform!;
const text = values.text!;
const title = values.title ?? "";
const imagePath = values.image ?? "";
const blogUrl = values.url ?? "";
const subreddit = values.subreddit ?? "";
const headed = values.headed ?? false;

function out(result: { ok: boolean; url?: string; error?: string }) {
  process.stdout.write(JSON.stringify(result) + "\n");
  process.exit(result.ok ? 0 : 1);
}

async function withBrowser(platformName: string, fn: (ctx: BrowserContext, page: Page) => Promise<string | null>) {
  // Try combined auth file first, then per-platform
  const allAuth = path.join(AUTH_DIR, "_all.json");
  const perPlatform = path.join(AUTH_DIR, `${platformName}.json`);
  const authFile = fs.existsSync(allAuth) ? allAuth : perPlatform;
  if (!fs.existsSync(authFile)) {
    out({ ok: false, error: `No auth state. Run: npx tsx scripts/social-post/auth-setup.ts all` });
    return;
  }

  const browser = await chromium.launch({ headless: !headed });
  const context = await browser.newContext({ storageState: authFile });
  try {
    const page = await context.newPage();
    const resultUrl = await fn(context, page);
    // Save updated session
    await context.storageState({ path: authFile });
    out({ ok: true, url: resultUrl ?? undefined });
  } catch (err) {
    out({ ok: false, error: String(err) });
  } finally {
    await browser.close();
  }
}

// ─── Platform handlers ───

async function postFacebook(_ctx: BrowserContext, page: Page): Promise<string | null> {
  await page.goto("https://www.facebook.com/");
  await page.waitForTimeout(5000);

  // Click "What's on your mind?" — try multiple selectors
  const createPost = page.locator('[aria-label="Create a post"], [aria-label="게시물 만들기"], [role="button"]:has-text("무슨 생각"), span:has-text("무슨 생각")');
  await createPost.first().click({ timeout: 15000 });
  await page.waitForTimeout(3000);

  // Type in the post composer dialog
  const composer = page.locator('[role="dialog"] [contenteditable="true"]');
  await composer.first().click({ timeout: 10000 });
  await page.keyboard.type(text, { delay: 10 });

  // Wait for link preview to load if text contains URL
  const hasLink = /https?:\/\//.test(text);
  await page.waitForTimeout(hasLink ? 8000 : 1500);

  // Screenshot for debugging
  await page.screenshot({ path: "/tmp/fb-before-post.png" });

  // Facebook may have a "다음" (Next) step before "게시" (Post)
  const nextBtn = page.locator('[role="dialog"] div[role="button"]:has-text("다음"), [role="dialog"] button:has-text("Next"), [role="dialog"] button:has-text("다음")');
  if (await nextBtn.count() > 0) {
    await nextBtn.first().click({ timeout: 10000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: "/tmp/fb-after-next.png" });
  }

  // Click Post/게시 button
  const postBtn = page.locator('[role="dialog"] [aria-label="Post"], [role="dialog"] [aria-label="게시"], [role="dialog"] div[aria-label="게시"]');
  if (await postBtn.count() === 0) {
    const fallback = page.locator('[role="dialog"] button:has-text("Post"), [role="dialog"] button:has-text("게시"), [role="dialog"] div[role="button"]:has-text("게시")');
    await fallback.first().click({ timeout: 10000 });
  } else {
    await postBtn.first().click({ timeout: 10000 });
  }
  await page.waitForTimeout(5000);

  return `https://www.facebook.com/`;
}

async function postLinkedin(_ctx: BrowserContext, page: Page): Promise<string | null> {
  // Use share URL to directly open composer
  await page.goto("https://www.linkedin.com/feed/?shareActive=true");
  await page.waitForTimeout(5000);

  // Try to find the editor - dialog or inline
  const editor = page.locator('.ql-editor, [role="dialog"] [contenteditable="true"], [contenteditable="true"][role="textbox"], [data-placeholder]');
  if (await editor.count() === 0) {
    await page.screenshot({ path: "/tmp/li-feed.png" });
    // Fallback: click on any visible post trigger
    await page.click('text=게시물 시작 >> visible=true', { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(3000);
  }
  await editor.first().click({ timeout: 10000 });
  await page.keyboard.type(text, { delay: 10 });

  const hasLink = /https?:\/\//.test(text);
  await page.waitForTimeout(hasLink ? 8000 : 1500);
  await page.screenshot({ path: "/tmp/li-before-post.png" });

  // Click Post
  const postBtn = page.locator('[role="dialog"] button:has-text("Post"), [role="dialog"] button:has-text("게시"), button.share-actions__primary-action');
  await postBtn.first().click({ timeout: 10000 });
  await page.waitForTimeout(5000);

  return "https://www.linkedin.com/feed/";
}

async function postInstagram(_ctx: BrowserContext, page: Page): Promise<string | null> {
  await page.goto("https://www.instagram.com/");
  await page.waitForTimeout(5000);
  await page.screenshot({ path: "/tmp/insta-home.png" });

  // Click "New post" / "만들기" — sidebar icon with various possible labels
  const newPost = page.locator('[aria-label="New post"], [aria-label="새 게시물"], [aria-label="만들기"], [aria-label="Create"], span:has-text("만들기"), span:has-text("Create")');
  if (await newPost.count() === 0) {
    // Fallback: look for the + SVG or the sidebar link
    const sidebar = page.locator('nav a, nav div[role="button"]');
    const count = await sidebar.count();
    // The create button is typically the 7th or so item in sidebar
    for (let i = 0; i < count; i++) {
      const text = await sidebar.nth(i).textContent().catch(() => "");
      if (text?.includes("만들기") || text?.includes("Create")) {
        await sidebar.nth(i).click();
        break;
      }
    }
  } else {
    await newPost.first().click({ timeout: 15000 });
  }
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "/tmp/insta-after-create.png" });

  // Upload image — convert webp to jpg if needed, then set file via hidden input
  let uploadPath = imagePath;
  if (imagePath && imagePath.endsWith(".webp")) {
    const { execFileSync } = await import("node:child_process");
    uploadPath = "/tmp/insta-upload.jpg";
    execFileSync("magick", [imagePath, uploadPath]);
  }
  if (uploadPath && fs.existsSync(uploadPath)) {
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(uploadPath);
  } else {
    // Click "컴퓨터에서 선택" and wait (user must have provided image)
    out({ ok: false, error: "Instagram requires --image parameter" });
    return null;
  }
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "/tmp/insta-after-upload.png" });

  // Click Next/다음 (crop step)
  const nextBtn = page.locator('button:has-text("Next"), button:has-text("다음"), div[role="button"]:has-text("다음"), div[role="button"]:has-text("Next")');
  await nextBtn.first().click({ timeout: 10000 });
  await page.waitForTimeout(2000);

  // Click Next/다음 again (filter step)
  await nextBtn.first().click({ timeout: 10000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "/tmp/insta-caption.png" });

  // Type caption
  const caption = page.locator('[aria-label="Write a caption..."], [aria-label="문구 입력..."], [aria-label="문구를 입력하세요..."], textarea, [contenteditable="true"]');
  await caption.first().click({ timeout: 10000 });
  await page.keyboard.type(text, { delay: 10 });
  await page.waitForTimeout(1500);

  // Share/공유하기 — force click to bypass overlay interception
  const shareBtn = page.locator('div[role="button"]:has-text("공유"), div[role="button"]:has-text("Share"), button:has-text("Share"), button:has-text("공유")');
  await shareBtn.first().click({ force: true, timeout: 10000 });
  await page.waitForTimeout(8000);

  return "https://www.instagram.com/naia_nextain/";
}

async function postX(_ctx: BrowserContext, page: Page): Promise<string | null> {
  await page.goto("https://x.com/compose/post");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(2000);

  // Type in composer
  const composer = page.locator('[data-testid="tweetTextarea_0"], [role="textbox"]');
  await composer.first().click();
  await page.keyboard.type(text, { delay: 10 });
  await page.waitForTimeout(1000);

  // Post
  const postBtn = page.locator('[data-testid="tweetButton"], [data-testid="tweetButtonInline"]');
  await postBtn.first().click();
  await page.waitForTimeout(3000);

  return "https://x.com/Naia_Nextain";
}

async function postNaver(_ctx: BrowserContext, page: Page): Promise<string | null> {
  await page.goto("https://blog.naver.com/fstory97/postwrite");
  await page.waitForTimeout(5000);

  // Dismiss any popup/alert (e.g. "임시저장 복원")
  const popupBtn = page.locator('.se-popup-alert button, .se-popup-confirm button, button:has-text("아니오"), button:has-text("확인")');
  if (await popupBtn.count() > 0) {
    await popupBtn.first().click({ force: true }).catch(() => {});
    await page.waitForTimeout(1500);
  }

  // Close help/guide panel (도움말)
  const helpCloseX = page.locator('.aside_helpguide button, .guide_close');
  for (let i = 0; i < await helpCloseX.count(); i++) {
    await helpCloseX.nth(i).click({ force: true }).catch(() => {});
  }
  // Also try clicking the X icon on the help panel
  await page.locator('text=도움말').locator('..').locator('button, svg').first().click({ force: true }).catch(() => {});
  await page.waitForTimeout(1500);

  // Title — click the title area specifically
  const titleArea = page.locator('.se-title-text span, .se-title-text');
  await titleArea.first().click({ timeout: 10000 });
  await page.keyboard.type(title || "Blog Post", { delay: 10 });

  // Move to body — click the body paragraph area (not Tab)
  const bodyArea = page.locator('.se-component.se-text .se-text-paragraph');
  await bodyArea.first().click({ timeout: 10000 });
  await page.keyboard.type(text, { delay: 5 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "/tmp/naver-before-publish.png" });

  // Scroll to top to find publish button
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: "/tmp/naver-top.png" });

  // Find the green "발행" button — exclude reserve/schedule button
  const allBtns = page.locator('button:has-text("발행")');
  const count = await allBtns.count();
  for (let i = 0; i < count; i++) {
    const cls = await allBtns.nth(i).getAttribute("class") ?? "";
    if (!cls.includes("reserve")) {
      await allBtns.nth(i).click({ force: true, timeout: 10000 });
      break;
    }
  }
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "/tmp/naver-publish-dialog.png" });

  // Confirm publish in dialog — click the last "발행" button
  const confirmBtns = page.locator('button:has-text("발행")');
  const cCount = await confirmBtns.count();
  if (cCount > 0) {
    await confirmBtns.last().click({ force: true, timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(5000);
  }

  return "https://blog.naver.com/fstory97";
}

async function postVelog(_ctx: BrowserContext, page: Page): Promise<string | null> {
  await page.goto("https://velog.io/write");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "/tmp/velog-write.png" });

  // Title — try textarea first, then any visible title input
  const titleInput = page.locator('textarea[placeholder*="제목"], input[placeholder*="제목"]');
  if (await titleInput.count() > 0) {
    await titleInput.first().click({ force: true });
  } else {
    // Fallback: first visible textarea or input on the page
    const firstInput = page.locator('textarea, input[type="text"]').first();
    await firstInput.click({ force: true });
  }
  await page.keyboard.type(title || "Blog Post", { delay: 10 });
  await page.keyboard.press("Tab");
  await page.waitForTimeout(500);

  // Content — use CodeMirror API if available, otherwise force-click
  const hasCodeMirror = await page.evaluate(() => {
    const cm = document.querySelector('.CodeMirror') as any;
    return !!cm?.CodeMirror;
  });

  if (hasCodeMirror) {
    // Set value via CodeMirror API directly
    await page.evaluate((content: string) => {
      const cm = (document.querySelector('.CodeMirror') as any).CodeMirror;
      cm.setValue(content);
    }, text);
  } else {
    // Fallback: try contenteditable or ProseMirror
    const editorArea = page.locator('.ProseMirror, [contenteditable="true"], .toastui-editor');
    if (await editorArea.count() > 0) {
      await editorArea.first().click({ force: true });
      await page.keyboard.type(text, { delay: 5 });
    } else {
      // Last resort: click CodeMirror scroll area and type
      const cmScroll = page.locator('.CodeMirror-scroll, .CodeMirror');
      await cmScroll.first().click({ force: true });
      await page.keyboard.type(text, { delay: 5 });
    }
  }
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "/tmp/velog-before-publish.png" });

  // Click "출간하기" button
  const publishBtn = page.locator('button:has-text("출간하기"), button:has-text("출간")');
  await publishBtn.first().click({ timeout: 10000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "/tmp/velog-publish-dialog.png" });

  // Confirm dialog — click final publish button
  const confirmBtn = page.locator('button:has-text("출간하기")');
  const cCount = await confirmBtn.count();
  if (cCount > 0) {
    await confirmBtn.last().click({ timeout: 10000 });
    await page.waitForTimeout(5000);
  }

  return "https://velog.io/@nextaininc";
}

async function postReddit(_ctx: BrowserContext, page: Page): Promise<string | null> {
  const sub = subreddit || "opensource";
  // Use new Reddit submit URL format
  await page.goto(`https://www.reddit.com/r/${sub}/submit?type=text`);
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "/tmp/reddit-submit.png" });

  // New Reddit: title input — try various selectors
  const titleInput = page.locator('textarea[name="title"], input[name="title"], [placeholder*="Title"], [aria-label*="Title"], div[slot="title"] textarea, faceplate-textarea[name="title"] textarea, [name="title"]');
  if (await titleInput.count() === 0) {
    // Fallback: look for any prominent textarea/input at top
    const allTextareas = page.locator('textarea, input[type="text"]');
    await allTextareas.first().click({ force: true });
    await page.keyboard.type(title || "Blog Post", { delay: 10 });
  } else {
    await titleInput.first().click({ force: true, timeout: 10000 });
    await page.keyboard.type(title || "Blog Post", { delay: 10 });
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: "/tmp/reddit-after-title.png" });

  // Body — try multiple approaches
  const bodySelectors = [
    'textarea[name="body"]',
    '.md textarea',
    '[placeholder*="Text"]',
    '[placeholder*="body"]',
    '[aria-label*="Body"]',
    'div[slot="rte"] [contenteditable="true"]',
    'shreddit-composer [contenteditable="true"]',
    '[contenteditable="true"]',
  ];

  let bodyFilled = false;
  for (const sel of bodySelectors) {
    const el = page.locator(sel);
    if (await el.count() > 0) {
      await el.first().click({ force: true });
      await page.keyboard.type(text, { delay: 5 });
      bodyFilled = true;
      break;
    }
  }
  if (!bodyFilled) {
    // Tab from title to body
    await page.keyboard.press("Tab");
    await page.waitForTimeout(300);
    await page.keyboard.type(text, { delay: 5 });
  }
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "/tmp/reddit-before-post.png" });

  // Post button
  const postBtn = page.locator('button:has-text("Post"), button:has-text("게시"), button[type="submit"]:has-text("Post"), faceplate-tracker button');
  // Find the actual submit button
  const count = await postBtn.count();
  for (let i = 0; i < count; i++) {
    const txt = await postBtn.nth(i).textContent().catch(() => "");
    if (txt?.trim() === "Post" || txt?.trim() === "게시") {
      await postBtn.nth(i).click({ force: true, timeout: 10000 });
      break;
    }
  }
  await page.waitForTimeout(5000);

  const currentUrl = page.url();
  return currentUrl.includes("/comments/") ? currentUrl : `https://www.reddit.com/r/${sub}`;
}

// ─── Main ───

const handlers: Record<string, (ctx: BrowserContext, page: Page) => Promise<string | null>> = {
  facebook: postFacebook,
  linkedin: postLinkedin,
  instagram: postInstagram,
  x: postX,
  naver: postNaver,
  velog: postVelog,
  reddit: postReddit,
};

if (!platform || !text) {
  out({ ok: false, error: "Usage: --platform <name> --text <content> [--title <title>] [--image <path>]" });
} else if (!handlers[platform]) {
  out({ ok: false, error: `Unknown platform: ${platform}. Available: ${Object.keys(handlers).join(", ")}` });
} else {
  withBrowser(platform, handlers[platform]);
}
