import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { readLegalDoc } from "@/lib/legal-docs";
import { LegalMarkdown } from "@/components/legal/legal-markdown";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return buildPageMetadata({
    lang,
    path: "refund",
    title: `${dict.footer.links.refund} — Naia`,
    description: lang === "ko"
      ? "Naia 환불 정책. 크레딧 구매 환불 조건, 절차, 기간을 안내합니다."
      : "Naia Refund Policy. Conditions, procedures, and timelines for credit purchase refunds.",
    keywords: ["Naia refund", "refund policy", "AI credit refund"],
  });
}

export default async function RefundPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const markdown = await readLegalDoc(lang as Locale, "refund");

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold">{dict.footer.links.refund}</h1>
      <LegalMarkdown markdown={markdown} />
    </main>
  );
}
