import { getDictionary } from "@/i18n/dictionaries";
import { SUPPORTED_LOCALES, isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import {
  MANUAL_SLUGS,
  SLUG_NUMBER,
  SLUG_TO_SECTION_KEY,
  isManualSlug,
  readManual,
} from "@/lib/manual-docs";
import type { ManualSlug } from "@/lib/manual-docs";
import { ManualMarkdown } from "@/components/manual/manual-markdown";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isManualSlug(slug)) return {};
  const dict = await getDictionary(lang as Locale);
  const sections = dict.manual.sections as Record<string, string>;
  const sectionKey = SLUG_TO_SECTION_KEY[slug as ManualSlug];
  const sectionTitle = sections[sectionKey] ?? slug;
  return buildPageMetadata({
    lang,
    path: `manual/${slug}`,
    title: `${sectionTitle} — ${dict.header.manual}`,
    description: `${sectionTitle} — Naia ${dict.header.manual}`,
  });
}

export async function generateStaticParams() {
  const params: Array<{ lang: string; slug: string }> = [];
  for (const lang of SUPPORTED_LOCALES) {
    for (const slug of MANUAL_SLUGS) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export default async function ManualSectionPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isManualSlug(slug)) notFound();

  const dict = await getDictionary(lang as Locale);
  const markdown = await readManual(lang as Locale, slug as ManualSlug);
  const sections = dict.manual.sections as Record<string, string>;
  const sectionKey = SLUG_TO_SECTION_KEY[slug as ManualSlug];
  const sectionTitle = sections[sectionKey] ?? slug;

  const currentIndex = MANUAL_SLUGS.indexOf(slug as ManualSlug);
  const prevSlug = currentIndex > 0 ? MANUAL_SLUGS[currentIndex - 1] : null;
  const nextSlug =
    currentIndex < MANUAL_SLUGS.length - 1
      ? MANUAL_SLUGS[currentIndex + 1]
      : null;

  const prevLabel = prevSlug
    ? `${SLUG_NUMBER[prevSlug]}. ${sections[SLUG_TO_SECTION_KEY[prevSlug]]}`
    : null;
  const nextLabel = nextSlug
    ? `${SLUG_NUMBER[nextSlug]}. ${sections[SLUG_TO_SECTION_KEY[nextSlug]]}`
    : null;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-14">
      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:sticky lg:top-20 lg:block lg:h-fit">
          <div className="rounded-xl border border-border/50 bg-background p-4">
            <p className="mb-3 text-sm font-semibold">{dict.manual.toc}</p>
            <nav>
              <ol className="space-y-1">
                {MANUAL_SLUGS.map((itemSlug) => {
                  const itemLabel = sections[SLUG_TO_SECTION_KEY[itemSlug]] ?? itemSlug;
                  const isActive = itemSlug === slug;
                  const num = SLUG_NUMBER[itemSlug];
                  const isChild = num.includes(".");
                  return (
                    <li key={itemSlug}>
                      <Link
                        href={`/${lang}/manual/${itemSlug}`}
                        className={`flex items-center gap-2 rounded-md py-1.5 text-sm transition-colors ${
                          isChild ? "pl-7 pr-2.5" : "px-2.5"
                        } ${
                          isActive
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        <span className={`inline-flex items-center justify-center rounded-full border border-border/60 text-xs ${
                          isChild ? "h-5 min-w-[1.75rem] px-1" : "h-5 w-5"
                        }`}>
                          {num}
                        </span>
                        <span>{itemLabel}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </aside>

        <section className="min-w-0">
          <details className="mb-6 rounded-xl border border-border/50 bg-background p-4 lg:hidden">
            <summary className="cursor-pointer text-sm font-semibold">{dict.manual.toc}</summary>
            <ol className="mt-3 space-y-1">
              {MANUAL_SLUGS.map((itemSlug) => {
                const itemLabel = sections[SLUG_TO_SECTION_KEY[itemSlug]] ?? itemSlug;
                const isActive = itemSlug === slug;
                const num = SLUG_NUMBER[itemSlug];
                const isChild = num.includes(".");
                return (
                  <li key={`mobile-${itemSlug}`}>
                    <Link
                      href={`/${lang}/manual/${itemSlug}`}
                      className={`flex items-center gap-2 rounded-md py-1.5 text-sm transition-colors ${
                        isChild ? "pl-7 pr-2.5" : "px-2.5"
                      } ${
                        isActive
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      <span className={`inline-flex items-center justify-center rounded-full border border-border/60 text-xs ${
                        isChild ? "h-5 min-w-[1.75rem] px-1" : "h-5 w-5"
                      }`}>
                        {num}
                      </span>
                      <span>{itemLabel}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </details>

          <div className="mb-6">
            <Link
              href={`/${lang}/manual`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              &larr; {dict.manual.backToToc}
            </Link>
          </div>

          <h1 className="text-3xl font-bold">{SLUG_NUMBER[slug as ManualSlug]}. {sectionTitle}</h1>

          <ManualMarkdown markdown={markdown} lang={lang} />

          {/* Prev / Next navigation */}
          <nav className="mt-12 flex clear-both items-center justify-between border-t border-border/40 pt-6">
            {prevSlug ? (
              <Link
                href={`/${lang}/manual/${prevSlug}`}
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                {prevLabel}
              </Link>
            ) : (
              <span />
            )}
            {nextSlug ? (
              <Link
                href={`/${lang}/manual/${nextSlug}`}
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {nextLabel}
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span />
            )}
          </nav>

          {/* Next section shortcut at bottom */}
          {nextSlug && (
            <div className="mt-6 clear-both rounded-lg border border-border/50 bg-muted/20 p-4">
              <Link
                href={`/${lang}/manual/${nextSlug}`}
                className="flex items-center justify-between text-sm font-medium transition-colors hover:text-primary"
              >
                <span>{lang === "ko" ? "다음 목차" : "Next Section"}</span>
                <span className="flex items-center gap-1">
                  {nextLabel}
                  <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
