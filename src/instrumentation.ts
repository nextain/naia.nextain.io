// Force IPv4-first DNS resolution for environments where IPv6 is unreachable
// (e.g., local dev). Fixes NextAuth Google OAuth "fetch failed" errors.
// Safe in production (Vercel) — IPv4 is simply tried first.
export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		const dns = await import("node:dns");
		dns.setDefaultResultOrder("ipv4first");
	}
}
