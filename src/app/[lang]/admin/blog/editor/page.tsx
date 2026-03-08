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
  Languages,
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

interface CrosspostTarget {
  id: string;
  platform: string;
  label: string;
  group: "blog" | "luke" | "naia";
  type: "original" | "ai";
  style?: string;
  lang?: string;
  subreddit?: string;
}

const CROSSPOST_TARGETS: CrosspostTarget[] = [
  // Blog — original content (Dev.to publish, Velog clipboard)
  { id: "devto", platform: "devto", label: "Dev.to", group: "blog", type: "original", lang: "en" },
  { id: "velog", platform: "velog", label: "Velog", group: "blog", type: "original", lang: "ko" },
  // Luke social (Facebook, LinkedIn)
  { id: "facebook-ko", platform: "facebook", label: "Facebook (KO)", group: "luke", type: "ai", style: "luke", lang: "ko" },
  { id: "facebook-en", platform: "facebook", label: "Facebook (EN)", group: "luke", type: "ai", style: "luke", lang: "en" },
  { id: "linkedin-ko", platform: "linkedin", label: "LinkedIn (KO)", group: "luke", type: "ai", style: "luke", lang: "ko" },
  { id: "linkedin-en", platform: "linkedin", label: "LinkedIn (EN)", group: "luke", type: "ai", style: "luke", lang: "en" },
  // Naia social (Reddit, X, Instagram)
  { id: "reddit-opensource", platform: "reddit", label: "r/opensource", group: "naia", type: "ai", style: "naia", subreddit: "opensource" },
  { id: "reddit-locallama", platform: "reddit", label: "r/LocalLLaMA", group: "naia", type: "ai", style: "naia", subreddit: "LocalLLaMA" },
  { id: "reddit-programming", platform: "reddit", label: "r/programming", group: "naia", type: "ai", style: "naia", subreddit: "programming" },
  { id: "x-ko", platform: "x", label: "X (KO)", group: "naia", type: "ai", style: "naia", lang: "ko" },
  { id: "x-en", platform: "x", label: "X (EN)", group: "naia", type: "ai", style: "naia", lang: "en" },
  { id: "instagram-ko", platform: "instagram", label: "Insta (KO)", group: "naia", type: "ai", style: "naia", lang: "ko" },
  { id: "instagram-en", platform: "instagram", label: "Insta (EN)", group: "naia", type: "ai", style: "naia", lang: "en" },
];

const ALL_LOCALES = ["ko", "en", "ja", "zh", "fr", "de", "ru", "es", "pt", "vi", "id", "ar", "hi", "bn"];

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
  const [deployed, setDeployed] = useState(false);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [commitMsg, setCommitMsg] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [uploading, setUploading] = useState(false);
  const [imageLocale, setImageLocale] = useState("");
  const [existingLocales, setExistingLocales] = useState<string[]>([]);

  // Translation
  const [translating, setTranslating] = useState(false);
  const [translateProgress, setTranslateProgress] = useState<{ done: number; total: number; current: string }>({ done: 0, total: 0, current: "" });

  // New post
  const [newSlug, setNewSlug] = useState("");
  const [showNewPost, setShowNewPost] = useState(isNew);

  // Crosspost panel
  const [crosspostOpen, setCrosspostOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState("devto");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [crosspostTitle, setCrosspostTitle] = useState("");
  const [generating, setGenerating] = useState<Record<string, boolean>>({});
  const [posting, setPosting] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDirty = content !== originalContent;
  const selectedPost = posts.find((p) => p.slug === selectedSlug);
  const missingLocales = ALL_LOCALES.filter((l) => !existingLocales.includes(l));
  const allLocalesReady = missingLocales.length === 0;

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
          setExistingLocales(Object.keys(data.locales));
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
    if (selectedSlug && !showNewPost) {
      setExistingLocales([]);
      loadPost(selectedSlug);
    }
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
    const files = e.target.files;
    if (!files?.length || !selectedSlug) {
      showMsg("Select a post first");
      return;
    }
    setUploading(true);
    const lines: string[] = [];
    let uploaded = 0;
    for (const file of Array.from(files)) {
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
        const marker = imageLocale ? `<!-- ${imageLocale} -->` : "";
        lines.push(`![${file.name}](${data.path})${marker}`);
        uploaded++;
      } catch (err) {
        showMsg(err instanceof Error ? err.message : `Upload failed: ${file.name}`);
      }
    }
    if (lines.length > 0) {
      const insert = lines.join("\n") + "\n";
      if (textareaRef.current) {
        const ta = textareaRef.current;
        const start = ta.selectionStart;
        const before = content.slice(0, start);
        const after = content.slice(ta.selectionEnd);
        setContent(before + insert + after);
      } else {
        setContent(content + "\n" + insert);
      }
      showMsg(`Uploaded ${uploaded} file(s)${imageLocale ? ` (${imageLocale})` : ""}`);
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleTranslateAll = async () => {
    if (!selectedSlug || translating) return;
    const sourceLang = locale;
    const targets = ALL_LOCALES.filter((l) => l !== sourceLang);
    if (!confirm(`"${sourceLang}" 기준으로 ${targets.length}개 언어를 번역합니다. 계속하시겠습니까?`)) return;

    setTranslating(true);
    setTranslateProgress({ done: 0, total: targets.length, current: "" });

    let succeeded = 0;
    let failed = 0;
    for (const lang of targets) {
      setTranslateProgress((prev) => ({ ...prev, current: lang.toUpperCase() }));
      try {
        const res = await fetch("/api/admin/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: selectedSlug, sourceLang, targetLang: lang }),
        });
        if (res.ok) {
          succeeded++;
        } else {
          const data = await res.json();
          console.error(`Translate ${lang} failed:`, data.error);
          failed++;
        }
      } catch {
        failed++;
      }
      setTranslateProgress((prev) => ({ ...prev, done: prev.done + 1 }));
    }

    setTranslating(false);
    showMsg(`Translation done: ${succeeded} OK, ${failed} failed`);
    // Refresh existing locales
    try {
      const res = await fetch(`/api/admin/posts/${selectedSlug}`);
      if (res.ok) {
        const data = await res.json();
        setExistingLocales(Object.keys(data.locales));
      }
    } catch { /* ignore */ }
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
        setDeployed(true);
      } else {
        showMsg(`Deploy failed: ${data.error}`);
      }
    } catch {
      showMsg("Deploy failed");
    } finally {
      setDeploying(false);
    }
  };

  const handleVerify = () => {
    if (!selectedSlug) return;
    const url = `https://naia.nextain.io/en/blog/${selectedSlug}`;
    window.open(url, "_blank");
    setVerified(true);
    showMsg("URL opened — verify in browser");
  };

  const generateOne = async (targetId: string) => {
    if (!selectedSlug) return;
    const target = CROSSPOST_TARGETS.find((t) => t.id === targetId);
    if (!target) return;
    setGenerating((prev) => ({ ...prev, [targetId]: true }));
    try {
      if (target.type === "original") {
        const res = await fetch(`/api/admin/posts/${selectedSlug}`);
        if (res.ok) {
          const data = await res.json();
          const md = data.locales[target.lang ?? "en"] ?? data.locales["ko"] ?? "";
          setDrafts((prev) => ({ ...prev, [targetId]: md.replace(/^---[\s\S]*?---\s*/, "") }));
        } else {
          showMsg("Failed to load post content");
        }
      } else {
        const res = await fetch("/api/admin/crosspost/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: selectedSlug,
            platform: target.platform,
            style: target.style,
            subreddit: target.subreddit,
            lang: target.lang,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setDrafts((prev) => ({ ...prev, [targetId]: data.generated }));
        } else {
          showMsg(`Generate failed: ${data.error}`);
        }
      }
    } catch {
      showMsg("Generate failed");
    } finally {
      setGenerating((prev) => ({ ...prev, [targetId]: false }));
    }
  };

  const generateAll = async () => {
    if (!selectedSlug) return;
    if (selectedPost) setCrosspostTitle(selectedPost.title);
    await Promise.all(CROSSPOST_TARGETS.map((t) => generateOne(t.id)));
  };

  const handlePost = async () => {
    const target = CROSSPOST_TARGETS.find((t) => t.id === activeTarget);
    const draft = drafts[activeTarget];
    if (!selectedSlug || !draft?.trim() || !target) return;

    if (target.platform === "devto") {
      if (!confirm(`"${crosspostTitle}" 을(를) Dev.to에 발행합니다. 계속하시겠습니까?`)) return;
      setPosting(true);
      try {
        const res = await fetch("/api/admin/crosspost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: selectedSlug,
            targets: ["devto"],
            overrideTitle: crosspostTitle,
            overrideBody: draft,
          }),
        });
        const data = await res.json();
        if (res.ok && data.devto?.url) {
          showMsg(`Dev.to published: ${data.devto.url}`);
          window.open(data.devto.url, "_blank");
        } else {
          showMsg(`Post failed: ${data.error ?? "Unknown error"}`);
        }
      } catch { showMsg("Post failed"); }
      finally { setPosting(false); }
    } else if (target.platform === "reddit") {
      const sub = target.subreddit ?? "opensource";
      if (!confirm(`Reddit r/${sub}에 발행합니다. 계속하시겠습니까?`)) return;
      setPosting(true);
      try {
        const res = await fetch("/api/admin/crosspost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: selectedSlug,
            targets: ["reddit"],
            subreddit: sub,
            overrideTitle: crosspostTitle,
            overrideBody: draft,
          }),
        });
        const data = await res.json();
        if (res.ok && data.reddit?.submitUrl) {
          showMsg("Opening Reddit...");
          window.open(data.reddit.submitUrl, "_blank");
        } else {
          showMsg(`Post failed: ${data.error ?? "Unknown error"}`);
        }
      } catch { showMsg("Post failed"); }
      finally { setPosting(false); }
    } else {
      // Velog, Facebook, LinkedIn, X, Instagram — copy to clipboard
      await navigator.clipboard.writeText(draft);
      showMsg(`${target.label} 초안이 클립보드에 복사되었습니다.`);
    }
  };

  const openCrosspost = () => {
    setCrosspostOpen(true);
    setDrafts({});
    setActiveTarget("devto");
    if (selectedPost) setCrosspostTitle(selectedPost.title);
    // Auto-generate all
    setTimeout(() => generateAll(), 0);
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
          <option value="zh">ZH</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
          <option value="ru">RU</option>
          <option value="es">ES</option>
          <option value="pt">PT</option>
          <option value="vi">VI</option>
          <option value="id">ID</option>
          <option value="ar">AR</option>
          <option value="hi">HI</option>
          <option value="bn">BN</option>
        </select>

        {selectedSlug && (
          <button
            onClick={handleTranslateAll}
            disabled={translating || isDirty}
            className="flex items-center gap-1 rounded-md border border-border/50 px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
            title={isDirty ? "Save first" : `Translate from ${locale.toUpperCase()} to all other locales`}
          >
            <Languages className="h-3.5 w-3.5" />
            {translating
              ? `${translateProgress.current} ${translateProgress.done}/${translateProgress.total}`
              : "Translate All"}
          </button>
        )}

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
          <div className="flex items-center gap-0.5">
            <label className="flex cursor-pointer items-center gap-1 rounded-l-md border border-border/50 px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
              <ImagePlus className="h-3.5 w-3.5" />
              {uploading ? "..." : "Image"}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <select
              value={imageLocale}
              onChange={(e) => setImageLocale(e.target.value)}
              className="rounded-r-md border border-l-0 border-border/50 bg-background px-1 py-1 text-[10px]"
              title="Image locale (empty = all)"
            >
              <option value="">ALL</option>
              {ALL_LOCALES.map((l) => (
                <option key={l} value={l}>{l.toUpperCase()}</option>
              ))}
            </select>
          </div>
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
              <BlogMarkdown markdown={previewMarkdown} slug={selectedSlug} locale={locale} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar — Step 1: Deploy → Step 2: Verify → Step 3: Social */}
      {selectedSlug && !crosspostOpen && (
        <div className="border-t border-border/40 px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Step 1: Deploy */}
            <div className="flex items-center gap-2">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${deployed ? "bg-green-500 text-white" : "bg-primary text-primary-foreground"}`}>1</span>
              <Input
                value={commitMsg}
                onChange={(e) => setCommitMsg(e.target.value)}
                placeholder={`blog: update ${selectedSlug}`}
                className="max-w-sm text-sm"
              />
              <Button
                size="sm"
                onClick={handleDeploy}
                disabled={deploying || isDirty || !allLocalesReady}
                title={!allLocalesReady ? `Missing: ${missingLocales.map((l) => l.toUpperCase()).join(", ")}` : ""}
              >
                <Rocket className="mr-1.5 h-3.5 w-3.5" />
                {deploying ? "..." : deployed ? "Re-deploy" : "Deploy"}
              </Button>
              {!allLocalesReady && (
                <span className="text-[10px] text-destructive">
                  {missingLocales.length} locale missing
                </span>
              )}
            </div>

            <div className="mx-1 h-6 w-px bg-border/40" />

            {/* Step 2: Verify */}
            <div className="flex items-center gap-2">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${verified ? "bg-green-500 text-white" : deployed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2</span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleVerify}
                disabled={!deployed}
              >
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                {verified ? "Verified" : "Verify URL"}
              </Button>
              {deployed && !verified && (
                <a
                  href={`https://naia.nextain.io/en/blog/${selectedSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-primary underline"
                >
                  Open
                </a>
              )}
            </div>

            <div className="mx-1 h-6 w-px bg-border/40" />

            {/* Step 3: Social */}
            <div className="flex items-center gap-2">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${verified ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>3</span>
              <Button
                size="sm"
                variant={verified ? "default" : "outline"}
                onClick={openCrosspost}
                disabled={!verified}
              >
                <Send className="mr-1.5 h-3.5 w-3.5" />
                Social
              </Button>
            </div>

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
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-border/20 px-4 py-2">
            <span className="text-sm font-medium">Social Distribution</span>

            <div className="mx-2 h-4 w-px bg-border/40" />

            {/* Group labels + tabs */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {[
                { group: "blog", label: "Blog" },
                { group: "luke", label: "Luke" },
                { group: "naia", label: "Naia" },
              ].map(({ group, label }) => {
                const targets = CROSSPOST_TARGETS.filter((t) => t.group === group);
                return (
                  <div key={group} className="flex items-center gap-0.5">
                    <span className="mr-1 text-[10px] font-medium uppercase text-muted-foreground">{label}</span>
                    {targets.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTarget(t.id)}
                        className={`rounded px-2 py-0.5 text-[11px] transition-colors ${
                          activeTarget === t.id
                            ? "bg-primary text-primary-foreground"
                            : generating[t.id]
                              ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                              : drafts[t.id]
                                ? "bg-green-500/20 text-green-700 dark:text-green-400"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t.label}
                        {generating[t.id] && " ..."}
                      </button>
                    ))}
                    <div className="mx-1 h-3 w-px bg-border/30" />
                  </div>
                );
              })}
            </div>

            <div className="flex-1" />

            <Button
              size="sm"
              variant="secondary"
              onClick={() => generateOne(activeTarget)}
              disabled={!!generating[activeTarget]}
              className="text-xs"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              {generating[activeTarget] ? "..." : "Regenerate"}
            </Button>

            <Button
              size="sm"
              onClick={handlePost}
              disabled={posting || !drafts[activeTarget]?.trim()}
            >
              <Send className="mr-1 h-3 w-3" />
              {posting ? "..." : (() => {
                const p = CROSSPOST_TARGETS.find((t) => t.id === activeTarget)?.platform;
                return p === "reddit" ? "Open Reddit" : p === "devto" ? "Publish" : "Copy";
              })()}
            </Button>

            <button
              onClick={() => setCrosspostOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex h-52 gap-0">
            <div className="flex flex-1 flex-col border-r border-border/20">
              {["reddit", "devto", "velog"].includes(CROSSPOST_TARGETS.find((t) => t.id === activeTarget)?.platform ?? "") ? (
                <Input
                  value={crosspostTitle}
                  onChange={(e) => setCrosspostTitle(e.target.value)}
                  placeholder="Title"
                  className="h-8 rounded-none border-0 border-b border-border/20 text-sm font-medium"
                />
              ) : null}
              <textarea
                value={drafts[activeTarget] ?? ""}
                onChange={(e) => setDrafts((prev) => ({ ...prev, [activeTarget]: e.target.value }))}
                className="flex-1 resize-none bg-transparent p-3 font-mono text-xs text-foreground focus:outline-none"
                placeholder={generating[activeTarget] ? "Generating..." : "Click Regenerate or wait for auto-generation..."}
              />
            </div>
            <div className="w-1/2 overflow-y-auto whitespace-pre-wrap p-3 text-xs text-muted-foreground">
              {drafts[activeTarget] || (generating[activeTarget] ? "Generating..." : "Select a tab and generate...")}
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-2 border-t border-border/20 px-4 py-1.5">
            <span className="text-[10px] text-muted-foreground">
              {Object.values(generating).filter(Boolean).length > 0
                ? `Generating ${Object.values(generating).filter(Boolean).length} drafts...`
                : `${Object.keys(drafts).length}/${CROSSPOST_TARGETS.length} drafts ready`}
            </span>
            <div className="flex-1" />
            {message && (
              <span className="max-w-xs truncate text-[10px] text-muted-foreground">
                {message}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
