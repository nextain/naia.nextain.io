import { test, expect } from "@playwright/test";
import { buildStatsEmail } from "../src/lib/stats/email-template";

const mockReport = {
  type: "daily" as const,
  date: "2026-03-08",
  current: {
    timestamp: new Date().toISOString(),
    type: "daily" as const,
    ga4: {
      visitors: { ko: 45, en: 22, total: 67 },
      newUsers: { ko: 12, en: 8, total: 20 },
      pageViews: { ko: 120, en: 55, total: 175 },
      cumulativeVisitors: { ko: 3200, en: 1850, total: 5050 },
      cumulativeDownloads: 342,
      referrals: [
        { source: "google", sessions: 30 },
        { source: "direct", sessions: 20 },
        { source: "github.com", sessions: 10 },
      ],
      blogTopPosts: [
        { slug: "naia-os-intro", title: "Naia OS 소개", views: 45 },
        { slug: "any-llm-guide", title: "Any-LLM 가이드", views: 28 },
      ],
      downloads: [
        { label: "naia-os-x86_64.iso", clicks: 15 },
        { label: "naia-os-aarch64.iso", clicks: 3 },
      ],
      returningUserRate: 35,
      dailyTrend: [
        { date: "2026-02-23", visitors: 40, newUsers: 10 },
        { date: "2026-02-24", visitors: 55, newUsers: 15 },
        { date: "2026-02-25", visitors: 38, newUsers: 8 },
        { date: "2026-02-26", visitors: 62, newUsers: 20 },
        { date: "2026-02-27", visitors: 50, newUsers: 12 },
        { date: "2026-02-28", visitors: 45, newUsers: 11 },
        { date: "2026-03-01", visitors: 70, newUsers: 25 },
        { date: "2026-03-02", visitors: 48, newUsers: 14 },
        { date: "2026-03-03", visitors: 53, newUsers: 16 },
        { date: "2026-03-04", visitors: 44, newUsers: 9 },
        { date: "2026-03-05", visitors: 60, newUsers: 18 },
        { date: "2026-03-06", visitors: 57, newUsers: 17 },
        { date: "2026-03-07", visitors: 67, newUsers: 20 },
        { date: "2026-03-08", visitors: 72, newUsers: 22 },
      ],
    },
    gateway: {
      totalUsers: 28,
      newUsers: 3,
      paidUsers: 0,
      totalRequests: 156,
      totalTokens: 245000,
      totalSpend: 1.23,
      errorCount: 2,
      errorRate: 1.3,
      topModels: [
        { model: "gpt-4o", requests: 80, tokens: 120000, cost: 0.65 },
        { model: "claude-3.5-sonnet", requests: 50, tokens: 85000, cost: 0.42 },
        { model: "gemini-2.0-flash", requests: 26, tokens: 40000, cost: 0.16 },
      ],
      totalKeys: 35,
      activeKeys: 30,
      desktopKeys: 8,
      discordUsers: 5,
      googleUsers: 23,
    },
    firebase: { newComments: 4, totalComments: 52 },
    vercel: { deployments: 12, bandwidth: 1073741824, serverlessCalls: null },
  },
  previous: {
    timestamp: new Date().toISOString(),
    type: "daily" as const,
    ga4: {
      visitors: { ko: 40, en: 18, total: 58 },
      newUsers: { ko: 10, en: 6, total: 16 },
      pageViews: { ko: 100, en: 45, total: 145 },
      cumulativeVisitors: { ko: 3155, en: 1828, total: 4983 },
      cumulativeDownloads: 327,
      referrals: [],
      blogTopPosts: [],
      downloads: [],
      returningUserRate: 30,
      dailyTrend: [],
    },
    gateway: {
      totalUsers: 25,
      newUsers: 2,
      paidUsers: 0,
      totalRequests: 120,
      totalTokens: 200000,
      totalSpend: 0.98,
      errorCount: 1,
      errorRate: 0.8,
      topModels: [],
      totalKeys: 32,
      activeKeys: 28,
      desktopKeys: 7,
      discordUsers: 4,
      googleUsers: 21,
    },
    firebase: { newComments: 2, totalComments: 48 },
    vercel: { deployments: 8, bandwidth: null, serverlessCalls: null },
  },
  aiSummary:
    "어제 방문자 67명, 전일 대비 +9명(+15.5%)으로 꾸준히 성장 중입니다. **신규 방문자 20명**으로 유입이 활발하고, 재방문율 35%도 나쁘지 않네요.",
};

test.describe("Stats email template", () => {
  test("sparkline bars render correctly with proper heights", async ({
    page,
  }) => {
    const { html } = buildStatsEmail(mockReport);

    // Load email HTML directly into browser
    await page.setContent(html, { waitUntil: "load" });

    // Screenshot full email
    await page.screenshot({
      path: "e2e/screenshots/stats-email-full.png",
      fullPage: true,
    });

    // Find the sparkline chart area — the table right after "유료 회원"
    // The sparkline is inside the 사용자 card
    const userCard = page.locator("text=사용자").locator("..").locator("..");

    // Check that sparkline primary bars exist (border-radius:2px 2px 0 0 is unique to sparkline)
    const primaryBars = page.locator(
      'div[style*="background:#2563EB"][style*="border-radius:2px 2px 0 0"]',
    );
    const barCount = await primaryBars.count();
    expect(barCount).toBe(14); // 14 days of trend data

    // Verify bars have varying heights (not all the same)
    const heights: number[] = [];
    for (let i = 0; i < barCount; i++) {
      const style = await primaryBars.nth(i).getAttribute("style");
      const match = style?.match(/height:(\d+)px/);
      if (match) heights.push(Number(match[1]));
    }
    expect(heights.length).toBe(14);

    // Max bar should be 48px (barMaxHeight), corresponding to visitor=72
    expect(Math.max(...heights)).toBe(48);
    // Min bar should be > 0
    expect(Math.min(...heights)).toBeGreaterThan(0);
    // Not all bars the same height
    const uniqueHeights = new Set(heights);
    expect(uniqueHeights.size).toBeGreaterThan(3);

    // Check secondary (new users) bars exist (inside 29px-height secondary row)
    const secondaryBars = page.locator(
      'td[style*="height:29px"] div[style*="background:#06B6D4"]',
    );
    const secCount = await secondaryBars.count();
    expect(secCount).toBe(14);

    // Verify secondary bars are shorter than primary bars
    for (let i = 0; i < secCount; i++) {
      const secStyle = await secondaryBars.nth(i).getAttribute("style");
      const secMatch = secStyle?.match(/height:(\d+)px/);
      const secH = secMatch ? Number(secMatch[1]) : 0;
      expect(secH).toBeLessThanOrEqual(heights[i]);
    }
  });

  test("all Korean labels are present", async ({ page }) => {
    const { html, subject } = buildStatsEmail(mockReport);
    await page.setContent(html, { waitUntil: "load" });

    // Subject
    expect(subject).toContain("일간 리포트");

    // Section titles
    const labels = [
      "AI 마케터 코멘트",
      "사용자",
      "API / 크레딧",
      "인기 모델 Top 5",
      "다운로드",
      "블로그",
      "유입 경로 Top 5",
      "서버",
    ];
    for (const label of labels) {
      await expect(page.locator(`text=${label}`).first()).toBeVisible();
    }

    // Metric labels
    const metrics = [
      "방문자",
      "신규 방문자",
      "재방문율",
      "페이지뷰",
      "누적 방문자",
      "누적 다운로드",
      "전체 회원",
      "신규 가입",
      "가입 경로",
      "유료 회원",
      "요청 수",
      "토큰 수",
      "사용 금액",
      "오류율",
      "API 키",
      "데스크톱 키",
      "신규 댓글",
      "전체 댓글",
      "인기 포스트",
      "배포 횟수",
      "대역폭",
    ];
    for (const m of metrics) {
      const loc = page.locator(`text=${m}`).first();
      await expect(loc).toBeVisible();
    }
  });

  test("cumulative metrics display correct values", async ({ page }) => {
    const { html } = buildStatsEmail(mockReport);
    await page.setContent(html, { waitUntil: "load" });

    // Cumulative visitors should show ko 3,200 | en 1,850 | 5,050
    await expect(page.locator("text=3,200").first()).toBeVisible();
    await expect(page.locator("text=1,850").first()).toBeVisible();
    await expect(page.locator("text=5,050").first()).toBeVisible();

    // Cumulative downloads
    await expect(page.locator("text=342").first()).toBeVisible();
  });

  test("delta indicators show correct direction", async ({ page }) => {
    const { html } = buildStatsEmail(mockReport);
    await page.setContent(html, { waitUntil: "load" });

    // Visitors went up: 58 → 67 = +9
    await expect(page.locator("text=▲ +9").first()).toBeVisible();

    // Deployments went up: 8 → 12 = +4
    await expect(page.locator("text=▲ +4").first()).toBeVisible();
  });

  test("weekly report has no sparkline chart", async ({ page }) => {
    const weeklyReport = {
      ...mockReport,
      type: "weekly" as const,
    };
    const { html } = buildStatsEmail(weeklyReport);
    await page.setContent(html, { waitUntil: "load" });

    // No sparkline bars in weekly mode (border-radius:2px 2px 0 0 is unique to sparkline primary)
    const sparklineBars = page.locator(
      'div[style*="background:#2563EB"][style*="border-radius:2px 2px 0 0"]',
    );
    expect(await sparklineBars.count()).toBe(0);

    await page.screenshot({
      path: "e2e/screenshots/stats-email-weekly.png",
      fullPage: true,
    });
  });
});
