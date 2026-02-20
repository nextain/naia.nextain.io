# 포털 구현 재개 (중간 점검)

- **날짜**: 2026-02-17
- **상태**: doing
- **담당**: luke + Codex

## PLAN

- 끊긴 구현 상태를 코드 기준으로 재점검
- 빌드 실패 원인 우선 복구 (home 컴포넌트 누락)
- 보호 페이지(usage/logs/keys/settings/billing) 구현 진행
- gateway 연동 함수/route 확장

## CHECK

- Google/Discord 로그인은 구현됨 (`[lang]/(auth)/login`)
- i18n 레이아웃, 사이드바, 테마, shadcn/ui 기본 구성 완료
- 빌드 실패 확인: `@/components/home/*` 모듈 누락
- 보호 페이지는 `dashboard`만 존재, 나머지 라우트는 미구현

## 진행 메모

- 다음 단계: home 섹션 컴포넌트 추가 후 빌드 오류 제거

## BUILD

### 완료
- [x] `src/components/home/*` 추가
  - hero, features, pricing, faq, section-reveal
- [x] 보호 페이지 추가
  - `[lang]/usage`, `[lang]/logs`, `[lang]/keys`, `[lang]/settings`, `[lang]/billing`
- [x] gateway client 확장
  - `listKeys`, `revokeKey`, `updateKey`, `getModelPricing`
- [x] BFF route 확장
  - `/api/gateway/balance`, `/api/gateway/logs`, `/api/gateway/keys`, `/api/gateway/keys/[keyId]`, `/api/gateway/pricing`
- [x] 오프라인 빌드 안정화
  - `next/font/google` 제거, 로컬 폰트 스택 사용

## VERIFY

- [x] `npm run lint` 통과
- [x] `npm run build` 통과
- [x] `npm run dev` 기동 확인 (20초 타임아웃으로 종료)
- [ ] 브라우저 수동 UI 점검 (사용자 환경에서 진행 필요)

## 현재 상태 요약

- 로그인/대시보드만 있던 상태에서 보호 영역 주요 페이지가 연결됨
- 홈(퍼블릭) 섹션 렌더링 누락 문제 해결
- 키 관리/과금/사용량 페이지의 기본 뼈대 및 서버 연동 준비 완료

## 다음 TODO

- usage 페이지 Recharts 시각화로 고도화
- logs 페이지 상세 펼침/필터 추가
- keys 페이지 만료 옵션/마스킹 UX 강화
- billing 페이지 LemonSqueezy 연동 및 webhook 구현
- middleware -> proxy 파일명 전환(Next.js 16 권장)

## 추가 개선

- 키 발급 직후 값 노출 방식을 URL 쿼리(`?created=<key>`)에서 HttpOnly 쿠키 + `?created=1`로 변경
- `npm run lint`, `npm run build` 재검증 통과

## 추가 요청 반영 PLAN (사용자 지시)

- 메인페이지를 NaN-OS 실제 서비스 정체성 기준으로 재구성
- LemonSqueezy 심사 대응 요소 추가
  - 빌링 페이지 결제/정책 안내
  - webhook 엔드포인트 스텁 + 서명 검증
- 심사 필수 정책/문의 페이지 추가
  - terms, privacy, refund, contact
- 기존 TODO 중 핵심 유지
  - usage Recharts, logs 필터/상세

## 추가 결정 (사용자 지시)

- nan.nextain.io 서비스는 우선 **Gemini 단일 프로바이더**로 운영
- OpenAI(ChatGPT)는 향후 확장 후보로만 표기
- 메인/FAQ/요금/빌링 문구에서 멀티 프로바이더 표현 제거

## BUILD (추가) — 하드코딩 제거 + 다국어 정리

### 완료
- [x] 사용자 노출 문구를 dictionary/i18n 데이터 참조로 정리
  - `common/header/auth/dashboard/keys/billing` 키 확장
  - `ko.ts`, `en.ts` 동시 반영
- [x] 정책 페이지 본문을 언어별 markdown 파일로 분리
  - `src/content/legal/ko/*.md`
  - `src/content/legal/en/*.md`
  - `src/lib/legal-docs.ts`로 서버에서 로드
  - `src/components/legal/legal-markdown.tsx`로 렌더링
- [x] 정책 페이지(`terms/privacy/refund/contact`)를 markdown 삽입 구조로 전환
- [x] Gemini 단일 운영 정책 반영
  - i18n 문구에서 xAI/Claude 노출 제거
  - `docker/config.yml` provider/pricing을 Gemini 중심으로 정리

## CONTEXT UPDATE

- [x] `.agents/context/agents-rules.json` 업데이트
  - `architecture.gateway.provider_policy: Gemini-first in nan.nextain.io`
- [x] `.users/context/agents-rules.md` 미러 반영
  - Gateway 연동 섹션에 Gemini 우선 운영 정책 추가

## VERIFY (추가)

- [x] `npm run lint` 통과
- [x] `npm run build` 통과
- [x] `/[lang]/terms`, `/[lang]/privacy`, `/[lang]/refund`, `/[lang]/contact` 정적 라우트 생성 확인

## BUILD (추가2) — 사용자 지시 반영 "하드코딩 전부 제거"

### 완료
- [x] 정책 페이지 본문을 언어별 markdown 분리 후 삽입 렌더링으로 전환
  - `src/content/legal/{ko,en}/{terms,privacy,refund,contact}.md`
  - `src/lib/legal-docs.ts`, `src/components/legal/legal-markdown.tsx`
- [x] `usage` 페이지 Recharts 기반 차트 구성
  - `src/components/usage/requests-chart.tsx`
  - `src/components/usage/tokens-chart.tsx`
  - `src/components/usage/spend-chart.tsx`
- [x] `logs` 페이지 필터/상세 테이블 구성
  - `src/components/logs/logs-table.tsx`
- [x] 사용자 노출 텍스트 i18n 키 참조로 정리
  - header/auth/callback/logs/dashboard/keys/pricing/billing
- [x] Gemini 단일 운영 기준으로 docker 설정 정리
  - `docker/config.yml`에서 xai/anthropic 제거

### CHECK 결과
- [x] `rg -i 'xai|grok|claude' src docker` 결과 0건 확인
- [x] `[lang]` 경로 및 컴포넌트의 사용자 문구 하드코딩 제거 확인

## VERIFY (추가2)

- [x] `npm run lint` 통과
- [x] `npm run build` 통과

## CLEAN (추가)

- [x] 비-locale 레거시 라우트 정리
  - `/`, `/login`, `/dashboard`, `/settings`, `/callback` → `/ko/*` 리다이렉트
- [x] i18n 강제 경로 유지로 하드코딩 노출 경로 제거

## VERIFY (최종)

- [x] `npm run lint` 재통과
- [x] `npm run build` 재통과

## BUILD (추가3) — 장문 콘텐츠 md 삽입 확장

### 사용자 지시
- "정책 페이지처럼 내용 많은 건 언어별 md 파일로 만들고 삽입"

### 완료
- [x] 홈 FAQ 장문 콘텐츠를 i18n dictionary에서 분리
  - 기존: `src/i18n/dictionaries/{ko,en}.ts` 내부 배열 하드코딩
  - 변경: `src/content/home/{ko,en}/faq.md` 언어별 markdown 원문
- [x] 홈 FAQ markdown 로더/파서 추가
  - `src/lib/home-docs.ts`
  - `## 질문` 헤더 기준으로 질문/답변 블록 파싱
- [x] 홈 페이지 FAQ 섹션을 md 주입 구조로 전환
  - `src/app/[lang]/(public)/page.tsx`에서 서버 로드
  - `src/components/home/faq.tsx`에서 accordion + markdown 렌더링
- [x] dictionary 타입/데이터 정리
  - `home.faq`는 `title`만 유지, 장문 본문 제거

## VERIFY (추가3)

- [x] `npm run lint` 통과
- [x] `npm run build` 통과
- [x] `npm run dev` 기동 확인 (20초 타임아웃)
- [ ] `npm test` 실행 불가 (현재 `package.json`에 `test` 스크립트 없음)

## CONTEXT UPDATE (추가2)

- [x] `.agents/context/agents-rules.json`에 장문 콘텐츠 규칙 추가
  - `coding_conventions.content.long_form_copy`
  - 원칙: 장문 사용자 문구는 `src/content/<section>/<locale>/*.md`로 분리 후 렌더링
- [x] `.users/context/agents-rules.md` 미러 반영
