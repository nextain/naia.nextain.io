/**
 * Centralized pricing configuration for all Naia products.
 * Variant IDs are public LemonSqueezy identifiers (safe for public repos).
 */

export interface CreditPack {
  id: string;
  type: "credit-pack";
  variantId: string;
  price: number; // USD
  credits: number;
  bonusPercent: number;
  sortOrder: number;
}

export interface SubscriptionPlan {
  id: string;
  type: "subscription";
  variantId: string;
  price: number; // USD per month
  bonusPercent: number;
  sortOrder: number;
}

export type Product = CreditPack | SubscriptionPlan;

// --- Credit Packs (one-time purchase) ---

export const CREDIT_PACKS: CreditPack[] = [
  {
    id: "credits-10",
    type: "credit-pack",
    variantId: "1399207",
    price: 10,
    credits: 10_000,
    bonusPercent: 0,
    sortOrder: 0,
  },
  {
    id: "credits-30",
    type: "credit-pack",
    variantId: "1399274",
    price: 30,
    credits: 30_300,
    bonusPercent: 1,
    sortOrder: 1,
  },
  {
    id: "credits-60",
    type: "credit-pack",
    variantId: "1399283",
    price: 60,
    credits: 61_200,
    bonusPercent: 2,
    sortOrder: 2,
  },
  {
    id: "credits-100",
    type: "credit-pack",
    variantId: "1399239",
    price: 100,
    credits: 103_000,
    bonusPercent: 3,
    sortOrder: 3,
  },
];

// --- Subscription Plans (recurring) ---

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "basic",
    type: "subscription",
    variantId: "1399174",
    price: 10,
    bonusPercent: 0,
    sortOrder: 0,
  },
  {
    id: "pro",
    type: "subscription",
    variantId: "1399289",
    price: 25,
    bonusPercent: 1,
    sortOrder: 1,
  },
];

// --- Lookup helpers ---

const ALL_PRODUCTS: Product[] = [...CREDIT_PACKS, ...SUBSCRIPTION_PLANS];

const variantMap = new Map<string, Product>(
  ALL_PRODUCTS.map((p) => [p.variantId, p]),
);

const idMap = new Map<string, Product>(
  ALL_PRODUCTS.map((p) => [p.id, p]),
);

/** Find a product by its LemonSqueezy variant ID. */
export function getProductByVariantId(variantId: string): Product | undefined {
  return variantMap.get(variantId);
}

/** Find a product by its internal ID (e.g. "credits-30", "pro"). */
export function getProductById(id: string): Product | undefined {
  return idMap.get(id);
}

/** Resolve a variant ID to a gateway plan name (FREE, BASIC, PRO). */
export function resolveVariantToPlan(variantId: string): string {
  const product = variantMap.get(variantId);
  if (!product || product.type !== "subscription") return "FREE";
  return product.id.toUpperCase(); // "basic" → "BASIC", "pro" → "PRO"
}

/** Get credit amount for a credit-pack variant. Returns 0 if not a credit pack. */
export function resolveVariantToCredits(variantId: string): number {
  const product = variantMap.get(variantId);
  if (!product || product.type !== "credit-pack") return 0;
  return product.credits;
}

/** LemonSqueezy customer portal URL. */
export const LEMON_CUSTOMER_PORTAL_URL =
  "https://nextain.lemonsqueezy.com/billing";
