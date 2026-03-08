/**
 * Gateway (any-llm) stats collector.
 * Fetches user counts, API usage, keys, model breakdown.
 */

import type { GatewayStats, ModelUsage } from "./types";

function getGatewayUrl(): string {
  return process.env.GATEWAY_URL ?? "http://localhost:8000";
}

function getMasterKey(): string {
  return process.env.GATEWAY_MASTER_KEY ?? "";
}

async function gw(path: string): Promise<Response> {
  return fetch(`${getGatewayUrl()}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "X-AnyLLM-Key": `Bearer ${getMasterKey()}`,
    },
  });
}

async function gwJson<T>(path: string): Promise<T> {
  const res = await gw(path);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gateway ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

function parseArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data;
    if (Array.isArray(obj.items)) return obj.items;
    if (Array.isArray(obj.users)) return obj.users;
  }
  return [];
}

interface RawUser {
  user_id: string;
  created_at: string;
  spend: number;
  metadata?: Record<string, unknown>;
  linked_accounts?: Record<string, string> | null;
}

interface RawKey {
  id: string;
  key_name: string | null;
  is_active: boolean;
  metadata?: Record<string, unknown>;
}

interface RawLog {
  model: string;
  total_tokens: number | null;
  cost: number | null;
  status: string;
  timestamp: string;
}

export async function collectGatewayStats(
  periodStart: string, // ISO date string
): Promise<GatewayStats | null> {
  if (!getMasterKey()) return null;

  try {
    // Try to list all users — admin endpoint
    const usersPayload = await gwJson<unknown>("/v1/users?limit=10000");
    const allUsers = parseArray(usersPayload) as RawUser[];

    const startDate = new Date(periodStart);
    const newUsers = allUsers.filter((u) => new Date(u.created_at) >= startDate);

    // Count by provider (from metadata or linked_accounts)
    let discordUsers = 0;
    let googleUsers = 0;
    for (const u of allUsers) {
      const provider = (u.metadata?.provider as string) ?? "";
      const linked = u.linked_accounts ?? {};
      if (provider === "discord" || linked.discord) discordUsers++;
      if (provider === "google" || linked.google) googleUsers++;
    }

    // Count paid users (spend > 0 with non-free budget — placeholder)
    const paidUsers = 0; // LemonSqueezy not live

    // Fetch all keys
    const keysPayload = await gwJson<unknown>("/v1/keys?limit=10000");
    const allKeys = parseArray(keysPayload) as RawKey[];
    const activeKeys = allKeys.filter((k) => k.is_active).length;
    const desktopKeys = allKeys.filter(
      (k) => k.key_name?.startsWith("desktop-") || k.key_name?.startsWith("naia-desktop"),
    ).length;

    // Fetch usage logs per user (no global endpoint)
    const allLogs: RawLog[] = [];
    const logPromises = allUsers.map(async (u) => {
      try {
        const payload = await gwJson<unknown>(
          `/v1/users/${encodeURIComponent(u.user_id)}/usage?limit=10000`,
        );
        const logs = parseArray(payload) as RawLog[];
        // Filter by period
        return logs.filter((l) => !l.timestamp || new Date(l.timestamp) >= startDate);
      } catch {
        return [];
      }
    });
    const logResults = await Promise.all(logPromises);
    for (const logs of logResults) allLogs.push(...logs);

    let totalRequests = 0;
    let totalTokens = 0;
    let totalSpend = 0;
    let errorCount = 0;
    const modelMap = new Map<string, { requests: number; tokens: number; cost: number }>();

    for (const log of allLogs) {
      totalRequests++;
      const tokens = log.total_tokens ?? 0;
      const cost = log.cost ?? 0;
      totalTokens += tokens;
      totalSpend += cost;

      if (log.status !== "200" && log.status !== "success") {
        errorCount++;
      }

      const model = log.model ?? "(unknown)";
      const entry = modelMap.get(model) ?? { requests: 0, tokens: 0, cost: 0 };
      entry.requests++;
      entry.tokens += tokens;
      entry.cost += cost;
      modelMap.set(model, entry);
    }

    const topModels: ModelUsage[] = [...modelMap.entries()]
      .sort((a, b) => b[1].requests - a[1].requests)
      .slice(0, 5)
      .map(([model, data]) => ({ model, ...data }));

    const errorRate = totalRequests > 0 ? Math.round((errorCount / totalRequests) * 100 * 10) / 10 : null;

    return {
      totalUsers: allUsers.length,
      newUsers: newUsers.length,
      paidUsers,
      totalRequests,
      totalTokens,
      totalSpend: Math.round(totalSpend * 100) / 100,
      errorCount,
      errorRate,
      topModels,
      totalKeys: allKeys.length,
      activeKeys,
      desktopKeys,
      discordUsers,
      googleUsers,
    };
  } catch (error) {
    console.error("[stats/gateway] error:", error);
    return null;
  }
}
