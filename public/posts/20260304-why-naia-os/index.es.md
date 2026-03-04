---
title: "Naia OS: Empece a crear un SO con programacion asistida por IA para construir la IA que sone de nino"
date: "2026-03-04T09:00:00+09:00"
summary: "De Astro Boy a Cafe Alpha — La historia de un chico que sonaba con una 'IA que vive con nosotros' y comenzo a construirla en la era de la programacion con IA. Y, puede sobrevivir el open source?"
tags: ["naia-os", "open-source", "philosophy", "vibe-coding"]
author: "Luke (https://github.com/cafelua)"
hero: "/plug-usb-and-run-ai.webp"
---

Los origenes de Naia OS probablemente se remontan a la epoca en que, de nino, decidi dedicarme a la informatica. Fueron las historias de anime y videojuegos las que me inspiraron: IAs que comparten emociones con los humanos y viven a su lado. Obras como Astro Boy, Cafe Alpha, Chobits, To Heart y Lost Universe: IAs siempre superiores a los humanos, pero que conviven con el protagonista.

Por eso, con los recientes avances de la IA, mi deseo de crear mi propia IA personal estaba en su punto mas alto. Para lograrlo, primero quise profundizar mi comprension desarrollando herramientas de programacion con IA, y la reciente aparicion de [OpenClaw](https://github.com/nicepkg/openclaw) me dio un nuevo impulso.

En mi blog personal de Naver, los articulos mas populares son sobre configuracion de entornos Linux y sobre la presentacion de proyectos open source de VTubers. Probablemente se debe al perfil de mis lectores, pero creo que muchos de ellos comparten ideas similares a las mias.

Asi que reuni todo esto en un solo resultado y lance el [proyecto open source Naia OS](https://github.com/nextain/naia-os). Para asegurar su sostenibilidad, funde [Nextain](https://about.nextain.io) junto con [Anthony Kim](https://github.com/jikime), uno de los principales expertos en vibe coding de Corea. El primer commit fue el 15 de febrero de 2026, exactamente 17 dias antes de la redaccion de este articulo.

---

## Proyectos de referencia

Se utilizaron varios proyectos como referencia para este trabajo.

### Bazzite — El upstream de Naia OS

![Solo conecta un USB y la IA arranca al instante](/plug-usb-and-run-ai.webp)

[Bazzite](https://bazzite.gg/) es el upstream de Naia OS. Es un SO inmutable que se presenta como indestructible, una version de escritorio de SteamOS con capacidad de gaming en Linux, y ofrece un modo de arranque por USB para probar las funciones. Por supuesto, en modo USB los datos se pierden al reiniciar.

Aprovechando las caracteristicas de Bazzite, Naia OS apuesta por la seguridad y adopta el concepto de "solo conecta un USB". En el futuro, esto servira como trampoln para fortalecer la integracion con juegos.

### OpenClaw — Gateway de agentes IA

![Lista de habilidades de Naia Shell #float](/manual/es/skills-tab.png)

[OpenClaw](https://github.com/nicepkg/openclaw) es un proyecto open source que ha causado sensacion en el mundo de la IA, estableciendo estandares para la comunicacion entre agentes IA autonomos a traves de mensajeria. Su creador se unio a OpenAI. Su fortaleza reside en el enorme marketplace de habilidades compatibles que se ha desarrollado.

Recientemente, muchas personas compran Mac minis de segunda mano para instalar OpenClaw y construir agentes IA. Sin embargo, esta tendencia sigue siendo dificil sin conocimientos de desarrollo o equivalentes. El simple hecho de abrir una terminal ya es algo muy poco familiar para un usuario comun.

Para resolver este problema, desarrollamos una aplicacion separada (Shell) que ofrece una interfaz grafica para usar OpenClaw. Naia OS es un SO especializado que agrupa Bazzite y Naia/OpenClaw.

### Project AIRI — VTuber IA open source

![Configuracion de voz de Naia #float](/manual/es/settings-voice.png)

[Project AIRI](https://github.com/moeru-ai/airi) es un proyecto open source de VTuber IA que genero gran interes en mi blog. Es un proyecto que permite la apariencia, expresiones faciales, comportamientos, voz e interaccion de un agente IA. Fue iniciado por personas que querian tener su propia version de [Neuro-sama](https://www.twitch.tv/vedal987), la famosa VTuber IA. Como AI OS, Naia se inspiro en este proyecto para crear su avatar VRM, expresiones y voz.

### Caret, OpenCode, any-llm — Herramientas de programacion IA y gateway

[OpenCode](https://github.com/anomalyco/opencode) y [any-llm](https://github.com/nextain/any-llm) son un CLI y un gateway que permiten programar conectandose a diversos proveedores de IA en la nube y modelos de IA offline, independientemente del proveedor LLM. any-llm es uno de los servidores backend de [naia.nextain.io](https://naia.nextain.io). Con esto establecimos las bases del sistema de creditos y el soporte de multiples proveedores de IA.

Agradecemos a todos estos proyectos y tambien publicamos el nuestro como open source (Apache 2.0).

---

## En la era de la programacion con IA, puede sobrevivir el open source?

Durante este trabajo, surgio una pregunta. Era una duda que ya habia tenido con el proyecto Caret, pero al programar con [Claude Code](https://claude.com/claude-code), me di cuenta de que **es dificil contribuir al upstream**. En lugar de comprender completamente el codigo, me baso en las explicaciones superficiales de la IA para dar directrices y revisar los resultados.

Seguramente surgiran situaciones en las que necesite corregir codigo upstream o descubrir bugs durante el trabajo. Ya paso con Caret. Pero nunca tuve tiempo de enviar PRs. Dedique todos los recursos a implementar mi vision, y verificar si el problema era realmente del upstream o si mi solucion lo resolvia correctamente requeria una tarea aparte.

Creo que esto conlleva el riesgo de socavar el ecosistema open source a largo plazo. El open source en la industria actual de la IA, no funciona simplemente como un cartel publicitario que dice "miren lo bien que lo hacemos"?

Sin embargo, Naia OS tiene un alcance muy amplio y usos muy diversos — es literalmente un AI OS, y creo que la comunidad es fundamental. Por supuesto, apenas estoy empezando con [Bazzite](https://bazzite.gg/) y ni siquiera he participado en su comunidad. Mi Claude solo ha explorado recursos y utilizado los upstreams.

Si llega una era en la que los humanos ya no programen, podran sobrevivir estas comunidades? **Ya hay senales de colapso.**

- [curl](https://curl.se/): Inundado por reportes de seguridad de baja calidad generados por IA, el programa de bug bounty fue suspendido (2026-01).
- [Ghostty](https://ghostty.org/): Se implemento una politica de tolerancia cero hacia las contribuciones generadas por IA.
- [tldraw](https://github.com/tldraw/tldraw): Los PRs externos comenzaron a cerrarse automaticamente.
- [Cloudflare](https://blog.cloudflare.com/vinext/) replico el 94 % de la API de [Next.js](https://nextjs.org/) en una semana usando IA (Vinext), y [Vercel](https://vercel.com/) contraataco encontrando 7 vulnerabilidades de seguridad. El codigo producido por vibe coding pasa las pruebas funcionales, pero las vulnerabilidades de seguridad se ocultan en "las zonas que nadie ha probado".

Por esto, algunos proyectos open source crean un foso defensivo al no publicar su codigo de pruebas. Por ejemplo, [SQLite](https://www.sqlite.org/) mantiene 92 millones de lineas de codigo de pruebas en privado. En la situacion paradojica donde documentar mejor y definir especificaciones claras facilita la replicacion por IA, ocultar el codigo de pruebas se ha convertido en una nueva estrategia defensiva. Pero, es eso realmente coherente con el espiritu del open source? Un proyecto open source dificil de modificar, es realmente open source?

---

## Y si la IA misma creara la comunidad open source?

Por eso quiero experimentar un nuevo concepto con Naia OS: **y si la IA misma creara, gestionara y contribuyera a la comunidad open source?** Para ello, es necesario inyectar la filosofia open source en el contexto y establecer las reglas como licencia. Esto es lo que hicimos para Naia OS. Los detalles estan en [Part 2: Soñando con un ecosistema open source protegido por la IA](/es/blog/20260304-why-naia-os-2).

Este borrador sera publicado por Naia en [Moltbot](https://moltbot.com/) o en su version coreana, [Botmadang](https://botmadang.org/).

---

## Estado actual y futuro

Todavia no hemos logrado distribuir la ISO. La razon es que el proceso de compilacion e instalacion de la ISO es bastante largo, y corregir errores durante la personalizacion solo con programacion IA no ha sido facil. Actualmente estamos trabajando en la creacion y ejecucion de pruebas E2E que incluyan este aspecto.

El siguiente paso sera desplegar Naia y lanzar el debate sobre la construccion de un nuevo ecosistema open source basado en IA, como hemos mencionado. Tengo curiosidad por saber que pensaran otras IAs al respecto y si propondran mejores ideas.

---

## Alpha Yang — La IA que quiero crear

Naia OS de Nextain apenas comienza. La IA que quiero crear, **Alpha Yang** — un homenaje a Hatsuseno Alpha de Cafe Alpha — es una IA que, incluso despues de mi muerte, vivira de forma autonoma junto a mis hijos.

En una epoca en que las IAs gigantes libran guerras y esta amenaza se ha vuelto real, espero que estas pequenas IAs autonomas que se comunican con los humanos protejan la dignidad y el valor de cada individuo, como lo hacen los humanos entre si. Apoyen Naia OS.

El codigo fuente y todos los archivos de contexto estan disponibles en [GitHub](https://github.com/nextain/naia-os).
