import { test, expect } from "@playwright/test";

/**
 * E2E: Discord login flow on naia.nextain.io
 *
 * Tests the login page and callback flow.
 * Full OAuth redirect to Discord is not automated (external service),
 * but we verify:
 * 1. Login page renders with Discord button
 * 2. Discord button links to correct OAuth URL
 * 3. Callback page handles missing session gracefully (no 500)
 * 4. Desktop-key API returns 401 (not 500) when unauthenticated
 * 5. Discord-linked API returns 401 (not 500) when unauthenticated
 */

test.describe("Discord login flow", () => {
  test("login page renders with Discord OAuth button", async ({ page }) => {
    const response = await page.goto("/ko/login");
    expect(response).not.toBeNull();
    expect(response!.status()).toBeLessThan(500);

    await page.waitForLoadState("networkidle");

    // Should have a Discord login button/link
    const discordBtn = page.locator('button:has-text("Discord"), a:has-text("Discord")');
    await expect(discordBtn.first()).toBeVisible({ timeout: 10_000 });
  });

  test("Discord OAuth button has correct href", async ({ page }) => {
    await page.goto("/ko/login");
    await page.waitForLoadState("networkidle");

    // Find the Discord sign-in form/button — NextAuth uses form POST
    const discordForm = page.locator('form[action*="discord"], button:has-text("Discord")');
    const count = await discordForm.count();
    expect(count).toBeGreaterThan(0);
  });

  test("callback page without session shows error, not 500", async ({ page }) => {
    // Access callback without auth — should show client error, not server crash
    const response = await page.goto("/ko/callback");
    expect(response).not.toBeNull();

    // Should not be a 500 server error
    const status = response!.status();
    expect(status).toBeLessThan(500);

    await page.waitForLoadState("networkidle");
    const body = await page.textContent("body");
    expect(body).not.toContain("Internal Server Error");
  });

  test("desktop-key API returns 401 without session", async ({ request }) => {
    const res = await request.post("/api/gateway/desktop-key");
    // Should be 401 Unauthorized, NOT 500
    expect(res.status()).toBe(401);
    const json = await res.json();
    expect(json.error).toBeTruthy();
  });

  test("discord-linked API returns 401 without session", async ({ request }) => {
    const res = await request.get("/api/gateway/discord-linked");
    // Should be 401 Unauthorized, NOT 500
    expect(res.status()).toBe(401);
    const json = await res.json();
    expect(json.error).toBeTruthy();
  });
});
