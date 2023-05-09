import React, { useState } from "react";
import { addGame } from "../../modules/gameManager";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

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
    <Form className="input" onSubmit={handleSubmit}>
      <h3>Add a new game:</h3>
      <FormGroup>
        <Label for="title">Title:</Label>
        <Input
          className="my-input"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="body">Body:</Label>
        <Input
          className="my-input"
          type="textarea"
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </FormGroup>
      <Button className="my-button" color="primary" type="submit">
        Add Game
      </Button>
    </Form>
  );
}
