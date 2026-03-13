import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { SectionReveal } from "@/components/home/section-reveal";

export function Pricing({ dict, lang }: { dict: Dictionary; lang: string }) {
  const storeActive = Boolean(process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID);

  const plans = [
    {
      key: "free",
      ...dict.home.pricing.free,
      bonusPercent: 0,
      highlight: false,
      href: `/${lang}/login`,
    },
    {
      key: "basic",
      ...dict.home.pricing.basic,
      bonusPercent: 0,
      highlight: false,
      href: `/${lang}/billing`,
    },
    {
      key: "pro",
      ...dict.home.pricing.pro,
      bonusPercent: 1,
      highlight: true,
      href: `/${lang}/billing`,
    },
  ];

  return (
    <section id="pricing" className="border-y border-border/40 bg-muted/25">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionReveal>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.home.pricing.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              {dict.home.pricing.subtitle}
            </p>
          </div>
        </SectionReveal>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan, i) => (
            <SectionReveal key={plan.key} delay={i * 80}>
              <article
                className={`rounded-xl border p-6 ${
                  plan.highlight
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-2">
                  <p
                    className={`text-xs font-semibold tracking-wide ${
                      plan.highlight ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {plan.name}
                  </p>
                  {plan.bonusPercent > 0 && (
                    <Badge
                      variant="outline"
                      className="text-xs text-green-600 border-green-300"
                    >
                      +{plan.bonusPercent}% {dict.home.pricing.creditPacks.bonus}
                    </Badge>
                  )}
                </div>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="pb-1 text-sm text-muted-foreground">
                    {plan.key === "free" ? plan.period : `/ ${plan.period}`}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.key === "free" || storeActive ? (
                  <Link
                    href={plan.href}
                    className={`mt-6 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition ${
                      plan.highlight
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "border border-border hover:bg-muted"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="mt-6 w-full rounded-md border px-4 py-2 text-sm font-medium"
                    disabled
                  >
                    {plan.cta} ({dict.common.comingSoon})
                  </button>
                )}
              </article>
            </SectionReveal>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {dict.home.pricing.creditPacks.baseRate}
        </p>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {dict.home.pricing.creditPacks.subtitle}
        </p>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          {dict.home.pricing.policyNote}{" "}
          <Link href={`/${lang}/terms`} className="underline hover:text-foreground">
            {dict.footer.links.terms}
          </Link>{" "}
          ·{" "}
          <Link href={`/${lang}/privacy`} className="underline hover:text-foreground">
            {dict.footer.links.privacy}
          </Link>{" "}
          ·{" "}
          <Link href={`/${lang}/refund`} className="underline hover:text-foreground">
            {dict.footer.links.refund}
          </Link>
        </p>
      </div>
    </section>
  );
}
