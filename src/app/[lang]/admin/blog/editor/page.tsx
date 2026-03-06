/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BlogMarkdown } from "@/components/blog/blog-markdown";
import {
  Save,
  Rocket,
  Send,
  ExternalLink,
  ChevronDown,
  Eye,
  Edit3,
  Sparkles,
  X,
  ImagePlus,
} from "lucide-react";

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  draft: boolean;
  tags: string[];
  summary?: string;
}

type ViewMode = "split" | "edit" | "preview";

const STYLES = [
  { id: "announcement", label: "Announcement" },
  { id: "technical", label: "Technical" },
  { id: "story", label: "Story" },
  { id: "naia", label: "Naia Voice" },
  { id: "community", label: "Community" },
] as const;

const NEW_POST_TEMPLATE = (slug: string) =>
  `---
title: "${slug}"
date: "${new Date().toISOString().slice(0, 10)}"
draft: true
tags: []
summary: ""
hero: ""
---

`;

export default function BlogEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <EditorInner />
    </Suspense>
  );
}

function EditorInner() {
  const searchParams = useSearchParams();
  const slugParam = searchParams.get("slug");
  const isNew = searchParams.get("new") === "1";

  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [selectedSlug, setSelectedSlug] = useState(slugParam ?? "");
  const [locale, setLocale] = useState("ko");
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [message, setMessage] = useState("");
  const [commitMsg, setCommitMsg] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [uploading, setUploading] = useState(false);

  // New post
  const [newSlug, setNewSlug] = useState("");
  const [showNewPost, setShowNewPost] = useState(isNew);

  // Crosspost panel
  const [crosspostOpen, setCrosspostOpen] = useState(false);
  const [crosspostPlatform, setCrosspostPlatform] = useState<
    "devto" | "reddit"
  >("reddit");
  const [crosspostStyle, setCrosspostStyle] = useState("community");
  const [crosspostDraft, setCrosspostDraft] = useState("");
  const [crosspostTitle, setCrosspostTitle] = useState("");
  const [subreddit, setSubreddit] = useState("linux_gaming");
  const [generating, setGenerating] = useState(false);
  const [posting, setPosting] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDirty = content !== originalContent;
  const selectedPost = posts.find((p) => p.slug === selectedSlug);

  const showMsg = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }, []);

  const loadPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) setPosts(await res.json());
    } catch {
      showMsg("Failed to load posts");
    }
  }, [showMsg]);

  const loadPost = useCallback(
    async (slug: string) => {
      try {
        const res = await fetch(`/api/admin/posts/${slug}`);
        if (res.ok) {
          const data = await res.json();
          const md = data.locales[locale] ?? data.locales["ko"] ?? "";
          setContent(md);
          setOriginalContent(md);
        }
      } catch {
        showMsg("Failed to load post");
      }
    },
    [locale, showMsg],
  );

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    if (selectedSlug && !showNewPost) loadPost(selectedSlug);
  }, [selectedSlug, loadPost, showNewPost]);

  // Pre-select from query param
  useEffect(() => {
    if (slugParam && !isNew) setSelectedSlug(slugParam);
  }, [slugParam, isNew]);

  // Ctrl+S
  const handleSaveRef = useRef<() => void>(() => {});
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSaveRef.current();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSave = async () => {
    if (!selectedSlug || !isDirty) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/posts/${selectedSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, content }),
      });
      if (res.ok) {
        setOriginalContent(content);
        showMsg("Saved");
      } else {
        const data = await res.json();
        showMsg(`Save failed: ${data.error}`);
      }
    } catch {
      showMsg("Save failed");
    } finally {
      setSaving(false);
    }
  };
  handleSaveRef.current = handleSave;

  const handleCreatePost = async () => {
    const slug = newSlug.trim().toLowerCase();
    if (!slug || !/^[a-z0-9][-a-z0-9]*$/.test(slug)) {
      showMsg("Invalid slug (lowercase, hyphens only)");
      return;
    }
    setSaving(true);
    try {
      const template = NEW_POST_TEMPLATE(slug);
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: "ko", content: template }),
      });
      if (res.ok) {
        setContent(template);
        setOriginalContent(template);
        setSelectedSlug(slug);
        setShowNewPost(false);
        setNewSlug("");
        await loadPosts();
        window.history.replaceState(null, "", `?slug=${slug}`);
        showMsg("Post created");
      } else {
        const data = await res.json();
        showMsg(`Create failed: ${data.error}`);
      }
    } catch {
      showMsg("Create failed");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedSlug) {
      showMsg("Select a post first");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", selectedSlug);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      const imgMd = `![${file.name}](${data.path})`;
      if (textareaRef.current) {
        const ta = textareaRef.current;
        const start = ta.selectionStart;
        const before = content.slice(0, start);
        const after = content.slice(ta.selectionEnd);
        setContent(before + imgMd + "\n" + after);
      } else {
        setContent(content + "\n" + imgMd + "\n");
      }
      showMsg(`Uploaded: ${data.path}`);
    } catch (err) {
      showMsg(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeploy = async () => {
    if (!selectedSlug) return;
    const msg = commitMsg.trim() || `blog: update ${selectedSlug}`;
    if (!confirm(`"${msg}" 커밋 후 push합니다. 계속하시겠습니까?`)) return;
    setDeploying(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: selectedSlug, message: msg }),
      });
      const data = await res.json();
      if (res.ok) {
        showMsg(`Deployed: ${data.committed?.join(", ")}`);
        setCommitMsg("");
      } else {
        showMsg(`Deploy failed: ${data.error}`);
      }
    } catch {
      showMsg("Deploy failed");
    } finally {
      setDeploying(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedSlug) return;
    setGenerating(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/crosspost/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: selectedSlug,
          platform: crosspostPlatform,
          style: crosspostStyle,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCrosspostDraft(data.generated);
        if (!crosspostTitle && selectedPost) {
          setCrosspostTitle(selectedPost.title);
        }
      } else {
        showMsg(`Generate failed: ${data.error}`);
      }
    } catch {
      showMsg("Generate failed");
    } finally {
      setGenerating(false);
    }
  };

  const handlePost = async () => {
    if (!selectedSlug || !crosspostDraft.trim()) return;
    const label =
      crosspostPlatform === "devto"
        ? "Dev.to"
        : `Reddit (r/${subreddit})`;
    if (
      !confirm(
        `"${crosspostTitle}" 을(를) ${label}에 발행합니다. 계속하시겠습니까?`,
      )
    )
      return;
    setPosting(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/crosspost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: selectedSlug,
          targets: [crosspostPlatform],
          subreddit,
          overrideTitle: crosspostTitle,
          overrideBody: crosspostDraft,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        if (crosspostPlatform === "devto" && data.devto?.url) {
          showMsg(`Dev.to published: ${data.devto.url}`);
          window.open(data.devto.url, "_blank");
        }
        if (crosspostPlatform === "reddit" && data.reddit?.submitUrl) {
          showMsg("Opening Reddit...");
          window.open(data.reddit.submitUrl, "_blank");
        }
      } else {
        showMsg(`Post failed: ${data.error}`);
      }
    } catch {
      showMsg("Post failed");
    } finally {
      setPosting(false);
    }
  };

  const openCrosspost = (platform: "devto" | "reddit") => {
    setCrosspostPlatform(platform);
    setCrosspostOpen(true);
    setCrosspostDraft("");
    if (selectedPost) setCrosspostTitle(selectedPost.title);
  };

  const previewMarkdown = content.replace(/^---[\s\S]*?---\s*/, "");

  // New post creation UI
  if (showNewPost) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-md space-y-4 rounded-lg border border-border/40 bg-card p-6">
          <h2 className="text-lg font-semibold">New Post</h2>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Slug</label>
            <Input
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              placeholder="my-new-post"
              onKeyDown={(e) => e.key === "Enter" && handleCreatePost()}
            />
            <p className="text-xs text-muted-foreground">
              Lowercase letters, numbers, hyphens only
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreatePost} disabled={saving}>
              {saving ? "..." : "Create"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowNewPost(false);
                window.history.replaceState(null, "", "?");
              }}
            >
              Cancel
            </Button>
          </div>
          {message && (
            <p className="text-xs text-destructive">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-3 border-b border-border/40 px-4 py-2">
        <div className="relative">
          <select
            value={selectedSlug}
            onChange={(e) => {
              setSelectedSlug(e.target.value);
              window.history.replaceState(
                null,
                "",
                e.target.value ? `?slug=${e.target.value}` : "?",
              );
            }}
            className="appearance-none rounded-md border border-border/50 bg-background px-3 py-1.5 pr-8 text-sm"
          >
            <option value="">Select post...</option>
            {posts.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.draft ? "[DRAFT] " : ""}
                {p.title}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
          className="rounded-md border border-border/50 bg-background px-2 py-1.5 text-sm"
        >
          <option value="ko">KO</option>
          <option value="en">EN</option>
          <option value="ja">JA</option>
        </select>

        <div className="flex rounded-md border border-border/50">
          <button
            onClick={() => setViewMode("edit")}
            className={`px-2 py-1 text-xs ${viewMode === "edit" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setViewMode("split")}
            className={`border-x border-border/50 px-2 py-1 text-xs ${viewMode === "split" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Split
          </button>
          <button
            onClick={() => setViewMode("preview")}
            className={`px-2 py-1 text-xs ${viewMode === "preview" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>

        {selectedSlug && (
          <label className="flex cursor-pointer items-center gap-1 rounded-md border border-border/50 px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
            <ImagePlus className="h-3.5 w-3.5" />
            {uploading ? "..." : "Image"}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}

        <div className="flex-1" />

        {isDirty && (
          <Badge variant="secondary" className="text-xs">
            Unsaved
          </Badge>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={handleSave}
          disabled={saving || !isDirty}
        >
          <Save className="mr-1.5 h-3.5 w-3.5" />
          {saving ? "..." : "Save"}
        </Button>
      </div>

      {/* Editor + Preview */}
      <div className="flex flex-1 overflow-hidden">
        {viewMode !== "preview" && (
          <div
            className={`flex flex-col ${viewMode === "split" ? "w-1/2 border-r border-border/40" : "w-full"}`}
          >
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 resize-none bg-background p-4 font-mono text-sm text-foreground focus:outline-none"
              placeholder="Markdown content..."
              spellCheck={false}
            />
          </div>
        )}

        {viewMode !== "edit" && (
          <div
            className={`overflow-y-auto ${viewMode === "split" ? "w-1/2" : "w-full"}`}
          >
            <div className="mx-auto max-w-3xl px-4 py-6">
              {selectedPost && (
                <header className="mb-6">
                  <h1 className="text-2xl font-bold">{selectedPost.title}</h1>
                  {selectedPost.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selectedPost.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </header>
              )}
              <BlogMarkdown markdown={previewMarkdown} slug={selectedSlug} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      {selectedSlug && !crosspostOpen && (
        <div className="border-t border-border/40 px-4 py-3">
          <div className="flex items-center gap-3">
            <Input
              value={commitMsg}
              onChange={(e) => setCommitMsg(e.target.value)}
              placeholder={`blog: update ${selectedSlug}`}
              className="max-w-sm text-sm"
            />
            <Button
              size="sm"
              onClick={handleDeploy}
              disabled={deploying || isDirty}
            >
              <Rocket className="mr-1.5 h-3.5 w-3.5" />
              {deploying ? "..." : "Deploy"}
            </Button>

            <div className="mx-2 h-6 w-px bg-border/40" />

            <Button
              size="sm"
              variant="outline"
              onClick={() => openCrosspost("devto")}
            >
              <Send className="mr-1.5 h-3.5 w-3.5" />
              Dev.to
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => openCrosspost("reddit")}
            >
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Reddit
            </Button>

            <div className="flex-1" />
            {message && (
              <span className="max-w-md truncate text-xs text-muted-foreground">
                {message}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Crosspost panel */}
      {selectedSlug && crosspostOpen && (
        <div className="border-t border-border/40 bg-muted/30">
          <div className="flex items-center gap-3 border-b border-border/20 px-4 py-2">
            <span className="text-sm font-medium">
              {crosspostPlatform === "devto" ? "Dev.to" : "Reddit"} Crosspost
            </span>

            <select
              value={crosspostStyle}
              onChange={(e) => setCrosspostStyle(e.target.value)}
              className="rounded-md border border-border/50 bg-background px-2 py-1 text-xs"
            >
              {STYLES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>

            {crosspostPlatform === "reddit" && (
              <Input
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                placeholder="subreddit"
                className="h-7 w-32 text-xs"
              />
            )}

            <Button
              size="sm"
              variant="secondary"
              onClick={handleGenerate}
              disabled={generating}
              className="text-xs"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              {generating ? "Generating..." : "Generate"}
            </Button>

            <div className="flex-1" />

            {message && (
              <span className="max-w-xs truncate text-xs text-muted-foreground">
                {message}
              </span>
            )}

            <Button
              size="sm"
              onClick={handlePost}
              disabled={posting || !crosspostDraft.trim()}
            >
              <Send className="mr-1 h-3 w-3" />
              {posting ? "..." : "Post"}
            </Button>

            <button
              onClick={() => setCrosspostOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex h-48 gap-0">
            <div className="flex flex-1 flex-col border-r border-border/20">
              <Input
                value={crosspostTitle}
                onChange={(e) => setCrosspostTitle(e.target.value)}
                placeholder="Title"
                className="h-8 rounded-none border-0 border-b border-border/20 text-sm font-medium"
              />
              <textarea
                value={crosspostDraft}
                onChange={(e) => setCrosspostDraft(e.target.value)}
                className="flex-1 resize-none bg-transparent p-3 font-mono text-xs text-foreground focus:outline-none"
                placeholder="Click Generate to create a draft..."
              />
            </div>
            <div className="w-1/2 overflow-y-auto whitespace-pre-wrap p-3 text-xs text-muted-foreground">
              {crosspostDraft || "Preview will appear here..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
