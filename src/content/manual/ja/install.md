Naiaは、BazziteのようなImmutable OSやFlatpakのようなセキュアなサンドボックス環境に焦点を当て、主にLinux環境向けに設計されています。

## システム要件

- **OS**: Linux (Bazzite, Ubuntu, Fedoraなど)
- **ディスプレイサーバー**: Wayland (推奨) または X11
- **ランタイム**: Node.js 22+ (ソースからビルドする場合)
- **デーモン**: Systemd User Serviceのサポートが必要

---

## デプロイメントオプション

Naiaは「OSを直接制御する」AIを搭載しているため、デプロイメント方法が重要な考慮事項となります。

### 1. Flatpakディストリビューション (推奨)
これは、Linuxデスクトップアプリを配布する最も一般的で安全な方法です。DiscoverやGNOME Softwareなどのアプリストアから簡単にインストールできます。

- **セキュアな分離**: アプリのUI (Tauri) とコアエージェント (Node.js) は、完全にサンドボックス内で動作します。
- **ホスト実行**: AIがターミナルコマンド (例: パッケージのインストールやホストファイルシステムの管理) を実行する必要がある場合、`flatpak-spawn --host` を使用してサンドボックスから安全に脱出します。
- **インストール方法**:
  提供されている`.flatpak`バンドルをダウンロードし、ターミナル経由でインストールします:
  ```bash
  flatpak install --user ./Naia-OS.flatpak
  ```

### 2. Bazzite / BlueBuild統合イメージ (上級者向け)
上級ユーザー向けに、NaiaはBlueBuildレシピを提供し、アプリをBazziteイメージに直接組み込むことができます。これにより、AIがOSに深く統合され、AIアバターが起動直後にあなたを迎えることができます。

---

## 🛠️ (開発者向け) ローカルFlatpakビルドガイド

ソースコードからFlatpakサンドボックスアプリをビルドするには、以下の手順に従ってください:

1. **Flatpak Builderのインストール**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder
   
   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **ビルド依存関係の追加 (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **パッケージングビルドの実行**
   プロジェクトのルートディレクトリ (Naia-OS) でこれを実行します。
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **アプリの実行**
   ```bash
   flatpak run com.naia.shell
   ```

> **💡 開発者ノート:**
> Flatpakサンドボックス内からユーザーのホスト環境を操作するために、AIエージェントは内部的にすべての`execute_command`ツールリクエストを`agent/src/gateway/tool-bridge.ts`内の`flatpak-spawn --host bash -c ...`でラップしています。