import { auth } from "@/lib/auth";
import { getUser } from "@/lib/gateway-client";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const session = await auth();
  if (!session?.gwUserId) redirect(`/${lang}/login`);

  let user = null;
  try {
    user = await getUser(session.gwUserId);
  } catch {
    user = null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">{dict.settings.title}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{dict.settings.profile.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={session.user?.image ?? undefined} />
              <AvatarFallback>{session.user?.name?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{session.user?.name ?? "-"}</p>
              <p className="text-sm text-muted-foreground">{session.user?.email ?? "-"}</p>
            </div>
          </div>

          <div className="grid gap-2 text-sm text-muted-foreground">
            <p>
              {dict.settings.profile.budgetId}:{" "}
              <span className="font-mono text-xs text-foreground">{user?.budget_id ?? "-"}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
