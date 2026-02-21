import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { lookupUser } from "@/lib/gateway-client";

export async function GET() {
  const session = await auth();
  if (!session?.gwUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session.user?.email ?? undefined;

  // If current session is from Discord OAuth, providerAccountId IS the Discord user ID
  const sessionDiscordId =
    session.provider === "discord" && session.providerAccountId
      ? session.providerAccountId
      : null;

  let gatewayDiscordId: string | null = null;
  let linkedUserId: string | null = null;

  if (email) {
    try {
      const linked = await lookupUser("discord", { email });
      gatewayDiscordId = linked?.provider_account_id ?? null;
      linkedUserId = linked?.user_id ?? null;
    } catch {
      // Gateway lookup failed — fall through to session-based ID
    }
  }

  // Prefer gateway lookup, fall back to session's providerAccountId
  const discordUserId = gatewayDiscordId || sessionDiscordId;

  return NextResponse.json({
    discordUserId,
    linkedUserId,
    currentUserId: session.gwUserId,
    linked: linkedUserId === session.gwUserId,
  });
}

