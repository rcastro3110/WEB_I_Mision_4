import { useQuery } from "@tanstack/react-query";
import { obtenerRuns, mensajeDeError } from "../services/runs.js";

// Pasa segundos a "1:02:03" (con horas) o "12:34" (sin horas)
function formatearTiempo(total) {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");
    return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
}

// "2026-10-01" -> "01/10/2026"
function formatearFecha(fecha) {
    return fecha.split("-").reverse().join("/");
}

export default function ListaRuns({ juego }) {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["runs", juego],
        queryFn: () => obtenerRuns(juego),
    });

    if (isPending) return <p role="status">Loading…</p>;
    if (isError) return <p role="alert">Error: {mensajeDeError(error)}</p>;
    if (data.length === 0) return <p>No runs for this game yet.</p>;

    // Valor derivado: más rápida primero (no se guarda como estado)
    const ordenadas = data.toSorted((a, b) => a.tiempo - b.tiempo);

    return (
        <table>
        <thead>
            <tr>
            <th>#</th>
            <th>Runner</th>
            <th>Category</th>
            <th>Time</th>
            <th>Platform</th>
            <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {ordenadas.map((run, i) => (
            <tr key={run.id}>
                <td>{i + 1}</td>
                <td>{run.nombre}</td>
                <td>{run.categoria}</td>
                <td>{formatearTiempo(run.tiempo)}</td>
                <td>{run.plataforma}</td>
                <td>{formatearFecha(run.fecha)}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
}