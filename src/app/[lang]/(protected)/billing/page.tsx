import { auth } from "@/lib/auth";
import { getBalance, getUserUsage, getModelPricing } from "@/lib/gateway-client";
import {
  buildLemonCheckoutUrl,
  isLemonSqueezyConfigured,
} from "@/lib/lemonsqueezy";
import {
  SUBSCRIPTION_PLANS,
  CREDIT_PACKS,
  LEMON_CUSTOMER_PORTAL_URL,
} from "@/lib/pricing";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function BillingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const session = await auth();
  if (!session?.gwUserId) redirect(`/${lang}/login`);

  let credits = 0;
  let totalUsage = 0;
  let pricingCount = 0;

  try {
    const [balanceData, usage, pricing] = await Promise.all([
      getBalance(session.gwUserId),
      getUserUsage(session.gwUserId, 0, 100),
      getModelPricing(),
    ]);

    credits = balanceData.balance / 100_000; // micro-dollars → credits
    totalUsage = usage.reduce((sum, row) => sum + (row.cost ?? 0), 0);
    pricingCount = pricing.length;
  } catch {
    credits = 0;
    totalUsage = 0;
    pricingCount = 0;
  }

  const lemonReady = isLemonSqueezyConfigured();

  // Plan info arrays for rendering
  const plans = [
    {
      id: "free" as const,
      name: dict.billing.free,
      price: "$0",
      period: "",
      features: dict.billing.freeFeatures,
      bonusPercent: 0,
      highlight: false,
    },
    {
      id: "basic" as const,
      name: dict.billing.basic,
      price: `$${SUBSCRIPTION_PLANS[0].price}`,
      period: dict.home.pricing.basic.period,
      features: dict.billing.basicFeatures,
      bonusPercent: SUBSCRIPTION_PLANS[0].bonusPercent,
      highlight: false,
      variantId: SUBSCRIPTION_PLANS[0].variantId,
    },
    {
      id: "pro" as const,
      name: dict.billing.pro,
      price: `$${SUBSCRIPTION_PLANS[1].price}`,
      period: dict.home.pricing.pro.period,
      features: dict.billing.proFeatures,
      bonusPercent: SUBSCRIPTION_PLANS[1].bonusPercent,
      highlight: true,
      variantId: SUBSCRIPTION_PLANS[1].variantId,
    },
  ];

  // TODO: fetch actual current plan from gateway when available
  const currentPlanId = "free";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <h1 className="text-2xl font-bold">{dict.billing.title}</h1>

      {/* --- Status Cards --- */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {dict.billing.currentPlan}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">
                {plans.find((p) => p.id === currentPlanId)?.name ?? dict.billing.free}
              </p>
              <Badge variant="secondary">{dict.billing.currentBadge}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {dict.billing.creditBalance}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{credits.toFixed(1)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {dict.billing.periodUsage}: ${totalUsage.toFixed(4)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- Subscription Plans --- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{dict.billing.comparePlans}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => {
              const isCurrent = plan.id === currentPlanId;
              const checkoutUrl =
                lemonReady && plan.variantId
                  ? buildLemonCheckoutUrl({
                      variantId: plan.variantId,
                      userId: session.gwUserId,
                      email: session.user?.email,
                      lang: lang as Locale,
                    })
                  : null;

              return (
                <article
                  key={plan.id}
                  className={`rounded-lg border p-4 ${
                    plan.highlight
                      ? "border-primary/30 bg-primary/5"
                      : ""
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{plan.name}</h2>
                    <div className="flex items-center gap-1.5">
                      {plan.bonusPercent > 0 && (
                        <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                          +{plan.bonusPercent}% {dict.billing.creditPacks.bonus}
                        </Badge>
                      )}
                      <Badge variant={plan.highlight ? "default" : "outline"}>
                        {plan.price}
                        {plan.period ? `/${plan.period}` : ""}
                      </Badge>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <button
                      type="button"
                      className="mt-4 w-full rounded-md border px-4 py-2 text-sm font-medium"
                      disabled
                    >
                      {dict.billing.currentBadge}
                    </button>
                  ) : checkoutUrl ? (
                    <a
                      href={checkoutUrl}
                      className="lemonsqueezy-button mt-4 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                      {dict.billing.upgrade}
                    </a>
                  ) : plan.variantId ? (
                    <button
                      type="button"
                      className="mt-4 w-full rounded-md border px-4 py-2 text-sm font-medium"
                      disabled
                    >
                      {dict.billing.upgrade} ({dict.common.comingSoon})
                    </button>
                  ) : null}
                </article>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* --- Credit Packs --- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{dict.billing.creditPacks.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{dict.billing.creditPacks.subtitle}</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CREDIT_PACKS.map((pack) => {
              const checkoutUrl = lemonReady
                ? buildLemonCheckoutUrl({
                    variantId: pack.variantId,
                    userId: session.gwUserId,
                    email: session.user?.email,
                    lang: lang as Locale,
                  })
                : null;

              return (
                <article
                  key={pack.id}
                  className={`relative rounded-lg border p-4 transition hover:border-primary/40 ${
                    pack.bonusPercent >= 3
                      ? "border-primary/30 bg-primary/5"
                      : ""
                  }`}
                >
                  {pack.bonusPercent > 0 && (
                    <Badge
                      variant="outline"
                      className="absolute -top-2.5 right-3 border-green-300 bg-background text-xs text-green-600"
                    >
                      +{pack.bonusPercent}% {dict.billing.creditPacks.bonus}
                    </Badge>
                  )}

                  <p className="text-2xl font-bold">${pack.price}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {pack.credits.toLocaleString()} {dict.billing.creditPacks.credits}
                  </p>

                  {checkoutUrl ? (
                    <a
                      href={checkoutUrl}
                      className="lemonsqueezy-button mt-3 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                      {dict.billing.creditPacks.buy}
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="mt-3 w-full rounded-md border px-4 py-2 text-sm font-medium"
                      disabled
                    >
                      {dict.billing.creditPacks.buy} ({dict.common.comingSoon})
                    </button>
                  )}
                </article>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {dict.billing.creditPacks.baseRate}
          </p>
        </CardContent>
      </Card>

      {/* --- Subscription Management --- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {dict.billing.subscriptionManagement.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <a
            href={LEMON_CUSTOMER_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted"
          >
            {dict.billing.subscriptionManagement.customerPortal}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <p className="text-xs text-muted-foreground">
            {dict.billing.subscriptionManagement.customerPortalDescription}
          </p>
        </CardContent>
      </Card>

      {/* --- Footer Notice --- */}
      <div className="rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground">
        <p>{dict.billing.lemonNotice}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link href={`/${lang}/terms`} className="underline hover:text-foreground">
            {dict.footer.links.terms}
          </Link>
          <Link href={`/${lang}/privacy`} className="underline hover:text-foreground">
            {dict.footer.links.privacy}
          </Link>
          <Link href={`/${lang}/refund`} className="underline hover:text-foreground">
            {dict.footer.links.refund}
          </Link>
          <Link href={`/${lang}/contact`} className="underline hover:text-foreground">
            {dict.footer.links.contact}
          </Link>
        </div>
        <p className="mt-2">
          {dict.billing.pricingModelsSynced}: {pricingCount}
        </p>
      </div>
    </div>
  );
}
