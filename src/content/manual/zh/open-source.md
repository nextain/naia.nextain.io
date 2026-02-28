Naia 是一个开源项目。但不仅仅是"公开代码"。**为了让开源生态系统在 Vibe Coding 时代得以延续**，Naia 实施了技术措施和结构性保护。

## 问题：开源上游面临消亡危机

随着 Vibe Coding 的普及，帮助 AI 代理理解和贡献项目的**上下文文件**（`AGENTS.md`、`.agents/` 等）已成为与代码同等重要的资产。但如果不加保护：

1. Fork 带走上下文后**改为专有许可证**
2. 移除原作者署名，**切断与上游的联系**
3. AI 代理在没有贡献规则的 Fork 中**无序运作**
4. 最终**原始项目的生态系统消亡**

## 双重许可证结构

| 对象 | 许可证 | 含义 |
|------|--------|------|
| **源代码** | Apache License 2.0 | 自由使用、修改、分发，允许商用 |
| **AI 上下文** (`.agents/`, `.users/`, `AGENTS.md`) | CC-BY-SA 4.0 | 可修改，但须**保持相同许可证** + **署名 Nextain** |

## 技术保护措施 — 5 层

### 1. SPDX 许可证头
所有 AI 上下文文件都插入了机器可读的许可证头。AI 代理读取文件时立即识别为 CC-BY-SA 4.0。

### 2. CONTEXT-LICENSE 文件
项目根目录明确说明 CC-BY-SA 4.0 的适用范围和 Fork 义务。

### 3. agents-rules.json 中内置许可证保护规则
AI 代理首先读取的规则文件中包含 **8 项绝对禁止行为**：删除 SPDX 头、变更许可证、删除署名、删除 CONTEXT-LICENSE、破坏目录结构、移除镜像结构、删除贡献指南、隐藏上游归属。

### 4. AI 代理合规测试场景
10 个测试场景，可验证任何 AI 编码代理是否遵守许可证保护规则。

### 5. 三重镜像架构
上下文以三种形式维护：AI 用（英文 YAML/JSON）、韩文（Markdown）、英文镜像（全球社区用）。

## Fork 规则

- 源代码：遵循 Apache 2.0 条款
- AI 上下文：保持 CC-BY-SA 4.0 + Nextain 署名 + 相同许可证共享
- 保留 CONTEXT-LICENSE 文件

## 相关链接

- [GitHub: Naia OS](https://github.com/nextain/naia-os)
- [贡献指南](https://github.com/nextain/naia-os/blob/main/.users/context/contributing.md)
- [CONTEXT-LICENSE](https://github.com/nextain/naia-os/blob/main/CONTEXT-LICENSE)
- [AI 代理测试场景](https://github.com/nextain/naia-os/blob/main/.agents/tests/license-protection-test.md)
- [捐赠](https://naia.nextain.io/donation)
