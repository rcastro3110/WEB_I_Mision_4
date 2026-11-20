import { z } from "zod";
import { NOMBRES_JUEGOS, PLATAFORMAS, categoriaValida } from "../data/juegos.js";

// Forma de una run tal como la guarda y devuelve la API
export const runApiSchema = z
    .object({
        id: z.number(),
        nombre: z.string().min(1),
        juego: z.enum(NOMBRES_JUEGOS),
        categoria: z.string().min(1),
        plataforma: z.enum(PLATAFORMAS),
        version: z.string(),
        tiempo: z.number().int().min(1),
        fecha: z.string(),
        video: z.string(),
        normas: z.literal(true),
    })
    .refine((run) => categoriaValida(run.juego, run.categoria), {
        error: "Category does not exist for this game",
        path: ["categoria"],
});