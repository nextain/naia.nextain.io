/**
 * Cron endpoint for daily/weekly stats report.
 * Called by Vercel Cron with CRON_SECRET authorization.
 *
 * GET /api/cron/stats?type=daily
 * GET /api/cron/stats?type=weekly
 */

import { NextRequest, NextResponse } from "next/server";
import { collectGA4Stats } from "@/lib/stats/ga4-stats";
import { collectGatewayStats } from "@/lib/stats/gateway-stats";
import { collectFirebaseStats } from "@/lib/stats/firebase-stats";
import { collectVercelStats } from "@/lib/stats/vercel-stats";
import { generateAISummary } from "@/lib/stats/ai-summary";
import { buildStatsEmail } from "@/lib/stats/email-template";
import { saveSnapshot, loadPreviousSnapshot } from "@/lib/stats/snapshot";
import { sendEmail } from "@/lib/email";
import type { ReportType, StatsSnapshot, StatsReport } from "@/lib/stats/types";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

function getPeriodStart(type: ReportType): string {
  const now = new Date();
  if (type === "weekly") {
    const d = new Date(now);
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0, 10);
  }
  // daily: yesterday
  const d = new Date(now);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  // Auth check: Vercel Cron sends Authorization: Bearer <CRON_SECRET>
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const type = (req.nextUrl.searchParams.get("type") ?? "daily") as ReportType;
  if (type !== "daily" && type !== "weekly") {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const today = getToday();
  const periodStart = getPeriodStart(type);
  const ga4Period = type === "daily" ? "yesterday" : "7days";

  try {
    // Collect all stats in parallel
    const [ga4, gateway, firebase, vercel] = await Promise.allSettled([
      collectGA4Stats(ga4Period),
      collectGatewayStats(periodStart),
      collectFirebaseStats(periodStart),
      collectVercelStats(periodStart),
    ]);

    const current: StatsSnapshot = {
      timestamp: today,
      type,
      ga4: ga4.status === "fulfilled" ? ga4.value : null,
      gateway: gateway.status === "fulfilled" ? gateway.value : null,
      firebase: firebase.status === "fulfilled" ? firebase.value : null,
      vercel: vercel.status === "fulfilled" ? vercel.value : null,
    };

    // Load previous snapshot for delta comparison
    const previous = await loadPreviousSnapshot(type, today);

    // Generate AI summary (non-blocking — skip on failure)
    const aiSummary = await generateAISummary(current, previous, type);

    // Build email
    const report: StatsReport = {
      type,
      date: today,
      current,
      previous,
      aiSummary,
    };

    const { subject, html } = buildStatsEmail(report);

    // Send email
    const recipient = process.env.STATS_ADMIN_EMAIL ?? "dev@nextain.io";
    const sent = await sendEmail({ to: recipient, subject, html });

    // Save snapshot for future delta comparison
    await saveSnapshot(current);

    // Log collector failures
    const failures: string[] = [];
    if (ga4.status === "rejected") failures.push(`ga4: ${ga4.reason}`);
    if (gateway.status === "rejected") failures.push(`gateway: ${gateway.reason}`);
    if (firebase.status === "rejected") failures.push(`firebase: ${firebase.reason}`);
    if (vercel.status === "rejected") failures.push(`vercel: ${vercel.reason}`);

    return NextResponse.json({
      ok: true,
      type,
      date: today,
      emailSent: sent,
      aiSummary: !!aiSummary,
      collectors: {
        ga4: ga4.status === "fulfilled" ? (ga4.value ? "ok" : "null") : "error",
        gateway: gateway.status === "fulfilled" ? (gateway.value ? "ok" : "null") : "error",
        firebase: firebase.status === "fulfilled" ? (firebase.value ? "ok" : "null") : "error",
        vercel: vercel.status === "fulfilled" ? (vercel.value ? "ok" : "null") : "error",
      },
      failures: failures.length > 0 ? failures : undefined,
    });
  } catch (error) {
    console.error("[cron/stats] error:", error);
    return NextResponse.json(
      { error: "Stats report failed", detail: String(error) },
      { status: 500 },
    );
  }
}
