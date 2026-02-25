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
    "Naia — The Next Generation AI OS. Your own AI lives here. Open source, cloud to local AI — you choose. VRM 3D avatar, voice chat, 70+ skills, OpenClaw AI gateway, and a safe Steam-ready Linux.",
  keywords: [
    "naia",
    "AI OS",
    "personal AI",
    "open source AI",
    "AI Avatar",
    "3D Avatar",
    "Voice AI",
    "local AI",
    "AI sovereignty",
    "Linux AI",
    "immutable OS",
    "Bazzite",
    "Steam gaming",
    "Physical AI",
    "Gemini",
    "Claude",
    "GPT",
    "Ollama",
    "OpenClaw",
    "AI gateway",
    "Nextain",
  ],
  metadataBase: new URL("https://naia.nextain.io"),
  openGraph: {
    title: "Naia — The Next Generation AI OS",
    description: "Your own AI lives here. Open source, cloud to local AI — you choose. VRM 3D avatar with voice chat, 70+ skills, OpenClaw AI gateway, memory and personality all on your machine. A safe, Steam-ready Linux where your AI lives.",
    url: "https://naia.nextain.io",
    siteName: "Naia",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ko_KR", "ja_JP", "zh_CN", "fr_FR", "de_DE", "ru_RU", "es_ES", "pt_BR", "vi_VN", "id_ID", "ar_SA", "hi_IN", "bn_BD"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naia — The Next Generation AI OS",
    description: "Your own AI lives here. Open source, cloud to local AI — you choose. VRM 3D avatar with voice chat, 70+ skills, OpenClaw AI gateway, memory and personality all on your machine. A safe, Steam-ready Linux where your AI lives.",
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
