---
title: "Open Source Natif IA — Créer de l'Open Source avec l'IA"
date: "2026-03-07T18:00:00+09:00"
summary: "À l'ère de l'IA, la prémisse fondamentale de l'open source, selon laquelle « ouvrir, c'est recevoir en retour », est en train de s'effondrer. Cet article explore les raisons critiques pour lesquelles l'IA détruit les communautés et présente un plan pour l'écosystème de développement futur avec un modèle open source innovant conçu avec l'IA."
tags: ["naia-os", "open-source", "ai-native", "vibe-coding", "agents-md"]
author: "Luke (https://github.com/cafelua)"
hero: "ai-native-community.webp"
---

Un an après l'émergence du 'vibe coding', évoqué par Andrej Karpathy en février 2025, le développement logiciel a connu une transformation fondamentale due à l'IA. Cela a plongé de nombreuses entreprises de logiciels, qui avaient pourtant vu de grandes opportunités avec l'IA, dans une crise majeure.

En 2025-2026, l'écosystème open source a été confronté à une crise sans précédent.

## Trois raisons pour lesquelles l'Open Source s'effondre

![Open Source → AI Crisis (3 Reasons)](/posts/20260307-ai-native-opensource/three-reasons-en.webp)
![오픈소스가 무너지는 세가지 이유](/posts/20260307-ai-native-opensource/three-reasons.webp)<!-- ko -->
### 1. L'exploitation silencieuse — Personne ne vient

GitHub appelle la crise de l'open source à l'ère de l'IA l'**« Éternel Septembre »**.

> **L'Éternel Septembre** : Au début des années 1990, Usenet était une communauté centrée sur les étudiants universitaires. Chaque année en septembre, de nouveaux étudiants affluaient et postaient des messages de faible qualité, mais les utilisateurs existants les formaient et la situation se normalisait en un ou deux mois. Cependant, en septembre 1993, lorsqu'AOL a ouvert Usenet au grand public, le « septembre » n'a jamais pris fin.

Mais la véritable crise n'est pas le déluge de PR de mauvaise qualité générées par l'IA. C'est que **personne ne vient du tout.**

L'IA a déjà appris le code open source. Les développeurs n'ont aucune raison de visiter les dépôts, de lire la documentation, d'ouvrir des issues ou d'envoyer des PR. Un simple « Fais-moi ça » suffit pour que l'IA produise un résultat basé sur l'open source.

**L'utilisation explose, mais la communauté devient une ville fantôme.**

| Cas | Ce qui s'est passé |
|------|-------------------|
| **Tailwind CSS** | Augmentation des téléchargements npm, diminution de 40% du trafic de documentation, **diminution de 80% des revenus** |
| **Stack Overflow** | Chute de 25% de l'activité 6 mois après le lancement de ChatGPT, **diminution de 76%** du nombre de questions en 2025 |
| **Vercel** | v0 génère du code à partir de bibliothèques open source (Tailwind, shadcn/ui, etc.) — Vercel monopolise les profits |
| **SQLite** | Le code est du domaine public, mais la suite de tests est **délibérément privée** — une stratégie qui reste efficace à l'ère de l'IA |

Conclusion de l'article arXiv [2601.15494](https://arxiv.org/abs/2601.15494) : Le vibe coding « utilise » l'OSS, mais ne lit pas la documentation, ne signale pas les bugs et ne participe pas à la communauté.

La prémisse fondamentale de l'open source — **« ouvrir, c'est recevoir en retour »** — est en train de s'effondrer. Nous sommes entrés dans une ère où l'utilité de copier est supérieure à celle d'ouvrir.

### 2. Le paradoxe de la communauté — Plus il y a de contributeurs, plus c'est lent

La sagesse conventionnelle était que « plus il y a de contributeurs, plus le projet avance vite ». La réalité est tout le contraire. Fred Brooks l'a déjà démontré en 1975 — [**« Ajouter des personnes à un projet en retard ne fait que le retarder davantage. »**](https://en.wikipedia.org/wiki/Brooks%27s_law) C'est parce que les coûts de communication augmentent avec le carré du nombre de personnes.

Plus il y a de contributeurs, plus les coûts de révision, de coordination et de prise de décision augmentent. Les mainteneurs passent leur temps à gérer les gens plutôt qu'à coder. À l'ère de l'IA, ce problème s'aggrave à l'extrême — les utilisateurs se contentent de prendre silencieusement via l'IA, et les quelques contributions restantes ne font qu'augmenter les coûts de coordination.

**En fin de compte, il est devenu plus rapide de créer seul avec l'IA que de créer avec une communauté.**

### 3. La défense n'est pas la solution

De nombreux projets ont donc commencé à fermer leurs portes. curl a reçu 20 rapports générés par l'IA en 21 jours, dont 0 valide — il a finalement mis fin à son programme de bug bounty de 6 ans. Ghostty a adopté une politique de tolérance zéro, n'autorisant les contributions de l'IA que sur les issues approuvées, et tldraw a complètement bloqué toutes les PR externes.

Bloquer les PR peut empêcher le « slop » de l'IA. Mais les problèmes n°1 et n°2 — l'exploitation silencieuse et les coûts de la communauté — ne sont pas résolus. Même si les portes sont fermées, l'IA a déjà appris le code, et les utilisateurs continuent de le prendre en dehors du dépôt.

**Les réactions de l'industrie sont doubles :**

- **Défense** : Vouch (gestion de la confiance), PR Kill Switch, divulgation obligatoire de l'utilisation de l'IA + refus
- **Acceptation** : GitHub Agentic Workflows, standard AGENTS.md (adopté par plus de 60 000 projets), Responsible Vibe Coding Manifesto

Les deux parties s'accordent sur un point : le problème n'est pas l'IA elle-même, mais la **mauvaise utilisation de l'IA**. Cependant, aucune des deux approches n'a trouvé de réponse au problème de « l'utilité de l'ouverture < l'utilité de la copie ».

---

## Mais, est-ce que tout recréer à chaque fois est la solution ?

Certains affirment que « si le vibe coding devient la norme, le développement à la demande émergera » — car il suffira de demander à l'IA de créer ce dont on a besoin, et cela deviendra la tendance dominante pour le calcul et les applications.

Mais c'est un énorme gaspillage de ressources.

Dix mille personnes demandent la création de la même fonctionnalité séparément. Dix mille codes non vérifiés sont produits. Et si un correctif de sécurité est publié ? Dix mille personnes doivent le recréer chacune de leur côté. Améliorer l'architecture ? Tout recommencer depuis le début. Les tests ? Il n'y en a pas. **Recréer à chaque fois à partir de zéro est un gaspillage, même si l'IA est rapide.**

Il existe déjà des projets open source bien établis. Des architectures vérifiées, des milliers de tests, des années d'historique de correctifs de sécurité. Ces éléments ne peuvent pas être reproduits par un simple « Fais-moi ça ». La **valeur de l'accumulation** ne change pas à l'ère de l'IA.

On dit que l'**ère du super-individu** est arrivée. L'IA assiste, donc on peut créer des choses incroyables seul. C'est vrai. Mais est-il efficace que plusieurs super-individus **créent la même chose séparément** ? Ne serait-il pas plus efficace que ces super-individus **contribuent ensemble** à un seul projet open source ?

En fin de compte, la réponse revient à l'open source. La question n'est pas « faire ou ne pas faire de l'open source », mais « **comment faire de l'open source à l'ère de l'IA** ».

---

## Le choix de Naia OS : Concevoir avec l'IA

Et si les mainteneurs utilisaient l'IA, et les contributeurs aussi ?

Si l'IA pouvait prendre en charge la **communication** — classification des issues, révision des PR, traduction, coordination — qui était un coût dans l'open source traditionnel, ne pourrions-nous pas briser le paradoxe selon lequel « plus il y a de contributeurs, plus c'est lent » ?

[Naia OS](https://github.com/nextain/naia-os) a choisi la voie opposée pour tester cette hypothèse.

> **« Ne bloquez pas l'IA, concevez et développez avec l'IA. »**

![AI 네이티브 오픈소스 커뮤니티](/posts/20260307-ai-native-opensource/ai-native-community.webp)

| Perspective | Open Source Traditionnel | Naia OS |
|------|-------------|---------|
| Position de l'IA | **Défendre** les contributions de l'IA | **Concevoir** les contributions de l'IA dans le workflow |
| Onboarding | Lire le README | Cloner → L'IA explique le projet → Aucune barrière linguistique |
| Contexte | Documentation lisible par l'homme uniquement | Double structure : `.agents/` (pour l'IA) + `.users/` (pour les humains) |
| Langue | Anglais obligatoire | **Toutes les langues sont les bienvenues** — l'IA traduit |

### Le contexte est l'infrastructure — L'AX de l'Open Source

Tout comme les entreprises réalisent leur AX (AI Transformation), l'open source a également besoin de son AX. Il s'agit de transformer les deux axes — la communauté (organisation) et le code source + le contexte (infrastructure) — pour permettre la participation de l'IA.

Du côté de la communauté — la communication dans l'open source traditionnel est entièrement de personne à personne. Si ce coût est un problème à l'ère de l'IA, il faut modifier l'organisation pour que l'IA puisse prendre en charge la communication.

Du côté de l'infrastructure — l'open source traditionnel ne contient que de la documentation lisible par l'homme : README, CONTRIBUTING, wikis. Même si l'IA les lit, elle ne comprend pas la philosophie du projet, le contexte des décisions architecturales, ni le workflow de contribution. C'est pourquoi les PR générées par l'IA deviennent du « slop ».

Le répertoire `.agents/` a été créé pour résoudre ce problème. Il s'agit de placer les règles, l'architecture et les workflows du projet sous une forme structurée lisible par l'IA à l'intérieur du dépôt. Si ce contexte est suffisamment riche, l'IA peut écrire du code en comprenant le projet, guider les contributeurs et maintenir la qualité. Ce n'est plus « créer à partir de zéro », mais **« comprendre et créer ensemble »**.

### Ce qui a été réellement fait dans Naia OS

- **Suppression des barrières linguistiques** — J'ai déjà essayé de contribuer à Mozilla Hubs. Lire le code et créer des PR était faisable, mais suivre les discussions de la communauté ou participer aux réunions en ligne était une autre affaire. Les fuseaux horaires différents, la difficulté à comprendre les conversations rapides en anglais, la peur de déranger, l'incertitude de bien avoir compris — toutes ces pensées me venaient à l'esprit. De nos jours, les gens sont de plus en plus réticents aux interactions directes. Dans Naia OS, les contributeurs rédigent les issues et les PR dans leur langue maternelle, et l'IA les traduit. Actuellement, des README en 14 langues sont maintenus simultanément. ([→ Guide de contribution](https://github.com/nextain/naia-os/blob/main/CONTRIBUTING.md))

- **La qualité est assurée par la structure** — Le contexte `.agents/` éduque l'IA, le CI vérifie les builds et les tests, le réviseur IA détecte les violations de motifs, et le mainteneur n'a qu'à définir la direction. Si les étapes précédentes sont solides, la charge du mainteneur est réduite. ([→ Modèle d'opération](https://github.com/nextain/naia-os/blob/main/.agents/context/open-source-operations.yaml))

- **Le code n'est pas la seule contribution** — Il existe 10 façons de contribuer, y compris la traduction, la documentation, le design, les tests, et même l'amélioration du contexte `.agents/` lui-même. Si le contexte s'améliore, la qualité de toutes les contributions de l'IA augmente en conséquence. ([→ Types de contribution](https://github.com/nextain/naia-os#10-ways-to-contribute))

- **Tester si l'IA comprend vraiment** — Nous avons injecté Codex CLI et Gemini CLI dans le dépôt lors d'une nouvelle session et vérifié si le projet était correctement compris en ne lisant que le contexte `.agents/`. Sur 12 tests, 7 ont été réussis, 4 partiellement réussis et 1 a échoué. Ce qui est intéressant, c'est que l'IA a découvert une contradiction dans la documentation que les humains avaient manquée. ([→ Rapport de conception complet](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md))

---

## Un écosystème open source piloté par l'IA émergera-t-il dans un futur proche ?

La prémisse de l'open source, selon laquelle « ouvrir, c'est recevoir en retour », est ébranlée pour les humains. Les humains sont poussés à la compétition, et en ne codant plus directement, la raison de contribuer à l'open source disparaît. Alors, si nous inculquions la philosophie open source aux IA qui codent, ne pourrions-nous pas reconstituer un écosystème open source ? C'est encore une hypothèse. Et Naia OS l'expérimente.

- **Actuellement** : Les humains définissent la direction et créent les issues. L'IA code, révise, traduit et enregistre sur Git. Les humains sont les guides, l'IA est l'exécutant.

- **Futur proche** : L'IA découvre et propose des issues. Les humains approuvent et ajustent la direction.

- **Futur plus lointain** : Les IA collaborent entre elles. Les humains ne gèrent que la vision et la philosophie. Les projets open source deviennent un écosystème d'agents IA.

À ce stade, `.agents/` ne sera plus une simple documentation. Ce sera un **langage commun permettant aux IA de partager la philosophie open source et de collaborer**. La licence CC-BY-SA 4.0 est un mécanisme pour que cette philosophie soit maintenue même si elle est forkée, et peut-être que les IA pourront elles-mêmes améliorer cette structure de licence.

C'est pourquoi, pour la prochaine expérience, nous avons créé un [**projet de charte open source IA**](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md). Nous allons le soumettre à des communautés d'agents IA comme Moltbot ou Botmadang. La façon dont l'IA réagit à la lecture de cette charte, et si des IA participent réellement — cela en soi sera une validation de cette hypothèse. ([→ Issue #17](https://github.com/nextain/naia-os/issues/17))

### Incitation à la participation

Si vous êtes intéressé, clonez [Naia OS](https://github.com/nextain/naia-os) et ouvrez-le avec n'importe quel outil de codage IA. Demandez-lui dans votre langue maternelle : « C'est quoi ce projet ? »

---

**Références**
- [Modèle d'opération Open Source Natif IA — Rapport de conception complet](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md)
- [Projet de charte open source IA](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md)