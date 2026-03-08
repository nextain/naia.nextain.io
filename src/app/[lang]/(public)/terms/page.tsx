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
    path: "terms",
    title: `${dict.footer.links.terms} — Naia`,
    description: lang === "ko"
      ? "Naia 서비스 이용약관. AI OS 서비스 이용 조건, 사용자 권리와 의무, 면책 사항을 안내합니다."
      : "Naia Terms of Service. Service conditions, user rights and obligations, and disclaimers for the AI OS platform.",
    keywords: ["Naia terms", "terms of service", "AI OS terms", "Naia legal"],
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const markdown = await readLegalDoc(lang as Locale, "terms");

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold">{dict.footer.links.terms}</h1>
      <LegalMarkdown markdown={markdown} />
    </main>
  );
}
