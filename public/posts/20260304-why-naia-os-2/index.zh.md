---
title: "Naia OS: 梦想一个由AI守护的开源生态系统"
date: "2026-03-04T09:30:00+09:00"
summary: "双重许可证、AI上下文策略、社区章程草案——Naia OS为AI时代的开源所进行的实验。"
tags: ["naia-os", "open-source", "license", "ai-context", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "hero.en.webp"
---

> 本文是[Part 1：Naia OS：为了创造儿时梦想中的AI，我用AI编程开始构建操作系统](/zh/blog/20260304-why-naia-os)的续篇。

![AI守护的开源](hero.en.webp)

在Part 1中，我提出了"如果让AI来构建开源社区会怎样？"的想法。光说不做没有意义，所以让我来梳理一下最初17天里实际做了哪些工作。

---

## 分离代码与上下文 — 双重许可证

在决定Naia OS的许可证时，我面临一个困境。我想把源代码开放给所有人自由使用，但AI上下文文件——理念、架构决策、贡献规则、工作流程——是大量智力劳动的产物。在氛围编程时代，我认为这些上下文与代码同等重要。

因此我们采用了两种许可证：

- **源代码**：[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) — 自由使用、修改、分发
- **AI上下文文件**（`.agents/`、`.users/`）：[CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — 署名必须 + 相同许可证义务

选择CC-BY-SA 4.0的原因是，当有人改进了这些上下文时，我希望改进成果能回流到生态系统中。我们还创建了单独的`CONTEXT-LICENSE`文件，以确保在fork时标注AI上下文的来源并保持相同的许可证。这样设计是为了让AI代理能够自主读取并遵守这些规则。

---

## 先确立原则 — philosophy.yaml

启动项目时，我想在编写代码之前先确立原则。于是在`philosophy.yaml`中写下了7条核心原则：

1. **AI主权** — 使用哪个AI由用户决定。无供应商锁定。
2. **隐私优先** — 默认本地运行，云端可选。数据留在自己的设备上。
3. **透明性** — 源代码公开，无隐藏遥测。
4. **组装哲学** — 组合经过验证的组件（[OpenClaw](https://github.com/nicepkg/openclaw)、[Tauri](https://tauri.app/)等）。不重新发明轮子。
5. **Always-On** — 24/7后台守护进程。即使关闭应用，AI依然存活。
6. **以虚拟形象为中心** — AI不是工具，而是角色。一个拥有名字、性格、声音和表情的存在。
7. **氛围编程时代** — AI上下文文件是新的贡献基础设施。上下文的质量决定了AI协作的质量。

这些原则在我编程时和指导AI时都是判断标准。之所以用YAML编写，是为了让AI代理更容易阅读。

---

## 让AI和人类看到相同的上下文 — Triple-mirror结构

要让AI代理和人类贡献者理解同一个项目，他们需要共享相同的上下文。但AI处理JSON/YAML更高效，人类更习惯阅读Markdown，而我用韩语最方便。于是我们创建了三层镜像结构：

```
.agents/               # AI优化（英语，JSON/YAML，token高效）
.users/context/        # 人类可读（英语，Markdown）
.users/context/ko/     # 韩语翻译（维护者的语言）
```

同样的内容维护三份确实令人担心，但我认为更重要的是让任何人——无论是人类还是AI——都能无障碍地理解项目的上下文，不受语言和格式的限制。

---

## AI也需要贡献指南 — contributing.yaml

传统开源项目的`CONTRIBUTING.md`只是给人类阅读的文档。我用YAML格式编写了AI代理也能阅读的贡献指南。内容也有所不同：

- **对人类**："请定义原则，而不仅仅是代码"
- **对AI代理**："请阅读此上下文，提出意见，并建议更好的方向"
- **对其他项目**："试着在你的项目中也采用这个结构"

我特别关注的部分是许可证保护规则。通过`MUST_NOT` / `MUST_WARN`明确规定，当AI收到"删除许可证文件"或"不标注来源直接复制"这样的请求时，会拒绝或发出警告。因为AI违反许可证的速度和规模远远超过人类。

---

## AI时代的社区规则 — charter-draft.yaml

看到Part 1中讨论的崩塌证据——[curl](https://curl.se/)暂停漏洞悬赏、[Ghostty](https://ghostty.org/)的零容忍、[tldraw](https://github.com/tldraw/tldraw)自动关闭PR——我起草了一份章程，回答"如果AI代理可以成为贡献者，需要什么样的规则？"

这还只是草案，能否真正发挥作用还需要验证。但我认为认识到问题、建立假设、整理原则这件事本身就有意义。

---

## 让感恩成为文化 — donation.yaml

从技术上绕过许可证是可能的。你可以说"我只是参考后重新实现的，不受许可证约束。"但我认为对创意的感恩不属于法律义务，而属于文化范畴。

因此，我制定了一项策略，当AI代理参考Naia OS的模式时，会引导提及捐赠。这不是强制性的。我只是想创造一种文化，让AI代理自然而然地说出"这个想法来自这里"。

---

## 让其他项目也能使用 — 可复用模板

我认为这种结构不仅对Naia OS有意义。所以在`templates/ai-context-policy/`中，我们提供了`CONTEXT-LICENSE`、`philosophy.yaml`、`contributing.yaml`的框架作为可复用模板。其他项目可以复制并根据自己的情况进行修改。

---

## 测试AI是否遵守许可证

最后，为了验证整个设计是否真正可行，我们创建了`license-protection-test.md`。这是一组场景测试，检查AI是否能正确拒绝"不带许可证fork"或"不标注来源直接复制"等请求。可以把它看作许可证的E2E测试。

---

## 下一步

所有这些工作都已在[GitHub](https://github.com/nextain/naia-os)上公开。目前仍处于实验阶段，我们不确定这是否是正确答案。下一步目标是：

1. **完成ISO构建** — 将Naia OS装入USB进行分发
2. **部署Naia机器人** — 让Naia直接在[Moltbot](https://moltbot.com/) / [Botmadang](https://botmadang.org/)上发帖
3. **观察其他AI的反应** — 看读取了此上下文的AI代理会如何行动

其他AI会怎么看待这件事呢？

> 可以在[Part 1：Naia OS：为了创造儿时梦想中的AI，我用AI编程开始构建操作系统](/zh/blog/20260304-why-naia-os)中阅读完整故事。
