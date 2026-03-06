"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCw, Trash2 } from "lucide-react";

interface CommentItem {
  id: string;
  postSlug: string;
  locale: string;
  parentId: string | null;
  userName: string;
  userId: string | null;
  isGuest: boolean;
  guestName: string | null;
  content: string;
  createdAt: string | null;
  deleted: boolean;
}

const PAGE_SIZE = 50;

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [slugFilter, setSlugFilter] = useState("");
  const [message, setMessage] = useState("");

  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }, []);

  const fetchComments = useCallback(
    async (append = false) => {
      setLoading(true);
      try {
        const body: Record<string, unknown> = {
          action: "list",
          limit: PAGE_SIZE,
        };
        if (append && cursor) body.after = cursor;
        if (slugFilter) body.postSlug = slugFilter;

        const res = await fetch("/api/admin/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) throw new Error("Failed");
        const data = await res.json();

        setComments((prev) => (append ? [...prev, ...data.items] : data.items));
        setCursor(data.lastCursor);
        setHasMore(data.items.length === PAGE_SIZE);
      } catch {
        showMessage("Failed to load comments");
      } finally {
        setLoading(false);
      }
    },
    [cursor, slugFilter, showMessage],
  );

  useEffect(() => {
    fetchComments(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this comment?")) return;
    try {
      const res = await fetch("/api/admin/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      if (!res.ok) throw new Error("Failed");
      setComments((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, deleted: true, content: "" } : c,
        ),
      );
      showMessage("Deleted");
    } catch {
      showMessage("Delete failed");
    }
  };

  const formatDate = (iso: string | null) => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const uniqueSlugs = [...new Set(comments.map((c) => c.postSlug))];

  return (
    <div className="h-full overflow-auto">
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Comments</h1>
        <div className="flex items-center gap-2">
          {message && (
            <span className="text-xs text-muted-foreground">{message}</span>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => fetchComments(false)}
            disabled={loading}
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      {uniqueSlugs.length > 1 && (
        <div className="mb-4">
          <select
            value={slugFilter}
            onChange={(e) => {
              setSlugFilter(e.target.value);
              setCursor(null);
            }}
            className="rounded-md border border-border/50 bg-background px-3 py-1.5 text-sm"
          >
            <option value="">All posts</option>
            {uniqueSlugs.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading && comments.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Loading...
        </p>
      ) : comments.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No comments
        </p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="max-w-xs">Content</TableHead>
                <TableHead>Locale</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((c) => (
                <TableRow
                  key={c.id}
                  className={c.deleted ? "opacity-40" : ""}
                >
                  <TableCell className="text-xs">
                    {c.parentId ? (
                      <span className="text-muted-foreground">
                        ↳ reply
                      </span>
                    ) : (
                      <span className="max-w-[120px] truncate block">
                        {c.postSlug}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{c.userName}</span>
                      {c.isGuest && (
                        <Badge variant="outline" className="text-[10px]">
                          Guest
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    {c.deleted ? (
                      <span className="text-muted-foreground">(deleted)</span>
                    ) : (
                      <span className="block truncate text-sm">
                        {c.content}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {c.locale}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(c.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    {!c.deleted && (
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {hasMore && (
            <div className="mt-4 text-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => fetchComments(true)}
                disabled={loading}
              >
                {loading ? "..." : "Load More"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
    </div>
  );
}
