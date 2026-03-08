/**
 * GA4 Data API collector.
 * Fetches visitors, page views, referrals, blog top posts, downloads — all by locale.
 */

import { BetaAnalyticsDataClient } from "@google-analytics/data";
import type { GA4Stats, LocaleBreakdown, ReferralSource, PopularPost, DownloadStat } from "./types";

function getClient(): BetaAnalyticsDataClient | null {
  const clientEmail =
    process.env.GA4_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (
    process.env.GA4_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY || ""
  ).replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) return null;

  return new BetaAnalyticsDataClient({
    credentials: { client_email: clientEmail, private_key: privateKey },
  });
}

function getProperty(): string | null {
  const id = process.env.GA4_PROPERTY_ID;
  return id ? `properties/${id}` : null;
}

function dateRange(period: "yesterday" | "7days"): { startDate: string; endDate: string } {
  if (period === "yesterday") {
    return { startDate: "yesterday", endDate: "yesterday" };
  }
  return { startDate: "7daysAgo", endDate: "yesterday" };
}

export async function collectGA4Stats(period: "yesterday" | "7days"): Promise<GA4Stats | null> {
  const client = getClient();
  const property = getProperty();
  if (!client || !property) return null;

  const range = dateRange(period);
  const trendDays = period === "yesterday" ? 14 : 28;

  try {
    // Run all reports in parallel
    const [visitorsRes, referralsRes, blogRes, downloadsRes, cumulativeRes, cumulativeDlRes, trendRes] = await Promise.all([
      // 1. Visitors + new users + page views by language segment
      client.runReport({
        property,
        dateRanges: [range],
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "activeUsers" },
          { name: "newUsers" },
          { name: "screenPageViews" },
        ],
        limit: 500,
      }),
      // 2. Referral sources
      client.runReport({
        property,
        dateRanges: [range],
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 5,
      }),
      // 3. Blog top posts
      client.runReport({
        property,
        dateRanges: [range],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        dimensionFilter: {
          filter: {
            fieldName: "pagePath",
            stringFilter: { matchType: "CONTAINS", value: "/blog/" },
          },
        },
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 20,
      }),
      // 4. Download clicks (GA4 event)
      client.runReport({
        property,
        dateRanges: [range],
        dimensions: [{ name: "linkUrl" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          andGroup: {
            expressions: [
              {
                filter: {
                  fieldName: "eventName",
                  stringFilter: { matchType: "EXACT", value: "click" },
                },
              },
              {
                filter: {
                  fieldName: "linkUrl",
                  stringFilter: { matchType: "CONTAINS", value: "download" },
                },
              },
            ],
          },
        },
        orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
        limit: 10,
      }).catch(() => [{ rows: [] }]),
      // 5. Cumulative visitors (all-time, by locale)
      client.runReport({
        property,
        dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "activeUsers" }],
        limit: 500,
      }),
      // 6. Cumulative downloads (all-time)
      client.runReport({
        property,
        dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
        dimensions: [{ name: "linkUrl" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          andGroup: {
            expressions: [
              {
                filter: {
                  fieldName: "eventName",
                  stringFilter: { matchType: "EXACT", value: "click" },
                },
              },
              {
                filter: {
                  fieldName: "linkUrl",
                  stringFilter: { matchType: "CONTAINS", value: "download" },
                },
              },
            ],
          },
        },
      }).catch(() => [{ rows: [] }]),
      // 7. Daily trend (14 days for daily, 28 days for weekly)
      client.runReport({
        property,
        dateRanges: [{ startDate: `${trendDays}daysAgo`, endDate: "yesterday" }],
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "activeUsers" },
          { name: "newUsers" },
        ],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
    ]);

    // Parse visitors
    const visitorRows = visitorsRes[0].rows ?? [];
    const visitors: LocaleBreakdown = { ko: 0, en: 0, total: 0 };
    const newUsers: LocaleBreakdown = { ko: 0, en: 0, total: 0 };
    const pageViews: LocaleBreakdown = { ko: 0, en: 0, total: 0 };

    for (const row of visitorRows) {
      const path = row.dimensionValues?.[0]?.value ?? "";
      const active = Number(row.metricValues?.[0]?.value ?? 0);
      const newU = Number(row.metricValues?.[1]?.value ?? 0);
      const pv = Number(row.metricValues?.[2]?.value ?? 0);

      visitors.total += active;
      newUsers.total += newU;
      pageViews.total += pv;

      if (path.startsWith("/ko")) {
        visitors.ko += active;
        newUsers.ko += newU;
        pageViews.ko += pv;
      } else if (path.startsWith("/en")) {
        visitors.en += active;
        newUsers.en += newU;
        pageViews.en += pv;
      }
    }

    // Parse referrals
    const referrals: ReferralSource[] = (referralsRes[0].rows ?? []).map((row) => ({
      source: row.dimensionValues?.[0]?.value ?? "(unknown)",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
    }));

    // Parse blog top posts — deduplicate by slug
    const slugViews = new Map<string, number>();
    for (const row of blogRes[0].rows ?? []) {
      const rawPath = row.dimensionValues?.[0]?.value ?? "";
      const views = Number(row.metricValues?.[0]?.value ?? 0);
      const match = rawPath.match(/\/blog\/([^/?]+)/);
      if (!match) continue;
      let slug: string;
      try {
        slug = decodeURIComponent(match[1]);
      } catch {
        slug = match[1];
      }
      slugViews.set(slug, (slugViews.get(slug) ?? 0) + views);
    }
    const blogTopPosts: PopularPost[] = [...slugViews.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([slug, views]) => ({ slug, title: slug, views }));

    // Parse downloads
    const downloads: DownloadStat[] = (downloadsRes[0]?.rows ?? []).map((row) => ({
      label: row.dimensionValues?.[0]?.value ?? "(unknown)",
      clicks: Number(row.metricValues?.[0]?.value ?? 0),
    }));

    // Parse cumulative visitors by locale
    const cumulativeVisitors: LocaleBreakdown = { ko: 0, en: 0, total: 0 };
    for (const row of cumulativeRes[0].rows ?? []) {
      const path = row.dimensionValues?.[0]?.value ?? "";
      const val = Number(row.metricValues?.[0]?.value ?? 0);
      cumulativeVisitors.total += val;
      if (path.startsWith("/ko")) cumulativeVisitors.ko += val;
      else if (path.startsWith("/en")) cumulativeVisitors.en += val;
    }

    // Parse cumulative downloads
    let cumulativeDownloads = 0;
    for (const row of cumulativeDlRes[0]?.rows ?? []) {
      cumulativeDownloads += Number(row.metricValues?.[0]?.value ?? 0);
    }

    // Parse daily trend
    const dailyTrend: Array<{ date: string; visitors: number; newUsers: number }> = [];
    for (const row of trendRes[0].rows ?? []) {
      const raw = row.dimensionValues?.[0]?.value ?? "";
      const date = raw.length === 8
        ? `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`
        : raw;
      dailyTrend.push({
        date,
        visitors: Number(row.metricValues?.[0]?.value ?? 0),
        newUsers: Number(row.metricValues?.[1]?.value ?? 0),
      });
    }

    // Returning user rate
    const totalActive = visitors.total;
    const totalNew = newUsers.total;
    const returning = totalActive > 0 ? Math.round(((totalActive - totalNew) / totalActive) * 100) : null;

    return {
      visitors,
      newUsers,
      pageViews,
      cumulativeVisitors,
      cumulativeDownloads,
      referrals,
      blogTopPosts,
      downloads,
      returningUserRate: returning,
      dailyTrend,
    };
  } catch (error) {
    console.error("[stats/ga4] error:", error);
    return null;
  }
}
