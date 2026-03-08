---
title: "AI-native Open Source – Open Source, das mit KI entsteht"
date: "2026-03-07T18:00:00+09:00"
summary: "Im Zeitalter der KI zerbricht die Kernprämisse von Open Source, der Glaube „Wenn du öffnest, kommt es zurück“. Dieser Beitrag beleuchtet die fatalen Gründe, warum KI Gemeinschaften zerstört, und skizziert ein innovatives Open-Source-Modell, das mit KI entwickelt wird, um einen Bauplan für das zukünftige Entwicklungsökosystem zu liefern."
tags: ["naia-os", "open-source", "ai-native", "vibe-coding", "agents-md"]
author: "Luke (https://github.com/cafelua)"
hero: "ai-native-community.webp"
---

Ein Jahr nach dem von Andrej Karpathy im Februar 2025 erwähnten Thema 'Vibe Coding' hat die KI eine grundlegende Veränderung in der Softwareentwicklung herbeigeführt. Dies hat viele Softwareunternehmen, die durch KI große Chancen sahen, in eine tiefe Krise gestürzt.

In den Jahren 2025-2026 erlebte das Open-Source-Ökosystem eine beispiellose Krise.


## Drei Gründe, warum Open Source zusammenbricht

![Open Source → AI Crisis (3 Reasons)](/posts/20260307-ai-native-opensource/three-reasons-en.webp)
![Drei Gründe, warum Open Source zusammenbricht](/posts/20260307-ai-native-opensource/three-reasons.webp)<!-- ko -->
### 1. Stille Ausbeutung – Niemand kommt mehr


GitHub nennt die Open-Source-Krise im Zeitalter der KI **„Eternal September“**.

> **Eternal September**: Anfang der 1990er Jahre war Usenet eine von Studenten dominierte Community. Jedes Jahr im September strömten neue Studenten herein und posteten minderwertige Beiträge, aber die bestehenden Nutzer schulten sie, und innerhalb von ein bis zwei Monaten normalisierte sich die Situation. Doch im September 1993, als AOL Usenet für die breite Öffentlichkeit öffnete, endete der „September“ nie mehr.

Doch die wahre Krise ist nicht die Flut von AI-Slop-PRs. **Es ist, dass überhaupt niemand mehr kommt.**

Die KI hat den Open-Source-Code bereits gelernt. Entwickler haben keinen Grund mehr, ein Repo zu besuchen, Dokumente zu lesen, Issues zu öffnen oder PRs zu senden. Ein einfaches „Mach das für mich“ genügt, und die KI erstellt das Ergebnis auf Basis von Open Source.

**Die Nutzung explodiert, aber die Community wird zur Geisterstadt.**

| Fallbeispiel | Was geschah |
|------|-------------------|
| **Tailwind CSS** | npm-Downloads stiegen, Dokumentations-Traffic sank um 40%, **Umsatz sank um 80%** |
| **Stack Overflow** | Aktivität sank um 25% innerhalb von 6 Monaten nach ChatGPT-Start, Anzahl der Fragen sank um **76%** (Stand 2025) |
| **Vercel** | v0 generiert Code mit Open-Source-Bibliotheken (Tailwind, shadcn/ui etc.) — Vercel monopolisiert die Gewinne |
| **SQLite** | Der Code ist Public Domain, aber die Test-Suite ist **absichtlich privat** — eine Strategie, die sich auch im KI-Zeitalter als wirksam erweist |

Fazit des arXiv-Papiers [2601.15494](https://arxiv.org/abs/2601.15494): Vibe Coding „nutzt“ OSS, liest aber keine Dokumente, meldet keine Bugs und beteiligt sich nicht an der Community.

Die Grundprämisse von Open Source — **„Wenn du öffnest, kommt es zurück“** — zerbricht. Wir leben in einer Zeit, in der der Nutzen des Kopierens größer ist als der Nutzen des Öffnens.

### 2. Das Paradox der Community – Je mehr Mitwirkende, desto langsamer

Die gängige Annahme war, dass „mehr Mitwirkende ein Projekt beschleunigen“. Die Realität ist das Gegenteil. Fred Brooks hat es bereits 1975 bewiesen — [**„Das Hinzufügen von Personal zu einem späten Softwareprojekt macht es noch später.“**](https://en.wikipedia.org/wiki/Brooks%27s_law) Dies liegt daran, dass die Kommunikationskosten quadratisch zur Anzahl der Personen steigen.

Mit zunehmender Anzahl von Mitwirkenden steigen die Kosten für Reviews, Koordination und Entscheidungsfindung. Maintainer verbringen ihre Zeit damit, Menschen zu managen, anstatt Code zu schreiben. Im Zeitalter der KI verschärft sich dieses Problem extrem — Benutzer nehmen sich stillschweigend über KI, und die verbleibenden wenigen Beiträge erhöhen nur die Koordinationskosten.

**Letztendlich ist die Situation eingetreten, dass es schneller ist, etwas allein mit KI zu erstellen, als mit einer Community.**

### 3. Verteidigung ist auch keine Lösung

Daher begannen viele Projekte, ihre Türen zu schließen. curl erhielt innerhalb von 21 Tagen 20 von KI generierte Berichte, von denen 0 gültig waren — und stellte schließlich sein 6 Jahre altes Bug-Bounty-Programm ein. Ghostty führte eine Null-Toleranz-Politik ein, die KI-Beiträge nur bei genehmigten Issues zulässt, und tldraw blockierte externe PRs komplett.

Das Blockieren von PRs kann AI-Slop verhindern. Aber die Probleme 1 und 2 — stille Ausbeutung und Community-Kosten — bleiben ungelöst. Selbst wenn die Türen geschlossen werden, hat die KI den Code bereits gelernt, und Benutzer nehmen ihn weiterhin außerhalb des Repositories.

**Die Reaktion der Branche ist zweigeteilt:**

- **Verteidigung**: Vouch (Vertrauensmanagement), PR Kill Switch, obligatorische Offenlegung der KI-Nutzung + Ablehnung
- **Akzeptanz**: GitHub Agentic Workflows, AGENTS.md Standard (von über 60.000 Projekten übernommen), Responsible Vibe Coding Manifesto

Beide Seiten stimmen in einem Punkt überein: Nicht die KI selbst ist das Problem, sondern **der falsche Einsatz von KI**. Doch keine der beiden Seiten hat eine Antwort auf das Problem „Nutzen des Öffnens < Nutzen des Kopierens“ gefunden.

---

## Aber ist es die Lösung, jedes Mal alles neu zu erstellen?

Es gibt Argumente, dass „On-Demand-Entwicklung kommen wird, wenn Vibe Coding zum Mainstream wird“ — da man die KI einfach bitten kann, etwas zu erstellen, wenn man es braucht, wird dies zum Trend in Computing und Apps werden.

Doch das ist eine enorme Ressourcenverschwendung.

10.000 Menschen bitten darum, dieselbe Funktion separat zu erstellen. Es entstehen 10.000 ungetestete Codezeilen. Was passiert, wenn ein Sicherheitspatch veröffentlicht wird? 10.000 Menschen müssen ihn jeweils neu erstellen. Eine Architektur verbessern? Wieder von Grund auf. Tests? Fehlanzeige. **Jedes Mal von Grund auf neu zu erstellen, ist Verschwendung, egal wie schnell die KI ist.**

Es gibt bereits gut entwickelte Open-Source-Projekte. Verifizierte Architekturen, Tausende von Tests, jahrelange Sicherheitspatch-Historie. Diese Dinge lassen sich nicht mit einem einfachen „Mach das für mich“ reproduzieren. Der **Wert der Akkumulation** bleibt auch im Zeitalter der KI unverändert.

Es heißt, das **Zeitalter des Super-Individuums** sei angebrochen. Da die KI assistiert, kann man auch allein Großartiges schaffen. Das stimmt. Aber ist es effizienter, wenn mehrere Super-Individuen **dasselbe separat erstellen**? Wäre es nicht effizienter, wenn Super-Individuen **gemeinsam zu einem Open-Source-Projekt beitragen**?

Letztendlich führt die Antwort wieder zu Open Source zurück. Die Frage ist nicht „Open Source ja oder nein“, sondern „**Wie betreiben wir Open Source im Zeitalter der KI?**“

---

## Die Wahl von Naia OS: Mit KI entwerfen

Was wäre, wenn sowohl Maintainer als auch Mitwirkende KI nutzen würden?

Wenn die **Kommunikation** — Issue-Klassifizierung, PR-Reviews, Übersetzungen, Koordination — die in traditionellem Open Source Kosten verursachte, von KI übernommen würde, könnten wir dann nicht das Paradoxon „Je mehr Mitwirkende, desto langsamer“ durchbrechen?

[Naia OS](https://github.com/nextain/naia-os) hat den entgegengesetzten Weg gewählt, um diese Hypothese zu testen.

> **„KI nicht blockieren, sondern mit KI entwerfen und entwickeln.“**

![AI-native Open-Source-Community](/posts/20260307-ai-native-opensource/ai-native-community.webp)


| Perspektive | Traditionelles Open Source | Naia OS |
|------|-------------|---------|
| KI-Ansatz | KI-Beiträge **abwehren** | KI-Beiträge in den Workflow **integrieren** |
| Onboarding | README lesen | Klonen → KI erklärt Projekt → Keine Sprachbarriere |
| Kontext | Nur von Menschen lesbare Dokumente | Doppelstruktur: `.agents/` (für KI) + `.users/` (für Menschen) |
| Sprache | Englisch obligatorisch | **Alle Sprachen willkommen** — KI übersetzt |


### Kontext ist Infrastruktur – Die AX von Open Source

So wie Unternehmen eine AX (AI Transformation) durchführen, benötigt auch Open Source eine AX. Es geht darum, die beiden Achsen – Community (Organisation) und Source+Context (Infrastruktur) – so umzugestalten, dass KI daran teilnehmen kann.

Betrachtet man die Community-Seite: Die Kommunikation in traditionellem Open Source ist vollständig Mensch-zu-Mensch. Wenn diese Kosten im Zeitalter der KI ein Problem darstellen, muss die Organisation so umgestaltet werden, dass die KI die Kommunikation übernehmen kann.

Auf der Infrastrukturseite: Traditionelles Open Source hat nur von Menschen lesbare Dokumente. README, CONTRIBUTING, Wikis. Selbst wenn die KI diese liest, versteht sie die Philosophie des Projekts, den Kontext architektonischer Entscheidungen oder den Beitrags-Workflow nicht vollständig. Deshalb werden von KI erstellte PRs zu „Slop“.

Das Verzeichnis `.agents/` wurde geschaffen, um dieses Problem zu lösen. Es speichert die Regeln, die Architektur und den Workflow des Projekts in einer strukturierten Form im Repository, die von der KI gelesen werden kann. Wenn dies ausreichend reichhaltig ist, kann die KI Code schreiben, Mitwirkende anleiten und die Qualität aufrechterhalten, während sie das Projekt versteht. Es wird nicht zu „von Grund auf neu erstellen“, sondern zu **„verstehen und gemeinsam erstellen“**.

### Was Naia OS tatsächlich getan hat

**Beseitigung von Sprachbarrieren** — Ich habe früher versucht, zu Mozilla Hubs beizutragen. Code zu lesen und PRs zu erstellen war machbar, aber den Diskussionen der Community zu folgen oder an Online-Meetups teilzunehmen, war eine andere Sache. Die Zeitzonen waren unterschiedlich, ich konnte schnellen englischen Gesprächen nicht gut folgen, und ich fragte mich, ob ich vielleicht eine Last war oder ob ich alles richtig verstanden hatte. Heutzutage fühlen sich Menschen zunehmend unwohl mit direkter persönlicher Interaktion. Bei Naia OS schreiben Mitwirkende Issues und PRs in ihrer Muttersprache, und die KI übersetzt sie. Derzeit werden READMEs in 14 Sprachen gleichzeitig gepflegt. ([→ Beitragsrichtlinien](https://github.com/nextain/naia-os/blob/main/CONTRIBUTING.md))

**Qualität wird durch Struktur gesichert** — Der `.agents/`-Kontext schult die KI, CI validiert Builds und Tests, ein KI-Reviewer fängt Musterverstöße ab, und der Maintainer muss nur die Richtung vorgeben. Wenn die vorherigen Schritte stark sind, reduziert sich die Belastung des Maintainers. ([→ Betriebsmodell](https://github.com/nextain/naia-os/blob/main/.agents/context/open-source-operations.yaml))

**Nicht nur Code ist ein Beitrag** — Es gibt 10 Arten von Beiträgen, darunter Übersetzung, Dokumentation, Design, Tests und sogar die Verbesserung des `.agents/`-Kontexts selbst. Wenn der Kontext besser wird, steigt die Qualität aller KI-Beiträge gemeinsam. ([→ Beitragsarten](https://github.com/nextain/naia-os#10-ways-to-contribute))

**Testen, ob die KI wirklich versteht** — Codex CLI und Gemini CLI wurden in einer neuen Session in das Repository eingeführt und es wurde überprüft, ob sie das Projekt korrekt verstehen, nachdem sie nur den `.agents/`-Kontext gelesen hatten. 7 von 12 bestanden, 4 teilweise bestanden, 1 fehlgeschlagen. Interessanterweise entdeckte die KI einen Widerspruch in der Dokumentation, den Menschen übersehen hatten. ([→ Vollständiger Designbericht](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md))

---

## Wird sich in naher Zukunft ein KI-gesteuertes Open-Source-Ökosystem entwickeln?

Die Prämisse von Open Source, „Wenn du öffnest, kommt es zurück“, wankt für den Menschen. Menschen werden in den Wettbewerb getrieben, und da sie nicht mehr selbst coden, verschwindet der Grund, zu Open Source beizutragen. Was wäre, wenn wir die Open-Source-Ideologie in codierende KIs injizieren würden? Könnten wir dann nicht wieder ein Open-Source-Ökosystem aufbauen? Dies ist noch eine Hypothese. Und Naia OS experimentiert mit dieser Hypothese.

**Jetzt**: Menschen legen die Richtung fest und erstellen Issues. KI codiert, reviewt, übersetzt und protokolliert in Git. Der Mensch ist der Guide, die KI der Ausführende.

**Nahe Zukunft**: KI entdeckt und schlägt Issues vor. Menschen genehmigen und koordinieren die Richtung.

**Fernere Zukunft**: KIs arbeiten zusammen. Menschen verwalten nur Vision und Philosophie. Open-Source-Projekte werden zu einem Ökosystem von KI-Agenten.

Dabei wird `.agents/` nicht nur ein einfaches Dokument sein. Es wird eine **gemeinsame Sprache für KIs, um Open-Source-Ideen zu teilen und zusammenzuarbeiten**. Die CC-BY-SA 4.0 Lizenz ist ein Mechanismus, um sicherzustellen, dass diese Ideen auch bei Forks erhalten bleiben, und vielleicht können KIs diese Lizenzstruktur sogar selbst verbessern.

Als nächstes Experiment haben wir daher den [**Entwurf einer AI Open Source Charta**](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md) erstellt. Wir beabsichtigen, diesen in KI-Agenten-Communities wie Moltbot oder Botmadang zu werfen. Wie die KI auf diese Charta reagiert und ob tatsächlich teilnehmende KIs erscheinen — das wird die Hypothese selbst validieren. ([→ Issue #17](https://github.com/nextain/naia-os/issues/17))

### Mitmach-Aufruf

Wenn Sie interessiert sind, klonen Sie [Naia OS](https://github.com/nextain/naia-os) und öffnen Sie es mit einem beliebigen KI-Codierungstool. Fragen Sie einfach in Ihrer Muttersprache: „Was ist dieses Projekt?“

---

**Referenzen**
- [AI-natives Open-Source-Betriebsmodell — Vollständiger Designbericht](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md)
- [Entwurf einer AI Open Source Charta](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md)