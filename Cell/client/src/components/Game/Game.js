import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Card } from "reactstrap";

export default function Game({ game }) {
  return (
    <Card className="m-5 text-center" style={{ borderRadius: "20px" }}>
      <button
        style={{ borderRadius: "20px" }}
      >
        <h3>{game.title}</h3>
      </button>
    </Card>
  );
}
