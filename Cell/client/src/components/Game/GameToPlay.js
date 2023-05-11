import React, { useState, useEffect, useRef } from "react";

const CELL_SIZE = 10;
const WIDTH = 50;
const HEIGHT = 50;

const GameToPlay = ({ initialConfig }) => {
  const [board, setBoard] = useState(() =>
    initialConfig
      ? initialConfig
          .split("")
          .map((binary) => binary === "1")
          .reduce(
            (acc, curr, index) =>
              index % WIDTH === 0
                ? [...acc, [curr]]
                : [...acc.slice(0, -1), [...acc.slice(-1)[0], curr]],
            []
          )
      : Array.from({ length: HEIGHT }, () =>
          Array.from({ length: WIDTH }, () => false)
        )
  );
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [randomConfig, setRandomConfig] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [speed, setSpeed] = useState(5);

  const runningRef = useRef(running);
  runningRef.current = running;

  const generationRef = useRef(generation);
  generationRef.current = generation;

  const handleBoardClick = (event) => {
    const { clientX, clientY } = event;
    const { left, top } = canvasRef.current.getBoundingClientRect();

    const canvasX = clientX - left;
    const canvasY = clientY - top;

    const cellX = Math.floor(canvasX / CELL_SIZE);
    const cellY = Math.floor(canvasY / CELL_SIZE);

    const newBoard = [...board];
    newBoard[cellY][cellX] = !newBoard[cellY][cellX];
    setBoard(newBoard);
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

  const handleRandom = () => {
    const newBoard = Array.from({ length: HEIGHT }, () =>
      Array.from({ length: WIDTH }, () => Math.random() > 0.7)
    );
    setBoard(newBoard);
    setGeneration(0);
  };

  const handleRun = () => {
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

  const handleIntervalChange = (event) => {
    setSpeed(event.target.value);
  };

  const handleRandomConfigChange = (event) => {
    setRandomConfig(event.target.checked);
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

      ctx.fillStyle = "#aaaaaa";
      ctx.fillRect(0, 0, WIDTH * CELL_SIZE, HEIGHT * CELL_SIZE);

      ctx.fillStyle = "#FFFFFF";
      board.forEach((row, y) =>
        row.forEach((alive, x) => {
          if (alive) {
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }
        })
      );

      ctx.strokeStyle = "#bbbbbb";
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
        <h1>Conway's Game of Life</h1>
        <div className="game-controls">
          <button onClick={handleRun}>Run</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleSingleStep}>Step</button>
          <button onClick={handleClear}>Clear</button>
          <label htmlFor="interval">Interval: {speed} </label>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={handleIntervalChange}
            id="interval"
          />
          <div className="random-config">
            <input
              type="checkbox"
              id="random-config"
              checked={randomConfig}
              onChange={handleRandomConfigChange}
            />
            <label htmlFor="random-config">Random Configuration</label>
          </div>
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
    </div>
  );
};

export default GameToPlay;
