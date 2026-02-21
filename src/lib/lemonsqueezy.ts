import crypto from "crypto";

export interface LemonCheckoutParams {
  userId: string;
  email?: string | null;
  lang: "ko" | "en";
}

export function isLemonSqueezyConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID &&
      process.env.NEXT_PUBLIC_LEMONSQUEEZY_BASIC_VARIANT_ID,
  );
}

export function buildLemonCheckoutUrl({
  userId,
  email,
  lang,
}: LemonCheckoutParams): string | null {
  const variantId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_BASIC_VARIANT_ID;
  if (!variantId) return null;

  const url = new URL(`https://checkout.lemonsqueezy.com/buy/${variantId}`);
  url.searchParams.set("checkout[custom][user_id]", userId);
  if (email) {
    url.searchParams.set("checkout[email]", email);
  }
  url.searchParams.set("checkout[custom][source]", "naia.nextain.io");
  url.searchParams.set("checkout[custom][locale]", lang);

  return url.toString();
}

export function verifyLemonSignature({
  rawBody,
  signature,
  secret,
}: {
  rawBody: string;
  signature: string;
  secret: string;
}): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(digest, "hex"),
      Buffer.from(signature, "hex"),
    );
  } catch {
    return false;
  }
}
