import type { Metadata } from "next";
import { SUPPORTED_LOCALES, isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }

  const dictionary = await getDictionary(lang as Locale);
  
  // SEO hreflang generation
  const languages: Record<string, string> = {};
  SUPPORTED_LOCALES.forEach((l) => {
    languages[l] = `/${l}`;
  });

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages,
    },
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      locale: lang === "ko" ? "ko_KR" : "en_US",
    },
    twitter: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dictionary = await getDictionary(lang as Locale);

  return (
    <LocaleProvider dictionary={dictionary}>{children}</LocaleProvider>
  );
}
