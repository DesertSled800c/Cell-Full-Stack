import React, { useEffect, useState } from "react";
import { getUserGames } from "../../modules/gameManager";
import Game from "./Game";
import GameForm from "./GameForm";


export default function UserGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getUserGames().then(setGames);
  }, []);

  return (
    <>
      <h1 className="text-center">List of my games!!!!!</h1>
      <section>
        {games.map((g) => (
          <Game key={g.id} game={g} />
        ))}
      </section>
      <GameForm />
    </>
  );
}
