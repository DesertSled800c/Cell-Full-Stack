import React, { useState } from "react";
import { addGame } from "../../modules/gameManager";


export default function GameForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGame = { title, body };
    addGame(newGame).then(() => {
      // Clear the form and update the list of games
      setTitle("");
      setBody("");
      window.location.reload(); // Refresh the page to get the updated list of games
    });
  };

  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <h3 className="form-heading">Add a new game:</h3>
      <div className="form-input">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          className="my-input"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-input">
        <label htmlFor="body" className="form-label">
          Body:
        </label>
        <textarea
          className="my-input"
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button className="add-button" type="submit">
        Add Game
      </button>
    </form>
  );
}
