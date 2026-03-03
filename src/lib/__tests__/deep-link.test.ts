import test from "node:test";
import assert from "node:assert/strict";
import { buildNaiaAuthDeepLink } from "../deep-link";

test("builds base deep link with key and state", () => {
  const url = buildNaiaAuthDeepLink({ key: "gw-abc", state: "st-1" });
  assert.equal(url, "naia://auth?key=gw-abc&state=st-1");
});

test("builds deep link with key, userId, and state", () => {
  const url = buildNaiaAuthDeepLink({
    key: "gw-abc",
    userId: "user-123",
    state: "st-1",
  });
  assert.equal(url, "naia://auth?key=gw-abc&user_id=user-123&state=st-1");
});

test("omits empty optional fields", () => {
  const url = buildNaiaAuthDeepLink({ key: "gw-abc" });
  assert.equal(url, "naia://auth?key=gw-abc");
});

test("trims whitespace from userId and state", () => {
  const url = buildNaiaAuthDeepLink({
    key: "gw-abc",
    userId: "  user-123  ",
    state: "  st-1  ",
  });
  assert.equal(url, "naia://auth?key=gw-abc&user_id=user-123&state=st-1");
});
