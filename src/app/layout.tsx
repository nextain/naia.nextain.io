import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Naia",
    template: "%s | Naia",
  },
  description:
    "Naia — A Linux AI OS powered by OpenClaw's 5,700+ skill ecosystem. 3D AI avatar, 7 LLM providers, voice chat, Discord DM. No API keys needed.",
  keywords: [
    "naia",
    "AI Desktop",
    "AI Avatar",
    "3D Avatar",
    "Voice AI",
    "LLM",
    "OpenClaw",
    "AI skills",
    "Linux AI",
    "Gemini",
    "Claude",
    "GPT",
    "Discord AI",
    "personal AI",
    "desktop OS",
    "Nextain",
  ],
  metadataBase: new URL("https://naia.nextain.io"),
  openGraph: {
    title: "Naia — Linux AI OS with 5,700+ Skills",
    description: "Built on OpenClaw's ecosystem. 3D AI avatar, 7 LLM providers, 70+ skills, voice chat, Discord DM — no API keys needed.",
    url: "https://naia.nextain.io",
    siteName: "Naia",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ko_KR", "ja_JP", "zh_CN", "fr_FR", "de_DE", "ru_RU", "es_ES", "pt_BR", "vi_VN", "id_ID", "ar_SA", "hi_IN", "bn_BD"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naia — Linux AI OS with 5,700+ Skills",
    description: "Built on OpenClaw's ecosystem. 3D AI avatar, 7 LLM providers, 70+ skills, voice chat, Discord DM — no API keys needed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R3HHTFQNGS"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R3HHTFQNGS');
          `}
        </Script>
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID ? (
            <Script
              src="https://app.lemonsqueezy.com/js/lemon.js"
              strategy="afterInteractive"
            />
          ) : null}
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
