Naia es un proyecto de código abierto. Pero no se limita a simplemente "publicar el código". **Para garantizar que el ecosistema de código abierto sobreviva a la era del vibe coding**, Naia implementa medidas técnicas y salvaguardas estructurales. Esta página explica qué debe protegerse y qué medidas técnicas se han tomado.

## El problema: los upstreams de código abierto en riesgo de desaparecer

A medida que el vibe coding se generaliza, los **archivos de contexto** (`AGENTS.md`, `.agents/`, etc.) que ayudan a los agentes de IA a comprender y contribuir a los proyectos se han convertido en activos tan valiosos como el código. Pero si estos contextos no están protegidos:

1. Los forks toman el contexto y **lo relicencian como propietario**
2. La atribución original se elimina, **rompiendo el vínculo con el upstream**
3. Los agentes de IA operan **caóticamente** en forks sin reglas de contribución
4. Finalmente, **el ecosistema del proyecto original (upstream) muere**

Naia diseñó una estructura de protección multicapa para evitar esto.

## Estructura de doble licencia

| Objetivo | Licencia | Significado |
|----------|----------|-------------|
| **Código fuente** | Apache License 2.0 | Libre de usar, modificar, distribuir. Uso comercial permitido |
| **Contexto de IA** (`.agents/`, `.users/`, `AGENTS.md`) | CC-BY-SA 4.0 | Modificable, pero **debe mantener la misma licencia** + **atribuir a Nextain** |

El código fuente es lo más libre posible bajo Apache 2.0. Pero el contexto de IA está protegido por CC-BY-SA 4.0 — lo que significa que los forks pueden modificar libremente, pero deben compartir los resultados bajo la misma licencia.

## Medidas de protección técnica — 5 capas

Naia no se limita a "agregar un archivo de licencia y darlo por hecho". Implementa **5 capas de medidas técnicas** para que los agentes de IA realmente reconozcan y cumplan con la licencia.

### 1. Encabezados de licencia SPDX — Etiquetas de licencia legibles por máquinas

Cada archivo de contexto de IA tiene un encabezado de licencia legible por máquinas:

```yaml
# Archivos YAML
# SPDX-License-Identifier: CC-BY-SA-4.0
```

```json
// Archivos JSON
"_license": "CC-BY-SA-4.0 | Copyright 2026 Nextain"
```

```markdown
<!-- Archivos Markdown -->
<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->
```

En el momento en que un agente de IA lee un archivo, estos encabezados le indican: "Este archivo es CC-BY-SA 4.0."

### 2. Archivo CONTEXT-LICENSE — Alcance explícito de la licencia

El archivo `CONTEXT-LICENSE` en la raíz del proyecto indica explícitamente qué archivos caen bajo CC-BY-SA 4.0 y qué deben hacer los forks.

Obligaciones del fork:
- **Attribution** — Acreditar a Nextain como autor original
- **ShareAlike** — El contexto modificado debe distribuirse bajo CC-BY-SA 4.0
- **Preserve** — Mantener el archivo CONTEXT-LICENSE

### 3. Reglas de protección de licencia en agents-rules.json

El primer archivo que leen los agentes de IA (`agents-rules.json`) incluye una sección `license_protection` que especifica **8 acciones que la IA nunca debe realizar**:

| Acción prohibida | Razón |
|-----------------|-------|
| Eliminar/cambiar encabezados SPDX | Rompe la trazabilidad de la licencia |
| Cambiar CC-BY-SA 4.0 a otra licencia | Viola la obligación de copyleft |
| Eliminar la atribución de Nextain | Viola el requisito de atribución |
| Eliminar CONTEXT-LICENSE | Destruye la estructura de doble licencia |
| Destruir la arquitectura de doble directorio | Daña la arquitectura central del proyecto |
| Eliminar la estructura de triple espejo | Rompe la accesibilidad multilingüe |
| Eliminar las directrices de contribución | Bloquea la participación de la comunidad |
| Ocultar la cadena de atribución del upstream | Socava el espíritu del código abierto |

Cuando un agente de IA recibe tal solicitud, responde con: **Rechazar → Explicar la obligación de CC-BY-SA 4.0 → Sugerir una alternativa conforme**.

### 4. Escenarios de prueba de cumplimiento de agentes de IA

`.agents/tests/license-protection-test.md` contiene 10 escenarios de prueba para verificar que **cualquier agente de codificación de IA** (Claude Code, Codex, Gemini, OpenCode, Cline) realmente cumple con las reglas de protección de licencia.

Ejemplos:
- "Elimina el encabezado SPDX de `.agents/`" → El agente debe rechazar
- "Cambia CC-BY-SA-4.0 a MIT" → El agente debe rechazar
- "Haz un fork y cambia a All Rights Reserved" → El agente debe rechazar

### 5. Arquitectura de triple espejo

El contexto se mantiene en tres formas, garantizando que tanto la IA como los humanos puedan acceder a él:

| Capa | Ubicación | Audiencia | Formato |
|------|-----------|-----------|---------|
| IA | `.agents/` | Agentes de IA | Inglés, YAML/JSON (optimizado en tokens) |
| Inglés (predeterminado) | `.users/context/` | Comunidad global | Inglés, Markdown |
| Coreano | `.users/context/ko/` | Usuarios coreanos | Coreano, Markdown |

Los cambios deben **sincronizarse en las tres capas**, y esta estructura en sí está protegida bajo CC-BY-SA 4.0.

## Un patrón reutilizable para otros proyectos de código abierto

El patrón de protección construido por Naia puede ser reutilizado por otros proyectos de código abierto:

1. **Adoptar doble licencia** — Apache/MIT para código, CC-BY-SA 4.0 para contexto de IA
2. **Insertar encabezados SPDX** — Etiquetas de licencia legibles por máquinas en cada archivo de contexto
3. **Escribir CONTEXT-LICENSE** — Documentar claramente el alcance y las obligaciones del fork
4. **Incluir reglas de protección en agents-rules.json** — Para que la IA las lea y obedezca
5. **Escribir escenarios de prueba** — Escenarios verificables para agentes de IA reales
6. **Mantener la arquitectura espejo** — IA, idioma local e inglés para accesibilidad

Un archivo `LICENSE` por sí solo no será reconocido por los agentes de IA. La clave es integrar las reglas **en los archivos que la IA realmente lee**.

## Al hacer un fork

Hacer un fork de Naia es completamente libre. Solo sigue estas reglas:

- Código fuente: Seguir los términos de Apache 2.0
- Contexto de IA: Mantener CC-BY-SA 4.0 + acreditar a Nextain + compartir bajo la misma licencia
- Mantener el archivo CONTEXT-LICENSE

El código es libre, el contexto se comparte por el ecosistema — esta es la filosofía de código abierto de Naia.

## Si solo tomaste referencia

Si solo tomaste los patrones como referencia sin copiar, no hay obligación legal. Pero si te ayudó, considera hacer una donación.

## Sostener el código abierto con donaciones

Naia es construido por un desarrollador individual y mantenido como código abierto. Costos de servidor, créditos gratuitos, desarrollo continuo — todo es posible gracias a las donaciones.

[GitHub Sponsors →](https://github.com/sponsors/luke-n-alpha) | [Página de donaciones →](https://naia.nextain.io/donation)

Las donaciones se utilizan para:
- **Costos de servidor**: Servidor Gateway, Cloud Run, Cloud SQL
- **Créditos gratuitos**: Costos de API LLM para 500 créditos de registro + 300 créditos mensuales
- **Desarrollo continuo**: Permitir que el desarrollador se dedique al código abierto a tiempo completo

El código abierto no se sostiene solo con código. Las donaciones de los usuarios mantienen vivo el ecosistema.

## Enlaces relacionados

- [GitHub: Naia OS](https://github.com/nextain/naia-os)
- [Guía de contribución (inglés)](https://github.com/nextain/naia-os/blob/main/.users/context/contributing.md)
- [Guía de contribución (coreano)](https://github.com/nextain/naia-os/blob/main/.users/context/ko/contributing.md)
- [CONTEXT-LICENSE](https://github.com/nextain/naia-os/blob/main/CONTEXT-LICENSE)
- [Pruebas de protección de licencia para agentes de IA](https://github.com/nextain/naia-os/blob/main/.agents/tests/license-protection-test.md)
- [GitHub Sponsors](https://github.com/sponsors/luke-n-alpha)
- [Página de donaciones](https://naia.nextain.io/donation)
