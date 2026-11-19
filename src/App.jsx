import { useState } from "react";
import { NOMBRES_JUEGOS } from "./data/juegos.js";
import ListaRuns from "./components/ListaRuns.jsx";
import FormularioRun from "./components/FormularioRun.jsx";

export default function App() {
  const [juego, setJuego] = useState(NOMBRES_JUEGOS[0]);

  return (
    <main className="app">
      <header className="cabecera">
        <h1>Speedrun Leaderboard</h1>
        <div className="selector">
          <label htmlFor="selector-juego">Game</label>
          <select
            id="selector-juego"
            value={juego}
            onChange={(e) => setJuego(e.target.value)}
          >
            {NOMBRES_JUEGOS.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="columnas">
        <section className="panel panel--tabla">
          <h2>Leaderboard: {juego}</h2>
          <ListaRuns juego={juego} />
        </section>

        <section className="panel">
          <FormularioRun key={juego} juego={juego} />
        </section>
      </div>
    </main>
  );
}