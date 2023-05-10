import React, { useEffect, useState } from "react";
import { getAllGames } from "../../modules/gameManager";

export default function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAllGames().then(setGames);
  }, []);

  return (
    <>
      <h1 className="text-center my-games-heading">All Games</h1>
      <section className="game-section">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <h2 className="game-title">Title: {game.title}</h2>
            <p className="game-body">Body: {game.body}</p>
            {game.tags && (
              <div className="tag-list">
                <ul className="tag-list-ul">
                  {game.tags.map((tag) => (
                    <li key={tag.id} className="tag">
                      {tag.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
