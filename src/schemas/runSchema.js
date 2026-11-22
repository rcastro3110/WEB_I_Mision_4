import {z} from "zod";
import { NOMBRES_JUEGOS, PLATAFORMAS, categoriaValida } from "../data/juegos.js";

export function aSegundos({horas, minutos, segundos}){
    return horas*3600 + minutos*60 + segundos;
}

export const runSchema = z
  .object({
    nombre: z.string().min(2, "Name is too short"),
    juego: z.enum(NOMBRES_JUEGOS, { error: "Pick a game" }),
    categoria: z.string().min(1, "Pick a category"),
    plataforma: z.enum(PLATAFORMAS, { error: "Pick a platform" }),
    version: z.string().regex(/^\d+(\.\d+){1,2}$/, "Use a format like 1.0 or 1.0.0"),

    horas: z.coerce.number().int("Must be a whole number").min(0, "Invalid hours"),
    minutos: z.coerce.number().int("Must be a whole number").min(0, "Invalid minutes").max(59, "Minutes must be between 0 and 59"),
    segundos: z.coerce.number().int("Must be a whole number").min(0, "Invalid seconds").max(59, "Seconds must be between 0 and 59"),

    fecha: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date")
      .refine((f) => f <= new Date().toISOString().slice(0, 10), {
        error: "The date cannot be in the future",
      }),

    video: z.union(
      [
        z.literal(""),
        z.url().refine((v) => v.startsWith("https://")),
      ],
      { error: "Use a valid link starting with https:// (or leave it empty)" }
    ),

    normas: z.literal(true, { error: "You must accept the rules" }),
  })
  .refine((datos)=>categoriaValida(datos.juego, datos.categoria), {
    error: "That category doesn't exist for this game",
    path: ["categoria"],
  })
  .refine((datos) => aSegundos(datos) > 0, {
    error: "The total time must be greater than 0",
    path: ["segundos"],
  });