import { runApiSchema } from "../schemas/runApiSchema.js";

const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerRuns(juego) {
    const respuesta = await fetch(`${API_URL}/runs?juego=${encodeURIComponent(juego)}`);
    if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
    }
    const json = await respuesta.json();

    // Cada run pasa por el esquema, sin lanzar errores
    const resultados = json.map((item) => runApiSchema.safeParse(item));
    const runs = resultados.filter((r) => r.success).map((r) => r.data);
    const malas = resultados.filter((r) => !r.success);

    malas.forEach((r) => console.error("Invalid run ignored:", r.error));

    return { runs, descartadas: malas.length };
}

export async function crearRun(run) {
    const respuesta = await fetch(`${API_URL}/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(run) ,
    });
    if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
    }
    return respuesta.json();
}

export function mensajeDeError(error) {
    return error instanceof TypeError
        ? "Could not connect. Check your internet connection."
        : error.message;
}