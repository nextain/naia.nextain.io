このガイドでは、Naia OS をライブUSBドライブからハードドライブにインストールする手順を、起動からNaiaアプリの実行まで解説します。

## 必要なもの

- Naia OS ISOが書き込まれたUSBドライブ (8 GB以上)
- 過去10年以内に製造されたPC (ほとんどが互換性あり)
- 64 GB以上のディスクスペース

> ISOは[ダウンロードページ](/ja/download)からダウンロードしてください。

---

## 起動可能なUSBドライブの作成

[ダウンロードページ](/ja/download)からNaia OS ISOをダウンロードし、USBドライブに書き込みます。

**[balenaEtcher](https://etcher.balena.io)** を推奨します。Windows、macOS、Linuxで動作します。

1. balenaEtcherをダウンロードして開きます。
2. **Flash from file** をクリックし、Naia OS ISOを選択します。
3. **Select target** をクリックし、USBドライブを選択します。
4. **Flash!** をクリックして完了を待ちます。

> **警告**: これにより、USBドライブ上のすべてのデータが消去されます。先に重要なファイルをバックアップしてください。

## USBから起動してインストールを開始

USBから起動する方法については、**[2. Naia OS ライブUSB](/ja/manual/live-usb)** を参照してください。

デスクトップの左上隅に**Install to Hard Drive** アイコンが表示されます。これをダブルクリックして、インストールウィザードを開きます。

## ステップ 1: 言語とキーボード

![ようこそ画面](/images/manual/iso-install/01-welcome.png)

希望する言語とキーボードレイアウトを選択します。検索ボックスを使用してフィルターできます (例: "english"と入力)。**Next** をクリックします。

## ステップ 2: 日付と時刻

![日付と時刻](/images/manual/iso-install/02-datetime.png)

日付、時刻、タイムゾーンは自動的に検出されます。必要に応じて調整してください。**Next** をクリックします。

## ステップ 3: インストール方法

![インストール方法](/images/manual/iso-install/03-installation-method.png)

ターゲットディスクを選択します。**"Use entire disk"** が推奨オプションです — これを選択すると、選択したディスク上の既存のデータがすべて消去されます。**Next** をクリックします。

> **警告**: "Use entire disk"を選択すると、選択したドライブ上のすべてが消去されます。先に重要なファイルをバックアップしてください。

## ステップ 4: ストレージ設定

![ストレージ設定](/images/manual/iso-install/04-storage.png)

ディスクを暗号化することもできます。不明な場合は、チェックを外したまま次に進んでください。**Next** をクリックします。

## ステップ 5: アカウント作成

![アカウント作成](/images/manual/iso-install/05-create-account.png)

氏名、ユーザー名、パスフレーズ (6文字以上) を入力します。

![アカウント入力済み](/images/manual/iso-install/05b-account-filled.png)

すべてのフィールドに緑色のチェックマークが表示されたら、**Next** をクリックします。

## ステップ 6: 確認とインストール

![確認](/images/manual/iso-install/06-review.png)

設定を確認します — 言語、タイムゾーン、アカウント情報が正しいことを確認してください。**Erase data and install** をクリックして開始します。

## インストールの進行

![インストール中](/images/manual/iso-install/07-installing.png)

インストーラーは、ストレージ設定、ソフトウェアインストール、システム設定、最終処理の4つの段階で進行します。

![進行状況](/images/manual/iso-install/08-installing-progress.png)

> ハードウェアにもよりますが、通常**10～30分** かかります。「ソフトウェアインストール」の段階が最も長く、この間画面が変化しないように見えることがあります。これは正常です。

## インストール完了

![完了](/images/manual/iso-install/09-complete.png)

"Successfully installed." と表示されます。**Exit to live desktop** をクリックし、再起動します。再起動する前にUSBドライブを取り外してください。

## 初回起動 — ログイン

![ログイン](/images/manual/iso-install/10-login.png)

再起動後、ログイン画面が表示されます。インストール時に作成したパスワードを入力してください。

## 初回起動 — Naiaアプリ

![Naiaアプリ](/images/manual/iso-install/12-naia-app.png)

ログイン後、**Naia は自動的に起動します**。初回実行時に、ご希望のAIプロバイダーを選択してください。プロバイダーを選択し、API Keyを設定すれば準備完了です。

Naia OSへようこそ！