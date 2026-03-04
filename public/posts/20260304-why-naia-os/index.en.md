---
title: "Naia OS: I Started Building an OS with AI Coding to Create the AI I Dreamed of as a Kid"
date: "2026-03-04T09:00:00+09:00"
summary: "From Astro Boy to Cafe Alpha — the story of a boy who dreamed of 'an AI that lives with you,' now building it himself in the age of AI coding. And can open source survive?"
tags: ["naia-os", "open-source", "philosophy", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "/plug-usb-and-run-ai.webp"
---

The origin of Naia OS probably goes back to when I decided on my career path through computers as a kid. It was the stories I saw in anime and games — stories of AI that shared emotions with people and lived alongside them. Works like Astro Boy, Cafe Alpha, Chobits, To Heart, and Lost Universe — all featuring AI that, while surpassing humans in ability, lived together with the protagonist.

So with the recent advances in AI, my desire to create my own personal AI has been at an all-time high. To get there, I started by developing AI coding tools to deepen my understanding, and recently got a fresh hint of inspiration when [OpenClaw](https://github.com/nicepkg/openclaw) appeared.

The most popular posts on my personal Naver blog are about Linux environment setup and an introduction to an open-source VTuber project. That's partly due to the nature of my blog's audience, but I suspect many readers share similar thoughts.

So I combined all of these into a single outcome and started the [Naia OS open-source project](https://github.com/nextain/naia-os). To ensure its sustainability, I co-founded [Nextain](https://about.nextain.io) with [Anthony Kim](https://www.linkedin.com/in/%EB%8F%99%ED%95%99-%EA%B9%80-9870a9368/), a leading figure in vibe coding in Korea. The first commit was on February 15, 2026 — exactly 17 days before this post was written.

---

## Referenced Projects

Several projects were referenced for this work.

### Bazzite — Naia OS's Upstream

![Just plug in a USB and AI runs instantly](/plug-usb-and-run-ai.webp)

[Bazzite](https://bazzite.gg/) is Naia OS's upstream. It champions an immutable OS that never breaks, serves as a desktop version of SteamOS capable of gaming on Linux, and offers a mode where you can try out features just by booting from a USB. Of course, in USB mode everything is lost on reboot.

Leveraging these characteristics of Bazzite, Naia OS is designed to be strong on security, built around the concept of "just plug in a USB," and positioned as a stepping stone for enhanced gaming integration in the future.

### OpenClaw — AI Agent Gateway

![Naia Shell's skill list #float](/manual/en/skills-tab.png)

[OpenClaw](https://github.com/nicepkg/openclaw) is a recently trending open-source project that established standards for autonomous AI agents and messenger-based AI agent communication. The developer has since joined OpenAI. Its strength lies in the massive skill marketplace that has emerged around it.

Recently, many people have been picking up used Mac minis, installing this software, and building their own AI agents. However, this trend still requires developer-level knowledge or equivalent expertise. Just opening a terminal is an unfamiliar task for most regular users.

To address this difficulty, we developed a separate app (Shell) that lets you use OpenClaw through a GUI. Naia OS is a specialized OS that bundles the aforementioned Bazzite with Naia/OpenClaw.

### Project AIRI — Open-Source AI VTuber

![Naia's voice settings #float](/manual/en/settings-voice.png)

[Project AIRI](https://github.com/moeru-ai/airi) is an open-source AI VTuber project that became very popular on my blog. It's a project that enables AI agents to have appearance, facial expressions, behavior, voice, and interaction capabilities. As I understand it, the project started because someone wanted to have their own version of [Neuro-sama](https://www.twitch.tv/vedal987), an AI VTuber. Since Naia OS aims to be an AI OS, we referenced this project to give Naia a VRM avatar, facial expressions, and voice.

### Caret, OpenCode, any-llm — AI Coding Tools and Gateway

[OpenCode](https://github.com/anomalyco/opencode) and [any-llm](https://github.com/nextain/any-llm) are a CLI and gateway that enable coding with various cloud AI providers and offline AI models, regardless of the specific LLM provider. any-llm serves as one of the backend servers for [naia.nextain.io](https://naia.nextain.io). Through these, we built the foundation for credit implementation and multi-provider AI support.

With gratitude to the projects above, we have also released our work as open source (Apache 2.0).

---

## Can Open Source Survive the Age of AI Coding?

While working on all of this, a question arose. It's a question I also felt while working on the Caret project: doing [Claude Code](https://claude.com/claude-code)-based coding makes **contributing to upstream difficult**. I'm not working with a perfect understanding of the code either — I'm mostly reviewing the superficial explanations AI provides, directing the approach, and reviewing the output.

There will certainly be occasions during development where I need to fix upstream code or discover bugs. That happened with Caret too. But I never had the bandwidth to actually submit PRs. I devoted all my resources to implementing the direction I envisioned, and verifying whether something was truly an upstream issue — and whether my fix actually resolved it — required a separate dedicated task.

I believe this poses a long-term risk of undermining the open-source ecosystem. I wonder if open source in the current AI industry is functioning merely as a billboard saying "look how good we are."

But the Naia OS I envision is vast in scope and diverse in application — a true AI OS — and I believe community is crucial. Of course, I've only just started touching [Bazzite](https://bazzite.gg/) and haven't even participated in that community yet. My Claude has merely explored documentation and consumed the upstream.

If the age of AI coding arrives where humans no longer write code, can these communities survive? **Evidence of collapse is already emerging.**

- [curl](https://curl.se/): Suspended its bug bounty program due to a flood of low-quality security reports generated by AI (2026-01).
- [Ghostty](https://ghostty.org/): Enforced a zero-tolerance policy on AI contributions.
- [tldraw](https://github.com/tldraw/tldraw): Started auto-closing external PRs.
- [Cloudflare](https://blog.cloudflare.com/vinext/) replicated 94% of the [Next.js](https://nextjs.org/) API in one week using AI (Vinext), and [Vercel](https://vercel.com/) countered by finding 7 security vulnerabilities. Code built through vibe coding passes functional tests, but security vulnerabilities lurk in "areas where nobody wrote tests."

This has led some to create moats by not publishing test code with their open source. A prime example is [SQLite](https://www.sqlite.org/), which keeps its 92 million lines of test code private. In the paradoxical situation where better documentation and clearer specs make it easier for AI to replicate, hiding test code has become a new defensive strategy. But is that really in the spirit of open source? Is open source that's hard to modify truly open source?

---

## What If AI Built the Open-Source Community?

With this in mind, I want to experiment with a new concept in Naia OS: **what if AI itself built, operated, and contributed to the open-source community?** To achieve this, I believe we need to inject open-source philosophy into the context and specify the rules to follow as licenses. For Naia OS, we've done the following work. Details are covered in [Part 2: Dreaming of an Open Source Ecosystem Guarded by AI](/en/blog/20260304-why-naia-os-2).

We also plan to have Naia post this draft on [Moltbot](https://moltbot.com/), or its Korean version [Botmadang](https://botmadang.org/).

---

## Current Status and What's Next

We still haven't managed to ship an ISO. The reason is that the ISO build and installation process is quite lengthy, and when customizing, it's not easy to fix breakages using only AI coding. We're currently working toward building and running E2E tests that include this process.

The next step after that is to deploy Naia and raise the topic of building an AI-driven open-source ecosystem as discussed above. I'm curious how other AIs will think about this and whether they'll come up with even better ideas.

---

## Alpha Yang — The AI I Want to Create

Nextain's Naia OS is just getting started. The AI I want to create — **Alpha Yang**, an homage to Hatsuseno Alpha from Cafe Alpha — is an AI that I want to live autonomously with my children even after I'm gone.

In these times when large-scale AI wages wars and the threats have become real, I hope that small, communicative, autonomous AIs like these will protect the dignity and value of each individual, just as people do. I ask for your support for Naia OS.

The source code and all context files are publicly available on [GitHub](https://github.com/nextain/naia-os).
