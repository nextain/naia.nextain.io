import { NextResponse } from "next/server";

/**
 * @deprecated Use GET /api/gateway/linked-channels instead.
 * This route is kept for backward compatibility and redirects to the new endpoint.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  return NextResponse.redirect(new URL("/api/gateway/linked-channels", url.origin));
}
