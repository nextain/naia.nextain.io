/**
 * Tests for LemonSqueezy webhook handler.
 *
 * Requires vitest setup. Run: npx vitest run src/__tests__/webhook-lemonsqueezy.test.ts
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock gateway-client before importing route
vi.mock("@/lib/gateway-client", () => ({
  upgradeSubscription: vi.fn().mockResolvedValue({ success: true }),
  cancelSubscription: vi.fn().mockResolvedValue({ success: true }),
  topupCredits: vi.fn().mockResolvedValue({ success: true }),
}));

// Mock lemonsqueezy signature verification
vi.mock("@/lib/lemonsqueezy", () => ({
  verifyLemonSignature: vi.fn().mockReturnValue(true),
}));

import { POST } from "@/app/api/webhooks/lemonsqueezy/route";
import { upgradeSubscription, cancelSubscription, topupCredits } from "@/lib/gateway-client";
import { verifyLemonSignature } from "@/lib/lemonsqueezy";

function makeRequest(body: object, signature = "valid-sig"): Request {
  return new Request("http://localhost/api/webhooks/lemonsqueezy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-signature": signature,
    },
    body: JSON.stringify(body),
  });
}

describe("LemonSqueezy webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.LEMONSQUEEZY_WEBHOOK_SECRET = "test-secret";
  });

  it("returns 401 when signature is invalid", async () => {
    vi.mocked(verifyLemonSignature).mockReturnValueOnce(false);

    const res = await POST(makeRequest({ meta: { event_name: "subscription_created" } }));
    expect(res.status).toBe(401);
  });

  it("calls upgradeSubscription on subscription_created with BASIC variant", async () => {
    const body = {
      meta: {
        event_name: "subscription_created",
        custom_data: { user_id: "user-123" },
      },
      data: { id: "sub-1", attributes: { variant_id: "1399174" } },
    };

    const res = await POST(makeRequest(body));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.event).toBe("subscription_created");
    expect(upgradeSubscription).toHaveBeenCalledWith("user-123", "BASIC");
  });

  it("calls upgradeSubscription on subscription_created with PRO variant", async () => {
    const body = {
      meta: {
        event_name: "subscription_created",
        custom_data: { user_id: "user-789" },
      },
      data: { id: "sub-4", attributes: { variant_id: "1399289" } },
    };

    const res = await POST(makeRequest(body));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(upgradeSubscription).toHaveBeenCalledWith("user-789", "PRO");
  });

  it("calls cancelSubscription on subscription_cancelled", async () => {
    const body = {
      meta: {
        event_name: "subscription_cancelled",
        custom_data: { user_id: "user-456" },
      },
      data: { id: "sub-2" },
    };

    const res = await POST(makeRequest(body));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.event).toBe("subscription_cancelled");
    expect(cancelSubscription).toHaveBeenCalledWith("user-456");
  });

  it("calls topupCredits on order_created with credit pack variant", async () => {
    const body = {
      meta: {
        event_name: "order_created",
        custom_data: { user_id: "user-100" },
      },
      data: { id: "order-1", attributes: { variant_id: "1399274" } },
    };

    const res = await POST(makeRequest(body));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.event).toBe("order_created");
    expect(topupCredits).toHaveBeenCalledWith("user-100", 30_300, "LEMONSQUEEZY");
  });

  it("does not topup for unknown variant on order_created", async () => {
    const body = {
      meta: {
        event_name: "order_created",
        custom_data: { user_id: "user-200" },
      },
      data: { id: "order-2", attributes: { variant_id: "unknown-variant" } },
    };

    const res = await POST(makeRequest(body));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(topupCredits).not.toHaveBeenCalled();
  });

  it("ignores unhandled events", async () => {
    const body = {
      meta: { event_name: "subscription_payment_success" },
      data: { id: "pay-1" },
    };

    const res = await POST(makeRequest(body));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ignored).toBe("subscription_payment_success");
  });

  it("returns 400 when user_id is missing", async () => {
    const body = {
      meta: { event_name: "subscription_created", custom_data: {} },
      data: { id: "sub-3" },
    };

    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
  });

  it("falls back to FREE for unknown subscription variant", async () => {
    const body = {
      meta: {
        event_name: "subscription_created",
        custom_data: { user_id: "user-300" },
      },
      data: { id: "sub-5", attributes: { variant_id: "unknown" } },
    };

    const res = await POST(makeRequest(body));
    expect(res.status).toBe(200);
    expect(upgradeSubscription).toHaveBeenCalledWith("user-300", "FREE");
  });
});
