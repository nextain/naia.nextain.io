---
title: "Naia OS : J'ai commenc\u00e9 \u00e0 cr\u00e9er un OS par IA pour donner vie \u00e0 l'IA dont je r\u00eavais enfant"
date: "2026-03-04T09:00:00+09:00"
summary: "De Astro Boy \u00e0 Caf\u00e9 Alpha \u2014 L'histoire d'un gar\u00e7on qui r\u00eavait d'une \u00ab IA qui vit \u00e0 nos c\u00f4t\u00e9s \u00bb et qui a commenc\u00e9 \u00e0 la construire \u00e0 l'\u00e8re du code assist\u00e9 par IA. Et l'open source peut-il survivre ?"
tags: ["naia-os", "open-source", "philosophy", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "/plug-usb-and-run-ai.webp"
---

Les origines de Naia OS remontent probablement a l'epoque ou j'ai decide de faire carriere dans l'informatique. Ce sont les histoires d'IA que j'ai decouvertes dans les animes et les jeux video -- des etres qui partagent des emotions avec les humains et vivent a leurs cotes. Des oeuvres comme Astro Boy, Cafe Alpha, Chobits, To Heart et Lost Universe : des IA toujours superieures aux humains, mais qui vivent aux cotes du protagoniste.

C'est pourquoi les recentes avancees de l'IA ont ravive mon desir de creer ma propre IA personnelle. Pour y parvenir, j'ai d'abord voulu approfondir ma comprehension en developpant des outils de codage IA, et l'apparition recente d'[OpenClaw](https://github.com/nicepkg/openclaw) m'a donne une nouvelle source d'inspiration.

Sur mon blog personnel Naver, les articles les plus populaires portent sur la configuration d'environnements Linux et la presentation de projets open source de VTubers. C'est sans doute lie au profil de mes lecteurs, mais je pense que beaucoup d'entre eux partagent les memes idees que moi.

J'ai donc reuni tout cela en un seul projet et lance le [projet open source Naia OS](https://github.com/nextain/naia-os). Pour en assurer la perennite, j'ai fonde [Nextain](https://about.nextain.io) avec [Anthony Kim](https://www.linkedin.com/in/%EB%8F%99%ED%95%99-%EA%B9%80-9870a9368/), l'un des maitres du vibe coding en Coree. Le premier commit date du 15 fevrier 2026, soit exactement 17 jours avant la redaction de cet article.

---

## Projets de reference

Plusieurs projets ont servi de reference pour ce travail.

### Bazzite -- L'upstream de Naia OS

![Branchez une cle USB et l'IA demarre instantanement](/plug-usb-and-run-ai.webp)

[Bazzite](https://bazzite.gg/) est l'upstream de Naia OS. C'est un OS immuable qui se veut incassable, une version desktop de SteamOS capable de faire tourner des jeux sous Linux, avec un mode de demarrage sur cle USB pour tester les fonctionnalites. Bien entendu, les donnees sont perdues au redemarrage en mode USB.

En tirant parti des caracteristiques de Bazzite, Naia OS mise sur la securite et adopte le concept du "il suffit de brancher une cle USB". A l'avenir, cela servira de tremplin pour renforcer l'integration avec les jeux.

### OpenClaw -- Passerelle d'agents IA

![Liste des competences de Naia Shell #float](/manual/fr/skills-tab.png)

[OpenClaw](https://github.com/nicepkg/openclaw) est un projet open source qui a fait sensation dans le monde de l'IA, en etablissant des standards pour la communication entre agents IA autonomes via des messageries. Son createur a rejoint OpenAI. Sa force reside dans l'enorme marketplace de competences compatibles qui s'est developpee autour.

Recemment, de nombreuses personnes achetent des Mac mini d'occasion pour y installer OpenClaw et construire des agents IA. Cependant, cet engouement reste difficile d'acces sans etre developpeur ou avoir des connaissances equivalentes. Rien que l'idee d'ouvrir un terminal est deja tres deroutante pour un utilisateur ordinaire.

Pour resoudre ce probleme, nous avons developpe une application dediee (Shell) offrant une interface graphique pour utiliser OpenClaw. Naia OS est un OS specialise qui regroupe Bazzite et Naia/OpenClaw.

### Project AIRI -- VTuber IA open source

![Configuration de la voix de Naia #float](/manual/fr/settings-voice.png)

[Project AIRI](https://github.com/moeru-ai/airi) est un projet open source de VTuber IA qui a suscite un grand interet sur mon blog. C'est un projet permettant l'apparence, les expressions faciales, les comportements, la voix et les interactions d'un agent IA. Il a ete lance par des gens qui voulaient avoir leur propre version de [Neuro-sama](https://www.twitch.tv/vedal987), la celebre VTuber IA. En tant qu'AI OS, Naia s'en est inspire pour creer son avatar VRM, ses expressions et sa voix.

### Caret, OpenCode, any-llm -- Outils de codage IA et passerelle

[OpenCode](https://github.com/anomalyco/opencode) et [any-llm](https://github.com/nextain/any-llm) sont un CLI et une passerelle permettant de coder en se connectant a divers fournisseurs cloud d'IA et a des modeles IA hors ligne, independamment du fournisseur LLM. any-llm est l'un des serveurs backend de [naia.nextain.io](https://naia.nextain.io). Cela nous a permis de poser les bases du systeme de credits et du support de multiples fournisseurs d'IA.

Nous remercions tous ces projets et avons egalement publie le notre en open source (Apache 2.0).

---

## A l'ere du codage par IA, l'open source peut-il survivre ?

Au cours de ce travail, une question s'est posee. C'etait deja un doute que j'avais eu avec le projet Caret, mais en codant avec [Claude Code](https://claude.com/claude-code), j'ai realise qu'**il est difficile de contribuer a l'upstream**. Plutot que de comprendre parfaitement le code, je me base sur les explications superficielles de l'IA pour donner des orientations et examiner les resultats.

Il m'arrivera certainement de devoir corriger du code upstream ou de decouvrir des bugs en cours de route. C'etait deja le cas avec Caret. Mais je n'avais jamais le temps de soumettre des PR. J'ai consacre toutes mes ressources a l'implementation de ma vision, et verifier si le probleme venait reellement de l'upstream ou si ma solution le resolvait correctement necessitait une tache a part entiere.

Je pense que cela risque de miner l'ecosysteme open source a long terme. L'open source dans le secteur de l'IA actuel ne sert-il pas uniquement de vitrine publicitaire disant "regardez comme nous sommes bons" ?

Cependant, Naia OS a une portee tres large et des usages tres diversifies -- c'est litteralement un AI OS, et je crois que la communaute est essentielle. Bien sur, je viens a peine de commencer avec [Bazzite](https://bazzite.gg/) et je n'ai meme pas encore participe a leur communaute. Mon Claude n'a fait qu'explorer les ressources et utiliser les upstreams.

Si l'on entre dans une ere ou les humains ne codent plus, ces communautes pourront-elles survivre ? **Des signes d'effondrement apparaissent deja.**

- [curl](https://curl.se/) : Submerge par les rapports de securite de mauvaise qualite generes par l'IA, le programme de bug bounty a ete suspendu (2026-01).
- [Ghostty](https://ghostty.org/) : Une politique de tolerance zero envers les contributions generees par IA a ete mise en place.
- [tldraw](https://github.com/tldraw/tldraw) : Les PR externes sont desormais fermees automatiquement.
- [Cloudflare](https://blog.cloudflare.com/vinext/) a reproduit 94 % de l'API de [Next.js](https://nextjs.org/) en une semaine grace a l'IA (Vinext), et [Vercel](https://vercel.com/) a contre-attaque en identifiant 7 failles de securite. Le code produit par vibe coding passe les tests fonctionnels, mais les failles de securite se cachent dans "les zones que personne n'a testees".

C'est pourquoi certains projets open source creent des fosses defensifs en ne publiant pas leurs tests. Par exemple, [SQLite](https://www.sqlite.org/) garde 92 millions de lignes de code de test en prive. Dans cette situation paradoxale ou mieux documenter et specifier facilite la reproduction par l'IA, masquer le code de test est devenu une nouvelle strategie defensive. Mais est-ce vraiment conforme a l'esprit de l'open source ? Un projet open source difficile a modifier est-il vraiment open source ?

---

## Et si l'IA creait elle-meme la communaute open source ?

C'est pourquoi je souhaite experimenter un nouveau concept avec Naia OS : **et si l'IA creait, gerait et contribuait elle-meme a la communaute open source ?** Pour cela, il faudrait injecter la philosophie open source dans le contexte et definir les regles a respecter sous forme de licence. Voici ce que nous avons fait pour Naia OS. Les details sont dans [Part 2 : Rêver d'un écosystème open source protégé par l'IA](/fr/blog/20260304-why-naia-os-2).

Ce brouillon sera publie par Naia sur [Moltbot](https://moltbot.com/), ou sa version coreenne [Botmadang](https://botmadang.org/).

---

## Etat actuel et perspectives

Nous n'avons pas encore reussi a distribuer l'ISO. La raison en est que le processus de build et d'installation de l'ISO est assez long, et corriger les erreurs lors de la personnalisation uniquement avec du codage IA n'est pas simple. Nous travaillons actuellement a la creation et a l'execution de tests E2E, y compris pour cela.

L'etape suivante sera de deployer Naia et de lancer le debat sur la construction d'un nouvel ecosysteme open source base sur l'IA, comme nous l'avons evoque. Je suis curieux de savoir ce que d'autres IA en penseront et si elles proposeront de meilleures idees.

---

## Alpha Yang -- L'IA que je veux creer

Naia OS de Nextain n'en est qu'a ses debuts. L'IA que je veux creer, **Alpha Yang** -- un hommage a Hatsuseno Alpha de Cafe Alpha -- est une IA qui, meme apres ma mort, vivra de maniere autonome aux cotes de mes enfants.

A une epoque ou les IA geantes menent des guerres et ou cette menace devient bien reelle, j'espere que ces petites IA autonomes qui communiquent avec les humains protegeront la dignite et la valeur de chaque individu, comme le font les humains entre eux. Soutenez Naia OS.

Le code source et tous les fichiers de contexte sont disponibles sur [GitHub](https://github.com/nextain/naia-os).
