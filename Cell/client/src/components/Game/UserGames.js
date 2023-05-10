import React, { useEffect, useState } from "react";
import {
  getUserGames,
  deleteGame,
  updateGame,
} from "../../modules/gameManager";
import GameForm from "./GameForm";
import { addGameTag, getAllTags } from "../../modules/tagManager";


export default function UserGames() {
  const [games, setGames] = useState([]);
  const [editableGameId, setEditableGameId] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getUserGames().then(setGames);
    getAllTags().then(setTags);
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (confirmDelete) {
      deleteGame(id)
        .then(() => {
          // Remove the deleted game from the state
          setGames((prevGames) => prevGames.filter((game) => game.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting game", error);
        });
    }
  };

  const handleEdit = (gameId, newTitle, newBody) => {
    const updatedGame = { id: gameId, title: newTitle, body: newBody };
    updateGame({ ...updatedGame })
      .then((updatedGame) => {
        // Replace the old game with the updated game in the state
        setGames((prevGames) =>
          prevGames.map((game) =>
            game.id === updatedGame.id ? updatedGame : game
          )
        );
        // Clear the editable game ID to close the edit form
        setEditableGameId(null);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating game", error);
      });
  };

  const handleCancelEdit = () => {
    // Clear the editable game ID to close the edit form
    setEditableGameId(null);
  };

  const handleAddTag = (gameId, tagId) => {
    addGameTag(gameId, tagId)
      .then(() => {
        // Refresh the game list to show the updated tags
        getUserGames().then(setGames);
      })
      .catch((error) => {
        console.error("Error adding tag to game", error);
      });
  };

  return (
    <>
      <h1 className="text-center my-games-heading">My Games</h1>
      <section className="game-section">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <div>
              {editableGameId === game.id ? (
                // Render the edit form if this is the editable game
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const newTitle = e.target.title.value;
                    const newBody = e.target.body.value;
                    handleEdit(game.id, newTitle, newBody);
                  }}
                >
                  <div className="input">
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      defaultValue={game.title}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                      name="body"
                      id="body"
                      defaultValue={game.body}
                      required
                    />
                  </div>
                  <button type="submit" className="save-button">
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                // Render the game information if this is not the editable game
                <>
                  <h2 className="game-title">{game.title}</h2>
                  <p className="game-body">{game.body}</p>
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => setEditableGameId(game.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(game.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
            <div className="tag-dropdown-container">
              {tags && (
                <select
                  className="tag-dropdown"
                  defaultValue=""
                  onChange={(e) => handleAddTag(game.id, e.target.value)}
                >
                  <option value="" disabled>
                    Add Tag
                  </option>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
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
      <GameForm />
    </>
  );
}
