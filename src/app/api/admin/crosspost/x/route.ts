import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

function percentEncode(str: string): string {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string,
): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((k) => `${percentEncode(k)}=${percentEncode(params[k])}`)
    .join("&");

  const baseString = `${method.toUpperCase()}&${percentEncode(url)}&${percentEncode(sortedParams)}`;
  const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(tokenSecret)}`;

  return crypto.createHmac("sha1", signingKey).update(baseString).digest("base64");
}

function buildAuthHeader(params: Record<string, string>): string {
  const parts = Object.keys(params)
    .filter((k) => k.startsWith("oauth_"))
    .sort()
    .map((k) => `${percentEncode(k)}="${percentEncode(params[k])}"`)
    .join(", ");
  return `OAuth ${parts}`;
}

export async function POST(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const apiKey = process.env.X_API_KEY;
  const apiSecret = process.env.X_API_SECRET;
  const accessToken = process.env.X_ACCESS_TOKEN;
  const accessTokenSecret = process.env.X_ACCESS_TOKEN_SECRET;

  if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
    return NextResponse.json({ error: "X API credentials not configured" }, { status: 500 });
  }

  try {
    const { text } = await req.json();
    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "No text" }, { status: 400 });
    }

    const url = "https://api.twitter.com/2/tweets";
    const nonce = crypto.randomBytes(16).toString("hex");
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const oauthParams: Record<string, string> = {
      oauth_consumer_key: apiKey,
      oauth_nonce: nonce,
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: timestamp,
      oauth_token: accessToken,
      oauth_version: "1.0",
    };

    const signature = generateOAuthSignature("POST", url, oauthParams, apiSecret, accessTokenSecret);
    oauthParams.oauth_signature = signature;

    const authHeader = buildAuthHeader(oauthParams);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text.slice(0, 280) }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[admin/crosspost/x] X API error:", data);
      return NextResponse.json({ error: data.detail || "Tweet failed", details: data }, { status: res.status });
    }

    const tweetId = data.data?.id;
    const tweetUrl = tweetId ? `https://x.com/Naia_Nextain/status/${tweetId}` : null;

    return NextResponse.json({ ok: true, tweetId, tweetUrl });
  } catch (err) {
    console.error("[admin/crosspost/x] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
