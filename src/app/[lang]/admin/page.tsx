"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, RefreshCw, Search, ExternalLink } from "lucide-react";

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  draft: boolean;
  tags: string[];
  hero?: string;
  summary?: string;
}

type Filter = "all" | "published" | "draft";

export default function AdminDashboard() {
  const { lang } = useParams<{ lang: string }>();
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) setPosts(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const filtered = posts.filter((p) => {
    if (filter === "published" && p.draft) return false;
    if (filter === "draft" && !p.draft) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const publishedCount = posts.filter((p) => !p.draft).length;
  const draftCount = posts.filter((p) => p.draft).length;

  return (
    <div className="h-full overflow-auto">
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Posts</h1>
        <Link href={`/${lang}/admin/blog/editor?new=1`}>
          <Button size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="mb-4 flex items-center gap-2">
        {(["all", "published", "draft"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {f === "all"
              ? `All (${posts.length})`
              : f === "published"
                ? `Published (${publishedCount})`
                : `Draft (${draftCount})`}
          </button>
        ))}

        <div className="relative ml-auto">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="h-8 w-48 pl-8 text-sm"
          />
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={loadPosts}
          disabled={loading}
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />
        </Button>
      </div>

      {loading ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Loading...
        </p>
      ) : filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No posts found
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.slug}>
                <TableCell className="text-xs text-muted-foreground">
                  {p.date}
                </TableCell>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {p.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {p.tags.length > 3 && (
                      <span className="text-[10px] text-muted-foreground">
                        +{p.tags.length - 3}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {p.draft ? (
                    <Badge variant="outline" className="text-[10px]">
                      Draft
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-emerald-500/10 text-[10px] text-emerald-600 dark:text-emerald-400"
                    >
                      Published
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {!p.draft && (
                      <a
                        href={`https://naia.nextain.io/${lang}/blog/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        title="View live"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <Link
                      href={`/${lang}/admin/blog/editor?slug=${p.slug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
    </div>
  );
}
