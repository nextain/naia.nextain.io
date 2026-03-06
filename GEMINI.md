# naia.nextain.io

naia 서비스 포털. OAuth 로그인 + 크레딧 대시보드 + any-llm gateway 연동.

## 필수 읽기 (세션 시작 시)

1. `.agents/context/agents-rules.json` — 프로젝트 핵심 규칙 (SoT)
2. `.agents/context/project-index.yaml` — 컨텍스트 인덱스 + 미러링 규칙

## Dual-directory (컨텍스트 구조)

```
.agents/                    # AI용 (영어, JSON/YAML, 토큰 최적화)
├── context/
│   ├── agents-rules.json   # SoT ← 필수 읽기
│   └── project-index.yaml  # 인덱스 ← 필수 읽기
└── workflows/
    ├── development-cycle.yaml  # 코딩 전 필수
    └── translation.yaml        # 문서 번역 규칙

.users/                     # 사람용 (한국어, Markdown, 상세)
├── context/
│   └── agents-rules.md     # 규칙 상세 (미러)
└── workflows/
    ├── development-cycle.md
    └── translation.md
```

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (ThemeProvider, LemonSqueezy)
│   ├── [lang]/                 # i18n 동적 세그먼트 (ko, en)
│   │   ├── layout.tsx          # 언어 레이아웃 (LocaleProvider)
│   │   ├── (public)/           # 퍼블릭 (Header + Footer)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx        # 홈 (Hero, Features, Pricing, FAQ)
│   │   │   ├── terms/          # 이용약관
│   │   │   ├── privacy/        # 개인정보처리방침
│   │   │   ├── refund/         # 환불정책
│   │   │   └── contact/        # 문의
│   │   ├── (protected)/        # 인증 필요 (AuthHeader + Sidebar)
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/      # 크레딧 잔액 + 요약 + 빠른 링크
│   │   │   ├── usage/          # 사용량 차트 (Recharts, 7/30/90일)
│   │   │   ├── logs/           # 로그 테이블 (필터 + 페이지네이션)
│   │   │   ├── keys/           # API 키 관리 (생성/삭제)
│   │   │   ├── settings/       # 프로필 + 데스크톱 연결
│   │   │   └── billing/        # 플랜 비교 + LemonSqueezy 준비
│   │   └── (auth)/             # 인증 관련 (중앙 카드)
│   │       ├── layout.tsx
│   │       ├── login/          # OAuth (Google, Discord)
│   │       └── callback/       # 데스크톱 딥링크 리다이렉트
│   └── api/                    # BFF API Routes
│       ├── auth/               # NextAuth v5
│       ├── gateway/            # Gateway 프록시
│       │   ├── balance/        # GET — 크레딧 잔액
│       │   ├── keys/           # GET/POST — 키 목록/생성
│       │   ├── keys/[keyId]/   # DELETE — 키 삭제
│       │   ├── logs/           # GET — 사용 로그
│       │   ├── usage/          # GET — 사용량 통계
│       │   ├── pricing/        # GET — 모델 가격
│       │   └── desktop-key/    # POST — 데스크톱 키 발급
│       └── webhooks/
│           └── lemonsqueezy/   # POST — 결제 웹훅
├── components/
│   ├── ui/                     # shadcn/ui (button, card, badge 등)
│   ├── layout/                 # header, footer, auth-header, sidebar, mobile-nav
│   ├── home/                   # hero, features, pricing, faq, section-reveal
│   ├── usage/                  # requests-chart, tokens-chart, spend-chart
│   ├── logs/                   # logs-table
│   └── providers/              # theme-provider, locale-provider, query-provider
├── i18n/
│   ├── config.ts               # SUPPORTED_LOCALES (ko, en), DEFAULT_LOCALE
│   └── dictionaries/           # ko.ts, en.ts, types.ts, index.ts
├── content/                    # 마크다운 콘텐츠 (FAQ, 법적 문서)
│   ├── home/{lang}/faq.md
│   └── legal/{lang}/*.md
├── lib/
│   ├── auth.ts                 # NextAuth v5 설정 (Google + Discord)
│   ├── gateway-client.ts       # Gateway REST 클라이언트 (서버 전용)
│   ├── lemonsqueezy.ts         # LemonSqueezy 체크아웃 빌더
│   ├── home-docs.ts            # FAQ 마크다운 파서
│   ├── legal-docs.ts           # 법적 문서 마크다운 파서
│   └── utils.ts                # cn() 유틸리티
└── middleware.ts               # locale 감지 + auth 보호 + 리다이렉트
```

## 핵심 원칙

1. **얇은 클라이언트** — 실제 로직은 gateway(any-llm)에, 여기는 UI만
2. **BFF 패턴** — API Routes로 gateway 프록시 (클라이언트에 마스터키 노출 방지)
3. **데스크톱 연동** — `/callback` 페이지로 Naia OS에 키 전달
4. **i18n** — URL 기반 `[lang]` 세그먼트 (ko, en)

## 기술 스택

- **Next.js 16** (App Router, Server Components)
- **NextAuth v5** (Google + Discord OAuth)
- **shadcn/ui** + Tailwind CSS 4 (naia 브라운 테마)
- **Recharts** — 사용량 차트
- **next-themes** — 다크/라이트 모드
- **LemonSqueezy** — 결제 (준비 중, env 미설정 시 Coming Soon)

## 컨벤션 (요약)

- **한국어 응답**
- **커밋**: 영어, `<type>(<scope>): <description>`
- **TDD**: Integration-first (Vitest + React Testing Library)
- **패키지 매니저**: npm

## 개발 사이클

**코딩 전 반드시 읽기:** `.agents/workflows/development-cycle.yaml`

```
PLAN → CHECK → BUILD → VERIFY → CLEAN → COMMIT
```

## 작업 로그

- **위치**: `work-logs/`
- **형식**: `YYYYMMDD-{번호}-{주제}.md`
- **언어**: 한국어

## 주요 명령어

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run lint         # 린트
npm test             # 테스트
```
