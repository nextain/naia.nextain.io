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
    path: "contact",
    title: `${dict.footer.links.contact} — Naia`,
    description: lang === "ko"
      ? "Naia 팀에 문의하세요. 기술 지원, 파트너십, 일반 문의 연락처를 안내합니다."
      : "Contact the Naia team. Technical support, partnerships, and general inquiries.",
    keywords: ["Naia contact", "Naia support", "Nextain contact", "AI OS support"],
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const markdown = await readLegalDoc(lang as Locale, "contact");

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold">{dict.footer.links.contact}</h1>
      <LegalMarkdown markdown={markdown} />
    </main>
  );
}
