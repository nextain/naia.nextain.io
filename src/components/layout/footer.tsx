"use client";

import Link from "next/link";
import { useDictionary } from "@/components/providers/locale-provider";
import { nanLogo } from "@/components/ui/nan-logo";

export function Footer() {
  const dict = useDictionary();
  const lang = dict.locale;

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2">
              <nanLogo className="h-6 w-6" />
              <span className="font-bold">{dict.footer.brand}</span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link
              href={`/${lang}/privacy`}
              className="transition-colors hover:text-foreground"
            >
              {dict.footer.links.privacy}
            </Link>
            <Link
              href={`/${lang}/terms`}
              className="transition-colors hover:text-foreground"
            >
              {dict.footer.links.terms}
            </Link>
            <Link
              href={`/${lang}/refund`}
              className="transition-colors hover:text-foreground"
            >
              {dict.footer.links.refund}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="transition-colors hover:text-foreground"
            >
              {dict.footer.links.contact}
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {dict.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
