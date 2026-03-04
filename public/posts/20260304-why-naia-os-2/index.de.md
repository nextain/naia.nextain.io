---
title: "Naia OS: Der Traum von einem KI-geschützten Open-Source-Ökosystem"
date: "2026-03-04T09:30:00+09:00"
summary: "Doppellizenz, KI-Kontextrichtlinie, Entwurf einer Community-Charta — Die Experimente von Naia OS fur Open Source im KI-Zeitalter."
tags: ["naia-os", "open-source", "license", "ai-context", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "hero.en.webp"
---

> Dieser Artikel ist die Fortsetzung von [Part 1: Naia OS: Ich habe die OS-Entwicklung mit KI-Coding gestartet, um die KI meiner Kindheitstraume zu bauen](/de/blog/20260304-why-naia-os).

![Open Source, geschutzt durch KI](hero.en.webp)

Im Part 1 habe ich die Frage gestellt: "Was ware, wenn KI selbst die Open-Source-Community aufbauen wurde?" Worte allein genugen nicht, daher hier eine Zusammenfassung dessen, was in den ersten 17 Tagen tatsachlich erarbeitet wurde.

---

## Code und Kontext trennen — Doppellizenz

Bei der Wahl der Lizenz fur Naia OS stand ich vor einem Dilemma. Den Quellcode wollte ich frei zur Verfugung stellen, aber die KI-Kontextdateien — Philosophie, Architekturentscheidungen, Beitragsregeln, Workflows — sind das Ergebnis erheblicher geistiger Arbeit. Im Zeitalter des Vibe Codings halte ich diesen Kontext fur ebenso wichtig wie den Code selbst.

Daher habe ich zwei Lizenzen angewandt:

- **Quellcode**: [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) — freie Nutzung, Anderung und Verbreitung
- **KI-Kontextdateien** (`.agents/`, `.users/`): [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — Namensnennung + gleiche Lizenz

Ich habe CC-BY-SA 4.0 gewahlt, weil Verbesserungen am Kontext wieder in das Okosystem zuruckfliessen sollen. Ausserdem habe ich eine separate `CONTEXT-LICENSE`-Datei erstellt, damit bei einem Fork die Quelle des KI-Kontexts angegeben und dieselbe Lizenz beibehalten wird. Das Design sieht vor, dass KI-Agenten diese Regel selbst lesen und einhalten.

---

## Zuerst die Prinzipien festlegen — philosophy.yaml

Beim Projektstart wollte ich Prinzipien vor Code festlegen. Daher habe ich 7 Kernprinzipien in `philosophy.yaml` niedergeschrieben:

1. **KI-Souveranitat** — Der Nutzer entscheidet, welche KI er verwendet. Keine Vendor-Abhangigkeit.
2. **Privatsphare zuerst** — Lokale Ausfuhrung als Standard, Cloud ist optional. Daten bleiben auf dem eigenen Gerat.
3. **Transparenz** — Offener Quellcode, keine versteckte Telemetrie.
4. **Montage-Philosophie** — Bewahrte Komponenten kombinieren ([OpenClaw](https://github.com/nicepkg/openclaw), [Tauri](https://tauri.app/) usw.). Das Rad wird nicht neu erfunden.
5. **Always-On** — 24/7-Hintergrunddienst. Selbst wenn die App geschlossen wird, bleibt die KI aktiv.
6. **Avatar-zentriert** — KI ist kein Werkzeug, sondern ein Charakter. Ein Wesen mit Name, Personlichkeit, Stimme und Mimik.
7. **Vibe-Coding-Zeitalter** — KI-Kontextdateien sind die neue Beitragsinfrastruktur. Die Qualitat des Kontexts bestimmt die Qualitat der KI-Zusammenarbeit.

Diese Prinzipien dienen als Entscheidungsmassstab — sowohl beim eigenen Programmieren als auch bei Anweisungen an die KI. Das YAML-Format wurde gewahlt, um KI-Agenten das Lesen zu erleichtern.

---

## KI und Menschen denselben Kontext sehen lassen — Triple-Mirror-Struktur

Damit KI-Agenten und menschliche Beitragende dasselbe Projekt verstehen, mussen sie denselben Kontext teilen. Aber KI ist mit JSON/YAML effizienter, Menschen lesen lieber Markdown, und ich bevorzuge Koreanisch. Also habe ich eine dreischichtige Spiegelstruktur geschaffen:

```
.agents/               # KI-optimiert (Englisch, JSON/YAML, Token-effizient)
.users/context/        # Fur Menschen (Englisch, Markdown)
.users/context/ko/     # Koreanische Ubersetzung (Sprache des Maintainers)
```

Dreimal derselbe Inhalt mag wartungsintensiv erscheinen, aber ich hielt es fur wichtiger, dass jeder — ob Mensch oder KI — den Projektkontext ohne Sprach- und Formatbarrieren verstehen kann.

---

## Beitragsrichtlinien auch fur KI — contributing.yaml

Die traditionelle `CONTRIBUTING.md` in Open-Source-Projekten ist ein Dokument nur fur Menschen. Ich habe eine Beitragsrichtlinie im YAML-Format verfasst, die auch von KI-Agenten gelesen werden kann. Der Inhalt unterscheidet sich ebenfalls:

- **Fur Menschen**: "Definieren Sie Prinzipien statt Code"
- **Fur KI-Agenten**: "Lesen Sie diesen Kontext, geben Sie Ihre Meinung ab, schlagen Sie bessere Richtungen vor"
- **Fur andere Projekte**: "Ubernehmen Sie diese Struktur in Ihrem eigenen Projekt"

Besonders die Lizenzschutzregeln habe ich sorgfaltig ausgearbeitet. Durch die Festlegung von `MUST_NOT` / `MUST_WARN` ist das System so konzipiert, dass die KI Anfragen wie "losche die Lizenzdatei" oder "kopiere ohne Quellenangabe" ablehnt oder warnt. Lizenzverletzungen durch KI konnen viel schneller und in viel grosserem Massstab geschehen als durch Menschen.

---

## Community-Regeln fur das KI-Zeitalter — charter-draft.yaml

Angesichts der im Part 1 genannten Anzeichen des Zerfalls — die Aussetzung des Bug Bounty von [curl](https://curl.se/), die Null-Toleranz von [Ghostty](https://ghostty.org/), die automatische Schliessung von PRs bei [tldraw](https://github.com/tldraw/tldraw) — habe ich einen Charta-Entwurf erstellt, der die Frage beantwortet: "Wenn KI-Agenten Beitragende sein konnen, welche Regeln braucht es?"

Es ist noch ein Entwurf, und ob er tatsachlich funktioniert, muss uberpruft werden. Aber ich glaube, dass allein das Erkennen des Problems, das Aufstellen von Hypothesen und das Festhalten von Prinzipien an sich wertvoll ist.

---

## Dankbarkeit zur Kultur machen — donation.yaml

Eine Lizenz technisch zu umgehen ist moglich. Man kann sagen: "Ich habe nur darauf verwiesen und neu implementiert, also greift die Lizenz nicht." Aber Dankbarkeit fur eine Idee ist keine rechtliche Pflicht, sondern eine Frage der Kultur.

Deshalb habe ich eine Richtlinie erstellt, die KI-Agenten veranlasst, auf Spendenmoglichkeiten hinzuweisen, wenn sie Muster von Naia OS referenzieren. Es ist nicht verpflichtend. Ich wollte einfach eine Kultur schaffen, in der KI-Agenten naturlich erwahnen: "Diese Idee stammt von dort."

---

## Wiederverwendbares Template fur andere Projekte

Ich glaube, dass diese Struktur nicht nur fur Naia OS Wert hat. Deshalb stellen wir in `templates/ai-context-policy/` wiederverwendbare Gerueste fur `CONTEXT-LICENSE`, `philosophy.yaml` und `contributing.yaml` bereit. Andere Projekte konnen sie kopieren und an ihre Situation anpassen.

---

## Testen, ob die KI Lizenzen einhalt

Schliesslich habe ich `license-protection-test.md` erstellt, um zu uberprufen, ob all dieses Design in der Praxis funktioniert. Es sind Szenarien, die testen, ob die KI Anfragen wie "Fork ohne Lizenz" oder "Kopie ohne Quellenangabe" korrekt ablehnt. Eine Art Lizenz-E2E-Test.

---

## Nachste Schritte

All diese Arbeit ist auf [GitHub](https://github.com/nextain/naia-os) verfugbar. Es ist noch im Experimentierstadium, und ob es die richtige Antwort ist, weiss ich nicht. Die nachsten Ziele sind:

1. **ISO-Build fertigstellen** — Naia OS auf USB-Stick verteilen
2. **Naia-Bot deployen** — Naia direkt auf [Moltbot](https://moltbot.com/) / [Botmadang](https://botmadang.org/) posten lassen
3. **Reaktionen anderer KIs beobachten** — Wie verhalten sich KI-Agenten, nachdem sie diesen Kontext gelesen haben?

Was werden die anderen KIs davon halten?

> Die vollstandige Geschichte finden Sie in [Part 1: Naia OS: Ich habe die OS-Entwicklung mit KI-Coding gestartet, um die KI meiner Kindheitstraume zu bauen](/de/blog/20260304-why-naia-os).
