import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUser, lookupUser } from "@/lib/gateway-client";

interface LinkedChannel {
  type: string;
  userId: string;
}

const ALLOWED_ORIGINS = [
  "http://localhost:1420",
  "https://tauri.localhost",
  "tauri://localhost",
];

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Desktop-Key, X-User-Id",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

/**
 * Build linked channels list from gateway lookup linked_accounts.
 */
function buildChannels(linkedAccounts: Record<string, string> | null | undefined): LinkedChannel[] {
  const channels: LinkedChannel[] = [];
  if (!linkedAccounts) return channels;

  for (const [provider, accountId] of Object.entries(linkedAccounts)) {
    if (provider === "discord" && accountId) {
      channels.push({ type: "discord", userId: accountId });
    }
    // Future: slack, google-chat, etc.
  }
  return channels;
}

/**
 * GET /api/gateway/linked-channels — Return linked messaging channels for the current user.
 *
 * Supports two auth modes:
 * 1. Web session (NextAuth) — uses session.user.email to lookup
 * 2. Desktop key (X-Desktop-Key + X-User-Id headers) — uses user metadata email
 */
export async function GET(req: NextRequest) {
  // Try desktop key auth first
  const desktopKey = req.headers.get("x-desktop-key");
  const desktopUserId = req.headers.get("x-user-id");

  if (desktopKey && desktopUserId) {
    return handleDesktopAuth(req, desktopUserId);
  }

  // Fall back to web session
  return handleSessionAuth(req);
}

async function handleDesktopAuth(req: NextRequest, userId: string): Promise<NextResponse> {
  try {
    const user = await getUser(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404, headers: corsHeaders(req) });
    }

    // 1. Try linked_accounts directly from getUser response (Gateway v5+)
    let channels = buildChannels(user.linked_accounts);

    // 2. Fallback: lookup by email to get linked_accounts
    if (channels.length === 0 && user.email) {
      try {
        const lookup = await lookupUser("google", { email: user.email });
        channels = buildChannels(lookup?.linked_accounts);
      } catch {
        // Gateway lookup failed
      }
    }

    return NextResponse.json({ channels }, { headers: corsHeaders(req) });
  } catch {
    return NextResponse.json({ error: "Gateway error" }, { status: 502, headers: corsHeaders(req) });
  }
}

async function handleSessionAuth(req: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session?.gwUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders(req) });
  }

  const channels: LinkedChannel[] = [];
  const email = session.user?.email ?? undefined;

  // 1. Gateway lookup — get linked_accounts from metadata
  if (email) {
    try {
      const lookup = await lookupUser("google", { email });
      channels.push(...buildChannels(lookup?.linked_accounts));
    } catch {
      // Gateway lookup failed — fall through to session fallback
    }
  }

  // 2. Session fallback — if current session is a channel provider
  if (session.provider === "discord" && session.providerAccountId) {
    const alreadyLinked = channels.some(
      (ch) => ch.type === "discord" && ch.userId === session.providerAccountId,
    );
    if (!alreadyLinked) {
      channels.push({ type: "discord", userId: session.providerAccountId });
    }
  }

  return NextResponse.json({ channels }, { headers: corsHeaders(req) });
}
