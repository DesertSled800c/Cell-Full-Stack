import React from "react";
import { Card } from "reactstrap";

export default function Game({ game }) {
  return (
    <Card className="m-5 text-center" style={{ borderRadius: "20px" }}>
        <h3>{game.title}</h3>
        <h2>{game.body}</h2>
    </Card>
  );
}

