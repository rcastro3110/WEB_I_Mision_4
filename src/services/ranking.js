// Se queda con la mejor run (menor tiempo) de cada runner en cada categoría
export function mejoresRuns(runs) {
    const mejores = runs.reduce((acc, run) => {
        const clave = `${run.nombre.trim().toLowerCase()}|${run.categoria}`;
        if (!acc[clave] || run.tiempo < acc[clave].tiempo) {
            acc[clave] = run;
        }
        return acc;
    }, {});
    return Object.values(mejores);
}