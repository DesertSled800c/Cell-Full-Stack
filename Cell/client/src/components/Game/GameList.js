import React, { useEffect, useState } from "react";
import Game from "./Game";
import { getAllGames } from "../../modules/gameManager";

export default function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAllGames().then(setGames);
  }, []);

  return (
    <>
      <h1 className="text-center">List of games!!!!!</h1>
      <section>
        {games.map((g) => (
          <Game key={g.id} game={g} />
        ))}
      </section>
    </>
  );
}
