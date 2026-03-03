export const SUPPORTED_LOCALES = ["en", "ko", "ja", "zh", "fr", "de", "ru", "es", "ar", "hi", "bn", "pt", "id", "vi"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

// Locales to include in sitemap and hreflang tags (SEO-visible)
export const SEO_LOCALES = ["en", "ko", "ja"] as const;

export function isLocale(value: string | undefined): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}
