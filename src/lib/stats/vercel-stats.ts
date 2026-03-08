/**
 * Vercel API stats collector.
 * Fetches deployment count and bandwidth.
 */

import type { VercelStats } from "./types";

function teamParam(): string {
  const teamId = process.env.VERCEL_TEAM_ID;
  return teamId ? `&teamId=${teamId}` : "";
}

async function vercelGet<T>(path: string): Promise<T> {
  const token = process.env.VERCEL_API_TOKEN ?? "";
  const res = await fetch(`https://api.vercel.com${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Vercel ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

export async function collectVercelStats(
  periodStart: string,
): Promise<VercelStats | null> {
  const token = process.env.VERCEL_API_TOKEN ?? "";
  const projectId = process.env.VERCEL_PROJECT_ID ?? "";
  if (!token || !projectId) return null;

  try {
    const since = new Date(periodStart).getTime();
    const until = Date.now();

    // Deployments in period
    const deploymentsData = await vercelGet<{
      deployments: Array<{ created: number }>;
    }>(
      `/v6/deployments?projectId=${projectId}&since=${since}&until=${until}&limit=100${teamParam()}`,
    );
    const deployments = deploymentsData.deployments?.length ?? 0;

    // Bandwidth — try usage endpoint
    let bandwidth: number | null = null;
    try {
      const usageData = await vercelGet<{
        bandwidth?: { total?: number };
      }>(
        `/v1/usage?projectId=${projectId}&from=${since}&to=${until}${teamParam()}`,
      );
      bandwidth = usageData.bandwidth?.total ?? null;
    } catch {
      // Usage endpoint may not be available on Hobby
    }

    return {
      deployments,
      bandwidth,
      serverlessCalls: null, // Requires Vercel Analytics (paid)
    };
  } catch (error) {
    console.error("[stats/vercel] error:", error);
    return null;
  }
}
