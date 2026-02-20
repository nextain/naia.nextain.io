import { nanLogo } from "@/components/ui/nan-logo";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound } from "next/navigation";

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <Link href={`/${lang}`} className="mb-8 flex items-center gap-2">
        <nanLogo className="h-8 w-8" />
        <span className="text-xl font-bold tracking-tight">{dict.footer.brand}</span>
      </Link>
      {children}
    </div>
  );
}
