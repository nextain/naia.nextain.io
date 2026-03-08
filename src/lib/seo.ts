import { SEO_LOCALES } from "@/i18n/config";
import type { Metadata } from "next";

/**
 * Build page metadata with i18n alternates, OpenGraph, Twitter cards, and keywords.
 * OG image defaults to Next.js convention file (src/app/opengraph-image.png).
 * Pass ogImage only for pages that need a specific image.
 */
export function buildPageMetadata({
  lang,
  path,
  title,
  description,
  ogImage,
  keywords,
}: {
  lang: string;
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  keywords?: string[];
}): Metadata {
  const url = `/${lang}${path ? `/${path}` : ""}`;

  const languages: Record<string, string> = {};
  SEO_LOCALES.forEach((l) => {
    languages[l] = `/${l}${path ? `/${path}` : ""}`;
  });
  languages["x-default"] = `/en${path ? `/${path}` : ""}`;

  const meta: Metadata = {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      locale: lang,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };

  if (keywords?.length) {
    meta.keywords = keywords;
  }

  if (ogImage) {
    meta.openGraph!.images = [{ url: ogImage, alt: "Naia" }];
    meta.twitter!.images = [ogImage];
  }

  return meta;
}

/**
 * Map manual slugs to their best representative screenshot.
 * Path prefix `/manual/en/` is prepended by the manual page component.
 * For slugs not listed here, the default OG image (opengraph-image.png) is used.
 */
export const MANUAL_OG_IMAGE: Record<string, string> = {
  "getting-started": "onboarding-character.png",
  "main-screen": "main-screen.png",
  chat: "chat-text.png",
  history: "history-tab.png",
  progress: "progress-tab.png",
  skills: "skills-tab.png",
  channels: "channels-tab.png",
  agents: "agents-tab.png",
  diagnostics: "diagnostics-tab.png",
  settings: "settings-overview.png",
  tools: "settings-tools.png",
  "naia-account": "lab-dashboard.png",
};
