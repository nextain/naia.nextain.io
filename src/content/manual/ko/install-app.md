기존 리눅스에 Naia를 단독 앱으로 설치합니다. 모든 설치 파일은 **[다운로드 페이지](/ko/download)** 또는 **[itch.io](https://nextain.itch.io/naia)** 에서 받을 수 있습니다.

## 시스템 요구사항

- **OS**: Linux (Ubuntu, Fedora, Bazzite 등)
- **디스플레이**: Wayland 권장 (X11도 지원)
- Flatpak 설치 시 별도 런타임 설치 없이 바로 사용 가능합니다.

---

## Flatpak (권장)

가장 안전한 설치 방법입니다. 앱이 독립된 공간에서 실행되어 기존 시스템에 영향을 주지 않습니다.

[다운로드 페이지](/ko/download)에서 `.flatpak` 번들을 받아 터미널에서 설치합니다:

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **동작 방식**: Naia 앱은 독립된 공간에서 안전하게 실행됩니다. AI가 PC를 제어할 때만 필요한 권한을 사용합니다.

## 다른 형식

**AppImage**, **DEB** (Debian/Ubuntu), **RPM** (Fedora/RHEL)도 [다운로드 페이지](/ko/download)에서 받을 수 있습니다.

---

## (개발자용) Flatpak 로컬 빌드 방법

소스 코드에서 직접 Flatpak 샌드박스 앱을 묶어내려면 다음 절차를 따릅니다.

1. **Flatpak 빌더 설치**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder

   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **빌드 종속성(SDK) 추가**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **패키징 빌드 실행**
   프로젝트 루트 디렉토리(Naia-OS)에서 실행합니다.
   ```bash
   # build-dir에 컴파일 및 빌드 진행
   flatpak-builder --user --install --force-clean build-dir flatpak/io.nextain.naia.yml
   ```

4. **앱 실행**
   ```bash
   flatpak run io.nextain.naia
   ```

> **개발 참고:**
> Flatpak 내부에서 실행되는 AI 에이전트는 사용자의 호스트 환경을 조작하기 위해 `agent/src/gateway/tool-bridge.ts` 내부적으로 모든 `execute_command` 요청을 `flatpak-spawn --host bash -c ...` 형태로 래핑하여 처리합니다.
