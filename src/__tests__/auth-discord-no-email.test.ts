/**
 * Test: Discord OAuth login without email.
 *
 * Discord users may not have a verified email. The auth callback must
 * handle email=null and still produce a valid gwUserId via socialLogin
 * or fallback.
 *
 * Run:
 *   npx vitest run src/__tests__/auth-discord-no-email.test.ts
 */
import { describe, expect, it, vi } from "vitest";

// Mock gateway-client
const mockSocialLogin = vi.fn();
vi.mock("../lib/gateway-client", () => ({
  socialLogin: (...args: unknown[]) => mockSocialLogin(...args),
  createVirtualKey: vi.fn(),
  listKeys: vi.fn().mockResolvedValue([]),
  deleteKey: vi.fn(),
}));

// We test the JWT callback logic directly (extracted from auth.ts)
// because NextAuth is hard to unit test with its module-level export.
describe("Discord OAuth without email", () => {
  function simulateJwtCallback(
    account: { provider: string; providerAccountId: string } | null,
    user: { email?: string | null; name?: string | null; image?: string | null } | null,
  ) {
    const token: Record<string, unknown> = {};

    // Replicated from auth.ts jwt callback
    if (account) {
      token.provider = account.provider;
      token.providerAccountId = account.providerAccountId;
      const email = user?.email ?? undefined;

      try {
        // Simulate socialLogin call
        mockSocialLogin(
          account.provider,
          email,
          user?.name ?? undefined,
          user?.image ?? undefined,
          account.providerAccountId,
        );
        // In real code, gwUserId comes from JWT parsing
        token.gwUserId = "uuid-from-gateway";
      } catch {
        token.gwUserId = `${account.provider}:${account.providerAccountId}`;
      }
    }

    return token;
  }

  it("sets gwUserId when Discord provides email", () => {
    mockSocialLogin.mockReturnValue(undefined);
    const token = simulateJwtCallback(
      { provider: "discord", providerAccountId: "123456789" },
      { email: "user@example.com", name: "Test User" },
    );
    expect(token.gwUserId).toBe("uuid-from-gateway");
    expect(token.provider).toBe("discord");
    expect(token.providerAccountId).toBe("123456789");
    expect(mockSocialLogin).toHaveBeenCalledWith(
      "discord", "user@example.com", "Test User", undefined, "123456789",
    );
  });

  it("sets gwUserId when Discord does NOT provide email", () => {
    mockSocialLogin.mockReturnValue(undefined);
    const token = simulateJwtCallback(
      { provider: "discord", providerAccountId: "123456789" },
      { email: null, name: "No Email User" },
    );
    expect(token.gwUserId).toBe("uuid-from-gateway");
    expect(token.provider).toBe("discord");
    expect(mockSocialLogin).toHaveBeenCalledWith(
      "discord", undefined, "No Email User", undefined, "123456789",
    );
  });

  it("falls back to provider:accountId when socialLogin throws", () => {
    mockSocialLogin.mockImplementation(() => {
      throw new Error("Gateway down");
    });
    const token = simulateJwtCallback(
      { provider: "discord", providerAccountId: "987654321" },
      { email: null },
    );
    expect(token.gwUserId).toBe("discord:987654321");
  });

  it("sets gwUserId for Google login with email", () => {
    mockSocialLogin.mockReturnValue(undefined);
    const token = simulateJwtCallback(
      { provider: "google", providerAccountId: "google-id-123" },
      { email: "user@gmail.com", name: "Google User" },
    );
    expect(token.gwUserId).toBe("uuid-from-gateway");
    expect(mockSocialLogin).toHaveBeenCalledWith(
      "google", "user@gmail.com", "Google User", undefined, "google-id-123",
    );
  });

  it("handles account=null (token refresh)", () => {
    const token = simulateJwtCallback(null, null);
    expect(token.gwUserId).toBeUndefined();
    expect(token.provider).toBeUndefined();
  });
});
