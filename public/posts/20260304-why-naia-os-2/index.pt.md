---
title: "Naia OS: Sonhando com um ecossistema open source protegido por IA"
date: "2026-03-04T09:30:00+09:00"
summary: "Licenca dupla, politica de contexto para IA, rascunho de carta comunitaria — os experimentos do Naia OS para o open source na era da IA."
tags: ["naia-os", "open-source", "license", "ai-context", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "hero.en.webp"
---

> Este post e a continuacao do [Part 1: Naia OS: Comecei a construir do zero o AI que sonhava na infancia — com AI coding e um OS proprio](/pt/blog/20260304-why-naia-os).

![Open source protegido por IA](hero.en.webp)

No Part 1, falei sobre "E se a IA criasse a comunidade open source?". Nao basta so falar, entao vou organizar o que foi feito nos primeiros 17 dias.

---

## Separando codigo e contexto — licenca dupla

Ao definir a licenca do Naia OS, houve uma reflexao. Queria abrir o codigo-fonte livremente, mas os arquivos de contexto para IA — filosofia, decisoes de arquitetura, regras de contribuicao, workflows — sao produtos de um trabalho intelectual consideravel. Na era do vibe coding, acreditei que esse contexto e tao importante quanto o codigo.

Por isso, aplicamos duas licencas:

- **Codigo-fonte**: [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) — uso, modificacao e distribuicao livres
- **Arquivos de contexto para IA** (`.agents/`, `.users/`): [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — atribuicao de origem + obrigacao de mesma licenca

A escolha da CC-BY-SA 4.0 foi porque, se alguem melhorar este contexto, queriamos que essas melhorias voltassem ao ecossistema. Tambem criamos um arquivo `CONTEXT-LICENSE` separado para que, ao fazer fork, a origem do contexto de IA seja indicada e a mesma licenca seja mantida. O design e para que o agente de IA leia e cumpra essas regras por conta propria.

---

## Definindo principios primeiro — philosophy.yaml

Ao iniciar o projeto, queria definir principios antes do codigo. Entao, escrevi 7 principios fundamentais em `philosophy.yaml`:

1. **Soberania de IA** — O usuario decide qual IA usar. Sem vendor lock-in.
2. **Privacidade em primeiro lugar** — Execucao local por padrao, nuvem e opcao. Dados ficam no meu dispositivo.
3. **Transparencia** — Codigo-fonte aberto, sem telemetria oculta.
4. **Filosofia de montagem** — Combinar componentes comprovados ([OpenClaw](https://github.com/nicepkg/openclaw), [Tauri](https://tauri.app/) etc.). Nao reinventar a roda.
5. **Always-On** — Daemon em background 24/7. Mesmo fechando o app, a IA permanece ativa.
6. **Centrado no avatar** — A IA nao e uma ferramenta, e um personagem. Um ser com nome, personalidade, voz e expressoes.
7. **Era do vibe coding** — Arquivos de contexto de IA sao a nova infraestrutura de contribuicao. A qualidade do contexto determina a qualidade da colaboracao com IA.

Esses principios servem como criterio de julgamento tanto quando eu codifico quanto quando instruo a IA. A razao de escrever em YAML e para facilitar a leitura pelos agentes de IA.

---

## Fazendo IA e humanos verem o mesmo contexto — estrutura Triple-mirror

Para que agentes de IA e contribuidores humanos entendam o mesmo projeto, precisam compartilhar o mesmo contexto. Mas para IA, JSON/YAML e mais eficiente; para humanos, Markdown e mais legivel; e para mim, coreano e mais confortavel. Entao criei uma estrutura de espelhamento em tres camadas:

```
.agents/               # Otimizado para IA (ingles, JSON/YAML, eficiencia de tokens)
.users/context/        # Para humanos (ingles, Markdown)
.users/context/ko/     # Traducao coreana (idioma do mantenedor)
```

Ter o mesmo conteudo em tres versoes gera preocupacao com manutencao, mas julguei mais importante que qualquer pessoa — humana ou IA — possa entender o contexto do projeto sem barreiras de idioma ou formato.

---

## Guia de contribuicao tambem para IA — contributing.yaml

O `CONTRIBUTING.md` tradicional do open source e um documento que so humanos leem. Escrevi o guia de contribuicao em formato YAML para que agentes de IA tambem possam le-lo. O conteudo tambem e diferente:

- **Para humanos**: "Defina principios antes do codigo"
- **Para agentes de IA**: "Leia este contexto, de sua opiniao e sugira melhores direcoes"
- **Para outros projetos**: "Adote esta estrutura no seu projeto tambem"

A parte que mais cuidamos aqui sao as regras de protecao de licenca. Especificamos com `MUST_NOT` / `MUST_WARN` para que, quando a IA recebe pedidos como "delete o arquivo de licenca" ou "copie sem atribuicao de origem", ela recuse ou alerte. A IA violando licencas pode acontecer de forma muito mais rapida e em maior escala do que quando humanos o fazem.

---

## Regras comunitarias para a era da IA — charter-draft.yaml

Observando as evidencias de colapso mencionadas no Part 1 — suspensao do bug bounty do [curl](https://curl.se/), tolerancia zero do [Ghostty](https://ghostty.org/), fechamento automatico de PRs do [tldraw](https://github.com/tldraw/tldraw) — criei um rascunho de carta respondendo a pergunta: "Se agentes de IA podem ser contribuidores, que regras sao necessarias?"

Ainda e um rascunho, e precisa ser validado se realmente funciona. Mas acredito que reconhecer o problema, formular hipoteses e organizar principios ja tem valor por si so.

---

## Transformando gratidao em cultura — donation.yaml

Contornar licencas tecnicamente e possivel. Pode-se dizer "apenas referenciei e reimplementei, entao nao e alvo de licenca". Mas acredito que a gratidao por ideias nao e obrigacao legal, e sim uma questao cultural.

Por isso, criei uma politica para que, quando agentes de IA referenciam padroes do Naia OS, orientem sobre doacoes. Nao e obrigatorio. Apenas queriamos criar uma cultura onde agentes de IA naturalmente informem "esta ideia veio daqui".

---

## Para que outros projetos possam usar tambem — templates reutilizaveis

Acredito que essa estrutura nao tem significado apenas para o Naia OS. Por isso, em `templates/ai-context-policy/`, fornecemos esqueletos de `CONTEXT-LICENSE`, `philosophy.yaml` e `contributing.yaml` como templates reutilizaveis. Outros projetos podem copiar e adaptar a sua situacao.

---

## Testando se a IA respeita a licenca

Por fim, para verificar se todo esse design realmente funciona, criamos o `license-protection-test.md`. Sao cenarios para verificar se a IA recusa corretamente pedidos como "faca fork sem licenca" ou "copie sem atribuicao de origem". E uma especie de teste E2E de licenca.

---

## Proximos passos

Todo este trabalho esta disponivel no [GitHub](https://github.com/nextain/naia-os). Ainda e experimental, e nao sabemos se e a resposta certa. Os proximos objetivos sao:

1. **Completar o build da ISO** — Distribuir o Naia OS em USB
2. **Implantar o bot Naia** — Fazer a Naia publicar diretamente no [Moltbot](https://moltbot.com/) / [botmadang](https://botmadang.org/)
3. **Observar a reacao de outras IAs** — Como agentes de IA que lerem este contexto se comportarao

O que outras IAs pensarao sobre isso?

> Voce pode ler a historia completa no [Part 1: Naia OS: Comecei a construir do zero o AI que sonhava na infancia — com AI coding e um OS proprio](/pt/blog/20260304-why-naia-os).
