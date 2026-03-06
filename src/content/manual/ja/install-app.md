既存のLinuxシステムにNaiaをスタンドアロンアプリとしてインストールします。すべてのインストールファイルは、**[ダウンロードページ](/ja/download)** または **[itch.io](https://nextain.itch.io/naia)** で入手できます。

## システム要件

- **OS**: Linux (Ubuntu, Fedora, Bazzite など)
- **ディスプレイ**: Wayland (推奨) または X11
- Flatpak のインストールには、追加のランタイム設定は必要ありません。

---

## Flatpak (推奨)

最も安全なインストール方法です。アプリは独自の隔離された空間で実行されるため、システムはクリーンに保たれます。

[ダウンロードページ](/ja/download)から `.flatpak` バンドルをダウンロードし、ターミナル経由でインストールします。

```bash
flatpak install --user ./Naia-Shell-x86_64.flatpak
```

> **仕組み**: Naia は安全のために隔離された空間で実行されます。AI が PC を制御する必要がある場合、必要な権限のみを要求します。

## その他の形式

**AppImage**, **DEB** (Debian/Ubuntu), および **RPM** (Fedora/RHEL) も [ダウンロードページ](/ja/download) で入手できます。

---

## (開発者向け) ローカルFlatpakビルドガイド

ソースコードからFlatpakサンドボックスアプリをビルドするには、以下の手順に従ってください。

1. **Flatpak Builder** をインストール
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder

   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **ビルド依存関係 (SDK)** を追加
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **パッケージングビルド** を実行
   プロジェクトのルートディレクトリ (Naia-OS) でこれを実行します。
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **アプリ** を実行
   ```bash
   flatpak run com.naia.shell
   ```

> **開発者向けメモ:**
> Flatpak サンドボックス内からユーザーのホスト環境を操作するために、AIエージェントは内部的にすべての `execute_command` ツールリクエストを `agent/src/gateway/tool-bridge.ts` 内で `flatpak-spawn --host bash -c ...` でラップしています。