import { useState } from "react";
import { NOMBRES_JUEGOS } from "./data/juegos.js";
import ListaRuns from "./components/ListaRuns.jsx";
import FormularioRun from "./components/FormularioRun.jsx";

export default function App() {
  const [juego, setJuego] = useState(NOMBRES_JUEGOS[0]);

  return (
    <>
      <h1>Speedrun Leaderboard</h1>

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

      <ListaRuns juego={juego} />

      <FormularioRun key={juego} juego={juego} />
    </>
  );
}