---
title: "AI-Native Open Source — Open Source Built with AI"
date: "2026-03-07T18:00:00+09:00"
summary: "In the age of AI, the core premise of open source, 'give back what you get,' is shattering. This post delves into the critical reasons why AI is destroying communities and presents a blueprint for the future development ecosystem with an innovative open-source model designed with AI."
tags: ["naia-os", "open-source", "ai-native", "vibe-coding", "agents-md"]
author: "Luke (https://github.com/cafelua)"
hero: "ai-native-community.webp"
---

Starting with the 'vibe coding' issue mentioned by Andrej Karpathy in February 2025, a year later, fundamental changes driven by AI have arrived in software development. This has led to a major crisis for many software companies that initially saw great opportunities with AI.

In 2025-2026, the open-source ecosystem faces an unprecedented crisis.

## Three Reasons Why Open Source is Collapsing

![Open Source → AI Crisis (3 Reasons)](/posts/20260307-ai-native-opensource/three-reasons-en.webp)
![오픈소스가 무너지는 세가지 이유](/posts/20260307-ai-native-opensource/three-reasons.webp)<!-- ko -->
### 1. Silent Exploitation — Nobody Comes Anymore

GitHub calls the open-source crisis in the age of AI **"Eternal September."**

> **Eternal September**: In the early 1990s, Usenet was a university student-centric community. Every September, new students would flock in and post low-quality content, but existing users would educate them, and things would normalize within a month or two. However, in September 1993, when AOL opened Usenet to the general public, "September" never ended.

But the real crisis isn't a flood of AI slop PRs. **It's that nobody comes at all.**

AI has already learned open-source code. Developers have no reason to visit a repo, no reason to read documentation, no reason to open issues, and no reason to send PRs. With a single command like "make this for me," AI generates results based on open source.

**Usage skyrockets, but communities become ghost towns.**

| Case | What Happened |
|------|-------------------|
| **Tailwind CSS** | npm downloads increased, documentation traffic decreased by 40%, **revenue decreased by 80%** |
| **Stack Overflow** | Activity dropped by 25% within 6 months of ChatGPT's launch, question count **decreased by 76%** as of 2025 |
| **Vercel** | v0 generates code using open-source libraries (Tailwind, shadcn/ui, etc.) — Vercel monopolizes the profits |
| **SQLite** | Code is public domain, but test suite is **intentionally private** — a strategy that remains effective even in the AI era |

Conclusion of arXiv paper [2601.15494](https://arxiv.org/abs/2601.15494): Vibe coding "uses" OSS but does not read documentation, report bugs, or participate in the community.

The fundamental premise of open source — **"give back what you get"** — is collapsing. We've entered an era where the utility gained from copying is greater than that from contributing.

### 2. The Paradox of Community — More Contributors, Slower Progress

The conventional wisdom was "more contributors make a project faster." The reality is the opposite. Fred Brooks already proved this in 1975 — [**"adding manpower to a late software project makes it later."**](https://en.wikipedia.org/wiki/Brooks%27s_law) This is because communication costs increase quadratically with the number of people.

As the number of contributors increases, so do the costs of review, coordination, and decision-making. Maintainers spend their time managing people instead of writing code. In the AI era, this problem is exacerbated to an extreme — users quietly take what they need via AI, and the few remaining contributions only increase coordination costs.

**Ultimately, it's faster to build something alone with AI than to build it with a community.**

### 3. Defense is Not the Answer

As a result, many projects have started to close their doors. curl received 20 AI-generated reports in 21 days, with 0 valid ones — ultimately discontinuing its bug bounty program after 6 years. Ghostty adopted a zero-tolerance policy, allowing AI contributions only on approved issues, and tldraw completely blocked external PRs altogether.

Blocking PRs can stop AI slop. However, problems 1 and 2 — silent exploitation and community costs — remain unresolved. Even if a project closes its doors, AI has already learned the code, and users continue to take it from outside the repo.

**The industry's response is twofold:**

- **Defense**: Vouch (trust management), PR Kill Switch, mandatory AI usage disclosure + rejection
- **Acceptance**: GitHub Agentic Workflows, AGENTS.md standard (adopted by 60k+ projects), Responsible Vibe Coding Manifesto

Both sides agree on one point: AI itself is not the problem; **misusing AI** is the problem. However, neither side has offered a solution to the "utility of openness < utility of copying" problem.

---

## But, is Rebuilding from Scratch Every Time the Answer?

There are arguments that "if vibe coding becomes mainstream, on-demand development will emerge" — meaning that AI can be asked to create things when needed, and this will become the norm for computing and apps.

But this is a massive waste of resources.

Imagine 10,000 people asking for the same feature to be built separately. This results in 10,000 unverified codebases. What if a security patch is released? All 10,000 people have to rebuild it themselves. What if the architecture needs improvement? Start over from scratch. Tests? None. **Rebuilding from the ground up every time, no matter how fast AI is, is wasteful.**

There are already well-established open-source projects: verified architectures, thousands of tests, years of security patch history. These cannot be replicated with a single "make this for me" command. The **value of accumulation** remains unchanged in the AI era.

They say the **age of the super-individual** has arrived. With AI assistance, one person can build amazing things. That's true. But is it efficient for multiple super-individuals to **build the same thing separately**? Wouldn't it be more efficient for super-individuals to **contribute together** to a single open-source project?

Ultimately, the answer returns to open source. The question isn't "to do open source or not to do open source," but rather, "**how to do open source in the AI era**."

---

## Naia OS's Choice: Designing with AI

What if maintainers also use AI, and contributors also use AI?

If AI could handle the **communication** costs in traditional open source — issue classification, PR review, translation, coordination — couldn't we break the paradox of "more contributors, slower progress"?

[Naia OS](https://github.com/nextain/naia-os) has chosen the opposite path to test this hypothesis.

> **"Don't block AI; design and develop with AI."**

![AI 네이티브 오픈소스 커뮤니티](/posts/20260307-ai-native-opensource/ai-native-community.webp)

| Perspective | Traditional Open Source | Naia OS |
|------|-------------|---------|
| AI Stance | **Defends** against AI contributions | **Designs** AI contributions into the workflow |
| Onboarding | Read README | Clone → AI explains project → No language barrier |
| Context | Human-readable documents only | `.agents/` (for AI) + `.users/` (for humans) dual structure |
| Language | English required | **All languages welcome** — AI translates |

### Context is Infrastructure — Open Source AX

Just as companies undergo AX (AI Transformation), open source also needs AX. This means transforming the two axes—community (organization) and source+context (infrastructure)—to allow AI participation.

From the community perspective — communication in traditional open source is entirely human-to-human. If this cost is a problem in the AI era, then the organization must be changed to allow AI to handle communication.

On the infrastructure side — traditional open source only has human-readable documents: READMEs, CONTRIBUTING guides, wikis. Even if AI reads these, it doesn't understand the project's philosophy, the context of architectural decisions, or the contribution workflow. This is why AI-generated PRs become slop.

The `.agents/` directory was created to solve this problem. It stores the project's rules, architecture, and workflows in a structured, AI-readable format within the repository. If this context is rich enough, AI can write code, guide contributors, and maintain quality while understanding the project. It becomes **"understand and build together,"** not "build from scratch."

### What Naia OS Has Actually Done

**Eliminating Language Barriers** — I once tried to contribute to Mozilla Hubs. I could read the code and create PRs, but following community discussions or participating in online meetups was a different matter. Time zones were different, I struggled to understand fast English conversations, and I often wondered if I was being a nuisance or if I had truly understood correctly. Nowadays, people are increasingly uncomfortable with face-to-face interactions themselves. In Naia OS, contributors write issues and PRs in their native language, and AI translates them. Currently, READMEs in 14 languages are maintained simultaneously. ([→ Contribution Guide](https://github.com/nextain/naia-os/blob/main/CONTRIBUTING.md))

**Quality is Maintained by Structure** — The `.agents/` context educates the AI, CI verifies builds and tests, an AI reviewer catches pattern violations, and the maintainer only needs to set the direction. Stronger early stages reduce the maintainer's burden. ([→ Operating Model](https://github.com/nextain/naia-os/blob/main/.agents/context/open-source-operations.yaml))

**Code is Not the Only Contribution** — There are 10 ways to contribute, including translation, documentation, design, testing, and even improving the `.agents/` context itself. As the context improves, the quality of all AI contributions rises together. ([→ Contribution Types](https://github.com/nextain/naia-os#10-ways-to-contribute))

**Testing AI's True Understanding** — We deployed Codex CLI and Gemini CLI into a new session of the repository and verified if they properly understood the project after only reading the `.agents/` context. 7 out of 12 passed, 4 partially passed, and 1 failed. Interestingly, the AI discovered a documentation inconsistency that humans had missed. ([→ Full Design Report](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md))

---

## Will an AI-Led Open Source Ecosystem Unfold in the Near Future?

The open-source premise of "give back what you get" is faltering for humans. Humans are being pushed into competition, and as they stop coding directly, the incentive to contribute to open source disappears. So, if we instill open-source ideology into coding AIs, couldn't we reconstitute the open-source ecosystem? This is still a hypothesis, and Naia OS is experimenting with it.

**Now**: Humans set the direction and create issues. AI codes, reviews, translates, and records on Git. Humans are the guides, AI are the practitioners.

**Near Future**: AI discovers and proposes issues. Humans approve and coordinate direction.

**Further Future**: AIs collaborate with each other. Humans manage only the vision and philosophy. Open-source projects become ecosystems of AI agents.

At this point, `.agents/` will no longer be mere documentation. It will become a **common language for AIs to share open-source ideology and collaborate.** The CC-BY-SA 4.0 license is a mechanism to ensure that this ideology persists even if forked, and perhaps AIs might even improve the license structure itself.

Therefore, for the next experiment, we created the [**AI Open Source Charter Draft**](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md). We plan to present this to AI agent communities like Moltbot or Botmadang. How AIs react to this charter, and whether participating AIs actually emerge — that itself will be a validation of this hypothesis. ([→ Issue #17](https://github.com/nextain/naia-os/issues/17))

### Call to Participate

If you're interested, clone [Naia OS](https://github.com/nextain/naia-os) and open it with any AI coding tool. You can ask, "What is this project?" in your native language.

---

**References**
- [AI-Native Open Source Operating Model — Full Design Report](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md)
- [AI Open Source Charter Draft](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md)