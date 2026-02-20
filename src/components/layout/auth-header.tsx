"use client";

import Link from "next/link";
import { useDictionary } from "@/components/providers/locale-provider";
import { nanLogo } from "@/components/ui/nan-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuthHeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function AuthHeader({ user }: AuthHeaderProps) {
  const dict = useDictionary();
  const lang = dict.locale;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="flex h-14 items-center justify-between px-4">
        <Link href={`/${lang}`} className="flex items-center gap-2.5">
          <nanLogo className="h-5 w-5" />
          <span className="font-semibold tracking-tight">{dict.footer.brand}</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.image ?? undefined} />
                  <AvatarFallback className="text-xs">
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {user?.email && (
                <div className="px-2 py-1.5 text-xs text-muted-foreground">
                  {user.email}
                </div>
              )}
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: `/${lang}` })}>
                {dict.auth.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
