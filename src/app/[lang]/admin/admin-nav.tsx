"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FileText, Edit3, MessageSquare } from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Posts", icon: FileText },
  { href: "/admin/blog/editor", label: "Editor", icon: Edit3 },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
] as const;

export function AdminNav({ lang }: { lang: string }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const full = `/${lang}${href}`;
    if (href === "/admin") return pathname === full;
    return pathname.startsWith(full);
  };

  return (
    <nav className="flex items-center gap-1 border-b border-border/40 bg-background px-4 py-2">
      <span className="mr-4 text-sm font-semibold text-foreground">
        Admin
      </span>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={`/${lang}${href}`}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
            isActive(href)
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
