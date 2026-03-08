/**
 * AI summary generator using Gemini 2.5 Pro.
 * Marketer persona — analyzes stats and gives casual, insightful commentary in Korean.
 */

import type { StatsSnapshot } from "./types";

export async function generateAISummary(
  current: StatsSnapshot,
  previous: StatsSnapshot | null,
  type: "daily" | "weekly",
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("[stats/ai-summary] GEMINI_API_KEY not set — skipping");
    return null;
  }

  const periodLabel = type === "daily" ? "어제" : "지난주";
  const prevLabel = type === "daily" ? "전일" : "전주";

  const statsText = buildStatsText(current, previous, prevLabel);

  const prompt = `당신은 Naia 서비스의 시니어 마케터입니다.
아래 ${periodLabel} 통계를 보고, 운영자(Luke)에게 슬랙 보내듯 편하게 의견을 주세요.

## 할 일
1. 평소와 다른 유니크한 변화가 있으면 짚어주세요
2. 추세를 보고 방향성에 대한 의견을 주세요
3. 데이터 기반으로 다음 액션을 제안해주세요

## 규칙
- 한국어로 작성
- 딱딱한 보고서 톤 금지 — 동료에게 톡 보내듯 자연스럽게
- 숫자를 그대로 나열하지 말고, 의미를 해석해주세요
- 자유롭게, 하지만 간결하게
- 절대로 데이터에 없는 숫자나 사실을 지어내지 마세요 (인스타 광고, 마케팅 채널 등 추측 금지)
- 아래 제공된 통계 데이터에 있는 숫자만 언급하세요
- 데이터가 0이거나 비어있으면 "아직 데이터 부족" 이라고 솔직하게 말하세요

## 통계 데이터
${statsText}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 8192 },
        }),
        signal: AbortSignal.timeout(30000),
      },
    );

    if (!res.ok) {
      console.error("[stats/ai-summary] Gemini error:", await res.text());
      return null;
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch (error) {
    console.error("[stats/ai-summary] error:", error);
    return null;
  }
}

function buildStatsText(
  current: StatsSnapshot,
  previous: StatsSnapshot | null,
  prevLabel: string,
): string {
  const lines: string[] = [];

  const ga4 = current.ga4;
  const prevGa4 = previous?.ga4;
  if (ga4) {
    lines.push("### 방문자/유저 (GA4)");
    lines.push(`방문자: ko=${ga4.visitors.ko}, en=${ga4.visitors.en}, 합계=${ga4.visitors.total}`);
    if (prevGa4) lines.push(`  ${prevLabel}: ko=${prevGa4.visitors.ko}, en=${prevGa4.visitors.en}, 합계=${prevGa4.visitors.total}`);
    lines.push(`신규 방문자: ko=${ga4.newUsers.ko}, en=${ga4.newUsers.en}, 합계=${ga4.newUsers.total}`);
    if (prevGa4) lines.push(`  ${prevLabel}: ko=${prevGa4.newUsers.ko}, en=${prevGa4.newUsers.en}, 합계=${prevGa4.newUsers.total}`);
    lines.push(`페이지뷰: 합계=${ga4.pageViews.total}`);
    if (ga4.returningUserRate !== null) lines.push(`재방문율: ${ga4.returningUserRate}%`);
    if (ga4.referrals.length > 0) {
      lines.push(`유입 경로: ${ga4.referrals.map((r) => `${r.source}(${r.sessions})`).join(", ")}`);
    }
    if (ga4.blogTopPosts.length > 0) {
      lines.push(`블로그 인기글: ${ga4.blogTopPosts.map((p) => `${p.slug}(${p.views}뷰)`).join(", ")}`);
    }
    if (ga4.downloads.length > 0) {
      lines.push(`다운로드: ${ga4.downloads.map((d) => `${d.label}(${d.clicks})`).join(", ")}`);
    }
  }

  const gw = current.gateway;
  const prevGw = previous?.gateway;
  if (gw) {
    lines.push("\n### 사용자/API (Gateway)");
    lines.push(`누적 회원: ${gw.totalUsers} (신규: ${gw.newUsers})`);
    if (prevGw) lines.push(`  ${prevLabel} 신규: ${prevGw.newUsers}`);
    lines.push(`Google: ${gw.googleUsers}명, Discord: ${gw.discordUsers}명`);
    lines.push(`유료 사용자: ${gw.paidUsers}`);
    lines.push(`API 요청: ${gw.totalRequests} (에러율: ${gw.errorRate ?? 0}%)`);
    if (prevGw) lines.push(`  ${prevLabel} 요청: ${prevGw.totalRequests}`);
    lines.push(`토큰: ${gw.totalTokens.toLocaleString()}, 비용: $${gw.totalSpend}`);
    lines.push(`API 키: 전체 ${gw.totalKeys}, 활성 ${gw.activeKeys}, 데스크톱 ${gw.desktopKeys}`);
    if (gw.topModels.length > 0) {
      lines.push(`인기 모델: ${gw.topModels.map((m) => `${m.model}(${m.requests}건)`).join(", ")}`);
    }
  }

  const fb = current.firebase;
  if (fb) {
    lines.push("\n### 블로그 댓글 (Firebase)");
    lines.push(`신규 댓글: ${fb.newComments}, 총 댓글: ${fb.totalComments}`);
  }

  const vc = current.vercel;
  if (vc) {
    lines.push("\n### 서버 (Vercel)");
    lines.push(`배포: ${vc.deployments}회`);
    if (vc.bandwidth !== null) {
      lines.push(`Bandwidth: ${(vc.bandwidth / 1024 / 1024 / 1024).toFixed(2)} GB`);
    }
  }

  return lines.join("\n");
}
