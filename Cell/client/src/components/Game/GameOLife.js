import React, { useState, useEffect, useRef } from "react";

const CELL_SIZE = 10;
const WIDTH = 50;
const HEIGHT = 50;

const GameOfLife = ({ setInitialConfig }) => {
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
    const id = setInterval(runSimulation, 1000 / speed);
    setIntervalId(id);
  };

  const handleStop = () => {
    setRunning(false);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleRandom = () => {
    const newBoard = board.map((row) => row.map(() => Math.random() < 0.5));
    setBoard(newBoard);
    setRandomConfig(true);
  };

  const handleClear = () => {
    const newBoard = board.map((row) => row.map(() => false));
    setBoard(newBoard);
    setGeneration(0);
    setRandomConfig(false);
  };

  const handleSetInitialConfig = () => {
    const binaryString = board
      .flat()
      .map((cell) => (cell ? "1" : "0"))
      .join("");
    setInitialConfig(binaryString);
  };

  const handleResetGeneration = () => {
    setGeneration(0);
  };

  const handleSpeedChange = (event) => {
    const newSpeed = Number(event.target.value);
    setSpeed(newSpeed);
    if (runningRef.current) {
      handleStop();
      handleStart();
    }
  };

  const runSimulation = () => {
    if (!runningRef.current) {
      return;
    }

    setBoard((board) => {
      const newBoard = board.map((row, y) =>
        row.map((cell, x) => {
          const neighbors = [
            [y - 1, x - 1],
            [y - 1, x],
            [y - 1, x + 1],
            [y, x - 1],
            [y, x + 1],
            [y + 1, x - 1],
            [y + 1, x],
            [y + 1, x + 1],
          ]
            .filter(([y, x]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH)
            .map(([y, x]) => board[y][x]);

          const aliveNeighbors = neighbors.filter((cell) => cell).length;
          if (cell && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
            return true;
          } else if (!cell && aliveNeighbors === 3) {
            return true;
          } else {
            return false;
          }
        })
      );
      return newBoard;
    });

    setGeneration((generation) => generation + 1);
  };

  useEffect(() => {
    if (randomConfig) {
      return;
    }

    handleRandom();
  }, []);

  useEffect(() => {
    if (running) {
      clearInterval(intervalId);
      const id = setInterval(runSimulation, 1000 / speed);
      setIntervalId(id);
    }
  }, [speed]);

 return (
   <div>
     <div className="controls">
       <div>Generation: {generationRef.current}</div>
       <button className="start-btn" onClick={handleStart}>
         Start
       </button>
       <button className="stop-btn" onClick={handleStop}>
         Stop
       </button>
       <button className="random-btn" onClick={handleRandom}>
         Random
       </button>
       <button className="clear-btn" onClick={handleClear}>
         Clear
       </button>
       <button className="reset-gen-btn" onClick={handleResetGeneration}>
         Reset Generation
       </button>
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
       <label htmlFor="initialConfig">Initial Configuration:</label>
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
     <div className="board-container" onClick={handleBoardClick}>
       {board.map((row, y) =>
         row.map((cell, x) => (
           <div
             key={`${y},${x}`}
             className={`cell ${cell ? "alive" : ""}`}
             style={{
               gridColumn: x + 1,
               gridRow: y + 1,
               width: CELL_SIZE - 2,
               height: CELL_SIZE - 2,
             }}
           />
         ))
       )}
     </div>
   </div>
 );
};

export default GameOfLife;
