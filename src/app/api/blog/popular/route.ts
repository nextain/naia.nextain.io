import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 300;

export async function GET() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const clientEmail =
    process.env.GA4_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (
    process.env.GA4_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY || ""
  ).replace(/\\n/g, "\n");

  if (!propertyId || !clientEmail || !privateKey) {
    return NextResponse.json({ popular: [] }, { status: 200 });
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

    const slugViews = new Map<string, number>();
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
      slugViews.set(slug, (slugViews.get(slug) || 0) + views);
    }

    const posts = getAllPosts("en");
    const slugIndex = new Map(posts.map((p) => [p.slug, p]));

    const popular: Array<{
      slug: string;
      title: string;
      hero?: string;
      date: string;
      views: number;
    }> = [];

    for (const [slug, views] of slugViews) {
      const post = slugIndex.get(slug);
      if (post) {
        popular.push({
          slug: post.slug,
          title: post.title,
          hero: post.hero,
          date: post.date,
          views,
        });
      }
    }
    popular.sort((a, b) => b.views - a.views);

    return NextResponse.json(
      { popular: popular.slice(0, 20) },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (error) {
    console.error("GA4 popular posts API error:", error);
    return NextResponse.json({ popular: [] }, { status: 200 });
  }
}
