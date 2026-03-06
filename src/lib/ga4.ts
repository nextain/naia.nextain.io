import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { unstable_cache } from "next/cache";

/**
 * Fetch blog post view counts from GA4 (30-day window).
 * Returns Record<slug, views>. Cached for 5 minutes.
 * Returns empty object if GA4 is not configured.
 */
export const getPostViews = unstable_cache(
  async (): Promise<Record<string, number>> => {
    const propertyId = process.env.GA4_PROPERTY_ID;
    const clientEmail =
      process.env.GA4_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = (
      process.env.GA4_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY || ""
    ).replace(/\\n/g, "\n");

    if (!propertyId || !clientEmail || !privateKey) {
      return {};
    }

    try {
      const client = new BetaAnalyticsDataClient({
        credentials: { client_email: clientEmail, private_key: privateKey },
      });

      const [response] = await client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        dimensionFilter: {
          filter: {
            fieldName: "pagePath",
            stringFilter: { matchType: "CONTAINS", value: "/blog/" },
          },
        },
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 50,
      });

      const slugViews: Record<string, number> = {};
      for (const row of response.rows || []) {
        const rawPath = row.dimensionValues?.[0]?.value || "";
        const views = Number(row.metricValues?.[0]?.value ?? 0);
        const match = rawPath.match(/\/blog\/([^/?]+)/);
        if (!match) continue;
        let slug: string;
        try {
          slug = decodeURIComponent(match[1]);
        } catch {
          slug = match[1];
        }
        slugViews[slug] = (slugViews[slug] || 0) + views;
      }

      return slugViews;
    } catch (error) {
      console.error("GA4 getPostViews error:", error);
      return {};
    }
  },
  ["ga4-post-views"],
  { revalidate: 300 },
);
