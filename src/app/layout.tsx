import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NaN OS Lab",
    template: "%s | NaN OS Lab",
  },
  description:
    "NaN OS — Your Personal AI Desktop OS. Chat with 3D avatar AI, voice conversations, and multi-LLM support.",
  keywords: [
    "nan",
    "AI Desktop",
    "AI Avatar",
    "3D Avatar",
    "Voice AI",
    "LLM",
    "Gemini",
    "personal AI",
    "desktop OS",
  ],
  metadataBase: new URL("https://nan.nextain.io"),
  openGraph: {
    title: "NaN OS Lab — Where Technology meets Emotion",
    description:
      "Your personal AI desktop OS with 3D avatar, voice chat, and multi-LLM support. One-click install or dedicated Linux OS.",
    url: "https://nan.nextain.io",
    siteName: "NaN OS Lab",
    locale: "en_US",
    alternateLocale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NaN OS Lab — Where Technology meets Emotion",
    description:
      "Your personal AI desktop OS with 3D avatar, voice chat, and multi-LLM support.",
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
          src="https://www.googletagmanager.com/gtag/js?id=G-G2BBWG5BNB"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G2BBWG5BNB');
          `}
        </Script>
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
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
