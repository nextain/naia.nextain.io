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
  /** URL to manually submit content (for platforms that block automation) */
  submitUrl?: string;
}

const CROSSPOST_TARGETS: CrosspostTarget[] = [
  // Blog — original content (Naver/Velog/CafeLua KO, Dev.to EN)
  { id: "naver", platform: "naver", label: "네이버", group: "blog", type: "original", lang: "ko", submitUrl: "https://blog.naver.com/fstory97/postwrite" },
  { id: "velog", platform: "velog", label: "Velog", group: "blog", type: "original", lang: "ko", submitUrl: "https://velog.io/write" },
  { id: "cafelua-ko", platform: "cafelua", label: "CafeLua (KO)", group: "blog", type: "original", lang: "ko" },
  { id: "cafelua-en", platform: "cafelua", label: "CafeLua (EN)", group: "blog", type: "original", lang: "en" },
  { id: "devto", platform: "devto", label: "Dev.to", group: "blog", type: "original", lang: "en" },
  // Luke social (Facebook, LinkedIn)
  { id: "facebook-ko", platform: "facebook", label: "Facebook (KO)", group: "luke", type: "ai", style: "luke", lang: "ko" },
  { id: "facebook-en", platform: "facebook", label: "Facebook (EN)", group: "luke", type: "ai", style: "luke", lang: "en" },
  { id: "linkedin-ko", platform: "linkedin", label: "LinkedIn (KO)", group: "luke", type: "ai", style: "luke", lang: "ko" },
  { id: "linkedin-en", platform: "linkedin", label: "LinkedIn (EN)", group: "luke", type: "ai", style: "luke", lang: "en" },
  // Naia social (Reddit, X, Instagram)
  { id: "reddit-opensource", platform: "reddit", label: "r/opensource", group: "naia", type: "ai", style: "naia", subreddit: "opensource", submitUrl: "https://www.reddit.com/r/opensource/submit?type=text" },
  { id: "reddit-locallama", platform: "reddit", label: "r/LocalLLaMA", group: "naia", type: "ai", style: "naia", subreddit: "LocalLLaMA", submitUrl: "https://www.reddit.com/r/LocalLLaMA/submit?type=text" },
  { id: "reddit-programming", platform: "reddit", label: "r/programming", group: "naia", type: "ai", style: "naia", subreddit: "programming", submitUrl: "https://www.reddit.com/r/programming/submit?type=text" },
  { id: "x-ko", platform: "x", label: "X (KO)", group: "naia", type: "ai", style: "naia", lang: "ko" },
  { id: "x-en", platform: "x", label: "X (EN)", group: "naia", type: "ai", style: "naia", lang: "en" },
  { id: "instagram-ko", platform: "instagram", label: "Insta (KO)", group: "naia", type: "ai", style: "naia", lang: "ko", submitUrl: "https://www.instagram.com/" },
  { id: "instagram-en", platform: "instagram", label: "Insta (EN)", group: "naia", type: "ai", style: "naia", lang: "en", submitUrl: "https://www.instagram.com/" },
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
  const [showImageModal, setShowImageModal] = useState(false);
  const [editingImage, setEditingImage] = useState<{ defaultImg: string; koImg: string } | null>(null);
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
  const [drafts, setDraftsRaw] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined" || !slugParam) return {};
    try { return JSON.parse(localStorage.getItem(`crosspost-drafts-${slugParam}`) ?? "{}"); } catch { return {}; }
  });
  const setDrafts: typeof setDraftsRaw = (updater) => {
    setDraftsRaw((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (selectedSlug) localStorage.setItem(`crosspost-drafts-${selectedSlug}`, JSON.stringify(next));
      return next;
    });
  };
  const [crosspostTitle, setCrosspostTitle] = useState("");
  const [generating, setGenerating] = useState<Record<string, boolean>>({});
  const [posting, setPosting] = useState(false);
  const [postingStatus, setPostingStatus] = useState<Record<string, "posting" | "done" | "fail" | "copied">>({});
  const [koPreview, setKoPreview] = useState<Record<string, string>>({});
  const [koPreviewLoading, setKoPreviewLoading] = useState<Record<string, boolean>>({});
  const [publishedUrls, setPublishedUrlsRaw] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined" || !slugParam) return {};
    try { return JSON.parse(localStorage.getItem(`crosspost-urls-${slugParam}`) ?? "{}"); } catch { return {}; }
  });
  const setPublishedUrls = (updater: Record<string, string> | ((prev: Record<string, string>) => Record<string, string>)) => {
    setPublishedUrlsRaw((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (selectedSlug) localStorage.setItem(`crosspost-urls-${selectedSlug}`, JSON.stringify(next));
      return next;
    });
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isDirty = content !== originalContent;
  const selectedPost = posts.find((p) => p.slug === selectedSlug);
  const missingLocales = ALL_LOCALES.filter((l) => !existingLocales.includes(l));
  const allLocalesReady = missingLocales.length === 0;
  const currentHero = content.match(/^---[\s\S]*?hero:\s*"([^"]*)"[\s\S]*?---/)?.[1] ?? "";
  const currentSummary = content.match(/^---[\s\S]*?summary:\s*"((?:[^"\\]|\\.)*)"/)?.[1]?.replace(/\\"/g, '"') ?? "";

  const [generatingSummary, setGeneratingSummary] = useState(false);

  const handleSummaryChange = (newSummary: string) => {
    const escaped = newSummary.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    setContent((prev) => {
      const lines = prev.split("\n");
      const idx = lines.findIndex((l) => l.startsWith("summary:"));
      if (idx !== -1) lines[idx] = `summary: "${escaped}"`;
      return lines.join("\n");
    });
  };

  const handleGenerateSummary = async () => {
    if (!content.trim() || generatingSummary) return;
    setGeneratingSummary(true);
    try {
      const res = await fetch("/api/admin/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.replace(/^---[\s\S]*?---\s*/, ""), lang: locale }),
      });
      const data = await res.json();
      if (res.ok && data.summary) {
        handleSummaryChange(data.summary);
        showMsg("Summary generated");
      } else {
        showMsg(`Summary failed: ${data.error}`);
      }
    } catch {
      showMsg("Summary generation failed");
    } finally {
      setGeneratingSummary(false);
    }
  };

  const handlePreviewImageClick = (e: React.MouseEvent) => {
    const img = (e.target as HTMLElement).closest("img");
    if (!img) return;
    const src = img.getAttribute("src") ?? "";
    const lines = content.split("\n");
    const imgRe = /^!\[([^\]]*)\]\(([^)]+)\)(<!--\s*(\w+)\s*-->)?/;
    let targetIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(imgRe);
      if (m && src.endsWith(m[2])) { targetIdx = i; break; }
    }
    if (targetIdx === -1) return;
    // Expand to consecutive image group
    let start = targetIdx, end = targetIdx;
    while (start > 0 && imgRe.test(lines[start - 1])) start--;
    while (end < lines.length - 1 && imgRe.test(lines[end + 1])) end++;
    let defaultImg = "", koImg = "";
    for (let i = start; i <= end; i++) {
      const m = lines[i].match(imgRe);
      if (m) {
        if (m[4] === "ko") koImg = m[2];
        else if (!m[4]) defaultImg = m[2];
      }
    }
    setEditingImage({ defaultImg, koImg });
    setShowImageModal(true);
  };

  const handleSetHero = (heroPath: string) => {
    const relPath = heroPath.replace(`/posts/${selectedSlug}/`, "");
    setContent((prev) => prev.replace(
      /^(---[\s\S]*?)(hero:\s*"[^"]*")([\s\S]*?---)/,
      (_, before, _old, after) => `${before}hero: "${relPath}"${after}`,
    ));
    showMsg(`Hero set: ${relPath}`);
  };

  const handleClearHero = () => {
    setContent((prev) => prev.replace(
      /^(---[\s\S]*?)(hero:\s*"[^"]*")([\s\S]*?---)/,
      (_, before, _old, after) => `${before}hero: ""${after}`,
    ));
    showMsg("Hero cleared");
  };

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

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", selectedSlug);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.path;
  };

  const handleImageModalUpload = async (defaultFile: File | null, koFile: File | null, featured: boolean) => {
    if (!selectedSlug || (!defaultFile && !koFile)) return;
    setUploading(true);
    const lines: string[] = [];
    let heroPath: string | null = null;
    try {
      if (defaultFile) {
        const p = await uploadFile(defaultFile);
        if (p) {
          lines.push(`![${defaultFile.name}](${p})`);
          if (featured) heroPath = p;
        }
      }
      if (koFile) {
        const p = await uploadFile(koFile);
        if (p) lines.push(`![${koFile.name}](${p})<!-- ko -->`);
      }
    } catch (err) {
      showMsg(err instanceof Error ? err.message : "Upload failed");
    }
    if (lines.length > 0) {
      let updated = content;
      // Update hero in frontmatter
      if (heroPath) {
        // Extract relative path (strip /posts/{slug}/ prefix for cleaner frontmatter)
        const relPath = heroPath.replace(`/posts/${selectedSlug}/`, "");
        updated = updated.replace(
          /^(---[\s\S]*?)(hero:\s*"[^"]*")([\s\S]*?---)/,
          (_, before, _old, after) => `${before}hero: "${relPath}"${after}`,
        );
      }
      const insert = lines.join("\n") + "\n";
      if (textareaRef.current) {
        const ta = textareaRef.current;
        const start = ta.selectionStart;
        const before = updated.slice(0, start);
        const after = updated.slice(ta.selectionEnd);
        setContent(before + insert + after);
      } else {
        setContent(updated + "\n" + insert);
      }
      showMsg(`Uploaded ${lines.length} image(s)${heroPath ? " + hero set" : ""}`);
    }
    setUploading(false);
    setShowImageModal(false);
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
    const CONCURRENCY = 4;
    for (let i = 0; i < targets.length; i += CONCURRENCY) {
      const batch = targets.slice(i, i + CONCURRENCY);
      setTranslateProgress((prev) => ({ ...prev, current: batch.map((l) => l.toUpperCase()).join(", ") }));
      const results = await Promise.allSettled(
        batch.map(async (lang) => {
          const res = await fetch("/api/admin/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: selectedSlug, sourceLang, targetLang: lang }),
          });
          if (!res.ok) {
            const data = await res.json();
            console.error(`Translate ${lang} failed:`, data.error);
            throw new Error(data.error);
          }
        }),
      );
      for (const r of results) {
        if (r.status === "fulfilled") succeeded++;
        else failed++;
      }
      setTranslateProgress((prev) => ({ ...prev, done: prev.done + batch.length }));
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

  const handlePostAll = async () => {
    if (!selectedSlug) return;
    const ready = CROSSPOST_TARGETS.filter((t) => drafts[t.id]?.trim());
    if (ready.length === 0) { showMsg("배포할 드래프트가 없습니다"); return; }
    if (!confirm(`${ready.length}개 채널에 배포합니다. 계속하시겠습니까?`)) return;
    setPosting(true);
    setPostingStatus({});
    const results: string[] = [];
    for (const target of ready) {
      const draft = drafts[target.id];
      setPostingStatus((p) => ({ ...p, [target.id]: "posting" }));
      setActiveTarget(target.id);
      try {
        if (target.platform === "devto") {
          const res = await fetch("/api/admin/crosspost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: selectedSlug, targets: ["devto"], overrideTitle: crosspostTitle, overrideBody: draft }),
          });
          const data = await res.json();
          if (res.ok && data.devto?.url) {
            results.push(`✓ Dev.to`);
            setPublishedUrls((p) => ({ ...p, [target.id]: data.devto.url }));
            setPostingStatus((p) => ({ ...p, [target.id]: "done" }));
          } else {
            results.push(`✗ Dev.to: ${data.error ?? "failed"}`);
            setPostingStatus((p) => ({ ...p, [target.id]: "fail" }));
          }
        } else if (target.platform === "reddit") {
          const sub = target.subreddit ?? "opensource";
          const res = await fetch("/api/admin/crosspost/social", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ platform: "reddit", text: draft, title: crosspostTitle, subreddit: sub }),
          });
          const data = await res.json();
          if (res.ok && data.ok) {
            results.push(`✓ r/${sub}`);
            if (data.url) setPublishedUrls((p) => ({ ...p, [target.id]: data.url }));
            setPostingStatus((p) => ({ ...p, [target.id]: "done" }));
          } else {
            results.push(`✗ r/${sub}: ${data.error ?? "failed"}`);
            setPostingStatus((p) => ({ ...p, [target.id]: "fail" }));
          }
        } else if (target.platform === "x") {
          const res = await fetch("/api/admin/crosspost/social", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ platform: "x", text: draft }),
          });
          const data = await res.json();
          if (res.ok && data.ok) {
            results.push(`✓ ${target.label}`);
            if (data.url) setPublishedUrls((p) => ({ ...p, [target.id]: data.url }));
            setPostingStatus((p) => ({ ...p, [target.id]: "done" }));
          } else {
            results.push(`✗ ${target.label}: ${data.error ?? "failed"}`);
            setPostingStatus((p) => ({ ...p, [target.id]: "fail" }));
          }
        } else if (["facebook", "linkedin", "instagram", "naver", "velog"].includes(target.platform)) {
          // Playwright-based platforms
          const res = await fetch("/api/admin/crosspost/social", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              platform: target.platform,
              text: draft,
              title: crosspostTitle,
              url: `https://naia.nextain.io/${target.lang ?? "en"}/blog/${selectedSlug}`,
            }),
          });
          const data = await res.json();
          if (res.ok && data.ok) {
            results.push(`✓ ${target.label}`);
            if (data.url) setPublishedUrls((p) => ({ ...p, [target.id]: data.url }));
            setPostingStatus((p) => ({ ...p, [target.id]: "done" }));
          } else {
            results.push(`✗ ${target.label}: ${data.error ?? "failed"}`);
            setPostingStatus((p) => ({ ...p, [target.id]: "fail" }));
          }
        } else {
          // CafeLua or unknown — copy to clipboard
          await navigator.clipboard.writeText(draft);
          results.push(`✓ ${target.label} (복사됨)`);
          setPostingStatus((p) => ({ ...p, [target.id]: "copied" }));
        }
      } catch {
        results.push(`✗ ${target.label}`);
        setPostingStatus((p) => ({ ...p, [target.id]: "fail" }));
      }
    }
    setPosting(false);
    // Show results in alert for visibility
    const done = results.filter((r) => r.startsWith("✓")).length;
    const failed = results.filter((r) => r.startsWith("✗")).length;
    alert(`배포 완료: ${done} 성공, ${failed} 실패\n\n${results.join("\n")}`);
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
    const url = `https://naia.nextain.io/${locale}/blog/${selectedSlug}`;
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
          let body = md.replace(/^---[\s\S]*?---\s*/, "");
          // Clean up locale markers and fix image paths
          body = body.replace(/^.*<!-- *(?:ko|en) *-->.*$/gm, "");
          body = body.replace(/\]\(\/posts\//g, "](https://naia.nextain.io/posts/");
          body = body.replace(/\n{3,}/g, "\n\n");
          body = body.trim();
          const lang = target.lang ?? "en";
          const blogUrl = `https://naia.nextain.io/${lang}/blog/${selectedSlug}`;
          const originalLink = lang === "ko"
            ? `*본 글은 [Naia 블로그](${blogUrl})에서 원본을 확인할 수 있습니다.*`
            : `*Originally published at [Naia Blog](${blogUrl})*`;
          setDrafts((prev) => ({ ...prev, [targetId]: originalLink + "\n\n---\n\n" + body + "\n\n---\n\n" + originalLink }));
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
          setKoPreview((prev) => { const next = { ...prev }; delete next[targetId]; return next; });
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

  const generateAll = async (force = false) => {
    if (!selectedSlug) return;
    if (selectedPost) setCrosspostTitle(selectedPost.title);
    await Promise.all(CROSSPOST_TARGETS.map((t) => {
      // Skip if draft already exists (unless force regenerate)
      if (!force && drafts[t.id]?.trim()) return Promise.resolve();
      return generateOne(t.id);
    }));
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
          setPublishedUrls((p) => ({ ...p, [activeTarget]: data.devto.url }));
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
    } else if (target.platform === "x") {
      if (!confirm(`X(@Naia_Nextain)에 트윗합니다. 계속하시겠습니까?`)) return;
      setPosting(true);
      try {
        const res = await fetch("/api/admin/crosspost/x", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: draft }),
        });
        const data = await res.json();
        if (res.ok && data.tweetUrl) {
          showMsg(`Tweet posted!`);
          setPublishedUrls((p) => ({ ...p, [activeTarget]: data.tweetUrl }));
          window.open(data.tweetUrl, "_blank");
        } else {
          showMsg(`Tweet failed: ${data.error ?? "Unknown error"}`);
        }
      } catch { showMsg("Tweet failed"); }
      finally { setPosting(false); }
    } else if (["facebook", "linkedin", "instagram", "naver", "velog"].includes(target.platform)) {
      // Playwright-based platforms
      if (!confirm(`${target.label}에 Playwright로 배포합니다. 계속하시겠습니까?`)) return;
      setPosting(true);
      try {
        const res = await fetch("/api/admin/crosspost/social", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            platform: target.platform,
            text: draft,
            title: crosspostTitle,
            url: `https://naia.nextain.io/${target.lang ?? "en"}/blog/${selectedSlug}`,
          }),
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          showMsg(`${target.label} posted!`);
          if (data.url) setPublishedUrls((p) => ({ ...p, [activeTarget]: data.url }));
        } else {
          showMsg(`${target.label} failed: ${data.error ?? "Unknown error"}`);
        }
      } catch { showMsg(`${target.label} failed`); }
      finally { setPosting(false); }
    } else {
      // CafeLua or unknown — copy to clipboard
      await navigator.clipboard.writeText(draft);
      showMsg(`${target.label} 초안이 클립보드에 복사되었습니다.`);
    }
  };

  const openCrosspost = () => {
    if (crosspostOpen) { setCrosspostOpen(false); return; }
    setCrosspostOpen(true);
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
          <button
            onClick={() => setShowImageModal(true)}
            disabled={uploading}
            className="flex items-center gap-1 rounded-md border border-border/50 px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
          >
            <ImagePlus className="h-3.5 w-3.5" />
            {uploading ? "..." : "Image"}
          </button>
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

      {/* Summary bar */}
      {selectedSlug && (
        <div className="flex gap-2 border-b border-border/40 px-4 py-1.5">
          <span className="shrink-0 pt-0.5 text-[10px] font-medium text-muted-foreground">Summary</span>
          <textarea
            value={currentSummary}
            onChange={(e) => handleSummaryChange(e.target.value.replace(/\n/g, " "))}
            onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
            placeholder="블로그 리스트 + OG description에 표시되는 요약"
            rows={2}
            className="flex-1 resize-none bg-transparent text-xs leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
          />
          <button
            onClick={handleGenerateSummary}
            disabled={generatingSummary || !content.trim()}
            className="shrink-0 self-start rounded border border-border/50 px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
          >
            <Sparkles className="mr-1 inline h-3 w-3" />
            {generatingSummary ? "..." : "AI 생성"}
          </button>
        </div>
      )}

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
            onClick={handlePreviewImageClick}
          >
            <div className="mx-auto max-w-3xl px-4 py-6 [&_img]:cursor-pointer">
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

      {/* Bottom bar — Step 1: Translate → Step 2: Deploy → Step 3: Verify → Step 4: Social */}
      {selectedSlug && !crosspostOpen && (
        <div className="border-t border-border/40 px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Step 1: Translate */}
            <div className="flex items-center gap-2">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${allLocalesReady ? "bg-green-500 text-white" : "bg-primary text-primary-foreground"}`}>1</span>
              <Button
                size="sm"
                variant={allLocalesReady ? "outline" : "default"}
                onClick={handleTranslateAll}
                disabled={translating || isDirty}
                title={isDirty ? "Save first" : `Translate from ${locale.toUpperCase()} to all other locales`}
              >
                <Languages className="mr-1.5 h-3.5 w-3.5" />
                {translating
                  ? `${translateProgress.current} ${translateProgress.done}/${translateProgress.total}`
                  : allLocalesReady ? "Re-translate" : "Translate All"}
              </Button>
              {!allLocalesReady && (
                <span className="text-[10px] text-destructive">
                  {missingLocales.length} locale missing
                </span>
              )}
            </div>

            <div className="mx-1 h-6 w-px bg-border/40" />

            {/* Step 2: Deploy */}
            <div className="flex items-center gap-2">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${deployed ? "bg-green-500 text-white" : allLocalesReady ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2</span>
              <Input
                value={commitMsg}
                onChange={(e) => setCommitMsg(e.target.value)}
                placeholder={`blog: update ${selectedSlug}`}
                className="max-w-xs text-sm"
              />
              <Button
                size="sm"
                onClick={handleDeploy}
                disabled={deploying || isDirty || !allLocalesReady}
              >
                <Rocket className="mr-1.5 h-3.5 w-3.5" />
                {deploying ? "..." : deployed ? "Re-deploy" : "Deploy"}
              </Button>
            </div>

            <div className="mx-1 h-6 w-px bg-border/40" />

            {/* Step 3: Verify */}
            <div className="flex items-center gap-2">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${verified ? "bg-green-500 text-white" : deployed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>3</span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleVerify}
                disabled={!selectedSlug}
              >
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                {verified ? "Verified" : "Verify"}
              </Button>
            </div>

            <div className="mx-1 h-6 w-px bg-border/40" />

            {/* Step 4: Social */}
            <div className="flex items-center gap-2">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${verified ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>4</span>
              <Button
                size="sm"
                variant={verified ? "default" : "outline"}
                onClick={openCrosspost}
                disabled={!selectedSlug}
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
                    {targets.map((t) => {
                      const ps = postingStatus[t.id];
                      return (
                        <button
                          key={t.id}
                          onClick={() => setActiveTarget(t.id)}
                          className={`rounded px-2 py-0.5 text-[11px] transition-colors ${
                            ps === "posting"
                              ? "animate-pulse bg-orange-500/30 text-orange-700 dark:text-orange-400"
                              : ps === "fail"
                                ? "bg-red-500/20 text-red-700 dark:text-red-400"
                                : activeTarget === t.id
                                  ? "bg-primary text-primary-foreground"
                                  : generating[t.id]
                                    ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                                    : publishedUrls[t.id]
                                      ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                                      : drafts[t.id]
                                        ? "bg-green-500/20 text-green-700 dark:text-green-400"
                                        : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {ps === "posting" ? "⏳ " : ps === "done" ? "✓ " : ps === "copied" ? "📋 " : ps === "fail" ? "✗ " : publishedUrls[t.id] ? "✓ " : ""}{t.label}
                          {generating[t.id] && " ..."}
                        </button>
                      );
                    })}
                    <div className="mx-1 h-3 w-px bg-border/30" />
                  </div>
                );
              })}
            </div>

            <div className="flex-1" />

            {(() => {
              const target = CROSSPOST_TARGETS.find((t) => t.id === activeTarget);
              const enId = target?.lang === "ko" ? activeTarget.replace(/-ko$/, "-en") : null;
              const hasCurrentDraft = drafts[activeTarget]?.trim();
              if (enId && hasCurrentDraft) return (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={async () => {
                    setGenerating((prev) => ({ ...prev, [enId]: true }));
                    try {
                      const res = await fetch("/api/admin/translate-text", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ text: drafts[activeTarget], targetLang: "en" }),
                      });
                      const data = await res.json();
                      if (res.ok && data.translated) {
                        setDrafts((prev) => ({ ...prev, [enId]: data.translated }));
                        showMsg(`${enId} 번역 완료`);
                      } else showMsg("Translation failed");
                    } catch { showMsg("Translation failed"); }
                    finally { setGenerating((prev) => ({ ...prev, [enId]: false })); }
                  }}
                  disabled={!!generating[enId]}
                  className="text-xs"
                >
                  <Languages className="mr-1 h-3 w-3" />
                  {generating[enId] ? "..." : "→EN 번역"}
                </Button>
              );
              return null;
            })()}

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
              variant="outline"
              onClick={() => { if (confirm("전체 채널을 재생성합니다. 편집한 내용이 덮어씌워집니다. 계속하시겠습니까?")) generateAll(true); }}
              disabled={Object.values(generating).some(Boolean)}
              className="text-xs"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Regenerate All
            </Button>

            {(() => {
              const target = CROSSPOST_TARGETS.find((t) => t.id === activeTarget);
              if (target?.submitUrl) {
                return (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (drafts[activeTarget]?.trim()) {
                        navigator.clipboard.writeText(drafts[activeTarget]);
                        showMsg("클립보드에 복사됨");
                      }
                      window.open(target.submitUrl, "_blank");
                    }}
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    {target.label} 열기 (수동)
                  </Button>
                );
              }
              return (
                <Button
                  size="sm"
                  onClick={handlePost}
                  disabled={posting || !drafts[activeTarget]?.trim()}
                >
                  <Send className="mr-1 h-3 w-3" />
                  {posting ? "..." : (() => {
                    const p = target?.platform;
                    return p === "devto" ? "Publish" : "배포";
                  })()}
                </Button>
              );
            })()}

            <Button
              size="sm"
              variant="default"
              onClick={handlePostAll}
              disabled={posting || Object.keys(drafts).length === 0}
            >
              <Rocket className="mr-1 h-3 w-3" />
              {posting ? "..." : "전체 배포"}
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
            {(() => {
              const target = CROSSPOST_TARGETS.find((t) => t.id === activeTarget);
              const isOriginal = target?.type === "original";
              const isKo = target?.lang === "ko";
              const showTitle = ["reddit", "devto", "velog"].includes(target?.platform ?? "");
              const needsRightPanel = !isOriginal && !isKo;
              return (
                <>
                  <div className="flex flex-1 flex-col border-r border-border/20">
                    {showTitle && (
                      <Input
                        value={crosspostTitle}
                        onChange={(e) => setCrosspostTitle(e.target.value)}
                        placeholder="Title"
                        readOnly={isOriginal}
                        className="h-8 rounded-none border-0 border-b border-border/20 text-sm font-medium"
                      />
                    )}
                    <textarea
                      value={drafts[activeTarget] ?? ""}
                      onChange={(e) => { if (!isOriginal) setDrafts((prev) => ({ ...prev, [activeTarget]: e.target.value })); }}
                      readOnly={isOriginal}
                      className={`flex-1 resize-none bg-transparent p-3 font-mono text-xs text-foreground focus:outline-none ${isOriginal ? "cursor-default opacity-70" : ""}`}
                      placeholder={generating[activeTarget] ? "Generating..." : "Click Regenerate or wait for auto-generation..."}
                    />
                  </div>
                  {(() => {
                    if (!needsRightPanel) return <div className="w-1/2" />;
              // Non-KO: editable Korean panel + KO→EN button
              const koId = target?.lang === "en" ? activeTarget.replace(/-en$/, "-ko") : null;
              const koText = koId ? (drafts[koId] ?? "") : (koPreview[activeTarget] ?? "");
              const setKoText = (val: string) => {
                if (koId) setDrafts((prev) => ({ ...prev, [koId]: val }));
                else setKoPreview((prev) => ({ ...prev, [activeTarget]: val }));
              };
              const translateKoToEn = async () => {
                if (!koText.trim()) return;
                setGenerating((prev) => ({ ...prev, [activeTarget]: true }));
                try {
                  const res = await fetch("/api/admin/translate-text", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: koText, targetLang: "en" }),
                  });
                  const data = await res.json();
                  if (res.ok && data.translated) {
                    setDrafts((prev) => ({ ...prev, [activeTarget]: data.translated }));
                    showMsg("KO→EN 번역 완료");
                  } else showMsg("Translation failed");
                } catch { showMsg("Translation failed"); }
                finally { setGenerating((prev) => ({ ...prev, [activeTarget]: false })); }
              };
              const translateEnToKo = async () => {
                if (!drafts[activeTarget]?.trim()) return;
                const tid = activeTarget;
                setKoPreviewLoading((p) => ({ ...p, [tid]: true }));
                try {
                  const res = await fetch("/api/admin/translate-text", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: drafts[tid], targetLang: "ko" }),
                  });
                  const data = await res.json();
                  if (res.ok && data.translated) setKoPreview((p) => ({ ...p, [tid]: data.translated }));
                } catch {}
                finally { setKoPreviewLoading((p) => ({ ...p, [tid]: false })); }
              };
              return (
                <div className="flex w-1/2 flex-col">
                  <div className="flex items-center gap-2 border-b border-border/20 px-3 py-1">
                    <button
                      onClick={translateKoToEn}
                      disabled={!koText.trim() || !!generating[activeTarget]}
                      className="rounded border border-border/50 px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                    >
                      {generating[activeTarget] ? "..." : "EN ← KO 적용"}
                    </button>
                    <span className="text-[10px] font-medium text-muted-foreground/70">한국어 {koId ? "버전" : "번역"}</span>
                    {!koId && (
                      <button
                        onClick={translateEnToKo}
                        disabled={!drafts[activeTarget]?.trim() || !!koPreviewLoading[activeTarget]}
                        className="ml-auto rounded border border-border/50 px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                      >
                        {koPreviewLoading[activeTarget] ? "..." : "EN→KO"}
                      </button>
                    )}
                  </div>
                  <textarea
                    value={koPreviewLoading[activeTarget] ? "한국어 번역 중..." : koText}
                    onChange={(e) => setKoText(e.target.value)}
                    disabled={!!koPreviewLoading[activeTarget]}
                    className="flex-1 resize-none bg-transparent p-3 font-mono text-xs text-foreground focus:outline-none"
                  />
                </div>
              );
            })()}
                </>
              );
            })()}
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-2 border-t border-border/20 px-4 py-1.5">
            <span className="text-[10px] text-muted-foreground">
              {Object.values(generating).filter(Boolean).length > 0
                ? `Generating ${Object.values(generating).filter(Boolean).length} drafts...`
                : `${Object.keys(drafts).length}/${CROSSPOST_TARGETS.length} drafts | ${Object.keys(publishedUrls).length} published`}
            </span>
            <div className="mx-1 h-3 w-px bg-border/30" />
            {publishedUrls[activeTarget] ? (
              <a
                href={publishedUrls[activeTarget]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] text-blue-600 hover:underline dark:text-blue-400"
              >
                <ExternalLink className="h-3 w-3" />
                {publishedUrls[activeTarget].length > 60
                  ? publishedUrls[activeTarget].slice(0, 60) + "..."
                  : publishedUrls[activeTarget]}
              </a>
            ) : (
              <input
                type="text"
                placeholder="배포 URL 입력..."
                className="flex-1 bg-transparent text-[10px] text-muted-foreground placeholder:text-muted-foreground/40 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) {
                      setPublishedUrls((p) => ({ ...p, [activeTarget]: val }));
                      (e.target as HTMLInputElement).value = "";
                      showMsg("URL saved");
                    }
                  }
                }}
              />
            )}
            {publishedUrls[activeTarget] && (
              <button
                onClick={() => setPublishedUrls((p) => { const next = { ...p }; delete next[activeTarget]; return next; })}
                className="text-[10px] text-muted-foreground hover:text-destructive"
              >
                ✕
              </button>
            )}
            <div className="flex-1" />
            {message && (
              <span className="max-w-xs truncate text-[10px] text-muted-foreground">
                {message}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Image upload modal */}
      {showImageModal && (
        <ImageUploadModal
          uploading={uploading}
          currentHero={currentHero}
          existingImages={editingImage}
          onUpload={handleImageModalUpload}
          onSetHero={handleSetHero}
          onClearHero={handleClearHero}
          onClose={() => { setShowImageModal(false); setEditingImage(null); }}
        />
      )}
    </div>
  );
}

function ImageUploadModal({
  uploading,
  currentHero,
  existingImages,
  onUpload,
  onSetHero,
  onClearHero,
  onClose,
}: {
  uploading: boolean;
  currentHero: string;
  existingImages: { defaultImg: string; koImg: string } | null;
  onUpload: (defaultFile: File | null, koFile: File | null, featured: boolean) => void;
  onSetHero: (path: string) => void;
  onClearHero: () => void;
  onClose: () => void;
}) {
  const [defaultFile, setDefaultFile] = useState<File | null>(null);
  const [koFile, setKoFile] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);

  const hasFile = defaultFile || koFile;
  const isEditing = existingImages && (existingImages.defaultImg || existingImages.koImg);
  const isHero = isEditing && existingImages.defaultImg && currentHero &&
    (currentHero === existingImages.defaultImg || existingImages.defaultImg.endsWith(currentHero));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg border border-border bg-background p-5 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">{isEditing ? "이미지 관리" : "이미지 업로드"}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Existing images (when clicking an image in preview) */}
          {isEditing && (
            <>
              <div className="space-y-2 rounded border border-border/50 bg-muted/20 p-3">
                {existingImages.defaultImg && (
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={existingImages.defaultImg} alt="" className="h-12 w-16 shrink-0 rounded border border-border/30 object-cover" />
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-[10px] text-muted-foreground">{existingImages.defaultImg}</span>
                      <span className="text-[10px] font-medium text-foreground">기본 (EN/공통)</span>
                    </div>
                  </div>
                )}
                {existingImages.koImg && (
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={existingImages.koImg} alt="" className="h-12 w-16 shrink-0 rounded border border-border/30 object-cover" />
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-[10px] text-muted-foreground">{existingImages.koImg}</span>
                      <span className="text-[10px] font-medium text-foreground">한국어</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Hero toggle for existing image */}
              {existingImages.defaultImg && (
                <button
                  onClick={() => {
                    if (isHero) onClearHero();
                    else onSetHero(existingImages.defaultImg);
                  }}
                  className={`w-full rounded border px-3 py-2 text-xs transition-colors ${
                    isHero
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isHero ? "Featured (Hero) 해제" : "Featured (Hero)로 설정"}
                </button>
              )}

              <div className="border-t border-border/30 pt-3">
                <span className="text-[10px] text-muted-foreground">새 이미지로 교체하려면 아래에서 업로드</span>
              </div>
            </>
          )}

          {/* Current hero (only when not editing) */}
          {!isEditing && currentHero && (
            <div className="flex items-center gap-2 rounded border border-border/50 bg-muted/30 px-3 py-2">
              <span className="flex-1 truncate text-xs">
                <span className="text-muted-foreground">Hero: </span>
                {currentHero}
              </span>
              <button
                onClick={onClearHero}
                className="shrink-0 text-[10px] text-destructive hover:underline"
              >
                제거
              </button>
            </div>
          )}

          {/* Default image upload */}
          <div>
            <div className="mb-1 flex items-center gap-2">
              <label className="text-xs text-muted-foreground">기본 이미지 (EN/공통)</label>
              {isEditing && existingImages?.defaultImg && (
                <span className="truncate text-[10px] text-foreground/60">{existingImages.defaultImg.split("/").pop()}</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setDefaultFile(e.target.files?.[0] ?? null)}
              className="w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-primary/10 file:px-2 file:py-1 file:text-xs file:text-primary"
            />
          </div>

          {/* Korean image upload */}
          <div>
            <div className="mb-1 flex items-center gap-2">
              <label className="text-xs text-muted-foreground">한국어 이미지 (선택)</label>
              {isEditing && existingImages?.koImg && (
                <span className="truncate text-[10px] text-foreground/60">{existingImages.koImg.split("/").pop()}</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setKoFile(e.target.files?.[0] ?? null)}
              className="w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-primary/10 file:px-2 file:py-1 file:text-xs file:text-primary"
            />
          </div>

          {/* Featured checkbox for new upload */}
          {!isEditing && (
            <label className="flex items-center gap-2 rounded border border-border/50 px-3 py-2">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-3.5 w-3.5 accent-primary"
              />
              <span className="text-xs">Featured (Hero) 이미지로 설정</span>
            </label>
          )}
          {!isEditing && featured && !defaultFile && (
            <p className="text-[10px] text-destructive">Hero에는 기본 이미지가 필요합니다</p>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={onClose}>
            {isEditing && !hasFile ? "닫기" : "취소"}
          </Button>
          {hasFile && (
            <Button
              size="sm"
              onClick={() => onUpload(defaultFile, koFile, featured)}
              disabled={uploading || (featured && !defaultFile)}
            >
              {uploading ? "업로드 중..." : "업로드"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
