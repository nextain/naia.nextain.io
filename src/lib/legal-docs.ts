import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type { Locale } from "@/i18n/config";

export const LEGAL_SLUGS = ["terms", "privacy", "refund", "contact", "donation"] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export async function readLegalDoc(lang: Locale, slug: LegalSlug): Promise<string> {
  let fullPath = path.join(process.cwd(), "src", "content", "legal", lang, `${slug}.md`);
  if (!existsSync(fullPath)) {
    fullPath = path.join(process.cwd(), "src", "content", "legal", "en", `${slug}.md`);
  }
  return readFile(fullPath, "utf-8");
}
