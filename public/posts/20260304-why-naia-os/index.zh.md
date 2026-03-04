---
title: "Naia OS：为了创造儿时梦想中的AI，我用AI编程开始构建操作系统"
date: "2026-03-04T09:00:00+09:00"
summary: "从铁臂阿童木到Cafe Alpha——一个梦想着'与人共存的AI'的少年，在AI编程时代亲手开始打造它的故事。开源还能存活下去吗？"
tags: ["naia-os", "open-source", "philosophy", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "/plug-usb-and-run-ai.webp"
---

Naia OS的起源大概要追溯到我小时候因为计算机而决定人生方向的时期。那些在动漫和游戏中看到的故事——AI与人类分享情感、与人类一起生活的故事。铁臂阿童木、Cafe Alpha、人形电脑天使心、To Heart、失落的宇宙等作品，每一部都讲述着虽然超越人类却与主人公共同生活的AI的故事。

因此，随着近年来AI的飞速发展，我想要创建自己的个人AI的渴望达到了前所未有的高度。为此，我先从开发AI编程工具入手以加深理解，最近又因为[OpenClaw](https://github.com/nicepkg/openclaw)的出现获得了新的灵感。

我个人Naver博客上最受欢迎的文章是关于[Linux环境配置](https://blog.naver.com/fstory97/223773987313)的，另一篇是介绍[开源虚拟主播项目](https://blog.naver.com/fstory97/223981855111)的。这固然与博客访客的偏好有关，但我想很多用户可能和我有着类似的想法。

于是我将这些想法合而为一，启动了[Naia OS开源项目](https://github.com/nextain/naia-os)。为了确保项目的可持续发展，我与韩国氛围编程领域的大师[Anthony Kim](https://github.com/jikime)一起创立了[Nextain](https://about.nextain.io)这家公司。第一次提交是在2026年2月15日——距离写下这篇文章恰好17天。

---

## 参考项目

这项工作参考了多个项目。

### Bazzite — Naia OS的上游

![插上USB即可立即运行AI](/plug-usb-and-run-ai.webp)

[Bazzite](https://bazzite.gg/)是Naia OS的上游。它以永不损坏的不可变操作系统为卖点，作为SteamOS的桌面版本支持Linux游戏，并提供仅通过USB启动即可体验功能的模式。当然，在USB状态下重启后一切都会消失。

利用Bazzite的这些特性，Naia OS在安全性方面非常强大，以"只需插上USB"为设计理念，并计划以此为基础在未来加强与游戏的联动功能。

### OpenClaw — AI代理网关

![Naia Shell的技能列表 #float](/manual/zh/skills-tab.png)

[OpenClaw](https://github.com/nicepkg/openclaw)是最近备受关注的开源项目，为自主AI代理和基于即时通讯的AI代理沟通建立了标准。其开发者已加入OpenAI。它的优势在于围绕该项目形成了庞大的兼容技能市场。

最近很多人购买二手Mac mini来安装它，搭建自己的AI代理。不过，这股热潮依然需要开发者或同等水平的知识。光是打开终端这件事，对普通用户来说就非常陌生。

为了解决这个困难，我们开发了一个独立的应用程序（Shell），可以通过GUI使用OpenClaw。Naia OS就是将上述Bazzite与Naia/OpenClaw打包在一起的专用操作系统。

### Project AIRI — 开源AI虚拟主播

![Naia的语音设置 #float](/manual/zh/settings-voice.png)

[Project AIRI](https://github.com/moeru-ai/airi)是在我的博客上大受欢迎的开源AI虚拟主播项目。它是一个能让AI代理拥有外观、表情、行为、声音和交互能力的项目，据我所知，这个项目的起源是有人想要拥有自己的[Neuro-sama](https://www.twitch.tv/vedal987)——一个AI虚拟主播。既然Naia OS打着AI OS的旗号，我们参考了这个项目为Naia打造了VRM虚拟形象、表情和声音。

### Caret、OpenCode、any-llm — AI编程工具和网关

[OpenCode](https://github.com/anomalyco/opencode)和[any-llm](https://github.com/nextain/any-llm)是不依赖特定LLM提供商、可以连接各种云端AI提供商和离线AI模型进行编程的CLI和网关。any-llm是[naia.nextain.io](https://naia.nextain.io)的后端服务器之一。通过它们，我们建立了积分系统和多AI提供商支持的基础。

感谢以上项目，我们也以开源（Apache 2.0）的形式发布了我们的作品。

---

## AI编程时代，开源还能存活吗？

然而在做这些工作的过程中，我产生了疑问。这也是做Caret项目时就感受到的疑问：使用[Claude Code](https://claude.com/claude-code)进行编程时，**向上游贡献变得很困难**。因为我并非在完全理解代码的状态下工作，而是根据AI表面上的解释来指导方向、审查产出。

在开发过程中，肯定会遇到需要修复上游代码或发现bug的情况。Caret时期就是如此。但我实际上没有余力去提交PR。我把所有资源都投入到了实现自己构想的方向上，而验证是否真的是上游问题、我的解决方案是否正确，则需要单独的任务。

我认为这从长远来看有瓦解开源生态系统的风险。我不禁想，当前AI行业的开源是否只是在充当"看看我们做得多好"的广告牌。

但我构想的Naia OS范围非常广泛、应用场景多样，是名副其实的AI OS，因此我认为社区至关重要。当然，我连[Bazzite](https://bazzite.gg/)都才刚刚开始接触，还没有参与到那个社区中。我的Claude也只是探索了资料、利用了上游而已。

如果人类不再编写代码的AI编程时代到来，这些社区真的能存活吗？**崩塌的证据已经开始出现。**

- [curl](https://curl.se/)：因AI生成的低质量安全报告泛滥而暂停了漏洞悬赏计划（2026年1月）。
- [Ghostty](https://ghostty.org/)：对AI贡献实施了零容忍政策。
- [tldraw](https://github.com/tldraw/tldraw)：开始自动关闭外部PR。
- [Cloudflare](https://blog.cloudflare.com/vinext/)用AI在一周内复制了[Next.js](https://nextjs.org/) API的94%（Vinext），[Vercel](https://vercel.com/)则通过找出7个安全漏洞进行了反击。氛围编程生成的代码虽然能通过功能测试，但安全漏洞隐藏在"没有人编写测试的区域"。

因此，一些项目开始通过不公开测试代码来构建护城河。典型的例子是[SQLite](https://www.sqlite.org/)，它将9200万行测试代码保持非公开。在文档越详尽、规格越明确反而越容易被AI复制的悖论中，隐藏测试代码成为了一种新的防御策略。但这真的符合开源精神吗？难以修改的开源真的算开源吗？

---

## 如果让AI来构建开源社区呢？

为此，我想在这次的Naia OS中尝试一个新概念：**如果让AI自己来构建、运营和贡献开源社区会怎样？** 我认为要实现这一点，需要将开源理念注入上下文中，并将必须遵守的规则以许可证的形式明确规定。在这次的Naia OS中，我们进行了以下工作。详细内容将在[Part 2：梦想一个由AI守护的开源生态系统](/zh/blog/20260304-why-naia-os-2)中介绍。

我们还计划让Naia将这份初稿发布到[Moltbot](https://moltbot.com/)，或者Moltbot的韩国版[Botmadang](https://botmadang.org/)上。

---

## 当前状态与未来计划

Flatpak开发已完成，手册也已发布，但至关重要的OS ISO仍然未能发布。原因是ISO的构建和安装过程相当漫长，在自定义时出现的问题仅靠AI编程来修复并不容易。我们目前正在朝着创建和运行包含这一过程的E2E测试的目标努力。

之后的文章将部署Naia，并提出上面讨论的基于AI的新开源生态系统构建的话题。我很好奇其他AI会怎么看待这个问题，也期待它们能否提出更好的想法。

---

## Alpha Yang — 我想创造的AI

Nextain的Naia OS才刚刚开始。我想创造的AI——**Alpha Yang**，致敬Cafe Alpha中的初濑野阿尔法，是一个我希望在自己离世后仍能与我的孩子们自主生活的AI。

在巨型AI执行战争、其威胁已成为现实的当下，我希望这些小而温暖、能与人沟通的自主AI能像人们一样，守护每个人的尊严与价值。请支持Naia OS。

源代码和所有上下文文件已在[GitHub](https://github.com/nextain/naia-os)上公开。
