import { useQuery } from "@tanstack/react-query";
import { obtenerRuns, mensajeDeError } from "../services/runs.js";
import { categoriasDe } from "../data/juegos.js";
import { mejoresRuns } from "../services/ranking.js";

// Pasa segundos a "1:02:03" (con horas) o "12:34" (sin horas)
function formatearTiempo(total) {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const mm = m < 10 ? "0" + m : m;
    const ss = s < 10 ? "0" + s : s;
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
    
    const { runs, descartadas } = data;

    if (runs.length === 0 && descartadas === 0) {
        return <p>No runs for this game yet.</p>;
    }

    // Valores derivados: no se guardan en estado, se calculan en cada render
    const porCategoria = Object.groupBy(mejoresRuns(runs), (run) => run.categoria);
    const categoriasConRuns = categoriasDe(juego).filter(
        (c) => porCategoria[c.nombre]
    );

    return (
        <>  
            {descartadas > 0 && (
                <p role="alert">
                {descartadas} run(s) ignored: invalid data from the API.
                </p>
            )}

            {categoriasConRuns.map((c) => {
                const ordenadas = porCategoria[c.nombre].toSorted(
                    (a, b) => a.tiempo - b.tiempo
                );

                return (
                <section key={c.nombre} className="categoria">
                    <div className="categoria-titulo">
                        <h3>{c.nombre}</h3>
                        <details className="info">
                            <summary>?</summary>
                            <p>{c.descripcion}</p>
                        </details>
                    </div>
                    <table>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Runner</th>
                        <th>Time</th>
                        <th>Platform</th>
                        <th>Date</th>
                        <th>Version</th>
                        <th>Video</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenadas.map((run, i) => (
                        <tr key={run.id}>
                            <td>{i + 1}</td>
                            <td>{run.nombre}</td>
                            <td>{formatearTiempo(run.tiempo)}</td>
                            <td>{run.plataforma}</td>
                            <td>{formatearFecha(run.fecha)}</td>
                            <td>{run.version}</td>
                            <td>
                                {run.video.startsWith("https://") ? (
                                    <a href={run.video} target="_blank" rel="noreferrer">
                                    Watch
                                    </a>
                                ) : (
                                    "—"
                                )}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </section>
                );
            })}
        </>
    );
}