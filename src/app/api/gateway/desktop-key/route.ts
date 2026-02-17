import { NextResponse } from "next/server";
import { auth, issueDesktopKey } from "@/lib/auth";

/**
 * POST /api/gateway/desktop-key — Issue a virtual key for the desktop app
 */
export async function POST() {
  const session = await auth();
  if (!session?.gwUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = await issueDesktopKey(session.gwUserId);

  return NextResponse.json({ key });
}
