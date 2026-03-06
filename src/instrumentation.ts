import dns from "node:dns";

// Force IPv4-first DNS resolution for environments where IPv6 is unreachable
// (e.g., local dev). Fixes NextAuth Google OAuth "fetch failed" errors.
// Safe in production (Vercel) — IPv4 is simply tried first.
dns.setDefaultResultOrder("ipv4first");
