/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Reply, Trash2, User } from "lucide-react";

interface Session {
  user?: { name?: string | null; image?: string | null };
  gwUserId?: string;
  provider?: string;
}

interface Comment {
  id: string;
  postSlug: string;
  locale: string;
  content: string;
  createdAt: number;
  parentId: string | null;
  isGuest: boolean;
  guestName: string | null;
  userId: string | null;
  userName: string;
  userImage: string | null;
  userProvider: string | null;
  deleted: boolean;
}

interface CommentsProps {
  slug: string;
  session: Session | null;
  locale: string;
  dict: {
    title: string;
    placeholder: string;
    guestName: string;
    guestNamePlaceholder: string;
    submit: string;
    reply: string;
    delete: string;
    deleteConfirm: string;
    loginPrompt: string;
    guestPrompt: string;
    noComments: string;
    cancel: string;
  };
}

function toComment(id: string, data: DocumentData): Comment {
  return {
    id,
    postSlug: data.postSlug ?? "",
    locale: data.locale ?? "",
    content: data.content ?? "",
    createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
    parentId: data.parentId ?? null,
    isGuest: data.isGuest ?? true,
    guestName: data.guestName ?? null,
    userId: data.userId ?? null,
    userName: data.userName ?? "Anonymous",
    userImage: data.userImage ?? null,
    userProvider: data.userProvider ?? null,
    deleted: data.deleted ?? false,
  };
}

function CommentAvatar({ comment }: { comment: Comment }) {
  if (comment.userImage) {
    return (
      <img
        src={comment.userImage}
        alt={comment.userName}
        className="h-8 w-8 rounded-full"
      />
    );
  }
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
      <User className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function GuestBadge() {
  return (
    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
      Guest
    </span>
  );
}

function CommentForm({
  session,
  slug,
  locale,
  parentId,
  dict,
  onCancel,
  onSubmitted,
}: {
  session: Session | null;
  slug: string;
  locale: string;
  parentId: string | null;
  dict: CommentsProps["dict"];
  onCancel?: () => void;
  onSubmitted: () => void;
}) {
  const [content, setContent] = useState("");
  const [guestName, setGuestName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isLoggedIn = !!session?.gwUserId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (!isLoggedIn && !guestName.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postSlug: slug,
          locale,
          content: content.trim(),
          parentId,
          guestName: isLoggedIn ? null : guestName.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Error");
        return;
      }

      setContent("");
      setGuestName("");
      onSubmitted();
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {isLoggedIn ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name ?? ""}
              className="h-6 w-6 rounded-full"
            />
          )}
          <span>{session.user?.name}</span>
        </div>
      ) : (
        <div>
          <p className="mb-2 text-xs text-muted-foreground">{dict.guestPrompt}</p>
          <Input
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder={dict.guestNamePlaceholder}
            className="max-w-xs"
          />
        </div>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={dict.placeholder}
        rows={3}
        maxLength={2000}
        className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />

      {error && <p className="text-xs text-destructive">{error}</p>}

      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" disabled={submitting || !content.trim()}>
          {submitting ? "..." : dict.submit}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            {dict.cancel}
          </Button>
        )}
      </div>
    </form>
  );
}

function CommentItem({
  comment,
  replies,
  session,
  slug,
  locale,
  dict,
}: {
  comment: Comment;
  replies: Comment[];
  session: Session | null;
  slug: string;
  locale: string;
  dict: CommentsProps["dict"];
}) {
  const [showReply, setShowReply] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isOwner = session?.gwUserId && session.gwUserId === comment.userId;

  const handleDelete = async () => {
    if (!confirm(dict.deleteConfirm)) return;
    setDeleting(true);
    try {
      await fetch(`/api/comments?id=${comment.id}`, { method: "DELETE" });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <CommentAvatar comment={comment} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {comment.userName}
            </span>
            {comment.isGuest && <GuestBadge />}
            <time className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString(locale, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
          <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap break-words">
            {comment.content}
          </p>
          <div className="mt-1.5 flex items-center gap-3">
            <button
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Reply className="h-3 w-3" />
              {dict.reply}
            </button>
            {isOwner && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="h-3 w-3" />
                {dict.delete}
              </button>
            )}
          </div>
        </div>
      </div>

      {showReply && (
        <div className="ml-11">
          <CommentForm
            session={session}
            slug={slug}
            locale={locale}
            parentId={comment.id}
            dict={dict}
            onCancel={() => setShowReply(false)}
            onSubmitted={() => setShowReply(false)}
          />
        </div>
      )}

      {replies.length > 0 && (
        <div className="ml-11 space-y-3 border-l-2 border-border/30 pl-4">
          {replies.map((reply) => (
            <div key={reply.id} className="flex gap-3">
              <CommentAvatar comment={reply} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {reply.userName}
                  </span>
                  {reply.isGuest && <GuestBadge />}
                  <time className="text-xs text-muted-foreground">
                    {new Date(reply.createdAt).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap break-words">
                  {reply.content}
                </p>
                {session?.gwUserId === reply.userId && (
                  <button
                    onClick={async () => {
                      if (!confirm(dict.deleteConfirm)) return;
                      await fetch(`/api/comments?id=${reply.id}`, { method: "DELETE" });
                    }}
                    className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    {dict.delete}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Comments({ slug, session, locale, dict }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const subscribe = useCallback(() => {
    const q = query(
      collection(db, "comments"),
      where("postSlug", "==", slug),
      where("locale", "==", locale),
      where("deleted", "==", false),
      orderBy("createdAt", "asc"),
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => toComment(doc.id, doc.data()));
        setComments(items);
        setLoading(false);
      },
      (err) => {
        console.error("[comments] onSnapshot error:", err);
        setLoading(false);
      },
    );
  }, [slug, locale]);

  useEffect(() => {
    const unsubscribe = subscribe();
    return () => unsubscribe();
  }, [subscribe]);

  const topLevel = comments.filter((c) => !c.parentId);
  const repliesMap = new Map<string, Comment[]>();
  for (const c of comments) {
    if (c.parentId) {
      const arr = repliesMap.get(c.parentId) ?? [];
      arr.push(c);
      repliesMap.set(c.parentId, arr);
    }
  }

  return (
    <section className="mt-12 border-t border-border/40 pt-8">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <MessageCircle className="h-5 w-5" />
        {dict.title}
        {topLevel.length > 0 && (
          <span className="text-sm font-normal text-muted-foreground">
            ({topLevel.length})
          </span>
        )}
      </h2>

      <div className="mt-6">
        <CommentForm
          session={session}
          slug={slug}
          locale={locale}
          parentId={null}
          dict={dict}
          onSubmitted={() => {}}
        />
      </div>

      <div className="mt-8 space-y-6">
        {loading ? (
          <p className="text-sm text-muted-foreground animate-pulse">...</p>
        ) : topLevel.length === 0 ? (
          <p className="text-sm text-muted-foreground">{dict.noComments}</p>
        ) : (
          topLevel.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replies={repliesMap.get(comment.id) ?? []}
              session={session}
              slug={slug}
              locale={locale}
              dict={dict}
            />
          ))
        )}
      </div>
    </section>
  );
}
