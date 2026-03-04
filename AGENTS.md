# naia.nextain.io — Agent Entry Point

## Context Loading (MUST read first)

1. `.agents/context/agents-rules.json` — Project rules (SoT)
2. `.agents/context/project-index.yaml` — Context index + mirroring rules

## On-demand Context

| Context | When to read |
|---------|-------------|
| `.agents/workflows/development-cycle.yaml` | Before any coding (ALWAYS) |
| `.agents/workflows/translation.yaml` | When requested to translate docs |

## Mirroring

Every `.agents/context/*.json` has a `.users/context/*.md` mirror (Korean, detailed).
When updating one side, update the other.

## Quick Reference

- **Brand Identity**: 
  - Company: Nextain (Next AI Networks)
  - Product: Naia OS
  - Tagline: The Next Generation AI OS
- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4
- **Package manager**: npm
- **Auth**: NextAuth.js v5 (Google + Discord OAuth)
- **Backend**: Next.js API Routes (BFF) → any-llm gateway
- **Deployment**: Vercel
- **Test**: Vitest + React Testing Library, integration-first TDD
- **Commits**: English, `<type>(<scope>): <description>`
- **Response language**: Korean

## Blog Posting Guide

### File Structure
- Posts: `public/posts/{slug}/index.{locale}.md` (e.g., `index.ko.md`, `index.en.md`)
- Images: same directory as the markdown file (e.g., `public/posts/{slug}/hero.ko.webp`)

### Frontmatter
```yaml
---
title: "Post title"
date: "2026-03-04T09:00:00+09:00"
summary: "Short description for list/OG"
tags: ["tag1", "tag2"]
author: "Name (https://github.com/username)"
hero: "hero.ko.webp"          # relative (→ /posts/{slug}/hero.ko.webp) or absolute (/path/to/img.webp)
---
```

### Image Markup in Markdown
- **Full width** (large, standalone): `![Alt text](filename.webp)`
- **Float right** (small, text wraps left): `![Alt text #float](filename.webp)`
  - `#float` marker is auto-removed from displayed alt/caption
  - Place image paragraph **before** the text that should wrap around it (right after heading)
- Relative paths resolve to `/posts/{slug}/filename`
- Absolute paths (`/path/to/img.webp`) and URLs used as-is
- Prefer `.webp` format (use `cwebp input.png -o output.webp -q 80`)

### OG Tags
- `og:title`, `og:description`, `og:image` auto-generated from frontmatter
- `hero` field → `og:image`

### Locale Strategy
- Korean (`index.ko.md`) first, then English (`index.en.md`)
- Hero per locale: `hero.ko.webp` / `hero.en.webp`
- Fallback: en → ko (if English file missing, Korean is shown)
