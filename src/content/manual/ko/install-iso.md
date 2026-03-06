Live USB로 부팅하여 하드 디스크에 Naia OS를 설치하고, Naia 앱이 실행되기까지의 전체 과정을 안내합니다.

## 준비물

- Naia OS ISO가 플래시된 USB 드라이브 (8GB 이상)
- 최근 10년 이내에 출시된 PC (대부분 호환됩니다)
- 64GB 이상의 디스크 공간

> [다운로드 페이지](/ko/download)에서 ISO를 받으세요.

---

## 부팅 USB 만들기

[다운로드 페이지](/ko/download)에서 Naia OS ISO를 받은 후, USB에 기록합니다.

**[balenaEtcher](https://etcher.balena.io)** 사용을 추천합니다 — Windows, macOS, Linux 모두 지원됩니다.

1. balenaEtcher를 다운로드하고 실행합니다.
2. **Flash from file** 을 클릭하고 Naia OS ISO 파일을 선택합니다.
3. **Select target** 을 클릭하고 USB 드라이브를 선택합니다.
4. **Flash!** 를 클릭하고 완료될 때까지 기다립니다.

> **주의**: USB 드라이브의 모든 데이터가 삭제됩니다. 중요한 파일은 미리 백업하세요.

## USB로 부팅 후 설치 시작

USB로 부팅하는 방법은 **[2. Naia OS 라이브 USB](/ko/manual/live-usb)** 를 참고하세요.

바탕화면 왼쪽 위에 **Install to Hard Drive** 라는 아이콘이 보입니다. 이 아이콘을 더블클릭하면 설치 화면이 열립니다.

## 1단계: 언어 및 키보드

![환영 화면](/images/manual/iso-install/01-welcome.png)

언어와 키보드 레이아웃을 선택합니다. 검색창에 입력하면 빠르게 찾을 수 있습니다 (예: "english" 또는 "한국어"). **Next** 를 클릭합니다.

## 2단계: 날짜 및 시간

![날짜와 시간](/images/manual/iso-install/02-datetime.png)

날짜, 시간, 시간대가 자동으로 감지됩니다. 필요하면 수정하세요. **Next** 를 클릭합니다.

## 3단계: 설치 방법

![설치 방법](/images/manual/iso-install/03-installation-method.png)

대상 디스크를 선택합니다. **"Use entire disk"** (전체 디스크 사용)가 권장 옵션입니다 — 선택한 디스크의 모든 기존 데이터가 삭제됩니다. **Next** 를 클릭합니다.

> **주의**: "Use entire disk"를 선택하면 해당 드라이브의 모든 데이터가 삭제됩니다. 중요한 파일은 미리 백업하세요.

## 4단계: 저장소 구성

![저장소 구성](/images/manual/iso-install/04-storage.png)

디스크 암호화를 선택할 수 있습니다. 잘 모르겠다면 체크하지 않고 넘어가세요. **Next** 를 클릭합니다.

## 5단계: 계정 생성

![계정 생성](/images/manual/iso-install/05-create-account.png)

이름, 사용자명, 비밀번호(6자 이상)를 입력합니다.

![계정 입력 완료](/images/manual/iso-install/05b-account-filled.png)

모든 필드에 녹색 체크마크가 표시되면 **Next** 를 클릭합니다.

## 6단계: 검토 및 설치

![검토](/images/manual/iso-install/06-review.png)

설정을 확인합니다 — 언어, 시간대, 계정 정보가 맞는지 살펴보세요. **Erase data and install** 을 클릭하면 설치가 시작됩니다.

## 설치 진행

![설치 중](/images/manual/iso-install/07-installing.png)

설치는 네 단계로 진행됩니다: 저장소 구성, 소프트웨어 설치, 시스템 구성, 마무리.

![설치 진행 중](/images/manual/iso-install/08-installing-progress.png)

> 하드웨어에 따라 보통 **10~30분** 정도 소요됩니다. "소프트웨어 설치" 단계가 가장 오래 걸리며, 이 단계에서 화면이 멈춘 것처럼 보일 수 있습니다. 이는 정상입니다.

## 설치 완료

![설치 완료](/images/manual/iso-install/09-complete.png)

"Successfully installed" 메시지가 표시됩니다. **Exit to live desktop** 을 클릭한 후 시스템을 재부팅합니다. 재시작 전에 USB 드라이브를 제거하세요.

## 첫 번째 부팅 — 로그인

![로그인 화면](/images/manual/iso-install/10-login.png)

재부팅하면 로그인 화면이 나타납니다. 설치할 때 만든 비밀번호를 입력하여 로그인합니다.

## 첫 번째 부팅 — Naia 앱

![Naia 앱 자동 실행](/images/manual/iso-install/12-naia-app.png)

로그인 후 **Naia가 자동으로 실행** 됩니다. 첫 실행 시 선호하는 AI 제공자를 선택합니다 ("Which brain should we use?"). 제공자를 선택하고 API 키를 설정하면 준비 완료입니다.

Naia OS에 오신 것을 환영합니다!
