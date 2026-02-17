import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserUsage } from "@/lib/gateway-client";

/**
 * GET /api/gateway/usage — Returns usage history for current user
 */
export async function GET(request: Request) {
  const session = await auth();
  if (!session?.gwUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const skip = Number(searchParams.get("skip") ?? 0);
  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100);

  const usage = await getUserUsage(session.gwUserId, skip, limit);

  return NextResponse.json(usage);
}
