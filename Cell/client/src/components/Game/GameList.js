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
      <h1 className="text-center">List of my games!!!!!</h1>
      <section>
        {games.map((game) => (
          <Card
            key={game.id}
            className="m-5 text-center"
            style={{ borderRadius: "20px" }}
          >
            <h3>Title: {game.title}</h3>
            <h2>Body: {game.body}</h2>
            {game.tags && (
              <h2>
                <ul>
                  {game.tags.map((tag) => (
                    <li key={tag.id}>{tag.name}</li>
                  ))}
                </ul>
              </h2>
            )}
          </Card>
        ))}
      </section>
    </>
  );
}