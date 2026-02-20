import { isLocale } from "@/i18n/config";
import { notFound, redirect } from "next/navigation";
import { MANUAL_SLUGS } from "@/lib/manual-docs";

export default async function ManualIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  
  // Redirect to the first manual page (getting-started)
  redirect(`/${lang}/manual/${MANUAL_SLUGS[0]}`);
}
