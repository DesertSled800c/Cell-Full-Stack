import { useState } from "react";
import { addGame } from "../../modules/gameManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";


const GameForm = () => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const submitGame = (e) => {
    e.preventDefault();
    const game = {
      title,
      body
    };

    addGame(game)
  };

  return (
    <>
      <h2>New Game</h2>
      <Form onSubmit={submitGame}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="body">Body</Label>
          <Input
            name="body"
            type="textarea"
            onChange={(e) => setBody(e.target.value)}
          />
        </FormGroup>
        <Button id="game-save-btn" color="success">
          Save
        </Button>
      </Form>
    </>
  );
};

export default GameForm;
