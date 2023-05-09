import React, { useEffect, useState } from "react";
import {
  getUserGames,
  deleteGame,
  updateGame,
} from "../../modules/gameManager";
import { Card, Button, Form, FormGroup, Label, Input } from "reactstrap";
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
      <h1 className="text-center my-games-heading">List of my games!!!!!</h1>
      <section>
        {games.map((game) => (
          <Card
            key={game.id}
            className="game-card"
            style={{ borderRadius: "20px" }}
          >
            {editableGameId === game.id ? (
              // Render the edit form if this is the editable game
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newTitle = e.target.title.value;
                  const newBody = e.target.body.value;
                  handleEdit(game.id, newTitle, newBody);
                }}
              >
                <FormGroup className="input">
                  <Label for="title">Title:</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    defaultValue={game.title}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="body">Body:</Label>
                  <Input
                    type="textarea"
                    name="body"
                    id="body"
                    defaultValue={game.body}
                    required
                  />
                </FormGroup>
                <Button color="success" type="submit">
                  Save
                </Button>
                <Button color="secondary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </Form>
            ) : (
              // Render the game information if this is not the editable game
              <>
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
                <Button
                  color="primary"
                  className="m-3 edit-game-button input"
                  onClick={() => setEditableGameId(game.id)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  className="m-3 delete-game-button input"
                  onClick={() => handleDelete(game.id)}
                >
                  Delete
                </Button>
              </>
            )}
            <FormGroup className="input">
              <Label for="newTag">
                <h3>Add Tag:</h3>
              </Label>
              <Input
                className="input"
                type="select"
                name="newTag"
                id="newTag"
                value=""
                onChange={(e) => {
                  const tagId = e.target.value;
                  handleAddTag(game.id, parseInt(tagId)); // pass in tagId as an integer
                }}
              >
                <option value="">Select a tag</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Card>
        ))}
      </section>
      <GameForm refreshGames={() => getUserGames().then(setGames)} />
    </>
  );
}
