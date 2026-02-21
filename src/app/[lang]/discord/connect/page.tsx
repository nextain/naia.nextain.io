import { auth } from "@/lib/auth";
import { isLocale } from "@/i18n/config";
import { notFound, redirect } from "next/navigation";

export default async function DiscordConnectRoute({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();

	const oauth2Url = process.env.DISCORD_OAUTH2_URL?.trim();
	if (oauth2Url) {
		redirect(oauth2Url);
	}

	const session = await auth();
	if (!session?.gwUserId) {
		redirect(`/${lang}/login`);
	}

	redirect(`/${lang}/settings/integrations?channel=discord&source=naia-shell`);
}
