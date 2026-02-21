import type { Locale } from "../config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ko: () => import("./ko").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
  ja: () => import("./ja").then((m) => m.default),
  zh: () => import("./zh").then((m) => m.default),
  fr: () => import("./fr").then((m) => m.default),
  de: () => import("./de").then((m) => m.default),
  ru: () => import("./ru").then((m) => m.default),
  es: () => import("./es").then((m) => m.default),
  ar: () => import("./ar").then((m) => m.default),
  hi: () => import("./hi").then((m) => m.default),
  bn: () => import("./bn").then((m) => m.default),
  pt: () => import("./pt").then((m) => m.default),
  id: () => import("./id").then((m) => m.default),
  vi: () => import("./vi").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
