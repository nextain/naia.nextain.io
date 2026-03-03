import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES, SEO_LOCALES } from "@/i18n/config";

export default function robots(): MetadataRoute.Robots {
  // Block crawling for locales not in SEO_LOCALES
  const nonSeoLocales = SUPPORTED_LOCALES.filter(
    (l) => !(SEO_LOCALES as readonly string[]).includes(l)
  );
  const disallowLocales = nonSeoLocales.map((l) => `/${l}/`);

  return {
    rules: [
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/*/dashboard",
          "/*/usage",
          "/*/logs",
          "/*/keys",
          "/*/settings",
          "/*/billing",
          "/*/callback",
          "/*/login",
          ...disallowLocales,
        ],
      },
    ],
    sitemap: "https://naia.nextain.io/sitemap.xml",
  };
}
