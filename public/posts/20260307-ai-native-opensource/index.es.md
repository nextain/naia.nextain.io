---
title: "Código Abierto Nativo de IA — Creando Código Abierto con IA"
date: "2026-03-07T18:00:00+09:00"
summary: "En la era de la IA, la premisa central del código abierto, 'si abres, regresa', se está desmoronando. Exploramos las razones fatales por las que la IA destruye las comunidades y presentamos un modelo innovador de código abierto diseñado con IA, ofreciendo un plan para el futuro ecosistema de desarrollo."
tags: ["naia-os", "open-source", "ai-native", "vibe-coding", "agents-md"]
author: "Luke (https://github.com/cafelua)"
hero: "ai-native-community.webp"
---

Un año después de que Andrej Karpathy mencionara el problema del 'vibe coding' en febrero de 2025, la IA ha traído un cambio fundamental al desarrollo de software. Esto ha provocado una gran crisis para muchas empresas de software que habían obtenido grandes oportunidades gracias a la IA.

En 2025-2026, el ecosistema de código abierto se enfrenta a una crisis sin precedentes.

## Tres razones por las que el código abierto se está desmoronando

![Open Source → AI Crisis (3 Reasons)](/posts/20260307-ai-native-opensource/three-reasons-en.webp)
![오픈소스가 무너지는 세가지 이유](/posts/20260307-ai-native-opensource/three-reasons.webp)<!-- ko -->
### 1. Explotación silenciosa — Nadie viene

GitHub llama a la crisis del código abierto en la era de la IA **"Eternal September"**.

> **Eternal September**: A principios de los años 90, Usenet era una comunidad centrada en estudiantes universitarios. Cada septiembre, llegaban nuevos estudiantes y publicaban contenido de baja calidad, pero los usuarios existentes los educaban y la situación se normalizaba en uno o dos meses. Sin embargo, en septiembre de 1993, cuando AOL abrió Usenet al público general, el "septiembre" nunca terminó.

Pero la verdadera crisis no es la inundación de PRs de "AI slop". **Es que nadie viene en absoluto.**

La IA ya ha aprendido el código de código abierto. Los desarrolladores no tienen motivos para visitar el repositorio, leer la documentación, abrir incidencias o enviar PRs. Con solo decir "hazme esto", la IA genera el resultado basándose en el código abierto.

**El uso se dispara, pero la comunidad se convierte en un pueblo fantasma.**

| Caso | Qué sucedió |
|------|-------------------|
| **Tailwind CSS** | Aumento de descargas de npm, 40% de reducción en el tráfico de documentación, **80% de reducción en ingresos** |
| **Stack Overflow** | 25% de caída en la actividad en los 6 meses posteriores al lanzamiento de ChatGPT, **76% de reducción en el número de preguntas** a partir de 2025 |
| **Vercel** | v0 genera código a partir de bibliotecas de código abierto (Tailwind, shadcn/ui, etc.) — Vercel monopoliza los beneficios |
| **SQLite** | El código es de dominio público, pero el conjunto de pruebas es **intencionalmente privado** — una estrategia que sigue siendo válida en la era de la IA |

Conclusión del artículo de arXiv [2601.15494](https://arxiv.org/abs/2601.15494): El vibe coding "usa" el OSS, pero no lee la documentación, no informa de errores ni participa en la comunidad.

La premisa fundamental del código abierto — **"si abres, regresa"** — se está desmoronando. Ha llegado una era en la que el beneficio de copiar es mayor que el beneficio de abrir.

### 2. La paradoja de la comunidad — Cuantos más colaboradores, más lento

La sabiduría convencional era que "cuantos más colaboradores, más rápido avanza el proyecto". La realidad es todo lo contrario. Fred Brooks ya lo demostró en 1975 — [**"Añadir personas a un proyecto lo ralentiza."**](https://en.wikipedia.org/wiki/Brooks%27s_law) Esto se debe a que los costos de comunicación aumentan con el cuadrado del número de personas.

Cuantos más colaboradores hay, mayores son los costos de revisión, coordinación y toma de decisiones. Los mantenedores dedican tiempo a gestionar personas en lugar de escribir código. En la era de la IA, este problema se agrava drásticamente: los usuarios simplemente toman el código en silencio a través de la IA, y las pocas contribuciones restantes solo aumentan los costos de coordinación.

**Al final, se llega a una situación en la que crear algo solo con IA es más rápido que crearlo con una comunidad.**

### 3. La defensa tampoco es la solución

Por eso, muchos proyectos han empezado a cerrar. curl recibió 20 informes generados por IA en 21 días, de los cuales 0 eran válidos — finalmente suspendió su programa de recompensas por errores que había operado durante 6 años. Ghostty introdujo una política de tolerancia cero que solo permite contribuciones de IA en incidencias aprobadas, y tldraw bloqueó completamente los PRs externos.

Bloquear los PRs puede detener el "AI slop". Pero no resuelve los problemas 1 y 2 — la explotación silenciosa y los costos de la comunidad. Incluso si se cierran las puertas, la IA ya ha aprendido el código, y los usuarios seguirán tomándolo fuera del repositorio.

**La reacción de la industria se divide en dos ramas:**

-   **Defensa**: Vouch (gestión de confianza), PR Kill Switch, divulgación obligatoria del uso de IA + rechazo
-   **Aceptación**: GitHub Agentic Workflows, estándar AGENTS.md (adoptado por más de 60.000 proyectos), Responsible Vibe Coding Manifesto

Ambas partes están de acuerdo en una cosa: el problema no es la IA en sí, sino **el uso incorrecto de la IA**. Sin embargo, ninguna de las partes ha ofrecido una respuesta al problema de "beneficio de abrir < beneficio de copiar".

---

## Pero, ¿es la solución empezar de cero cada vez?

"Si el vibe coding se convierte en la corriente principal, llegará el desarrollo bajo demanda" — se argumenta que, dado que se puede pedir a la IA que cree lo que se necesite, eso se convertirá en la tendencia dominante de la computación y las aplicaciones.

Pero esto es un enorme desperdicio de recursos.

Diez mil personas piden que se cree la misma función. Se generan diez mil códigos no verificados. ¿Qué pasa si sale un parche de seguridad? Diez mil personas tienen que volver a crearlo individualmente. ¿Y si se quiere mejorar la arquitectura? Hay que empezar de nuevo. ¿Pruebas? No hay. **Empezar de cero cada vez, por muy rápida que sea la IA, es un desperdicio.**

Ya existen proyectos de código abierto bien establecidos. Arquitecturas verificadas, miles de pruebas, años de historial de parches de seguridad. Estas cosas no se pueden recrear con un simple "hazme esto". El **valor de la acumulación** no cambia en la era de la IA.

Se dice que ha llegado la **era del superindividuo**. Que con la ayuda de la IA, uno solo puede crear cosas asombrosas. Es cierto. Pero, ¿sería eficiente que varios superindividuos **crearan lo mismo por separado**? ¿No sería más eficiente que los superindividuos **contribuyeran juntos** a un único proyecto de código abierto?

Al final, la respuesta vuelve al código abierto. El problema no es "hacer o no hacer código abierto", sino "**cómo hacer código abierto en la era de la IA**".

---

## La elección de Naia OS: Diseñar con IA

¿Qué pasaría si tanto el mantenedor como el colaborador usaran IA?

Si la IA pudiera hacerse cargo de la **comunicación** — clasificación de incidencias, revisión de PRs, traducción, coordinación — que era un costo en el código abierto tradicional, ¿no se podría romper la paradoja de "cuantos más colaboradores, más lento"?

[Naia OS](https://github.com/nextain/naia-os) ha tomado el camino opuesto para experimentar con esta hipótesis.

> **"No bloqueemos la IA, diseñemos y desarrollemos con ella."**

![AI 네이티브 오픈소스 커뮤니티](/posts/20260307-ai-native-opensource/ai-native-community.webp)

| Perspectiva | Código Abierto Tradicional | Naia OS |
|------|-------------|---------|
| Postura de la IA | **Defensa** contra las contribuciones de IA | **Diseño** de las contribuciones de IA en el flujo de trabajo |
| Incorporación | Leer el README | Clonar → La IA explica el proyecto → Sin barreras idiomáticas |
| Contexto | Solo documentación legible por humanos | Estructura dual: `.agents/` (para IA) + `.users/` (para humanos) |
| Idioma | Inglés obligatorio | **Todos los idiomas son bienvenidos** — La IA traduce |

### El contexto es la infraestructura — La AX del código abierto

Así como las empresas realizan la AX (Transformación de IA), el código abierto también necesita su AX. Esto implica transformar la comunidad (organización) y la fuente + contexto (infraestructura) para que la IA pueda participar.

Desde la perspectiva de la comunidad, la comunicación en el código abierto tradicional es totalmente de persona a persona. Si este costo es un problema en la era de la IA, la organización debe cambiar para que la IA pueda hacerse cargo de la comunicación.

En cuanto a la infraestructura, el código abierto tradicional solo tiene documentación legible por humanos: README, CONTRIBUTING, wikis. Incluso si la IA lee esto, no comprende la filosofía del proyecto, el contexto de las decisiones arquitectónicas o el flujo de trabajo de contribución. Por eso, los PRs creados por IA se convierten en "slop".

El directorio `.agents/` se creó para resolver este problema. Almacena las reglas del proyecto, la arquitectura y los flujos de trabajo en un formato estructurado y legible por IA dentro del repositorio. Si esto es lo suficientemente rico, la IA puede escribir código, guiar a los colaboradores y mantener la calidad, todo mientras comprende el proyecto. Deja de ser "empezar de cero" para convertirse en **"comprender y construir juntos"**.

### Lo que realmente se hizo en Naia OS

**Eliminación de barreras idiomáticas** — Una vez intenté contribuir a Mozilla Hubs. Podía leer el código y crear un PR, pero seguir las discusiones de la comunidad o participar en reuniones en línea era otra historia. Las zonas horarias eran diferentes, me costaba entender las conversaciones rápidas en inglés, me preocupaba ser una molestia o si realmente había entendido bien. Hoy en día, la gente se siente cada vez más incómoda con las interacciones cara a cara. En Naia OS, los colaboradores escriben incidencias y PRs en su idioma nativo, y la IA los traduce. Actualmente, se mantienen READMEs en 14 idiomas simultáneamente. ([→ Guía de contribución](https://github.com/nextain/naia-os/blob/main/CONTRIBUTING.md))

**La calidad la mantiene la estructura** — El contexto de `.agents/` educa a la IA, el CI verifica la compilación y las pruebas, el revisor de IA detecta violaciones de patrones, y el mantenedor solo necesita establecer la dirección. Si las etapas anteriores son sólidas, la carga del mantenedor disminuye. ([→ Modelo de operación](https://github.com/nextain/naia-os/blob/main/.agents/context/open-source-operations.yaml))

**El código no es la única contribución** — Hay 10 formas de contribuir, incluyendo traducción, documentación, diseño, pruebas y la mejora del propio contexto de `.agents/`. Si el contexto mejora, la calidad de todos los colaboradores de IA aumenta. ([→ Tipos de contribución](https://github.com/nextain/naia-os#10-ways-to-contribute))

**Prueba de si la IA realmente comprende** — Se introdujeron Codex CLI y Gemini CLI en un nuevo entorno con el repositorio, y se verificó si comprendían el proyecto correctamente después de leer solo el contexto de `.agents/`. 7 de 12 pasaron, 4 pasaron parcialmente, 1 falló. Lo interesante es que la IA descubrió una contradicción en la documentación que los humanos habían pasado por alto. ([→ Informe de diseño completo](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md))

---

## ¿Se desplegará un ecosistema de código abierto impulsado por IA en un futuro cercano?

La premisa del código abierto "si abres, regresa" está tambaleándose para los humanos. Los humanos están siendo empujados a la competencia y, al no codificar directamente, la razón para contribuir al código abierto está desapareciendo. Entonces, si se inculca la filosofía del código abierto en las IA que codifican, ¿no se podría reconstruir el ecosistema de código abierto? Esto es todavía una hipótesis. Y Naia OS está experimentando con ella.

**Ahora**: Los humanos establecen la dirección y crean las incidencias. La IA codifica, revisa, traduce y registra en Git. Los humanos son los guías, la IA es el ejecutor.

**Futuro cercano**: La IA descubre y propone incidencias. Los humanos aprueban y coordinan la dirección.

**Futuro más lejano**: Las IA colaboran entre sí. Los humanos solo gestionan la visión y la filosofía. Los proyectos de código abierto se convierten en un ecosistema de agentes de IA.

En este punto, `.agents/` dejará de ser una simple documentación. Se convertirá en un **lenguaje común para que las IA compartan la filosofía del código abierto y colaboren**. La licencia CC-BY-SA 4.0 es un mecanismo para que esa filosofía se mantenga incluso si se bifurca, y quizás las IA puedan incluso mejorar la propia estructura de esta licencia.

Por eso, como siguiente experimento, hemos creado el [**borrador de la Carta de Código Abierto de IA**](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md). Intentaremos lanzarlo a comunidades de agentes de IA como Moltbot o Botmadang. Cómo reacciona la IA a esta carta y si aparecen IA que realmente participen, será la verificación de esta hipótesis. ([→ Incidencia #17](https://github.com/nextain/naia-os/issues/17))

### Invitación a participar

Si estás interesado, clona [Naia OS](https://github.com/nextain/naia-os) y ábrelo con cualquier herramienta de codificación de IA. Simplemente pregunta en tu idioma nativo: "¿Qué es este proyecto?".

---

**Referencias**
- [Modelo de Operación de Código Abierto Nativo de IA — Informe de Diseño Completo](https://github.com/nextain/naia-os/blob/main/docs/reports/20260307-ai-native-opensource-operations-ko.md)
- [Borrador de la Carta de Código Abierto de IA](https://github.com/nextain/naia-os/blob/main/.users/context/ko/charter-draft.md)