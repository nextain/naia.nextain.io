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
    path: "privacy",
    title: `${dict.footer.links.privacy} — Naia`,
    description: lang === "ko"
      ? "Naia 개인정보처리방침. 수집하는 정보, 이용 목적, 보관 기간, 사용자 권리를 안내합니다."
      : "Naia Privacy Policy. Information we collect, how we use it, retention periods, and your rights.",
    keywords: ["Naia privacy", "privacy policy", "AI OS privacy", "data protection"],
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const markdown = await readLegalDoc(lang as Locale, "privacy");

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold">{dict.footer.links.privacy}</h1>
      <LegalMarkdown markdown={markdown} />
    </main>
  );
}
