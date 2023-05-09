import React, { useEffect, useState } from "react";
import { getAllGames } from "../../modules/gameManager";
import { Card } from "reactstrap";


export default function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAllGames().then(setGames);
  }, []);

  return (
    <>
      <h1 className="text-center my-games-heading">List of my games!!!!!</h1>
      <section>
        {games.map((game) => (
          <Card
            key={game.id}
            className="game-card"
            style={{ borderRadius: "20px" }}
          >
            <h2>Title: {game.title}</h2>
            <h1>Body: {game.body}</h1>
            {game.tags && (
              <h4>
                <ul>
                  {game.tags.map((tag) => (
                    <li key={tag.id}>{tag.name}</li>
                  ))}
                </ul>
              </h4>
            )}
          </Card>
        ))}
      </section>
    </>
  );
}