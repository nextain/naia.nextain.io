import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Github, Download, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function NaiaPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const dict = await getDictionary(lang as Locale);
	const n = dict.naia;

	return (
		<div className="overflow-x-hidden">
			{/* Hero */}
			<section className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
				<div className="absolute inset-0 bg-gradient-to-b from-cyan-50 via-background to-background dark:from-cyan-950/30" />
				<div
					className="relative mb-6 h-48 w-48 md:h-56 md:w-56"
					style={{ animation: 'subtle-float 4s ease-in-out infinite' }}
				>
					<div className="absolute inset-0 animate-pulse rounded-full bg-cyan-400/20 blur-3xl" />
					<Image
						src="/branding/character/naia-default-character.png"
						alt="Naia"
						fill
						className="relative object-contain drop-shadow-2xl"
						priority
					/>
				</div>
				<h1 className="relative mb-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
					{n.title}
				</h1>
				<p className="relative mb-3 text-lg font-medium text-cyan-600 dark:text-cyan-400">
					{n.subtitle}
				</p>
				<p className="relative max-w-md text-center text-sm leading-relaxed text-muted-foreground">
					{n.identity.appearance.value}
				</p>
			</section>

			{/* Identity + Personality — compact two-column */}
			<section className="mx-auto max-w-4xl px-4 py-14">
				<div className="grid gap-6 sm:grid-cols-2">
					<div className="space-y-4">
						<h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
							{n.identity.title}
						</h2>
						{([n.identity.species, n.identity.role, n.identity.value, n.identity.home] as { label: string; value: string }[]).map((item) => (
							<div key={item.label}>
								<p className="text-xs font-semibold text-primary/70">{item.label}</p>
								<p className="text-sm text-muted-foreground">{item.value}</p>
							</div>
						))}
					</div>
					<div className="space-y-4">
						<h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
							{n.personality.title}
							<span className="ml-2 font-normal normal-case tracking-normal text-muted-foreground">
								{n.personality.subtitle}
							</span>
						</h2>
						{n.personality.traits.map((t) => (
							<div key={t.label}>
								<p className="text-xs font-semibold text-primary/70">{t.label}</p>
								<p className="text-sm text-muted-foreground">{t.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Names — inline pills */}
			<section className="mx-auto max-w-4xl px-4 pb-14">
				<h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
					{n.name.title}
				</h2>
				<div className="flex flex-wrap gap-2">
					{n.name.meanings.map((m) => (
						<span
							key={m.origin}
							className="rounded-full border border-border/60 px-3 py-1.5 text-xs"
						>
							<span className="font-medium">{m.origin}</span>
							<span className="mx-1 text-border">·</span>
							<span className="text-muted-foreground">{m.meaning}</span>
						</span>
					))}
				</div>
				<p className="mt-3 text-xs text-muted-foreground">{n.name.pun}</p>
			</section>

			{/* Variations */}
			<section className="mx-auto max-w-3xl px-4 py-14">
				<div className="overflow-hidden rounded-2xl shadow-lg">
					<Image
						src="/branding/character/naia-varaiations.png"
						alt="Naia variations"
						width={800}
						height={800}
						className="w-full"
					/>
				</div>
				<p className="mt-4 text-center text-sm text-muted-foreground">
					{n.variations.description}
				</p>
				<p className="mt-1 text-center text-xs text-muted-foreground/70">
					{n.variations.roles}
				</p>
				<p className="mt-3 text-center text-xs text-muted-foreground/50">
					{n.vrm}
				</p>
			</section>

			{/* Values — compact quotes */}
			<section className="mx-auto max-w-3xl px-4 py-14">
				<div className="space-y-6">
					{n.values.items.map((v) => (
						<div key={v.name} className="flex items-baseline gap-3">
							<span className="shrink-0 text-xs font-semibold text-primary/60">{v.name}</span>
							<span className="text-sm italic text-muted-foreground">{v.naia}</span>
						</div>
					))}
				</div>
			</section>

			{/* CTA */}
			<section className="px-4 pb-20 pt-6 text-center">
				<div className="flex flex-wrap justify-center gap-3">
					<Button size="lg" asChild>
						<Link href={`/${lang}/download`}>
							<Download className="mr-2 h-4 w-4" />
							{n.cta.download}
						</Link>
					</Button>
					<Button size="lg" variant="outline" asChild>
						<Link href={`/${lang}/contribute`}>
							<Github className="mr-2 h-4 w-4" />
							{n.cta.github}
						</Link>
					</Button>
					<Button size="lg" variant="outline" asChild>
						<Link href={`/${lang}/donation`}>
							<Heart className="mr-2 h-4 w-4" />
							{n.cta.donate}
						</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
