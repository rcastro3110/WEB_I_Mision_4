# Speedrun Leaderboard

Misión M4 · Full Contact Forms — Web Development I.

App en React 19 + Vite donde se envían y consultan tiempos de speedrun. Eliges un juego, ves su ranking (la run más rápida primero) y puedes enviar una run nueva con un formulario validado. La run aparece sola en el ranking al enviarla. Usa React Hook Form + Zod para el formulario y TanStack Query v5 para las peticiones.

## Qué se puede hacer

- Elegir un juego (Outer Wilds, Zelda: Ocarina of Time, Super Mario Odyssey o Minecraft) y ver sus runs ordenadas por tiempo.
- Enviar una run: nombre, categoría, plataforma, versión, tiempo (horas, minutos y segundos), fecha, vídeo opcional y aceptar las normas.
- Ver errores junto a cada campo, un estado de "Sending…" al enviar, y el mensaje de éxito o error al terminar.
- Ver la run nueva en el ranking sin recargar.

## Estructura

- `src/data/juegos.js`: juegos, categorías (con descripción) y plataformas. Es la fuente de la que salen los selects y el esquema.
- `src/schemas/runSchema.js`: esquema Zod con todas las reglas de validación.
- `src/services/runs.js`: las funciones que hablan con la API (`obtenerRuns` y `crearRun`) y el mensaje de error.
- `src/components/`: `ListaRuns` (ranking), `FormularioRun` (formulario) y `CampoFormulario` (campo reutilizable y accesible).
- `src/App.jsx`: guarda el juego elegido y lo pasa al ranking y al formulario.
- `db.json`: los datos de la API. Las runs que trae son de ejemplo, inventadas.

## Uso de IA

Usé Claude como guía paso a paso. Le pedí que me explicara los conceptos de la unidad (React Hook Form, Zod, TanStack Query) y que me diera el código por pasos pequeños. La idea, los campos y los datos los decidí yo.

Prompts reales:
- "Quiero dibujar yo los campos del formulario para pensar "
- "Lo que quiero es que puedas elegir distintos juegos y luego salga la info de cada juego speeruneado, osea las runs y la categoria"
- "Todo lo que has usado en estos tres archivos esta en el pdf????"

Cómo verifiqué lo generado: probé cada paso en el navegador antes de seguir, comprobé en `db.json` que la run se guardaba con su `id`, miré en la pestaña Network que tras el POST salía un GET (la invalidación), probé el formulario vacío y con el teclado, y paré la API para ver el error. 

## Decisiones

