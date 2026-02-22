import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Comparison } from "@/components/home/comparison";
import { Pricing } from "@/components/home/pricing";
import { Faq } from "@/components/home/faq";
import { readHomeFaq } from "@/lib/home-docs";
import { auth } from "@/lib/auth";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const faqItems = await readHomeFaq(lang as Locale);
  const session = await auth();

  return (
    <>
      <Hero dict={dict} lang={lang} hasSession={!!session} />
      <Features dict={dict} />
      <Comparison dict={dict} />
      <Pricing dict={dict} lang={lang} />
      <Faq title={dict.home.faq.title} items={faqItems} />
    </>
  );
}
