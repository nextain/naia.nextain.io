import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	const dict = await getDictionary(lang as Locale);
	return buildPageMetadata({
		lang,
		path: "contribute",
		title: dict.contribute.title,
		description: dict.contribute.subtitle,
		keywords: ["Naia open source", "contribute to Naia", "AI-native open source", "open source contribution", "Naia OS GitHub", "translate AI", "AI community"],
	});
}
import {
	Github,
	Heart,
	BookOpen,
	ArrowRight,
	Code2,
	Globe,
	Shield,
	FileCode,
	Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CopyButton } from "@/components/ui/copy-button";

const GITHUB_REPO = "https://github.com/nextain/naia-os";
const CLONE_COMMAND = "git clone https://github.com/nextain/naia-os.git";

const WHY_ICONS = [FileCode, Globe, Shield, Code2];

const WAYS_ICONS = [Globe, Code2, BookOpen, Terminal, FileCode, ArrowRight];

export default async function ContributePage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const dict = await getDictionary(lang as Locale);
	const c = dict.contribute;

	return (
		<div className="mx-auto max-w-4xl overflow-x-hidden px-4 py-16">
			{/* Hero */}
			<div className="mb-14 text-center">
				<h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
					{c.title}
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
					{c.subtitle}
				</p>
			</div>

			{/* Clone & Ask AI */}
			<Card className="mb-12 border-primary/50 bg-primary/5">
				<CardContent className="pt-6">
					<h2 className="mb-3 text-2xl font-semibold">{c.cloneTitle}</h2>
					<p className="mb-4 text-muted-foreground">{c.cloneDescription}</p>
					<div className="relative mb-4 rounded-md bg-muted/50 py-3 pl-3 pr-10">
						<pre className="overflow-x-auto text-sm">
							<code>{CLONE_COMMAND}</code>
						</pre>
						<CopyButton text={CLONE_COMMAND} />
					</div>
					<p className="text-sm italic text-muted-foreground">{c.cloneAsk}</p>
				</CardContent>
			</Card>

			{/* Why Different */}
			<div className="mb-12">
				<h2 className="mb-6 text-center text-2xl font-semibold">
					{c.whyTitle}
				</h2>
				<div className="grid gap-4 sm:grid-cols-2">
					{c.whyItems.map((item, idx) => {
						const Icon = WHY_ICONS[idx] ?? Code2;
						return (
							<Card key={idx}>
								<CardContent className="pt-5">
									<div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
										<Icon className="h-4 w-4" />
									</div>
									<p className="mb-1 text-sm text-muted-foreground line-through">
										{item.traditional}
									</p>
									<p className="text-sm font-medium">{item.naia}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>

			{/* Ways to Contribute */}
			<div className="mb-12">
				<h2 className="mb-6 text-center text-2xl font-semibold">
					{c.waysTitle}
				</h2>
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{c.waysItems.map((item, idx) => {
						const Icon = WAYS_ICONS[idx] ?? Code2;
						return (
							<div
								key={idx}
								className="rounded-lg border border-border/60 p-4 transition hover:border-primary/30 hover:shadow-sm"
							>
								<div className="mb-2 flex items-center gap-2">
									<Icon className="h-4 w-4 text-primary" />
									<h3 className="font-medium">{item.title}</h3>
								</div>
								<p className="text-sm text-muted-foreground">
									{item.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			{/* Donate */}
			<div className="mb-12 rounded-lg border border-border/60 bg-muted/30 p-6 text-center">
				<Heart className="mx-auto mb-3 h-8 w-8 text-pink-500" />
				<p className="mb-4 text-muted-foreground">{c.ctaDonateDescription}</p>
				<Button asChild>
					<Link
						href="https://github.com/sponsors/luke-n-alpha"
						target="_blank"
						rel="noreferrer"
					>
						<Heart className="mr-2 h-4 w-4" />
						{c.ctaDonate}
					</Link>
				</Button>
			</div>

			{/* CTAs */}
			<div className="flex flex-wrap justify-center gap-3">
				<Button variant="outline" asChild>
					<Link href={GITHUB_REPO} target="_blank" rel="noreferrer">
						<Github className="mr-2 h-4 w-4" />
						{c.ctaGithub}
					</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link
						href={`${GITHUB_REPO}/blob/main/CONTRIBUTING.md`}
						target="_blank"
						rel="noreferrer"
					>
						<BookOpen className="mr-2 h-4 w-4" />
						{c.ctaGuide}
					</Link>
				</Button>
				<Button variant="ghost" asChild>
					<Link href={`/${lang}/manual/open-source`}>
						<Shield className="mr-2 h-4 w-4" />
						{c.manualLink}
					</Link>
				</Button>
			</div>
		</div>
	);
}
