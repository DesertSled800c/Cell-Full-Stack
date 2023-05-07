import React from "react";
import { Card } from "reactstrap";

export default function Game({ game }) {
  return (
    <Card className="m-5 text-center" style={{ borderRadius: "20px" }}>
      <h3>{game.title}</h3>
      <h2>{game.body}</h2>
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
  );
}
