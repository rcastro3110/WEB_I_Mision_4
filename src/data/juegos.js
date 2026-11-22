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

export const IMAGENES = {
  "Outer Wilds": "https://image.api.playstation.com/vulcan/ap/rnd/202208/1623/Zofebh60Ue7Zt5sC10UAtU3D.png",
  "Zelda: Ocarina of Time": "https://i1.sndcdn.com/artworks-000464588955-2ftldl-t500x500.jpg",
  "Super Mario Odyssey": "https://assets.nintendo.eu/image/upload/f_auto,c_limit,w_1920,q_auto:low/MNS/NOE/70010000000127/SQ_NSwitch_SuperMarioOdyssey_HomepageWithOverlay",
  "Minecraft": "https://store-images.s-microsoft.com/image/apps.17382.13510798885735219.9735d495-578c-4a4c-b892-3eb3a780b3a0.d3792486-cf98-40c0-a2c1-d6443f0e2b70",
};

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