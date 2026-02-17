import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUser } from "@/lib/gateway-client";

/**
 * GET /api/gateway — Returns current user's gateway info (spend, budget, etc.)
 */
export async function GET() {
  const session = await auth();
  if (!session?.gwUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUser(session.gwUserId);
  if (!user) {
    return NextResponse.json({ error: "User not found in gateway" }, { status: 404 });
  }

  return NextResponse.json({
    userId: user.user_id,
    alias: user.alias,
    spend: user.spend,
    budgetId: user.budget_id,
    nextBudgetResetAt: user.next_budget_reset_at,
    blocked: user.blocked,
  });
}
