import React, { useState, useEffect, useRef } from "react";

const CELL_SIZE = 10;
const WIDTH = 50;
const HEIGHT = 50;

const GameOLife = ({ setInitialConfig }) => {
  const [board, setBoard] = useState(() =>
    Array.from({ length: HEIGHT }, () =>
      Array.from({ length: WIDTH }, () => false)
    )
  );
  const [running, setRunning] = useState(false); 
  const [generation, setGeneration] = useState(0);
  const [randomConfig, setRandomConfig] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [speed, setSpeed] = useState(5);

  const handleSetInitialConfig = () => {
    const binaryString = board
      .flat()
      .map((cell) => (cell ? "1" : "0"))
      .join("");
    setInitialConfig(binaryString);
  };
  const runningRef = useRef(running);
  runningRef.current = running;

  const generationRef = useRef(generation);
  generationRef.current = generation;

  const handleBoardClick = (event) => {
    const { clientX, clientY } = event;
    const { left, top } = event.currentTarget.getBoundingClientRect();

    const x = Math.floor((clientX - left) / CELL_SIZE);
    const y = Math.floor((clientY - top) / CELL_SIZE);

    const newBoard = board.map((row, i) =>
      i === y ? row.map((cell, j) => (j === x ? !cell : cell)) : row
    );
    setBoard(newBoard);
  };

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleSingleStep = () => {
    if (!runningRef.current) {
      const newBoard = computeNextBoard(board);
      setBoard(newBoard);
      setGeneration(generationRef.current + 1);
    }
  };

  const handleRandom = () => {
    const newBoard = Array.from({ length: HEIGHT }, () =>
      Array.from({ length: WIDTH }, () => Math.random() > 0.7)
    );
    setBoard(newBoard);
    setGeneration(0);
  };

  const handleClear = () => {
    const newBoard = Array.from({ length: HEIGHT }, () =>
      Array.from({ length: WIDTH }, () => false)
    );
    setBoard(newBoard);
    setGeneration(0);
    setRunning(false);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleSpeedChange = (event) => {
    const newSpeed = Number(event.target.value);
    setSpeed(newSpeed);
    if (runningRef.current) {
      handleStop();
      handleStart();
    }
  };

  const handleRandomConfigChange = () => {
    const newBoard = board.map((row) => row.map(() => Math.random() < 0.5));
    setBoard(newBoard);
    setRandomConfig(true);
  };

  useEffect(() => {
    if (randomConfig) {
      handleRandom();
    }
  }, [randomConfig]);

  useEffect(() => {
    if (!running) {
      return;
    }

    const id = setInterval(() => {
      const newBoard = computeNextBoard(board);
      setBoard(newBoard);
      setGeneration(generationRef.current + 1);
    }, 1000 / speed);

    setIntervalId(id);

    return () => clearInterval(id);
  }, [board, running, speed]);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const renderBoard = () => {
      ctx.clearRect(0, 0, WIDTH * CELL_SIZE, HEIGHT * CELL_SIZE);

      ctx.fillStyle = "#008080";
      ctx.fillRect(0, 0, WIDTH * CELL_SIZE, HEIGHT * CELL_SIZE);

      ctx.fillStyle = "#FA8072";
      board.forEach((row, y) =>
        row.forEach((alive, x) => {
          if (alive) {
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }
        })
      );

      ctx.strokeStyle = "#FA8072";
      for (let x = 0; x <= WIDTH * CELL_SIZE; x += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT * CELL_SIZE);
        ctx.stroke();
      }

      for (let y = 0; y <= HEIGHT * CELL_SIZE; y += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(WIDTH * CELL_SIZE, y);
        ctx.stroke();
      }
    };
    renderBoard();
  }, [board]);

  const computeNextBoard = (board) => {
    const newBoard = Array.from({ length: HEIGHT }, () =>
      Array.from({ length: WIDTH }, () => false)
    );

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const neighbors = getNeighbors(board, x, y);
        const aliveNeighbors = neighbors.filter((n) => n).length;

        if (board[y][x] && aliveNeighbors >= 2 && aliveNeighbors <= 3) {
          newBoard[y][x] = true;
        } else if (!board[y][x] && aliveNeighbors === 3) {
          newBoard[y][x] = true;
        }
      }
    }

    return newBoard;
  };

  const getNeighbors = (board, x, y) => {
    const neighbors = [];

    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      for (let xOffset = -1; xOffset <= 1; xOffset++) {
        if (yOffset === 0 && xOffset === 0) {
          continue;
        }

        const neighborX = x + xOffset;
        const neighborY = y + yOffset;

        if (
          neighborX >= 0 &&
          neighborY >= 0 &&
          neighborX < WIDTH &&
          neighborY < HEIGHT
        ) {
          neighbors.push(board[neighborY][neighborX]);
        }
      }
    }

    return neighbors;
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="controls">
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleClear}>Clear</button>
          <button className="random-btn" onClick={handleRandomConfigChange}>
            Random
          </button>
          <button onClick={handleSingleStep}>Step</button>
          <label htmlFor="speed">Speed:</label>
          <input
            className="speed-input"
            type="range"
            name="speed"
            id="speed"
            min="1"
            max="10"
            value={speed}
            onChange={handleSpeedChange}
          />
        </div>
      </div>
      <canvas
        className="game-board"
        ref={canvasRef}
        width={CELL_SIZE * WIDTH}
        height={CELL_SIZE * HEIGHT}
        onClick={handleBoardClick}
      />
      <div className="game-info">
        <p>Generation: {generation}</p>
      </div>
      <label htmlFor="initialConfig">Initial Configuration Preview:</label>
      <input
        className="initial-config-input"
        type="text"
        name="initialConfig"
        id="initialConfig"
        value={board
          .flat()
          .map((cell) => (cell ? "1" : "0"))
          .join("")}
        readOnly
      />
      <button
        className="set-config-btn"
        type="button"
        onClick={handleSetInitialConfig}
      >
        Set Initial Config
      </button>
    </div>
  );
};

export default GameOLife;
