const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerRuns(juego) {
    const respuesta = await fetch(`${API_URL}/runs?juego=${encodeURIComponent(juego)}`);
    if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
    }
    return respuesta.json();
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