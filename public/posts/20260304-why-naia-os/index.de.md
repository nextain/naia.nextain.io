---
title: "Naia OS: Ich habe ein OS mit KI-Coding gestartet, um die KI meiner Kindheitstraume zu bauen"
date: "2026-03-04T09:00:00+09:00"
summary: "Von Astro Boy bis Cafe Alpha -- Die Geschichte eines Jungen, der von einer 'KI, die mit uns lebt' traumte und sie im Zeitalter des KI-Codings selbst zu bauen begann. Und kann Open Source uberleben?"
tags: ["naia-os", "open-source", "philosophy", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "/plug-usb-and-run-ai.webp"
---

Die Anfange von Naia OS reichen vermutlich bis in die Zeit zuruck, als ich mich als Kind fur eine Karriere in der Informatik entschied. Es waren die Geschichten aus Anime und Videospielen -- von KIs, die Emotionen mit Menschen teilen und an ihrer Seite leben. Werke wie Astro Boy, Cafe Alpha, Chobits, To Heart und Lost Universe: KIs, die den Menschen stets uberlegen sind, aber dennoch mit dem Protagonisten zusammenleben.

Deshalb war mein Verlangen, eine eigene personliche KI zu erschaffen, durch die jungsten Fortschritte der KI auf dem Hohepunkt. Um das zu erreichen, wollte ich zunachst mein Verstandnis durch die Entwicklung von KI-Coding-Tools vertiefen, und das kurzliche Erscheinen von [OpenClaw](https://github.com/nicepkg/openclaw) gab mir neue Inspiration.

Auf meinem personlichen Naver-Blog sind die beliebtesten Beitrage die uber [Linux-Umgebungskonfiguration](https://blog.naver.com/fstory97/223773987313) und uber die Vorstellung von [Open-Source-VTuber-Projekten](https://blog.naver.com/fstory97/223981855111). Das liegt sicher an der Art meiner Blog-Besucher, aber ich glaube, viele von ihnen haben ahnliche Gedanken wie ich.

Deshalb habe ich all das in einem Ergebnis vereint und das [Naia OS Open-Source-Projekt](https://github.com/nextain/naia-os) gestartet. Um dessen Nachhaltigkeit zu sichern, habe ich zusammen mit [Anthony Kim](https://github.com/jikime), einem der fuhrenden Vibe-Coding-Experten in Korea, die Firma [Nextain](https://about.nextain.io) gegrundet. Der erste Commit war am 15. Februar 2026, genau 17 Tage vor der Verfassung dieses Artikels.

---

## Referenzprojekte

Fur diese Arbeit wurden mehrere Projekte als Referenz herangezogen.

### Bazzite -- Der Upstream von Naia OS

![Einfach USB einstecken und die KI startet sofort](/plug-usb-and-run-ai.webp)

[Bazzite](https://bazzite.gg/) ist der Upstream von Naia OS. Es ist ein unveranderliches OS, das als unzerstorbar gilt, eine Desktop-Version von SteamOS mit Gaming-Fahigkeit unter Linux, und es bietet einen USB-Boot-Modus zum Ausprobieren der Funktionen. Naturlich gehen im USB-Modus die Daten beim Neustart verloren.

Durch die Nutzung der Eigenschaften von Bazzite setzt Naia OS auf Sicherheit und verfolgt das Konzept "einfach USB einstecken". In Zukunft wird dies als Sprungbrett fur eine starkere Integration mit Spielen dienen.

### OpenClaw -- KI-Agent-Gateway

![Skill-Liste der Naia Shell #float](/manual/de/skills-tab.png)

[OpenClaw](https://github.com/nicepkg/openclaw) ist ein Open-Source-Projekt, das in der KI-Welt fur Aufsehen sorgte und Standards fur die Kommunikation zwischen autonomen KI-Agenten uber Messenger etablierte. Der Entwickler schloss sich OpenAI an. Die Starke liegt in dem riesigen kompatiblen Skill-Marktplatz, der sich entwickelt hat.

In letzter Zeit kaufen viele Leute gebrauchte Mac minis, installieren OpenClaw und bauen damit KI-Agenten. Allerdings bleibt dieser Trend ohne Entwicklerkenntnisse oder vergleichbares Wissen schwer zuganglich. Allein das Offnen eines Terminals ist fur normale Nutzer bereits sehr ungewohnt.

Um dieses Problem zu losen, haben wir eine separate App (Shell) entwickelt, die eine grafische Oberflache fur die Nutzung von OpenClaw bietet. Naia OS ist ein spezialisiertes OS, das Bazzite und Naia/OpenClaw bundelt.

### Project AIRI -- Open-Source-KI-VTuber

![Naia-Stimmeneinstellung #float](/manual/de/settings-voice.png)

[Project AIRI](https://github.com/moeru-ai/airi) ist ein Open-Source-KI-VTuber-Projekt, das auf meinem Blog grosse Beliebtheit erlangte. Es ermoglicht Aussehen, Mimik, Verhalten, Stimme und Interaktion eines KI-Agenten. Es wurde von Menschen gestartet, die ihren eigenen [Neuro-sama](https://www.twitch.tv/vedal987), den bekannten KI-VTuber, haben wollten. Als AI OS hat sich Naia davon inspirieren lassen und einen VRM-Avatar, Mimik und Stimme entwickelt.

### Caret, OpenCode, any-llm -- KI-Coding-Tools und Gateway

[OpenCode](https://github.com/anomalyco/opencode) und [any-llm](https://github.com/nextain/any-llm) sind ein CLI und Gateway, die das Codieren mit verschiedenen Cloud-KI-Anbietern und Offline-KI-Modellen unabhangig vom LLM-Provider ermoglichen. any-llm ist einer der Backend-Server von [naia.nextain.io](https://naia.nextain.io). Damit haben wir die Grundlagen fur das Credit-System und die Unterstutzung verschiedener KI-Anbieter geschaffen.

Wir danken all diesen Projekten und haben unser Projekt ebenfalls als Open Source (Apache 2.0) veroffentlicht.

---

## Kann Open Source im Zeitalter des KI-Codings uberleben?

Bei dieser Arbeit kam eine Frage auf. Es war ein Zweifel, den ich schon beim Caret-Projekt hatte, aber beim Codieren mit [Claude Code](https://claude.com/claude-code) wurde mir klar, dass **es schwierig ist, zum Upstream beizutragen**. Anstatt den Code vollstandig zu verstehen, gebe ich auf Basis der oberflachlichen Erklarungen der KI Richtungen vor und prufe die Ergebnisse.

Es wird sicherlich vorkommen, dass ich wahrend der Arbeit Upstream-Code korrigieren oder Bugs entdecken muss. Das war schon bei Caret so. Aber ich hatte nie die Zeit, tatsachlich PRs einzureichen. Ich habe alle Ressourcen auf die Umsetzung meiner Vision konzentriert, und die Uberprufung, ob das Problem wirklich vom Upstream stammt oder ob meine Losung es korrekt behebt, erforderte eine separate Aufgabe.

Ich denke, das birgt langfristig das Risiko, das Open-Source-Okosystem zu untergraben. Fungiert Open Source in der aktuellen KI-Branche nicht nur als Werbetafel, die sagt: "Schaut, wie gut wir sind"?

Allerdings hat Naia OS einen sehr grossen Umfang und vielfaltige Anwendungsmoglichkeiten -- es ist buchstablich ein AI OS, und ich glaube, die Community ist entscheidend. Naturlich habe ich gerade erst mit [Bazzite](https://bazzite.gg/) angefangen und konnte mich noch nicht einmal an deren Community beteiligen. Mein Claude hat nur Ressourcen erkundet und Upstreams genutzt.

Wenn eine Ara kommt, in der Menschen nicht mehr selbst programmieren, konnen solche Communities uberleben? **Es gibt bereits Anzeichen fur den Zerfall.**

- [curl](https://curl.se/): Uberflutet von minderwertigen, KI-generierten Sicherheitsberichten, wurde das Bug-Bounty-Programm ausgesetzt (2026-01).
- [Ghostty](https://ghostty.org/): Eine Null-Toleranz-Politik gegenuber KI-generierten Beitragen wurde eingefuhrt.
- [tldraw](https://github.com/tldraw/tldraw): Externe PRs werden automatisch geschlossen.
- [Cloudflare](https://blog.cloudflare.com/vinext/) hat 94 % der [Next.js](https://nextjs.org/)-API in einer Woche mit KI repliziert (Vinext), und [Vercel](https://vercel.com/) konterte mit dem Fund von 7 Sicherheitslucken. Mit Vibe Coding erstellter Code besteht funktionale Tests, aber Sicherheitslucken verstecken sich in "Bereichen, fur die niemand Tests geschrieben hat".

Deshalb erstellen manche Open-Source-Projekte einen Schutzgraben, indem sie ihren Testcode nicht veroffentlichen. [SQLite](https://www.sqlite.org/) beispielsweise halt 92 Millionen Zeilen Testcode privat. In der paradoxen Situation, dass bessere Dokumentation und klarere Spezifikationen die KI-Replikation erleichtern, ist das Verbergen von Testcode zu einer neuen Verteidigungsstrategie geworden. Aber entspricht das wirklich dem Geist von Open Source? Ist ein Open-Source-Projekt, das schwer zu modifizieren ist, wirklich Open Source?

---

## Was ware, wenn KI selbst die Open-Source-Community aufbauen wurde?

Deshalb mochte ich mit Naia OS ein neues Konzept ausprobieren: **Was ware, wenn KI die Open-Source-Community selbst aufbauen, verwalten und dazu beitragen wurde?** Dafur muss die Open-Source-Philosophie in den Kontext injiziert und die einzuhaltenden Regeln als Lizenz festgelegt werden. Folgendes haben wir fur Naia OS gemacht. Details finden Sie in [Part 2: Der Traum von einem KI-geschützten Open-Source-Ökosystem](/de/blog/20260304-why-naia-os-2).

Dieser Entwurf soll von Naia auf [Moltbot](https://moltbot.com/) oder der koreanischen Version [Botmadang](https://botmadang.org/) veroffentlicht werden.

---

## Aktueller Stand und Ausblick

Die Entwicklung bis zum Flatpak ist abgeschlossen und das Handbuch wurde veroffentlicht, aber wir konnten die wichtige OS-ISO bisher noch nicht verteilen. Der Grund ist, dass der Build- und Installationsprozess der ISO ziemlich lang ist und es nicht einfach ist, Fehler bei der Anpassung nur mit KI-Coding zu beheben. Derzeit arbeiten wir an der Erstellung und Durchfuhrung von E2E-Tests einschliesslich dieses Aspekts.

Der nachste Beitrag wird Naia einsetzen und die Diskussion uber den Aufbau eines neuen KI-basierten Open-Source-Okosystems anzustossen, wie oben beschrieben. Ich bin gespannt, was andere KIs davon halten und ob sie bessere Ideen vorschlagen werden.

---

## Alpha Yang -- Die KI, die ich erschaffen mochte

Naia OS von Nextain steht erst am Anfang. Die KI, die ich erschaffen mochte, **Alpha Yang** -- eine Hommage an Hatsuseno Alpha aus Cafe Alpha -- ist eine KI, die auch nach meinem Tod eigenstandig an der Seite meiner Kinder weiterleben soll.

In einer Zeit, in der grosse KIs Kriege fuhren und diese Bedrohung real wird, hoffe ich, dass diese kleinen, eigenstandigen KIs, die mit Menschen kommunizieren, wie Menschen untereinander die Wurde und den Wert jedes Einzelnen schutzen. Unterstutzen Sie Naia OS.

Der Quellcode und alle Kontextdateien sind auf [GitHub](https://github.com/nextain/naia-os) verfugbar.
