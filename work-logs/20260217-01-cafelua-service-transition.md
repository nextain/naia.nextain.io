# Naia OS: API Key → 서비스 모드 전환

- **시작일**: 2026-02-17
- **상태**: 진행 중
- **담당**: luke + Claude

## 목표

NaN-OS 데스크톱 앱을 "사용자가 직접 API 키 입력" → "회원가입 + 크레딧 서비스" 모델로 전환

## 아키텍처 개요

```
  naia.com (게임 홈페이지)
      |  링크
      v
  naia.nextain.io (Next.js)              api.naia.com (any-llm gateway)
  - OAuth 로그인 (Google/Discord)  <---> - POST /v1/auth/login (JWT 발급)
  - 크레딧 대시보드                       - POST /v1/chat/completions (LLM 프록시)
  - 사용량 조회                           - 크레딧 차감 + 사용량 추적
      ^                                          |
      | deep link (naia://auth)               v
  NaN-OS (Tauri 데스크톱 앱)         Cloud SQL (PostgreSQL 16)
  - 서비스 모드: JWT로 gateway 호출      - users, credits, usage_logs
  - 로컬 모드: 기존 API Key 직접 사용    GCP naia-487703 / asia-northeast3
```

## GCP 인프라 구성 (naia-487703)

| 리소스 | 이름 | 상세 |
|--------|------|------|
| Cloud SQL | `naia-db` | PostgreSQL 16, db-f1-micro, asia-northeast3, IP: 34.50.57.134 |
| Database | `nan_gateway` | gateway 유저로 접근 |
| Artifact Registry | `naia` | asia-northeast3, Docker 이미지 저장 |
| Service Account | `naia-gateway@naia-487703.iam.gserviceaccount.com` | Cloud SQL Client + Secret Manager Accessor |
| Secret Manager | `db-password` | Cloud SQL gateway 유저 비밀번호 |
| Secret Manager | `gateway-master-key` | Gateway 관리자 키 |
| Secret Manager | `gateway-jwt-secret` | JWT 서명 키 |
| Secret Manager | `gemini-api-key` | Gemini API 키 |
| Cloud Run | `naia-gateway` (예정) | Gateway 서비스 |

## OAuth 인증 플로우

```
1. 사용자 → NaN-OS Settings → "로그인" 클릭
2. 시스템 브라우저 열림 → naia.nextain.io/login?callback_url=naia://auth&client_type=desktop
3. naia.nextain.io에서 Google/Discord OAuth 수행 (NextAuth.js)
4. OAuth 성공 → naia.nextain.io API Route → POST api.naia.com/v1/auth/login
   {provider: "google", email, name, avatar_url, provider_token}
5. Gateway: 유저 없으면 생성 + FREE plan 자동 부여 (가입 보너스 20크레딧)
6. Gateway → JWT (access_token + refresh_token) 발급
7. naia.nextain.io → redirect: naia://auth?code=<provider_token>
8. Tauri deep link 핸들러가 code 수신
9. NaN-OS → POST api.naia.com/v1/auth/token {code} → JWT 수신
10. JWT를 Tauri secure storage에 저장
11. 이후 Agent가 gateway에 요청 시 Authorization: Bearer <JWT> 사용
```

## Gateway 엔드포인트 (any-llm)

| 엔드포인트 | 메서드 | 용도 |
|-----------|--------|------|
| `/health` | GET | 헬스체크 |
| `/v1/auth/authorize` | GET | OAuth 리다이렉트 URL 생성 |
| `/v1/auth/login` | POST | 소셜 로그인 (유저 생성 + 크레딧 부여) |
| `/v1/auth/token` | POST | provider_token → JWT 교환 |
| `/v1/auth/refresh` | POST | JWT 갱신 (토큰 로테이션) |
| `/v1/auth/logout` | POST | 세션 종료 |
| `/v1/auth/me` | GET | 현재 유저 정보 |
| `/v1/chat/completions` | POST | LLM 프록시 (OpenAI 호환, 스트리밍) |
| `/v1/keys/*` | CRUD | 가상 API 키 관리 |
| `/v1/users/*` | CRUD | 유저 관리 (관리자) |
| `/v1/pricing/*` | CRUD | 모델 가격 관리 |

## 크레딧 시스템

### FREE Plan (careti.ai 동일)
- 가입 즉시 20 크레딧 ($2 상당) 지급 (BONUS, 만료 없음)
- 보유 크레딧 10 미만 시 매월 10 크레딧으로 자동 충전 (월 최소 10 보장)
- 30일 주기 갱신
- credits_per_usd = 10.0

### BASIC Plan ($10/월)
- 월 100 크레딧 기본 제공
- $10당 100 크레딧 추가 충전
- 보너스 없음

### 크레딧 차감 우선순위
1. BONUS (priority=1) — 보너스 크레딧 먼저 소진
2. SUBSCRIPTION (priority=2) — 구독 크레딧
3. TOPUP (priority=3) — 충전 크레딧 (미래)

### 비용 계산
```
cost = (standard_prompt_tokens / 1M) × input_price
     + (cached_tokens / 1M) × cached_price
     + (completion_tokens / 1M) × output_price
credits_charged = cost_usd × credits_per_usd (10)
```

## 모델 가격 설정

| 모델 | Input $/M | Output $/M | Cached $/M |
|------|-----------|------------|------------|
| gemini:gemini-2.5-flash | 0.15 | 0.60 | 0.04 |
| gemini:gemini-2.5-pro | 1.25 | 10.00 | 0.31 |
| gemini:gemini-2.0-flash | 0.10 | 0.40 | 0.03 |
| xai:grok-3-mini | 0.30 | 0.50 | - |
| xai:grok-3 | 3.00 | 15.00 | - |
| anthropic:claude-sonnet-4-5-20250929 | 3.00 | 15.00 | 0.30 |
| anthropic:claude-haiku-4-5-20251001 | 0.80 | 4.00 | 0.08 |

## NaN-OS 클라이언트 변경 (예정)

### 서비스 모드 vs 로컬 모드
- **서비스 모드**: JWT로 gateway 경유. API 키 불필요.
- **로컬 모드**: 기존 방식. 사용자 직접 API 키 입력.
- Settings UI에서 토글로 전환

### 수정 대상 파일
| 파일 | 변경 |
|------|------|
| `agent/src/providers/proxy.ts` | **신규** — OpenAI SDK로 gateway 프록시 |
| `agent/src/providers/types.ts` | serviceMode 필드 추가 |
| `agent/src/providers/factory.ts` | service → proxy 라우팅 분기 |
| `shell/src/lib/types.ts` | serviceMode 필드 추가 |
| `shell/src/lib/config.ts` | service 설정 + 토큰 갱신 |
| `shell/src/lib/auth-service.ts` | **신규** — 로그인/토큰 교환/갱신 |
| `shell/src/components/SettingsModal.tsx` | 모드 토글 + 로그인 UI |
| `shell/src/components/ChatPanel.tsx` | service 모드 분기 |
| `shell/src-tauri/tauri.conf.json` | `naia://` deep link 스킴 |
| `shell/src-tauri/src/lib.rs` | deep link 핸들러 |
| `shell/src-tauri/Cargo.toml` | tauri-plugin-deep-link 추가 |

### 모델명 매핑 (Agent → Gateway)
| 로컬 모드 | Gateway 형식 |
|-----------|-------------|
| `gemini-2.5-flash` | `gemini:gemini-2.5-flash` |
| `grok-3-mini` | `xai:grok-3-mini` |
| `claude-sonnet-4-5-20250929` | `anthropic:claude-sonnet-4-5-20250929` |

## 진행 상황

### Phase 0: GCP 인프라 — 완료 (2026-02-17)
- [x] GCP 프로젝트 확인 (naia-487703 기존 사용)
- [x] API 활성화 (Cloud Run, SQL Admin, Secret Manager, Artifact Registry)
- [x] Cloud SQL 인스턴스 생성 (naia-db, PostgreSQL 16)
- [x] Database + User 생성 (nan_gateway / gateway)
- [x] Secret Manager: db-password, master-key, jwt-secret, gemini-api-key
- [x] Service Account + IAM 권한 부여
- [x] Artifact Registry 생성 (naia, asia-northeast3)

### Phase 1: Gateway 배포 — 완료 (2026-02-17)
- [x] config.naia.yml 작성 (provider: gemini, xai, anthropic)
- [x] FREE/BASIC plan 시드 (careti.ai 동일: FREE=가입20+월10, BASIC=$10/월100)
- [x] Docker 빌드 + Cloud Run 배포 (v3)
- [ ] 도메인 매핑 (api.naia.com) — Cloud Run 도메인 매핑 필요, MVP에서는 Cloud Run URL 직접 사용
- [x] 헬스체크 검증 ✅
- [x] Gateway URL: `https://naia-gateway-789741003661.asia-northeast3.run.app`
- **발견 이슈**: naia.nextain.io auth가 `/v1/users` 호출 → 크레딧 미지급. `/v1/auth/login` 호출로 변경 필요

### Phase 2: naia.nextain.io 인증 수정 — 완료 (2026-02-17)
- [x] auth.ts: `/v1/users` → `/v1/auth/login` (socialLogin) 전환 → 크레딧 자동 지급 ✅
- [x] Google OAuth 로그인 검증 ✅
- [x] Discord OAuth redirect URI 추가 + 로그인 검증 ✅
- [x] 가입 시 20 크레딧 자동 부여 확인 ✅
- [x] LLM 채팅 (크레딧 차감) E2E 검증 ✅
- [x] Vercel 배포 (`https://project-labnancom.vercel.app`)
- [ ] naia.nextain.io 커스텀 도메인 연결 (Vercel)

### Phase 3: naia.nextain.io 풀 포털 구현 — 완료 (2026-02-17)

8-Phase 계획 기반 (careti.ai 수준):

- [x] **Phase 1**: shadcn/ui + 테마 (naia 브라운 톤, light/dark) + lucide-react
- [x] **Phase 2**: 레이아웃 시스템 — `[lang]/(public)`, `[lang]/(protected)`, `[lang]/(auth)`
  - AuthHeader, ProtectedSidebar, MobileNav, Header, Footer
- [x] **Phase 3**: i18n — `[lang]` URL 세그먼트 (ko/en), getDictionary, LocaleProvider, LanguageSwitcher
  - Middleware: locale 감지 (cookie → Accept-Language → default ko)
- [x] **Phase 4**: 퍼블릭 페이지 — Hero, Features, Pricing, FAQ (markdown FAQ 파싱)
- [x] **Phase 5**: 프로텍티드 — 대시보드, 사용량(Recharts 차트), 로그(필터+페이지네이션)
- [x] **Phase 6**: 프로텍티드 — 키 관리(CRUD+소유권 검증), 설정(프로필)
- [x] **Phase 7**: 빌링 — 플랜 비교, LemonSqueezy 준비(Coming Soon)
- [x] **Phase 8**: 정적 페이지 (terms, privacy, refund, contact)

### Phase 3.1: 코드 리뷰 + 버그 수정 — 완료 (2026-02-17)

발견된 버그 6건 수정:
- [x] 대시보드/빌링: `spend` → 실제 크레딧 잔액 표시 (getBalance API 추가)
- [x] Balance API route: getUser().spend → getBalance() (micro-dollars 변환)
- [x] logs-table: `log.model.toLowerCase()` null safety
- [x] Root layout: `<html lang="ko">` 하드코딩 제거
- [x] Usage API route: 에러 핸들링 추가
- [x] Gateway `/v1/profile/balance`: `user` 쿼리 파라미터 추가 (master key 호환)

E2E 테스트:
- [x] 퍼블릭 페이지 (ko/en): 200 ✅
- [x] Protected routes: login 리다이렉트 ✅
- [x] API 인증 가드: 401 ✅
- [x] 프로덕션 빌드: 성공 ✅

### Phase 4: NaN-OS 클라이언트 — 진행 중 (2026-02-19~)

> NaN-OS plan Phase 5 (Lab 통합)로 통합. 상세는 `NaN-OS/.agents/context/plan.yaml` Phase 5 참조.

- [ ] 5.1: Deep Link 핸들러 (tauri-plugin-deep-link, naia:// 스킴)
- [ ] 5.2: 인증 흐름 UI (OnboardingWizard Lab 로그인 + SettingsTab Lab 연결)
- [ ] 5.3: LLM 프록시 연동 (lab-proxy.ts, any-llm Gateway 경유)
- [ ] 5.4: 크레딧 잔액 표시 (CostDashboard 서버 잔액)
- [ ] 5.5: 테스트 (lab-auth.test.ts, lab-proxy.test.ts, E2E)

### Phase 5: 통합 테스트 + 배포 — 대기
- [x] 로컬 E2E (가입→크레딧→채팅→차감) ✅
- [ ] Gateway v5 재배포 (balance endpoint user 파라미터)
- [ ] Vercel 재배포 (프론트엔드 변경사항)
- [ ] 토큰 자동 갱신 테스트
- [ ] 크레딧 소진 에러 핸들링
- [ ] 모드 전환 테스트
