import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { readLegalDoc } from "@/lib/legal-docs";
import { LegalMarkdown } from "@/components/legal/legal-markdown";

export default async function DonationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const markdown = await readLegalDoc(lang as Locale, "donation");

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold">{dict.footer.links.donation}</h1>
      <div className="mt-6 mb-8 flex justify-center">
        <a
          href="https://github.com/sponsors/luke-n-alpha"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[#ea4aaa] px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-[#d63d99]"
        >
          <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.6 20.6 0 0 0 8 13.393a20.6 20.6 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5" />
          </svg>
          Sponsor on GitHub
        </a>
      </div>
      <LegalMarkdown markdown={markdown} />
    </main>
  );
}
