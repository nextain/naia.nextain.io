---
description: 블로그 포스트 작성부터 SEO 완성까지의 전체 워크플로우
argument-hint: "[주제 또는 원문 자료]"
---

# 블로그 포스트 스킬 (`/blog-post`)

naia.nextain.io 블로그 포스트를 작성, 검수, 번역, 게시하는 전체 워크플로우입니다.

## 사용 시점
- 새 블로그 포스트를 작성할 때
- 주제, 초안, 원문 자료를 받아 포스트로 변환할 때
- 기존 한국어 포스트를 전체 지원 언어로 번역할 때

## 사전 준비
- `AGENTS.md`의 Blog Posting Guide 섹션 확인
- `.agents/workflows/translation.yaml` 확인 (5단계 번역용)
- `.env`에 `GEMINI_API_KEY` 설정 확인 (번역 스크립트에 필요)

## 워크플로우

### 1단계: 초안 작성 (한국어)
1. 사용자에게 주제/원문 자료를 받음
2. slug 결정: `YYYYMMDD-{설명적-슬러그}` (오늘 날짜, 소문자 kebab-case)
3. 디렉토리 생성: `public/posts/{slug}/`
4. `public/posts/{slug}/index.ko.md` 생성 (frontmatter 포함):

```yaml
---
title: "한국어 제목"
date: "YYYY-MM-DDTHH:MM:SS+09:00"
summary: "목록 및 OG 태그용 1-2문장 설명"
tags: ["태그1", "태그2"]
author: "Luke (https://github.com/cafelua)"
hero: "hero.ko.webp"
---
```

5. 본문 작성 (한국어)

### 2단계: 마크다운 작성법
마크다운 본문 작성 시 다음 규칙을 따릅니다:

| 패턴 | 용도 | 비고 |
|------|------|------|
| `![설명](파일명.webp)` | 전체 너비 이미지 | 독립 단락 |
| `![설명 #float](파일명.webp)` | 오른쪽 플로트 (작은 이미지) | 텍스트 **앞에** 배치 (텍스트가 왼쪽으로 감쌈) |
| 상대 경로 `파일명.webp` | 자동으로 `/posts/{slug}/파일명.webp`으로 해석 | |
| 절대 경로 `/path/to/img.webp` | 그대로 사용 | |
| URL `https://...` | 그대로 사용 | |
| 매뉴얼 이미지 | `/manual/{locale}/이미지명.png` | 언어별 다른 이미지 |

- 이미지 포맷: `.webp` 권장 (`cwebp input.png -o output.webp -q 80`)
- 모든 이미지는 포스트 디렉토리에 저장: `public/posts/{slug}/`
- `#float` 마커는 화면에 표시될 때 alt 텍스트에서 자동 제거됨

### 3단계: 검수
1. 사용자에게 localhost에서 확인 요청 (`npm run dev`)
2. 피드백 수집 항목: 제목, 본문 톤, 이미지 배치, 내용 정확성
3. 피드백 반영
4. Part 1/2 분할 시 톤 일관성 확인

### 4단계: 이미지 처리
1. **히어로 이미지**:
   - 한국어용: `hero.ko.webp`
   - 영어/기타: `hero.en.webp`
2. 모든 이미지를 webp로 변환: `cwebp input.png -o output.webp -q 80`
3. 매뉴얼에서 가져온 이미지: 언어별 경로 사용 `/manual/{locale}/`
4. 포스트 이미지는 모두 `public/posts/{slug}/`에 배치

### 5단계: 14개 언어 번역
한국어(`index.ko.md`) 완성 후 13개 언어로 번역:
`en, ja, zh, fr, de, ru, es, ar, hi, bn, pt, id, vi`

**방법**: `.agents/workflows/translation.yaml` 참조 -- Node.js 스크립트 + `@google/generative-ai` SDK (gemini-2.5-flash) 사용

**번역 규칙**:
- 번역 대상: `title`, `summary`, 본문 내용
- 유지 (번역 안 함): `tags`, `author`, `date`
- 기술 용어/프로젝트명 번역 안 함: Naia OS, Nextain 등
- 이미지 참조의 `#float` 마커 유지
- 내부 링크: `/{locale}/blog/...` 형식으로 변경
- hero 필드: 한국어는 `hero.ko.webp`, 나머지 전부 `hero.en.webp`
- 매뉴얼 이미지: `/manual/{locale}/`로 경로 변경

**병렬 그룹** (4개 그룹, API 속도 제한 고려):
1. `en, ja, zh`
2. `fr, de, ru, es`
3. `ar, hi, bn`
4. `pt, id, vi`

출력 파일: `public/posts/{slug}/index.{locale}.md`

### 6단계: OG 태그 / SEO (자동 처리)
블로그 시스템이 frontmatter에서 메타데이터를 자동 생성합니다. 다음 항목이 올바른지 확인:

| 태그 | 출처 |
|------|------|
| `og:title` | frontmatter `title` |
| `og:description` | frontmatter `summary` |
| `og:image` | frontmatter `hero` (절대 URL로 변환됨) |
| `og:locale` | URL의 `[lang]` 세그먼트 |
| `og:type` | `article` |
| `twitter:card` | `summary_large_image` (hero 있을 때) |
| `hreflang` | SEO_LOCALES (en, ko, ja)에 대해 `alternates.languages`에서 자동 생성 |
| JSON-LD | `BlogPosting` 스키마 (headline, description, image, datePublished, author, publisher) |

### 7단계: 완성 확인
1. `npm run build` 실행 -- 에러 없이 성공해야 함
2. URL 확인: `/{lang}/blog/{slug}` (최소 ko, en, ja)
3. 브라우저 개발자 도구에서 OG 태그 확인 (`<head>` 태그)
4. 블로그 목록 페이지에서 포스트 표시 확인 (`/{lang}/blog`)

## 체크리스트
```
- [ ] 한국어 초안 작성 (index.ko.md)
- [ ] 사용자 검수 완료
- [ ] 이미지 webp 변환 및 포스트 디렉토리에 배치
- [ ] 히어로 이미지: hero.ko.webp + hero.en.webp
- [ ] 14개 언어 번역 완료
- [ ] 번역 파일에서 매뉴얼 이미지 경로 각 언어별 변경
- [ ] `npm run build` 성공
- [ ] OG 태그 확인
- [ ] sitemap에 포함 확인
```

## 주요 파일
| 파일 | 용도 |
|------|------|
| `public/posts/{slug}/index.{locale}.md` | 언어별 블로그 포스트 내용 |
| `public/posts/{slug}/hero.{ko,en}.webp` | 히어로 이미지 |
| `src/app/[lang]/(public)/blog/[slug]/page.tsx` | 블로그 포스트 페이지 (메타데이터 + JSON-LD) |
| `src/app/[lang]/(public)/blog/page.tsx` | 블로그 목록 페이지 |
| `src/lib/posts.ts` | 포스트 로딩/파싱 유틸리티 |
| `src/app/sitemap.ts` | 사이트맵 생성 |
| `src/i18n/config.ts` | SUPPORTED_LOCALES (14개), SEO_LOCALES (en, ko, ja) |
| `.agents/workflows/translation.yaml` | 번역 워크플로우 참조 |

## 참고 사항
- SEO_LOCALES (en, ko, ja)만 sitemap과 hreflang에 포함; 나머지 언어는 제공되지만 인덱싱되지 않음
- 폴백: 해당 언어 파일 없으면 한국어로 폴백
- `generateStaticParams`는 빌드 시 14개 언어 x 전체 slug에 대해 페이지 생성
- 항상 한국어를 먼저 작성 -- 한국어가 콘텐츠의 원본(SoT)

---

## 미러링 정책
`.agents/`와 `.users/`는 1:1 미러링 구조입니다.
- 이 파일 수정 시 `.agents/commands/blog-post.md`도 동일하게 업데이트
- `.agents/`는 영어(토큰 효율), `.users/`는 한국어(상세 설명)
