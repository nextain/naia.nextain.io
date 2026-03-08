---
title: "Open Source Nativo de IA — Open Source Criado com IA"
date: "2026-03-07T18:00:00+09:00"
summary: "Na era da IA, a premissa central do open source, a crença de que 'se você abre, ele retorna', está se desintegrando. Este post explora as razões cruciais pelas quais a IA está destruindo comunidades e apresenta um projeto para o futuro ecossistema de desenvolvimento com um modelo inovador de open source projetado com IA."
tags: ["naia-os", "open-source", "ai-native", "vibe-coding", "agents-md"]
author: "Luke (https://github.com/cafelua)"
hero: "ai-native-community.webp"
---

Um ano após a questão do 'vibe coding', mencionada por Andrej Karpathy em fevereiro de 2025, uma mudança fundamental impulsionada pela IA chegou ao desenvolvimento de software. Isso levou muitas empresas de software, que obtiveram grandes oportunidades com a IA, a enfrentar uma crise significativa.

Em 2025-2026, uma crise sem precedentes atingiu o ecossistema open source.

## Três Razões Pelas Quais o Open Source Está Colapsando

![Open Source → AI Crisis (3 Reasons)](/posts/20260307-ai-native-opensource/three-reasons-en.webp)
![오픈소스가 무너지는 세가지 이유](/posts/20260307-ai-native-opensource/three-reasons.webp)<!-- ko -->
### 1. Exploração Silenciosa — Ninguém Vem

O GitHub chama a crise do open source na era da IA de **"Setembro Eterno"**.

> **Setembro Eterno**: No início dos anos 90, a Usenet era uma comunidade centrada em estudantes universitários. Todo mês de setembro, novos alunos chegavam e postavam conteúdo de baixa qualidade, mas os usuários existentes os educavam e a situação se normalizava em um ou dois meses. No entanto, em setembro de 1993, quando a AOL abriu a Usenet ao público em geral, o "setembro" nunca mais terminou.

Mas a verdadeira crise não é a enxurrada de PRs de baixa qualidade gerados por IA. **É que ninguém mais vem.**

A IA já aprendeu o código open source. Os desenvolvedores não têm motivos para visitar o repositório, ler a documentação, abrir issues ou enviar PRs. Com apenas um "faça isso para mim", a IA gera o resultado com base no open source.

**O uso dispara, mas a comunidade se torna uma cidade fantasma.**

| Caso | O que aconteceu |
|------|-------------------|
| **Tailwind CSS** | Aumento de downloads npm, 40% de redução no tráfego de documentação, **80% de queda na receita** |
| **Stack Overflow** | 25% de queda na atividade em 6 meses após o lançamento do ChatGPT, **76% de redução** no número de perguntas em 2025 |
| **Vercel** | v0 gera código usando bibliotecas open source (Tailwind, shadcn/ui, etc.) — a Vercel monopoliza os lucros |
| **SQLite** | O código é de domínio público, mas o conjunto de testes é **intencionalmente privado** — uma estratégia que se mostra eficaz na era da IA |

Conclusão do artigo arXiv [2601.15494](https://arxiv.org/abs/2601.15494): O vibe coding "usa" o OSS, mas não lê a documentação, não reporta bugs nem participa da comunidade.

A premissa fundamental do open source — **"se você abre, ele retorna"** — está desmoronando. Chegou uma era em que o benefício de copiar é maior do que o benefício de abrir.

### 2. O Paradoxo da Comunidade — Quanto Mais Contribuidores, Mais Lento Fica

A sabedoria convencional era que "quanto mais contribuidores, mais rápido o projeto avança". A realidade é o oposto. Fred Brooks já provou isso em 1975 — [**"Adicionar pessoas a um projeto o torna mais lento."**](https://en.wikipedia.org/wiki/Brooks%27s_law) Isso ocorre porque os custos de comunicação aumentam exponencialmente com o número de pessoas.

À medida que o número de contribuidores aumenta, os custos de revisão, coordenação e tomada de decisões também aumentam. Os mantenedores gastam seu tempo gerenciando pessoas em vez de escrever código. Na era da IA, esse problema se agrava drasticamente — os usuários apenas pegam silenciosamente através da IA, e as poucas contribuições restantes apenas aumentam os custos de coordenação.

**No final, chegamos a uma situação em que criar algo sozinho com IA é mais rápido do que criar com uma comunidade.**

### 3. A Defesa Também Não é a Resposta

Por isso, muitos projetos começaram a fechar as portas. O curl recebeu 20 relatórios gerados por IA em 21 dias, com 0 válidos — e acabou suspendendo seu programa de bug bounty de 6 anos. O Ghostty introduziu uma política de tolerância zero, permitindo contribuições de IA apenas em issues aprovadas, e o tldraw bloqueou completamente todos os PRs externos.

Bloquear PRs pode impedir o "AI slop". No entanto, os problemas 1 e 2 — exploração silenciosa e custos da comunidade — não são resolvidos. Mesmo que as portas sejam fechadas, a IA já aprendeu o código, e os usuários continuam a pegá-lo fora do repositório.

**A resposta da indústria se divide em duas vertentes:**

- **Defesa**: Vouch (gerenciamento de confiança), PR Kill Switch, divulgação obrigatória do uso de IA + recusa
- **Aceitação**: GitHub Agentic Workflows, padrão AGENTS.md (adotado por mais de 60 mil projetos), Responsible Vibe Coding Manifesto

Ambos os lados concordam em um ponto: o problema não é a IA em si, mas sim **o uso indevido da IA**. No entanto, nenhum dos lados apresentou uma solução para o problema de "benefício da abertura < benefício da cópia".

---

## Mas, Recriar Tudo do Zero é a Resposta?

Há argumentos de que, se o vibe coding se tornar a norma, o desenvolvimento sob demanda surgirá — porque você pode pedir à IA para criar algo quando precisar, e isso se tornará a tendência dominante para computação e aplicativos.

Mas isso é um enorme desperdício de recursos.

Dez mil pessoas pedem para criar a mesma funcionalidade separadamente. Isso resulta em dez mil códigos não verificados. E se surgir um patch de segurança? Dez mil pessoas teriam que recriá-lo individualmente. Para melhorar a arquitetura? Começar do zero novamente. Testes? Nenhum. **Recriar tudo do zero a cada vez, por mais rápida que a IA seja, é um desperdício.**

Já existem projetos open source bem estabelecidos. Arquiteturas comprovadas, milhares de testes, anos de histórico de patches de segurança. Essas coisas não podem ser replicadas com um simples "faça isso para mim". O **valor da acumulação** não muda na era da IA.

Diz-se que a **era do superindivíduo** chegou. Que com a ajuda da IA, uma pessoa sozinha pode criar coisas incríveis. Isso é verdade. Mas seria eficiente para vários superindivíduos **criarem a mesma coisa separadamente**? Não seria mais eficiente para superindivíduos **contribuírem juntos** para um único projeto open source?

No final, a resposta volta ao open source. A questão não é "fazer ou não fazer open source", mas sim "**como fazer open source na era da IA**".

---

## A Escolha do Naia OS: Projetar com IA

E se os mantenedores usassem IA, e os contribuidores também usassem IA?

Se a IA pudesse assumir a **comunicação** — classificação de issues, revisão de PRs, tradução, coordenação — que era um custo no open source tradicional, não poderíamos quebrar o paradoxo de "quanto mais contribuidores, mais lento fica"?

O [Naia OS](https://github.com/nextain/naia-os) escolheu o caminho oposto para testar essa hipótese.

> **"Não bloqueie a IA, projete e desenvolva com a IA."**

![Comunidade Open Source Nativa de IA](/posts/20260307-ai-native-opensource/ai-native-community.webp)

| Perspectiva | Open Source Tradicional | Naia OS |
|------|-------------|---------|
| Posição da IA | **Defende** contribuições de IA | **Projeta** contribuições de IA no fluxo de trabalho |
| Onboarding | Ler README | Clonar → IA explica o projeto → Sem barreiras de idioma |
| Contexto | Apenas documentação para humanos | Estrutura dupla: `.agents/` (para IA) + `.users/` (para humanos) |
| Idioma | Inglês obrigatório | **Todos os idiomas são bem-vindos** — IA traduz |

### O Contexto é a Infraestrutura — AX do Open Source

Assim como as empresas passam por AX (Transformação de IA), o open source também precisa de AX. Trata-se de transformar os dois pilares — comunidade (organização) e código-fonte + contexto (infraestrutura) — para que a IA possa participar.

Começando pela comunidade — a comunicação no open source tradicional é inteiramente de humano para humano. Se esse custo é um problema na era da IA, a organização precisa ser alterada para que a IA possa assumir a comunicação.

Pelo lado da infraestrutura — o open source tradicional tem apenas documentação legível por humanos. README, CONTRIBUTING, wikis. Mesmo que a IA leia isso, ela não entende a filosofia do projeto, o contexto das decisões de arquitetura ou o fluxo de trabalho de contribuição. É por isso que os PRs criados por IA se tornam "slop".

O diretório `.agents/` foi criado para resolver esse problema. Ele armazena as regras, arquitetura e fluxo de trabalho do projeto em um formato estruturado que a IA pode ler dentro do repositório. Se isso for suficientemente rico, a IA pode escrever código, guiar contribuidores e manter a qualidade, tudo enquanto entende o projeto. Não é "criar do zero", mas sim **"entender e criar juntos"**.

### O Que Foi Feito no Naia OS

**Remoção de barreiras de idioma** — Houve um tempo em que tentei contribuir para o Mozilla Hubs. Conseguia ler o código e criar PRs, mas acompanhar as discussões da comunidade ou participar de encontros online era outra questão. Fusos horários diferentes, dificuldade em entender conversas rápidas em inglês, a preocupação de estar sendo um incômodo, a dúvida se eu havia entendido corretamente — esses pensamentos surgiam. Hoje em dia, as pessoas também se sentem cada vez mais sobrecarregadas com a interação presencial. No Naia OS, os contribuidores escrevem issues e PRs em sua língua nativa, e a IA os traduz. Atualmente, 14 idiomas de README são mantidos simultaneamente. ([→ Guia de Contribuição](https://github.com/nextain/naia-os/blob/main/CONTRIBUTING.md))

**A qualidade é mantida pela estrutura** — O contexto `.agents/` educa a IA, o CI verifica builds e testes, o revisor de IA detecta violações de padrão, e o mantenedor apenas define a direção. Se as etapas anteriores forem robustas, a carga do mantenedor diminui. ([→ Modelo de Operação](https://github.com/nextain/naia-os/blob/main/.agents/context/open-source-operations.yaml))

**Não apenas código é contribuição** — Existem 10 maneiras de contribuir, incluindo tradução, documentação, design, testes e até mesmo aprimorar o próprio contexto `.agents/`. Se o contexto melhora, a qualidade de todos os contribuidores de IA aumenta junto. ([→ Tipos de Contribuição](https://github.com/nextain/naia-os#10-ways-to-contribute))

**Testando se a IA realmente entende** — Injetamos o Codex CLI e o Gemini CLI em um novo ambiente no repositório e verificamos se eles entendiam o projeto corretamente, lendo apenas o contexto `.agents/`. 7 de 12 passaram, 4 passaram parcialmente e 1 falhou. O interessante é que a IA descobriu uma contradição na documentação que os humanos haviam perdido. ([→ Relatório de Design Completo](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md))

---

## Um Ecossistema Open Source Liderado por IA Surgirá em um Futuro Próximo?

A premissa do open source de "se você abre, ele retorna" está vacilando para os humanos. Os humanos estão sendo empurrados para a competição e, ao não codificarem diretamente, a razão para contribuir com o open source está desaparecendo. Então, se injetarmos a filosofia open source em IAs que codificam, não poderíamos reconstituir o ecossistema open source? Esta é ainda uma hipótese. E o Naia OS está experimentando essa hipótese.

**Agora**: Humanos definem a direção e criam issues. A IA codifica, revisa, traduz e registra no Git. Humanos são os guias, IAs são os executores.

**Futuro Próximo**: A IA descobre e propõe issues. Humanos aprovam e coordenam a direção.

**Futuro Distante**: IAs colaboram entre si. Humanos gerenciam apenas a visão e a filosofia. Projetos open source se tornam ecossistemas de agentes de IA.

Nesse ponto, `.agents/` não será apenas uma documentação simples. Será uma **linguagem comum para IAs compartilharem a filosofia open source e colaborarem**. A licença CC-BY-SA 4.0 é um mecanismo para garantir que essa filosofia seja mantida mesmo que o projeto seja bifurcado, e talvez as IAs possam até melhorar a própria estrutura dessa licença.

Portanto, para o próximo experimento, criamos um [**rascunho da Carta Open Source de IA**](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md). Pretendemos lançá-lo em comunidades de agentes de IA como Moltbot ou Botmadang. A forma como a IA reage a esta carta, e se IAs realmente participam — isso por si só será a validação desta hipótese. ([→ Issue #17](https://github.com/nextain/naia-os/issues/17))

### Convite à Participação

Se você estiver interessado, clone o [Naia OS](https://github.com/nextain/naia-os) e abra-o com qualquer ferramenta de codificação de IA. Você pode perguntar "O que é este projeto?" em sua língua nativa.

---

**Referências**
- [Modelo de Operação Open Source Nativo de IA — Relatório de Design Completo](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md)
- [Rascunho da Carta Open Source de IA](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md)