import { SEO_LOCALES } from "@/i18n/config";
import type { Metadata } from "next";

const OG_IMAGE = "/branding/character/naia-default-character.png";

/**
 * Build page metadata with i18n alternates, OpenGraph, and Twitter cards.
 */
export function buildPageMetadata({
  lang,
  path,
  title,
  description,
  ogImage,
}: {
  lang: string;
  path: string;
  title: string;
  description: string;
  ogImage?: string;
}): Metadata {
  const url = `/${lang}${path ? `/${path}` : ""}`;
  const image = ogImage ?? OG_IMAGE;

  const languages: Record<string, string> = {};
  SEO_LOCALES.forEach((l) => {
    languages[l] = `/${l}${path ? `/${path}` : ""}`;
  });
  languages["x-default"] = `/en${path ? `/${path}` : ""}`;

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      locale: lang,
      url,
      images: [{ url: image, width: 800, height: 800, alt: "Naia" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
