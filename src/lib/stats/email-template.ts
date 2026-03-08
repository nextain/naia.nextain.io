/**
 * Stats report HTML email template.
 * Tailwind-style inline CSS with Nextain Blue / Flow Cyan theme.
 */

import type { StatsReport, StatsSnapshot, LocaleBreakdown, ModelUsage, ReferralSource, DownloadStat } from "./types";

// --- Colors (Nextain brand) ---
const C = {
  blue: "#2563EB",
  cyan: "#06B6D4",
  bg: "#F8FAFC",
  cardBg: "#FFFFFF",
  darkBg: "#0F172A",
  text: "#1E293B",
  textMuted: "#64748B",
  textLight: "#94A3B8",
  border: "#E2E8F0",
  green: "#10B981",
  red: "#EF4444",
  greenBg: "#F0FDF4",
  redBg: "#FEF2F2",
  cyanBg: "#ECFEFF",
  blueBg: "#EFF6FF",
} as const;

// --- Helpers ---

function delta(current: number, previous: number | undefined | null): string {
  if (previous === null || previous === undefined) return "";
  const diff = current - previous;
  if (diff === 0) return `<span style="color:${C.textLight};">±0</span>`;
  if (diff > 0) return `<span style="color:${C.green};">▲ +${diff.toLocaleString()}</span>`;
  return `<span style="color:${C.red};">▼ ${diff.toLocaleString()}</span>`;
}

function deltaPercent(current: number, previous: number | undefined | null): string {
  if (previous === null || previous === undefined || previous === 0) return "";
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct === 0) return `<span style="color:${C.textLight};">±0%</span>`;
  if (pct > 0) return `<span style="color:${C.green};">▲ +${pct}%</span>`;
  return `<span style="color:${C.red};">▼ ${pct}%</span>`;
}

function num(n: number | null | undefined): string {
  if (n === null || n === undefined) return "-";
  return n.toLocaleString();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// --- Layout components ---

function card(title: string, emoji: string, content: string): string {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
  <tr>
    <td style="background:${C.cardBg};border:1px solid ${C.border};border-radius:12px;padding:20px;">
      <p style="margin:0 0 12px 0;font-size:15px;font-weight:700;color:${C.text};">
        ${emoji} ${title}
      </p>
      ${content}
    </td>
  </tr>
</table>`;
}

function metricRow(label: string, value: string, deltaHtml: string = ""): string {
  return `
<tr>
  <td style="padding:6px 0;color:${C.textMuted};font-size:13px;width:40%;">${label}</td>
  <td style="padding:6px 0;font-size:15px;font-weight:600;color:${C.text};">${value}</td>
  <td style="padding:6px 0;font-size:12px;text-align:right;">${deltaHtml}</td>
</tr>`;
}

function metricTable(rows: string): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>`;
}

function localeRow(
  label: string,
  current: LocaleBreakdown,
  previous?: LocaleBreakdown | null,
  weekly = false,
): string {
  const deltaFn = weekly ? deltaPercent : delta;
  return metricRow(
    label,
    `<span style="color:${C.blue};">ko ${num(current.ko)}</span>
     <span style="color:${C.textLight};margin:0 4px;">|</span>
     <span style="color:${C.cyan};">en ${num(current.en)}</span>
     <span style="color:${C.textLight};margin:0 4px;">|</span>
     ${num(current.total)}`,
    previous ? deltaFn(current.total, previous.total) : "",
  );
}

function divider(): string {
  return `<tr><td colspan="3" style="padding:4px 0;"><hr style="border:none;border-top:1px solid ${C.border};margin:0;"></td></tr>`;
}

function badge(text: string, bgColor: string, textColor: string): string {
  return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:${bgColor};color:${textColor};">${text}</span>`;
}

// --- Sparkline bar chart (email-safe: table-only, no position/absolute) ---

function sparkline(
  data: Array<{ label: string; value: number; secondary?: number }>,
  primaryColor: string = C.blue,
  secondaryColor: string = C.cyan,
): string {
  if (data.length === 0) return "";
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const barMaxHeight = 48;

  // Row 1: primary bars (vertical-align bottom)
  let primaryBars = "";
  let secondaryBars = "";
  let labels = "";
  for (const d of data) {
    const h = Math.max(2, Math.round((d.value / maxVal) * barMaxHeight));
    const sh = d.secondary !== undefined ? Math.max(1, Math.round((d.secondary / maxVal) * barMaxHeight)) : 0;
    const dayLabel = d.label.slice(-2);

    primaryBars += `<td style="vertical-align:bottom;text-align:center;padding:0 1px;height:${barMaxHeight}px;"><!--[if mso]><v:rect style="width:100%;height:${h}px;" fillcolor="${primaryColor}" stroked="f"/><![endif]--><!--[if !mso]><!--><div style="width:100%;height:${h}px;background:${primaryColor};border-radius:2px 2px 0 0;"></div><!--<![endif]--></td>`;

    secondaryBars += `<td style="vertical-align:bottom;text-align:center;padding:0 1px;height:${Math.round(barMaxHeight * 0.6)}px;">${sh > 0 ? `<div style="width:100%;height:${sh}px;background:${secondaryColor};border-radius:1px;"></div>` : ""}</td>`;

    labels += `<td style="text-align:center;padding:2px 0 0 0;font-size:9px;color:${C.textLight};">${dayLabel}</td>`;
  }

  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:12px;">
  <tr>${primaryBars}</tr>
  <tr>${secondaryBars}</tr>
  <tr>${labels}</tr>
</table>
<table cellpadding="0" cellspacing="0" style="margin-top:6px;">
  <tr>
    <td style="width:8px;height:8px;background:${primaryColor};border-radius:1px;"></td>
    <td style="padding:0 8px 0 4px;font-size:10px;color:${C.textMuted};">방문자</td>
    <td style="width:8px;height:8px;background:${secondaryColor};border-radius:1px;"></td>
    <td style="padding:0 0 0 4px;font-size:10px;color:${C.textMuted};">신규</td>
  </tr>
</table>`;
}

// --- Section builders ---

function aiSummarySection(summary: string): string {
  // Convert markdown-like formatting to HTML
  const html = escapeHtml(summary)
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  return `
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
  <tr>
    <td style="background:${C.cyanBg};border:2px solid ${C.cyan};border-radius:12px;padding:20px;">
      <p style="margin:0 0 8px 0;font-size:14px;font-weight:700;color:${C.blue};">
        AI 마케터 코멘트
      </p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:${C.text};">
        ${html}
      </p>
    </td>
  </tr>
</table>`;
}

function usersSection(current: StatsSnapshot, previous: StatsSnapshot | null, weekly = false): string {
  const ga4 = current.ga4;
  const gw = current.gateway;
  if (!ga4 && !gw) return "";

  const prevGa4 = previous?.ga4;
  const prevGw = previous?.gateway;
  const deltaFn = weekly ? deltaPercent : delta;

  let rows = "";

  if (ga4) {
    rows += localeRow("방문자", ga4.visitors, prevGa4?.visitors, weekly);
    rows += localeRow("신규 방문자", ga4.newUsers, prevGa4?.newUsers, weekly);
    if (ga4.returningUserRate !== null) {
      rows += metricRow("재방문율", `${ga4.returningUserRate}%`, "");
    }
    rows += localeRow("페이지뷰", ga4.pageViews, prevGa4?.pageViews, weekly);
    rows += divider();

    // 누적 지표
    rows += localeRow("누적 방문자 (전체)", ga4.cumulativeVisitors);
    if (ga4.cumulativeDownloads > 0) {
      rows += metricRow("누적 다운로드 (전체)", num(ga4.cumulativeDownloads), "");
    }
    rows += divider();
  }

  if (gw) {
    rows += metricRow("전체 회원", num(gw.totalUsers), prevGw ? deltaFn(gw.totalUsers, prevGw.totalUsers) : "");
    rows += metricRow("신규 가입", num(gw.newUsers), prevGw ? deltaFn(gw.newUsers, prevGw.newUsers) : "");
    rows += metricRow(
      "가입 경로",
      `${badge(`Google ${gw.googleUsers}`, C.blueBg, C.blue)} ${badge(`Discord ${gw.discordUsers}`, "#F3E8FF", "#7C3AED")}`,
      "",
    );
    rows += metricRow("유료 회원", num(gw.paidUsers), "");
  }

  // 트렌드 차트 (일간 리포트만)
  let trendHtml = "";
  if (!weekly && ga4?.dailyTrend && ga4.dailyTrend.length > 0) {
    trendHtml = sparkline(
      ga4.dailyTrend.map((d) => ({
        label: d.date,
        value: d.visitors,
        secondary: d.newUsers,
      })),
    );
  }

  return card("사용자", "👥", metricTable(rows) + trendHtml);
}

function apiSection(current: StatsSnapshot, previous: StatsSnapshot | null, weekly = false): string {
  const gw = current.gateway;
  if (!gw) return "";

  const prevGw = previous?.gateway;
  const deltaFn = weekly ? deltaPercent : delta;

  let rows = "";
  rows += metricRow("요청 수", num(gw.totalRequests), prevGw ? deltaFn(gw.totalRequests, prevGw.totalRequests) : "");
  rows += metricRow("토큰 수", num(gw.totalTokens), prevGw ? deltaFn(gw.totalTokens, prevGw.totalTokens) : "");
  rows += metricRow("사용 금액", `$${gw.totalSpend.toFixed(2)}`, prevGw ? deltaFn(gw.totalSpend, prevGw.totalSpend) : "");
  rows += metricRow(
    "오류율",
    gw.errorRate !== null
      ? `${gw.errorRate}% ${gw.errorRate > 5 ? badge("높음", C.redBg, C.red) : badge("정상", C.greenBg, C.green)}`
      : "-",
    "",
  );
  rows += divider();
  rows += metricRow("API 키", `${num(gw.activeKeys)} 활성 / ${num(gw.totalKeys)} 전체`, "");
  rows += metricRow("데스크톱 키", num(gw.desktopKeys), prevGw ? deltaFn(gw.desktopKeys, prevGw.desktopKeys) : "");

  return card("API / 크레딧", "📡", metricTable(rows));
}

function modelsSection(models: ModelUsage[]): string {
  if (models.length === 0) return "";

  let tableHtml = `
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
  <tr style="border-bottom:2px solid ${C.border};">
    <td style="padding:8px 0;font-size:12px;font-weight:600;color:${C.textMuted};">모델</td>
    <td style="padding:8px 0;font-size:12px;font-weight:600;color:${C.textMuted};text-align:right;">요청</td>
    <td style="padding:8px 0;font-size:12px;font-weight:600;color:${C.textMuted};text-align:right;">토큰</td>
    <td style="padding:8px 0;font-size:12px;font-weight:600;color:${C.textMuted};text-align:right;">비용</td>
  </tr>`;

  for (const m of models) {
    tableHtml += `
  <tr style="border-bottom:1px solid ${C.border};">
    <td style="padding:8px 0;font-size:13px;color:${C.text};font-weight:500;">${escapeHtml(m.model)}</td>
    <td style="padding:8px 0;font-size:13px;color:${C.text};text-align:right;">${num(m.requests)}</td>
    <td style="padding:8px 0;font-size:13px;color:${C.text};text-align:right;">${num(m.tokens)}</td>
    <td style="padding:8px 0;font-size:13px;color:${C.text};text-align:right;">$${m.cost.toFixed(2)}</td>
  </tr>`;
  }
  tableHtml += "</table>";

  return card("인기 모델 Top 5", "🏆", tableHtml);
}

function downloadsSection(downloads: DownloadStat[]): string {
  if (downloads.length === 0) return "";

  const total = downloads.reduce((sum, d) => sum + d.clicks, 0);
  let rows = "";
  for (const d of downloads) {
    rows += metricRow(escapeHtml(d.label), num(d.clicks), "");
  }
  rows += divider();
  rows += metricRow("합계", `<strong>${num(total)}</strong>`, "");

  return card("다운로드", "📥", metricTable(rows));
}

function blogSection(current: StatsSnapshot, previous: StatsSnapshot | null): string {
  const ga4 = current.ga4;
  const fb = current.firebase;
  if (!ga4 && !fb) return "";

  let content = "";

  if (fb) {
    let rows = "";
    rows += metricRow("신규 댓글", num(fb.newComments), previous?.firebase ? delta(fb.newComments, previous.firebase.newComments) : "");
    rows += metricRow("전체 댓글", num(fb.totalComments), "");
    content += metricTable(rows);
  }

  if (ga4?.blogTopPosts && ga4.blogTopPosts.length > 0) {
    content += `<p style="margin:12px 0 8px 0;font-size:12px;font-weight:600;color:${C.textMuted};">인기 포스트</p>`;
    content += `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">`;
    for (let i = 0; i < ga4.blogTopPosts.length; i++) {
      const p = ga4.blogTopPosts[i];
      content += `
  <tr style="border-bottom:1px solid ${C.border};">
    <td style="padding:6px 0;font-size:13px;color:${C.textMuted};width:24px;">${i + 1}.</td>
    <td style="padding:6px 0;font-size:13px;color:${C.text};">${escapeHtml(p.title)}</td>
    <td style="padding:6px 0;font-size:13px;color:${C.text};text-align:right;font-weight:600;">${num(p.views)}회</td>
  </tr>`;
    }
    content += "</table>";
  }

  return card("블로그", "📝", content);
}

function referralsSection(referrals: ReferralSource[]): string {
  if (referrals.length === 0) return "";

  let rows = "";
  for (let i = 0; i < referrals.length; i++) {
    const r = referrals[i];
    const barWidth = referrals[0].sessions > 0 ? Math.round((r.sessions / referrals[0].sessions) * 100) : 0;
    rows += `
<tr>
  <td style="padding:6px 0;font-size:13px;color:${C.textMuted};width:24px;">${i + 1}.</td>
  <td style="padding:6px 0;font-size:13px;color:${C.text};">
    ${escapeHtml(r.source)}
    <div style="margin-top:4px;height:4px;border-radius:2px;background:${C.border};">
      <div style="height:4px;border-radius:2px;background:${C.blue};width:${barWidth}%;"></div>
    </div>
  </td>
  <td style="padding:6px 0;font-size:13px;color:${C.text};text-align:right;font-weight:600;width:60px;">${num(r.sessions)}</td>
</tr>`;
  }

  return card("유입 경로 Top 5", "🔍", `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>`);
}

function serverSection(current: StatsSnapshot, previous: StatsSnapshot | null): string {
  const vc = current.vercel;
  if (!vc) return "";

  const prevVc = previous?.vercel;
  let rows = "";
  rows += metricRow("배포 횟수", num(vc.deployments), prevVc ? delta(vc.deployments, prevVc.deployments) : "");
  if (vc.bandwidth !== null) {
    const bwGB = (vc.bandwidth / 1024 / 1024 / 1024).toFixed(2);
    rows += metricRow("대역폭", `${bwGB} GB`, "");
  }
  if (vc.serverlessCalls !== null) {
    rows += metricRow("서버리스 호출", num(vc.serverlessCalls), "");
  }

  return card("서버", "🖥️", metricTable(rows));
}

// --- Main template ---

export function buildStatsEmail(report: StatsReport): { subject: string; html: string } {
  const { type, date, current, previous, aiSummary } = report;
  const typeLabel = type === "daily" ? "Daily" : "Weekly";
  const typeKo = type === "daily" ? "일간" : "주간";

  const subject = `[Naia] ${typeKo} 리포트 — ${date}`;

  const weekly = type === "weekly";
  const sections = [
    aiSummary ? aiSummarySection(aiSummary) : "",
    usersSection(current, previous, weekly),
    apiSection(current, previous, weekly),
    modelsSection(current.gateway?.topModels ?? []),
    downloadsSection(current.ga4?.downloads ?? []),
    blogSection(current, previous),
    referralsSection(current.ga4?.referrals ?? []),
    serverSection(current, previous),
  ]
    .filter(Boolean)
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans KR',sans-serif;-webkit-text-size-adjust:100%;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="background:${C.darkBg};border-radius:12px 12px 0 0;padding:24px 24px 20px 24px;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:13px;font-weight:600;color:${C.cyan};text-transform:uppercase;letter-spacing:1px;">
                Naia ${typeLabel} Report
              </p>
              <p style="margin:0;font-size:24px;font-weight:700;color:#FFFFFF;">
                ${date}
              </p>
              <p style="margin:8px 0 0 0;font-size:12px;color:${C.textLight};">
                ${typeKo} 통계 리포트 · naia.nextain.io
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:${C.bg};padding:20px 0 0 0;">
              ${sections}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:${C.textLight};">
                Naia Service · Nextain Inc. · 자동 생성 리포트
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  return { subject, html };
}
