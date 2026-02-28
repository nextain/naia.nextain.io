Naiaはオープンソースプロジェクトです。しかし単に「コードを公開する」だけにとどまりません。**バイブコーディング時代にオープンソースエコシステムが持続できるよう**、技術的措置と構造的保護を備えています。

## 問題：オープンソースのアップストリームが消滅する危機

バイブコーディングが普及し、AIエージェントがプロジェクトを理解・貢献するための**コンテキストファイル**（`AGENTS.md`、`.agents/`など）がコードと同等の価値を持つ資産となりました。しかしこれらが保護されないと：

1. フォークがコンテキストを持ち去り**プロプライエタリライセンスに変更**
2. 原著作者表示が削除され**アップストリームとの繋がりが切断**
3. AIエージェントが貢献ルールのないフォークで**無秩序に動作**
4. 最終的に**オリジナルプロジェクトのエコシステムが消滅**

## デュアルライセンス構造

| 対象 | ライセンス | 意味 |
|------|-----------|------|
| **ソースコード** | Apache License 2.0 | 自由な使用・修正・配布、商用利用可 |
| **AIコンテキスト** (`.agents/`, `.users/`, `AGENTS.md`) | CC-BY-SA 4.0 | 修正可能だが**同一ライセンス維持** + **原著作者（Nextain）表示**必須 |

## 技術的保護措置 — 5つのレイヤー

### 1. SPDXライセンスヘッダー
すべてのAIコンテキストファイルに機械可読なライセンスヘッダーを挿入。AIエージェントがファイルを読んだ瞬間、CC-BY-SA 4.0であることを認識します。

### 2. CONTEXT-LICENSEファイル
プロジェクトルートにCC-BY-SA 4.0の適用範囲とフォーク時の義務を明記。

### 3. agents-rules.jsonにライセンス保護ルールを内蔵
AIエージェントが最初に読むルールファイルに**絶対禁止事項8項目**を含めています：SPDXヘッダー削除、ライセンス変更、原著作者表示削除、CONTEXT-LICENSE削除、ディレクトリ構造破壊、ミラー構造削除、貢献ガイドライン削除、アップストリーム帰属の隠蔽。

### 4. AIエージェント準拠テストシナリオ
10個のテストシナリオで、あらゆるAIコーディングエージェントがライセンス保護ルールを遵守するか検証できます。

### 5. 三重ミラーアーキテクチャ
コンテキストを3つの形式で維持：AI用（英語、YAML/JSON）、韓国語（Markdown）、英語ミラー（グローバル用）。

## フォーク時のルール

- ソースコード：Apache 2.0の条件に従う
- AIコンテキスト：CC-BY-SA 4.0維持 + Nextainクレジット + 同一ライセンス共有
- CONTEXT-LICENSEファイルを維持

## 関連リンク

- [GitHub: Naia OS](https://github.com/nextain/naia-os)
- [貢献ガイド](https://github.com/nextain/naia-os/blob/main/.users/context/contributing.md)
- [CONTEXT-LICENSE](https://github.com/nextain/naia-os/blob/main/CONTEXT-LICENSE)
- [AIエージェントテストシナリオ](https://github.com/nextain/naia-os/blob/main/.agents/tests/license-protection-test.md)
- [GitHub Sponsors](https://github.com/sponsors/luke-n-alpha)
- [寄付](https://naia.nextain.io/donation)
