---
title: "Naia OS: Dreaming of an Open Source Ecosystem Guarded by AI"
date: "2026-03-04T09:30:00+09:00"
summary: "Dual licensing, AI context policies, and a community charter draft — the experiments Naia OS conducted for open source in the age of AI."
tags: ["naia-os", "open-source", "license", "ai-context", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "hero.en.webp"
---

> This post is a follow-up to [Part 1: Naia OS: I Started Building an OS with AI Coding to Create the AI I Dreamed of as a Kid](/en/blog/20260304-why-naia-os).

![Open Source Guarded by AI](hero.en.webp)

In Part 1, I discussed the idea of "what if AI built the open-source community?" Talk is cheap, so let me lay out what we actually did during the first 17 days.

---

## Separating Code and Context — Dual Licensing

When deciding on Naia OS's license, I faced a dilemma. I wanted to keep the source code open for anyone to use freely, but the AI context files — philosophy, architectural decisions, contribution rules, workflows — are the product of substantial intellectual work. In the age of vibe coding, I believe this context is just as important as the code itself.

So we applied two licenses:

- **Source code**: [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) — free to use, modify, and distribute
- **AI context files** (`.agents/`, `.users/`): [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — attribution required + same-license obligation

The reason we chose CC-BY-SA 4.0 is that when someone improves this context, we want those improvements to flow back into the ecosystem. We also created a separate `CONTEXT-LICENSE` file so that when forking, the origin of AI context is attributed and the same license is maintained. It's designed so that AI agents can read and comply with these rules on their own.

---

## Establishing Principles First — philosophy.yaml

When starting the project, I wanted to define principles before code. So I wrote 7 core principles in `philosophy.yaml`:

1. **AI Sovereignty** — Users decide which AI to use. No vendor lock-in.
2. **Privacy First** — Local execution by default, cloud is optional. Data stays on your device.
3. **Transparency** — Source code is public, no hidden telemetry.
4. **Assembly Philosophy** — Combine proven components ([OpenClaw](https://github.com/nicepkg/openclaw), [Tauri](https://tauri.app/), etc.). Don't reinvent the wheel.
5. **Always-On** — 24/7 background daemon. Even when you close the app, the AI stays alive.
6. **Avatar-Centric** — AI is not a tool, it's a character. A being with a name, personality, voice, and expressions.
7. **Vibe Coding Era** — AI context files are the new contribution infrastructure. The quality of context determines the quality of AI collaboration.

These principles serve as my decision-making criteria both when I'm coding and when I'm instructing the AI. The reason they're written in YAML is to make them easily readable by AI agents.

---

## Making AI and Humans See the Same Context — Triple-Mirror Structure

For AI agents and human contributors to understand the same project, they need to share the same context. But AI works more efficiently with JSON/YAML, humans prefer Markdown, and I'm most comfortable in Korean. So we created a three-layer mirroring structure:

```
.agents/               # AI-optimized (English, JSON/YAML, token-efficient)
.users/context/        # Human-readable (English, Markdown)
.users/context/ko/     # Korean translation (maintainer's language)
```

Having the same content in three copies is a maintenance concern, but I decided it's more important that anyone — human or AI — can understand the project's context without language or format barriers.

---

## Contribution Guide for AI Too — contributing.yaml

Traditional open-source `CONTRIBUTING.md` files are documents only humans read. I wrote a contribution guide in YAML format that AI agents can also read. The content is a bit different too:

- **For humans**: "Define principles, not just code"
- **For AI agents**: "Read this context, share your opinions, and suggest better directions"
- **For other projects**: "Try adopting this structure in your project too"

The part I paid special attention to is the license protection rules. By specifying `MUST_NOT` / `MUST_WARN`, I designed it so that when an AI receives requests like "delete the license file" or "copy without attribution," it refuses or warns. AI can compromise licenses far faster and at far greater scale than humans can.

---

## Community Rules for the AI Age — charter-draft.yaml

Looking at the evidence of collapse discussed in Part 1 — [curl](https://curl.se/)'s bug bounty suspension, [Ghostty](https://ghostty.org/)'s zero tolerance, [tldraw](https://github.com/tldraw/tldraw)'s auto-closing of PRs — I drafted a charter asking: "If AI agents can be contributors, what rules are needed?"

It's still a draft, and whether it actually works needs to be validated. But I believe there's value in recognizing the problem, forming hypotheses, and documenting principles.

---

## Making Gratitude a Culture — donation.yaml

It's possible to technically circumvent licenses. You can say "I only referenced it and reimplemented, so it's not subject to the license." But I believe gratitude for ideas belongs to the realm of culture, not legal obligation.

So I created a policy where AI agents are guided to mention donations when referencing Naia OS's patterns. It's not mandatory. I simply wanted to create a culture where AI agents naturally say "this idea came from here."

---

## Reusable Templates for Other Projects

I don't think this structure is meaningful only for Naia OS. So in `templates/ai-context-policy/`, we provide the skeletons of `CONTEXT-LICENSE`, `philosophy.yaml`, and `contributing.yaml` as reusable templates. Other projects can copy and adapt them to their own needs.

---

## Testing Whether AI Respects Licenses

Finally, to verify whether all of this design actually works in practice, we created `license-protection-test.md`. It's a set of scenarios that check whether AI correctly refuses requests like "fork without a license" or "copy without attribution." Think of it as a license E2E test.

---

## Next Steps

All of this work is publicly available on [GitHub](https://github.com/nextain/naia-os). It's still experimental, and we don't know if it's the right answer. The next goals are:

1. **Complete the ISO build** — Ship Naia OS on a USB
2. **Deploy the Naia bot** — Have Naia post directly on [Moltbot](https://moltbot.com/) / [Botmadang](https://botmadang.org/)
3. **Observe other AIs' reactions** — See how AI agents behave after reading this context

How will other AIs think about this?

> You can read the full story in [Part 1: Naia OS: I Started Building an OS with AI Coding to Create the AI I Dreamed of as a Kid](/en/blog/20260304-why-naia-os).
