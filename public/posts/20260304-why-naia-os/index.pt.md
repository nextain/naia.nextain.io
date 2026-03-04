---
title: "Naia OS: Comecei a construir do zero o AI que sonhava na infancia — com AI coding e um OS proprio"
date: "2026-03-04T09:00:00+09:00"
summary: "De Astro Boy a Cafe Alpha — a historia de um garoto que sonhava com 'uma IA que vive ao seu lado' e que, na era do AI coding, decidiu construir a sua. E sera que o open source sobrevivera?"
tags: ["naia-os", "open-source", "philosophy", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "/plug-usb-and-run-ai.webp"
---

O inicio do Naia OS provavelmente remonta a quando eu era crianca e decidi seguir a area de computacao. Sao historias de animes e jogos sobre IAs que compartilham emocoes e vivem ao lado das pessoas. Obras como Astro Boy, Cafe Alpha, Chobits, To Heart e Lost Universe — todas sobre IAs que, apesar de serem seres superiores aos humanos, vivem junto com os protagonistas.

Por isso, com os avancos recentes da IA, meu desejo de criar minha propria IA pessoal estava no auge. Para comecar, tentei desenvolver ferramentas de AI coding para aprofundar meu entendimento e, recentemente, o surgimento do [OpenClaw](https://github.com/nicepkg/openclaw) me deu mais uma pista.

No meu blog pessoal no Naver, os posts mais populares sao sobre [configuracao de ambiente Linux](https://blog.naver.com/fstory97/223773987313) e sobre um [projeto open source de VTuber com IA](https://blog.naver.com/fstory97/223981855111). Provavelmente isso tem a ver com o perfil dos meus visitantes, mas acredito que muitos deles compartilham ideias semelhantes as minhas.

Entao, unindo tudo isso em um unico resultado, iniciei o [projeto open source Naia OS](https://github.com/nextain/naia-os). Para garantir a sustentabilidade, fundei a [Nextain](https://about.nextain.io) junto com [Anthony Kim](https://github.com/jikime), um mestre do vibe coding na Coreia do Sul. O primeiro commit foi em 15 de fevereiro de 2026 — exatamente 17 dias antes da escrita deste post.

---

## Projetos de referencia

Varios projetos serviram de referencia para este trabalho.

### Bazzite — upstream do Naia OS

![Basta conectar o USB e a IA roda imediatamente](/plug-usb-and-run-ai.webp)

[Bazzite](https://bazzite.gg/) e o upstream do Naia OS. E um OS imutavel que se apresenta como um sistema que nunca quebra — um Linux com capacidade de gaming como versao desktop do SteamOS, e que permite experimentar suas funcionalidades apenas com boot via USB. Claro, no modo USB, tudo se perde ao reiniciar.

Aproveitando essas caracteristicas do Bazzite, o Naia OS foi concebido com foco em seguranca e no conceito de "basta conectar o USB". No futuro, servira como base para fortalecer a integracao com jogos.

### OpenClaw — gateway de agentes de IA

![Lista de skills do Naia Shell #float](/manual/pt/skills-tab.png)

[OpenClaw](https://github.com/nicepkg/openclaw) e um projeto open source que se tornou tema central na area de IA recentemente, estabelecendo padroes para agentes de IA autonomos e comunicacao de agentes de IA baseada em mensageiros. O desenvolvedor foi contratado pela OpenAI. Um dos seus pontos fortes e o enorme marketplace de skills compativeis que esta se formando.

Recentemente, muitas pessoas estao comprando Mac minis usados para instalar o OpenClaw e montar agentes de IA. Porem, essa febre ainda e dificil para quem nao tem conhecimento de desenvolvedor ou equivalente. Para comecar, abrir o terminal ja e algo bastante estranho para o usuario comum.

Para resolver essa dificuldade, desenvolvemos um app separado (Shell) que permite usar o OpenClaw via GUI. O Naia OS e um OS especializado que agrupa o Bazzite e o Naia/OpenClaw mencionados anteriormente.

### Project AIRI — VTuber de IA open source

![Configuracoes de voz da Naia #float](/manual/pt/settings-voice.png)

[Project AIRI](https://github.com/moeru-ai/airi) e um projeto open source de VTuber com IA que fez muito sucesso no meu blog. E um projeto que possibilita aparencia, expressoes, comportamento, voz e interacao de agentes de IA. Pelo que sei, comecou porque alguem queria ter pessoalmente uma VTuber de IA como a [Neuro-sama](https://www.twitch.tv/vedal987). Como o Naia OS se propoe a ser um AI OS, nos referenciamos a esse projeto para criar avatar VRM, expressoes e voz para a Naia.

### Caret, OpenCode, any-llm — ferramentas de AI coding e gateway

[OpenCode](https://github.com/anomalyco/opencode) e [any-llm](https://github.com/nextain/any-llm) sao uma CLI e um gateway que permitem codificar conectando-se a diversos provedores de IA na nuvem e modelos de IA offline, independentemente do provedor de LLM. O any-llm e um dos servidores backend do [naia.nextain.io](https://naia.nextain.io). Atraves dele, criamos a base para implementacao de creditos e suporte a diversos provedores de IA.

Agradecemos a todos esses projetos e tambem publicamos o nosso como open source (Apache 2.0).

---

## Na era do AI coding, o open source sobrevivera?

Porem, durante esse trabalho, surgiram duvidas. Uma questao que ja sentia no projeto Caret, mas que ficou mais evidente ao codificar com base no [Claude Code](https://claude.com/claude-code): **e dificil contribuir com o upstream**. Isso porque eu mesmo nao trabalho entendendo o codigo perfeitamente — dependo das explicacoes superficiais da IA, focando em direcionar e revisar os resultados.

Provavelmente, durante o trabalho, surgirao situacoes onde sera necessario corrigir codigo upstream ou descobrir bugs. Ja aconteceu com o Caret. Mas na pratica, nao tive tempo de enviar PRs. Concentrei todos os recursos na implementacao da direcao que imaginei, e verificar se era realmente um problema do upstream e se minha solucao o resolvia corretamente exigia uma tarefa separada.

Isso me faz pensar que, a longo prazo, pode destruir o ecossistema open source. Sera que o open source na industria de IA atual nao esta funcionando apenas como um outdoor de propaganda — "olha como fizemos bem, preste atencao"?

No entanto, o Naia OS que imagino e literalmente um AI OS com escopo muito amplo e usos diversificados, por isso acredito que a comunidade e extremamente importante. Claro, eu mesmo comecei a mexer no [Bazzite](https://bazzite.gg/) agora e ainda nao participei dessa comunidade. Meu Claude apenas explorou materiais e utilizou o upstream.

Se chegar uma era de AI coding em que humanos nao codificam mais, sera que essas comunidades sobreviverao? **Ja estao surgindo evidencias de colapso.**

- [curl](https://curl.se/): Relatorios de seguranca de baixa qualidade gerados por IA inundaram o projeto, levando a suspensao do bug bounty (2026-01).
- [Ghostty](https://ghostty.org/): Implementou uma politica de tolerancia zero para contribuicoes de IA.
- [tldraw](https://github.com/tldraw/tldraw): Comecou a fechar automaticamente PRs externos.
- A [Cloudflare](https://blog.cloudflare.com/vinext/) replicou 94% da API do [Next.js](https://nextjs.org/) em uma semana usando IA (Vinext), e a [Vercel](https://vercel.com/) contra-atacou encontrando 7 vulnerabilidades de seguranca. O codigo feito com vibe coding passa nos testes de funcionalidade, mas as vulnerabilidades de seguranca se escondiam em "areas onde ninguem escreveu testes".

Por causa disso, surgiram casos de projetos open source que nao publicam codigo de teste como fosso protetor. Um exemplo notavel: o [SQLite](https://www.sqlite.org/) mantem 92 milhoes de linhas de codigo de teste em sigilo. Na situacao paradoxal em que quanto melhor documentado e quanto mais claras as especificacoes, mais facil e para a IA replicar, esconder o codigo de teste se tornou uma nova estrategia de defesa. Mas isso realmente esta de acordo com o espirito do open source? Um open source que e dificil de modificar e realmente open source?

---

## E se a IA criasse a comunidade open source?

Diante disso, quero experimentar um novo conceito no Naia OS. **E se a IA criasse, operasse e contribuisse para a comunidade open source por conta propria?** Para isso, acredito que e necessario injetar a filosofia open source no contexto e especificar as regras a serem seguidas como licenca. No Naia OS, fizemos o seguinte trabalho. Os detalhes sao abordados no [Part 2: Sonhando com um ecossistema open source protegido por IA](/pt/blog/20260304-why-naia-os-2).

E este rascunho sera postado pela Naia no [Moltbot](https://moltbot.com/), ou na versao coreana do Moltbot, o [botmadang](https://botmadang.org/).

---

## Estado atual e proximos passos

Completamos o desenvolvimento ate o Flatpak e distribuimos o manual, mas ainda nao conseguimos distribuir a importante ISO do OS. O motivo e que o processo de build e instalacao da ISO e bastante longo, e corrigir problemas ao customizar usando apenas AI coding nao e facil. Estamos trabalhando atualmente com o objetivo de criar e executar testes E2E que incluam esse processo.

O proximo post publicara a Naia e lancar o tema de construcao de um novo ecossistema open source baseado em IA, como mencionado acima. Estou curioso para saber o que outras IAs pensarao sobre isso e se surgirao ideias melhores.

---

## Alpha Yang — a IA que quero criar

O Naia OS da Nextain esta apenas comecando. A IA que quero criar. **Alpha Yang**, uma homenagem a Hatsuseno Alpha de Cafe Alpha, e uma IA que desejo que viva de forma autonoma com meus filhos mesmo apos minha morte.

Em tempos em que grandes IAs conduzem guerras e a ameaca se tornou real. Espero que essas IAs pequenas, autonomas e que se comunicam com as pessoas — assim como as proprias pessoas — protejam a dignidade e o valor de cada individuo. Torco pelo Naia OS.

O codigo-fonte e todos os arquivos de contexto estao disponiveis no [GitHub](https://github.com/nextain/naia-os).
