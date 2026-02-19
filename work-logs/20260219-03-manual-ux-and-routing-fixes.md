# 매뉴얼 UX/이미지 정합성 및 로컬 라우팅(3001) 수정

- **날짜**: 2026-02-19
- **상태**: done
- **담당**: luke + Codex

## 목표

- `/ko/manual/*` 페이지의 설명/이미지 정합성 개선
- 일반 사용자 기준으로 과도한 Gateway 노출 문구 제거
- 로컬 실행 시 `3001 -> 3000` 리다이렉트 문제 정리
- `docs-work-logs`에 섞여 있던 Cafelua 로그를 각 프로젝트 work-logs로 분리

## 완료

### 1) 매뉴얼 구조/UX 정리
- 목차 레이아웃 좌측 고정형(PC) + 모바일 접힘 구조 유지/조정
- 하단 "다음 목차" 링크 유지
- `main-screen`은 이미지 1장만 사용하도록 유지

### 2) 문구 정책 정리 (사용자 관점)
- `Alpha가 응답하지 않아요` → `AI 에이전트가 응답하지 않아요`로 변경
- 일반 사용자 대상 문서에서 `Gateway URL/Token` 수동 입력 요구 제거
- 자체 Gateway 운영자(고급 사용자)만 수동 확인하도록 분리 문구 적용

적용 파일:
- `src/content/manual/ko/settings.md`
- `src/content/manual/en/settings.md`
- `src/content/manual/ko/tools.md`
- `src/content/manual/en/tools.md`
- `src/content/manual/ko/troubleshooting.md`
- `src/content/manual/en/troubleshooting.md`

### 3) Skills 문서 보강
- 스킬 출처(내장/로컬 manifest 경로) 명시
- 커스텀 스킬 추가 방법 단계화
- OpenClaw + cron 자동화 시나리오 추가
- 메신저 채널 설정(권장 Slack/Discord) 및 Telegram은 고급 옵션으로 분리
- 메신저 연동 내용은 "향후 계획(로드맵)"임을 명시

적용 파일:
- `src/content/manual/ko/skills.md`
- `src/content/manual/en/skills.md`

### 4) 채팅 페이지 이미지 정합성 수정
- 사용자 지적 반영: `chat-text.png` 중복 노출 제거를 위해
  - 음성 채팅 섹션의 이미지 제거(텍스트 섹션 1장만 유지)

적용 파일:
- `src/content/manual/ko/chat.md`

### 5) 사용하지 않는 이미지 정리
- `tabs-layout.png` (ko/en) 삭제

삭제 파일:
- `public/manual/ko/tabs-layout.png`
- `public/manual/en/tabs-layout.png`

### 6) 빌드/실행 점검
- `npm run build` 반복 검증 통과
- `next start -p 3001` 재기동 반복 수행

### 7) 3001 리다이렉트 원인 확인 및 수정
- 원인: `AUTH_URL`이 `http://localhost:3000`으로 되어 있어 callback cookie가 3000으로 설정됨
- 조치:
  - `.env`의 `AUTH_URL`을 `http://localhost:3001`로 수정
  - 서버 재기동 시 `AUTH_URL=http://localhost:3001` 주입하여 실행

적용 파일:
- `.env`

### 8) 작업 로그 저장소 분리 정책 실행
- `docs-work-logs`의 Cafelua 관련 로그를 프로젝트별 `work-logs`로 이동
  - `cafelua-os/work-logs/`
  - `project-lab.cafelua.com/work-logs/`
  - `cafelua.com/work-logs/`

## 확인 메모

- 일부 시점에서 3001 포트를 다른 프로세스가 점유/재사용하며 구 빌드 응답이 섞여 보이는 현상이 있었음
- 동일 증상 재발 시:
  1. `next start -p 3001` 단일 프로세스만 실행되도록 정리
  2. `AUTH_URL=http://localhost:3001`로 재기동
  3. 브라우저 강력 새로고침 및 localhost 쿠키 정리

## 다음 작업 (완료)

- ✅ chat 페이지 ko/en 이미지 매핑 최종 검증 — en/chat.md에서 chat-voice.png 제거, ko와 동기화
- ✅ getting-started.md ko/en: 누락된 온보딩 이미지 3개 추가 (user-name, personality, complete)
- ✅ lab.md ko/en: API 키 섹션 + lab-keys.png 이미지 추가
- ✅ 전체 커밋 완료 (`eeab75a`)
- (보류) Gateway URL/Token 고급 섹션 접기 — 실제 Shell UI 변경은 별도 이슈로 분리
