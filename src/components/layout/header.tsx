"use client";

import { NanLogo } from "@/components/ui/nan-logo";
import Link from "next/link";
import { useDictionary } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, MessageSquare } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const dict = useDictionary();
  const lang = dict.locale;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: `/${lang}#pricing`, label: dict.header.pricing },
    { href: `/${lang}#faq`, label: dict.header.faq },
    { href: `/${lang}/manual`, label: dict.header.manual },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2.5">
          <NanLogo className="h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">{dict.footer.brand}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <Link href="https://github.com/nextain/nan-os" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <Link href="https://discord.gg/FGYJN7auty" target="_blank" rel="noreferrer">
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only">Discord</span>
            </Link>
          </Button>
          <ThemeToggle />
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/${lang}/login`}>{dict.header.login}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/${lang}#pricing`}>{dict.header.download}</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={dict.header.toggleMenu}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border/40 bg-background px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                <Link href="https://github.com/nextain/nan-os" target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                <Link href="https://discord.gg/FGYJN7auty" target="_blank" rel="noreferrer">
                  <MessageSquare className="h-4 w-4" />
                  <span className="sr-only">Discord</span>
                </Link>
              </Button>
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <Button size="sm" className="mt-1" asChild>
              <Link href={`/${lang}/login`}>{dict.header.login}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
