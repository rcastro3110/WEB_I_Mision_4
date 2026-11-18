// Fuente única de datos: la usan los selects del formulario y el esquema Zod.
// Los nombres tienen que ser idénticos a los de db.json (el filtro ?juego= compara texto exacto).

export const JUEGOS = {
  "Outer Wilds": [
    { nombre: "Any%", descripcion: "Terminar el juego lo más rápido posible." },
    { nombre: "100%", descripcion: "Completar todo el contenido antes de terminar." },
    { nombre: "All friends", descripcion: "Reunir a todos los personajes antes de acabar." },
  ],
  "Zelda: Ocarina of Time": [
    { nombre: "Any%", descripcion: "Terminar el juego lo más rápido posible." },
    { nombre: "100%", descripcion: "Completar todo el contenido antes de terminar." },
    { nombre: "All Dungeons", descripcion: "Completar todas las mazmorras antes de terminar." },
  ],
  "Super Mario Odyssey": [
    { nombre: "Any%", descripcion: "Terminar el juego lo más rápido posible." },
    { nombre: "100%", descripcion: "Completar todo el contenido antes de terminar." },
    { nombre: "All Moons", descripcion: "Conseguir todas las lunas antes de terminar." },
  ],
  "Minecraft": [
    { nombre: "Any%", descripcion: "Terminar el juego lo más rápido posible." },
    { nombre: "100%", descripcion: "Completar todo el contenido antes de terminar." },
    { nombre: "All achievements", descripcion: "Conseguir todos los logros antes de terminar." },
  ],
};

export const PLATAFORMAS = [
  "PC",
  "PS4",
  "PS5",
  "Xbox Series X",
  "Nintendo Switch",
  "Nintendo Switch 2",
];

// Lista de nombres de juego, para el select
export const NOMBRES_JUEGOS = Object.keys(JUEGOS);

// Categorías de un juego (array vacío si el juego no existe)
export function categoriasDe(juego) {
  return JUEGOS[juego] ?? [];
}

// ¿Existe esa categoría en ese juego? (lo usará el .refine de Zod)
export function categoriaValida(juego, categoria) {
  return categoriasDe(juego).some((c) => c.nombre === categoria);
}