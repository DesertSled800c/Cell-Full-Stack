import React, { useState } from "react";
import { addGame } from "../../modules/gameManager";
import GameOLife from "./GameOLife";

export default function GameForm() {
  const [title, setTitle] = useState("");
  const [initialConfig, setInitialConfig] = useState("");
  const [showInitialConfigError, setShowInitialConfigError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    if (initialConfig === "") {
      setShowInitialConfigError(true);
      setInitialConfig("");
      submitButton.disabled = false;
      return;
    }

    const newGame = {
      title,
      body: initialConfig,
    };
    addGame(newGame).then(() => {
      window.location.reload();
    });
  };

  function setInitialConfigFromChild(config) {
    setInitialConfig(config);
    setShowInitialConfigError(false);
  }

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
      <GameOLife setInitialConfig={setInitialConfigFromChild} />
      <div className="initial-config-error">
        {showInitialConfigError && (
          <p>Please set an initial configuration before Add Game.</p>
        )}
      </div>
      <button
        className="add-button"
        type="submit"
        disabled={initialConfig === ""}
      >
        Add Game
      </button>
    </form>
  );
}
