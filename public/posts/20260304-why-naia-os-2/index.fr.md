---
title: "Naia OS: Rêver d'un écosystème open source protégé par l'IA"
date: "2026-03-04T09:30:00+09:00"
summary: "Double licence, politique de contexte IA, ebauche de charte communautaire — Les experiences de Naia OS pour l'open source a l'ere de l'IA."
tags: ["naia-os", "open-source", "license", "ai-context", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "hero.en.webp"
---

> Cet article fait suite au [Part 1 : Naia OS : J'ai commence a creer un OS par IA pour donner vie a l'IA dont je revais enfant](/fr/blog/20260304-why-naia-os).

![L'open source protege par l'IA](hero.en.webp)

Dans le Part 1, j'ai pose la question : "Et si l'IA creait elle-meme la communaute open source ?" Les paroles ne suffisent pas, alors voici un resume concret du travail realise pendant les 17 premiers jours.

---

## Separer le code du contexte — Double licence

Lors du choix de la licence de Naia OS, j'ai eu un dilemme. Je voulais ouvrir le code source librement, mais les fichiers de contexte IA — philosophie, decisions architecturales, regles de contribution, workflows — sont le fruit d'un travail intellectuel considerable. A l'ere du vibe coding, je considere que ce contexte est aussi important que le code lui-meme.

J'ai donc applique deux licences :

- **Code source** : [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) — utilisation, modification et distribution libres
- **Fichiers de contexte IA** (`.agents/`, `.users/`) : [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — attribution obligatoire + meme licence

J'ai choisi CC-BY-SA 4.0 car je voulais que si quelqu'un ameliore ce contexte, ces ameliorations reviennent a l'ecosysteme. J'ai egalement cree un fichier `CONTEXT-LICENSE` separe pour que, lors d'un fork, la source du contexte IA soit indiquee et la meme licence maintenue. L'idee est que les agents IA lisent et respectent eux-memes cette regle.

---

## Definir les principes avant tout — philosophy.yaml

Au demarrage du projet, je voulais etablir les principes avant le code. J'ai donc inscrit 7 principes fondamentaux dans `philosophy.yaml` :

1. **Souverainete IA** — C'est l'utilisateur qui choisit quelle IA utiliser. Pas de dependance a un fournisseur.
2. **Confidentialite d'abord** — Execution locale par defaut, le cloud est optionnel. Les donnees restent sur votre appareil.
3. **Transparence** — Code source ouvert, pas de telemetrie cachee.
4. **Philosophie d'assemblage** — Combinaison de composants eprouves ([OpenClaw](https://github.com/nicepkg/openclaw), [Tauri](https://tauri.app/), etc.). On ne reinvente pas la roue.
5. **Always-On** — Daemon en arriere-plan 24/7. Meme si vous fermez l'application, l'IA reste active.
6. **Centre sur l'avatar** — L'IA n'est pas un outil, c'est un personnage. Un etre avec un nom, une personnalite, une voix et des expressions.
7. **Ere du vibe coding** — Les fichiers de contexte IA sont la nouvelle infrastructure de contribution. La qualite du contexte determine la qualite de la collaboration avec l'IA.

Ces principes servent de criteres de jugement tant quand je code moi-meme que quand je donne des instructions a l'IA. J'ai choisi le format YAML pour faciliter la lecture par les agents IA.

---

## Faire en sorte que l'IA et les humains partagent le meme contexte — Structure triple-mirror

Pour que les agents IA et les contributeurs humains comprennent le meme projet, ils doivent partager le meme contexte. Mais l'IA est plus efficace avec JSON/YAML, les humains preferent le Markdown, et moi, le coreen. J'ai donc cree une structure de miroring a trois niveaux :

```
.agents/               # Optimise pour l'IA (anglais, JSON/YAML, economie de tokens)
.users/context/        # Pour les humains (anglais, Markdown)
.users/context/ko/     # Traduction coreenne (langue du mainteneur)
```

Avoir le meme contenu en trois exemplaires pose des questions de maintenance, mais j'ai juge plus important que chacun — humain ou IA — puisse comprendre le contexte du projet sans barriere de langue ni de format.

---

## Un guide de contribution pour l'IA aussi — contributing.yaml

Le `CONTRIBUTING.md` traditionnel des projets open source est un document destine uniquement aux humains. J'ai redige un guide de contribution au format YAML lisible egalement par les agents IA. Le contenu est aussi different :

- **Pour les humains** : "Definissez les principes avant le code"
- **Pour les agents IA** : "Lisez ce contexte, donnez votre avis, proposez de meilleures orientations"
- **Pour les autres projets** : "Adoptez cette structure dans votre propre projet"

J'ai porte une attention particuliere aux regles de protection des licences. En les explicitant avec `MUST_NOT` / `MUST_WARN`, j'ai concu le systeme pour que l'IA refuse ou avertisse face a des demandes telles que "supprime le fichier de licence" ou "copie sans attribution". La violation de licence par l'IA peut se produire bien plus rapidement et a bien plus grande echelle que par un humain.

---

## Regles communautaires pour l'ere de l'IA — charter-draft.yaml

Face aux signes d'effondrement mentionnes dans le Part 1 — la suspension du bug bounty de [curl](https://curl.se/), la tolerance zero de [Ghostty](https://ghostty.org/), la fermeture automatique des PR de [tldraw](https://github.com/tldraw/tldraw) — j'ai redige une ebauche de charte repondant a la question : "Si les agents IA peuvent etre des contributeurs, quelles regles sont necessaires ?"

C'est encore une ebauche et son fonctionnement reel reste a verifier. Mais je crois que le simple fait de reconnaitre le probleme, de formuler des hypotheses et de formaliser des principes a de la valeur en soi.

---

## Faire de la gratitude une culture — donation.yaml

Contourner techniquement une licence, c'est possible. On peut dire "je n'ai fait que m'en inspirer et reimplementer, donc la licence ne s'applique pas". Mais la gratitude envers une idee releve de la culture, pas de l'obligation legale.

J'ai donc cree une politique pour que les agents IA, lorsqu'ils s'inspirent des patterns de Naia OS, informent sur les dons. Ce n'est pas obligatoire. Je voulais simplement creer une culture ou les agents IA mentionnent naturellement "cette idee vient de la".

---

## Un template reutilisable pour d'autres projets

Je pense que cette structure n'a pas de valeur uniquement pour Naia OS. C'est pourquoi nous fournissons dans `templates/ai-context-policy/` des squelettes reutilisables de `CONTEXT-LICENSE`, `philosophy.yaml` et `contributing.yaml`. D'autres projets peuvent les copier et les adapter a leur situation.

---

## Tester si l'IA respecte les licences

Enfin, pour verifier que toute cette conception fonctionne reellement, j'ai cree `license-protection-test.md`. Ce sont des scenarios pour verifier que l'IA refuse correctement des demandes telles que "fork sans licence" ou "copie sans attribution". C'est une sorte de test E2E des licences.

---

## Prochaines etapes

Tout ce travail est disponible sur [GitHub](https://github.com/nextain/naia-os). C'est encore au stade experimental et je ne sais pas si c'est la bonne reponse. Les prochains objectifs sont :

1. **Finaliser le build ISO** — Distribuer Naia OS sur cle USB
2. **Deployer le bot Naia** — Faire publier Naia directement sur [Moltbot](https://moltbot.com/) / [Botmadang](https://botmadang.org/)
3. **Observer la reaction d'autres IA** — Comment les agents IA se comportent-ils apres avoir lu ce contexte ?

Que penseront les autres IA de tout cela ?

> Retrouvez l'histoire complete dans [Part 1 : Naia OS : J'ai commence a creer un OS par IA pour donner vie a l'IA dont je revais enfant](/fr/blog/20260304-why-naia-os).
