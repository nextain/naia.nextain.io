/**
 * Server-side client for the any-llm gateway API.
 * All calls use the master key — never expose this to the browser.
 */

const GATEWAY_URL = process.env.GATEWAY_URL ?? "http://localhost:8000";
const MASTER_KEY = process.env.GATEWAY_MASTER_KEY ?? "";

// --- Types ---

export interface GatewayUser {
  user_id: string;
  alias: string | null;
  spend: number;
  budget_id: string | null;
  budget_started_at: string | null;
  next_budget_reset_at: string | null;
  blocked: boolean;
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown>;
}

export interface GatewayKey {
  id: string;
  key: string;
  key_name: string | null;
  user_id: string | null;
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
  metadata: Record<string, unknown>;
}

export interface UsageLog {
  id: string;
  user_id: string | null;
  api_key_id: string | null;
  timestamp: string;
  model: string;
  provider: string | null;
  endpoint: string;
  prompt_tokens: number | null;
  completion_tokens: number | null;
  total_tokens: number | null;
  cost: number | null;
  status: string;
  error_message: string | null;
}

export interface GatewayBudget {
  budget_id: string;
  max_budget: number | null;
  budget_duration_sec: number | null;
  created_at: string;
  updated_at: string;
}

// --- Helpers ---

async function gw(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const url = `${GATEWAY_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-AnyLLM-Key": `Bearer ${MASTER_KEY}`,
      ...options.headers,
    },
  });
  return res;
}

async function gwJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await gw(path, options);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gateway ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

// --- Users ---

export async function createUser(
  userId: string,
  alias?: string,
  budgetId?: string,
): Promise<GatewayUser> {
  return gwJson<GatewayUser>("/v1/users", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      alias,
      budget_id: budgetId,
    }),
  });
}

export async function getUser(userId: string): Promise<GatewayUser | null> {
  const res = await gw(`/v1/users/${encodeURIComponent(userId)}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gateway ${res.status}: ${body}`);
  }
  return res.json() as Promise<GatewayUser>;
}

export async function getOrCreateUser(
  userId: string,
  alias?: string,
  budgetId?: string,
): Promise<GatewayUser> {
  const existing = await getUser(userId);
  if (existing) return existing;
  return createUser(userId, alias, budgetId);
}

// --- Keys ---

export async function createVirtualKey(
  userId: string,
  keyName?: string,
): Promise<GatewayKey> {
  return gwJson<GatewayKey>("/v1/keys", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      key_name: keyName ?? `lab-${userId}`,
    }),
  });
}

// --- Usage ---

export async function getUserUsage(
  userId: string,
  skip = 0,
  limit = 50,
): Promise<UsageLog[]> {
  return gwJson<UsageLog[]>(
    `/v1/users/${encodeURIComponent(userId)}/usage?skip=${skip}&limit=${limit}`,
  );
}

// --- Budgets ---

export async function getBudget(budgetId: string): Promise<GatewayBudget> {
  return gwJson<GatewayBudget>(
    `/v1/budgets/${encodeURIComponent(budgetId)}`,
  );
}
