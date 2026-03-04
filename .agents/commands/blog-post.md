---
description: Complete blog post workflow — from draft to SEO-ready, 14-locale publication
argument-hint: "[topic or source material]"
---

# Blog Post Skill (`/blog-post`)

End-to-end workflow for creating, reviewing, translating, and publishing a blog post on naia.nextain.io.

## When to Use
- User wants to write a new blog post
- User provides a topic, draft text, or source material to turn into a post
- User wants to translate an existing Korean post into all supported locales

## Prerequisites
- Read `AGENTS.md` (Blog Posting Guide section)
- Read `.agents/workflows/translation.yaml` (for Step 5)
- Confirm `GEMINI_API_KEY` is available in `.env` (needed for translation script)

## Workflow

### Step 1: Draft (Korean)
1. Receive topic/source material from user
2. Determine slug: `YYYYMMDD-{descriptive-slug}` (use today's date, lowercase kebab-case)
3. Create directory: `public/posts/{slug}/`
4. Create `public/posts/{slug}/index.ko.md` with frontmatter:

```yaml
---
title: "Post title in Korean"
date: "YYYY-MM-DDTHH:MM:SS+09:00"
summary: "1-2 sentence description for listing and OG tags"
tags: ["tag1", "tag2"]
author: "Luke (https://github.com/cafelua)"
hero: "hero.ko.webp"
---
```

5. Write body content in Korean

### Step 2: Markdown Conventions
Follow these rules when writing markdown content:

| Pattern | Usage | Notes |
|---------|-------|-------|
| `![Alt text](file.webp)` | Full-width image | Standalone paragraph |
| `![Alt text #float](file.webp)` | Float-right small image | Place **before** text that wraps around it |
| Relative path `file.webp` | Auto-resolves to `/posts/{slug}/file.webp` | |
| Absolute path `/path/to/img.webp` | Used as-is | |
| URL `https://...` | Used as-is | |
| Manual images | `/manual/{locale}/image.png` | Locale-specific paths |

- Image format: `.webp` preferred (`cwebp input.png -o output.webp -q 80`)
- All images stored in post directory: `public/posts/{slug}/`
- `#float` marker is auto-stripped from displayed alt text

### Step 3: Review
1. Ask user to check on localhost (`npm run dev`)
2. Collect feedback on: title, tone, image placement, content accuracy
3. Apply feedback
4. If post is split into parts (Part 1/2), verify tone consistency across parts

### Step 4: Images
1. **Hero images**:
   - Korean: `hero.ko.webp`
   - English/others: `hero.en.webp`
2. Convert all images to webp: `cwebp input.png -o output.webp -q 80`
3. Manual-sourced images: use locale-specific paths `/manual/{locale}/`
4. Place all post images in `public/posts/{slug}/`

### Step 5: Translation (14 Locales)
After Korean (`index.ko.md`) is finalized, translate to 13 additional locales:
`en, ja, zh, fr, de, ru, es, ar, hi, bn, pt, id, vi`

**Method**: Follow `.agents/workflows/translation.yaml` — use Node.js script with `@google/generative-ai` SDK (gemini-2.5-flash).

**Translation rules**:
- Translate: `title`, `summary`, body content
- Keep unchanged: `tags`, `author`, `date`
- Do NOT translate: technical terms, project names (Naia OS, Nextain, etc.)
- Preserve `#float` marker in image references
- Internal links: convert to `/{locale}/blog/...` format
- Hero field: Korean uses `hero.ko.webp`, all others use `hero.en.webp`
- Manual images: change path to `/manual/{locale}/`

**Parallel groups** (4 groups to respect rate limits):
1. `en, ja, zh`
2. `fr, de, ru, es`
3. `ar, hi, bn`
4. `pt, id, vi`

Output files: `public/posts/{slug}/index.{locale}.md`

### Step 6: OG Tags / SEO (Automatic)
The blog system auto-generates metadata from frontmatter. Verify these are correct:

| Tag | Source |
|-----|--------|
| `og:title` | frontmatter `title` |
| `og:description` | frontmatter `summary` |
| `og:image` | frontmatter `hero` (resolved to absolute URL) |
| `og:locale` | URL `[lang]` segment |
| `og:type` | `article` |
| `twitter:card` | `summary_large_image` (if hero exists) |
| `hreflang` | Auto-generated for SEO_LOCALES (en, ko, ja) in `alternates.languages` |
| JSON-LD | `BlogPosting` schema (headline, description, image, datePublished, author, publisher) |

### Step 7: Verification
1. Run `npm run build` — must succeed with zero errors
2. Spot-check URLs: `/{lang}/blog/{slug}` for at least ko, en, ja
3. Verify OG tags in browser DevTools (`<head>` tag inspection)
4. Confirm post appears in blog listing page (`/{lang}/blog`)

## Checklist
```
- [ ] Korean draft written (index.ko.md)
- [ ] User review completed
- [ ] Images converted to webp and placed in post directory
- [ ] Hero images: hero.ko.webp + hero.en.webp
- [ ] 14 locale translations created
- [ ] Manual image paths updated per locale in translated files
- [ ] `npm run build` succeeds
- [ ] OG tags verified
- [ ] Post appears in sitemap
```

## Key Files
| File | Purpose |
|------|---------|
| `public/posts/{slug}/index.{locale}.md` | Blog post content per locale |
| `public/posts/{slug}/hero.{ko,en}.webp` | Hero images |
| `src/app/[lang]/(public)/blog/[slug]/page.tsx` | Blog post page (metadata + JSON-LD) |
| `src/app/[lang]/(public)/blog/page.tsx` | Blog listing page |
| `src/lib/posts.ts` | Post loading/parsing utilities |
| `src/app/sitemap.ts` | Sitemap generation |
| `src/i18n/config.ts` | SUPPORTED_LOCALES (14), SEO_LOCALES (en, ko, ja) |
| `.agents/workflows/translation.yaml` | Translation workflow reference |

## Notes
- SEO_LOCALES (en, ko, ja) are included in sitemap and hreflang; other locales are served but not indexed
- Fallback chain: missing locale file falls back to Korean
- `generateStaticParams` generates pages for ALL 14 locales x all slugs at build time
- Always write Korean first — it is the source of truth for content

---

## Mirroring Policy
`.agents/`와 `.users/`는 1:1 미러링 구조입니다.
- 이 파일 수정 시 `.users/commands/blog-post.md`도 동일하게 업데이트
- `.agents/`는 영어(토큰 효율), `.users/`는 사용자/팀 언어(상세 설명)
