import { useState, useRef } from "react";
import produce from "immer";
const numRows = 50;
const numCols = 50;

const operations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const App = () => {
  const gameInterval = useRef();

  const makeGrid = (aliveProbabilty = 0) => {
    let grid = [];
    for (let i = 0; i < numRows; i += 1) {
      const line = [...new Array(numCols)].map(() =>
        Math.random() <= aliveProbabilty ? 1 : 0
      );
      grid.push(line);
    }

    return grid;
  };
  const [grid, setGrid] = useState(makeGrid);

  const simulateGame = () => {
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i += 1) {
          for (let j = 0; j < numCols; j += 1) {
            let neighboursCount = 0;

            operations.forEach(([x, y]) => {
              const newI = x + i;
              const newJ = y + j;

              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighboursCount += g[newI][newJ];
              }
            });

            if (neighboursCount < 2 || neighboursCount > 3) {
              gridCopy[i][j] = 0;
            } else if (neighboursCount === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });
  };

  const startGame = () => {
    gameInterval.current = setInterval(simulateGame, 100);
  };

  const stopGame = () => {
    clearInterval(gameInterval.current);
  };

  const clearGame = () => {
    stopGame();
    setGrid(makeGrid());
  };

  const randomGame = () => {
    setGrid(makeGrid(0.3));
  };

  return (
    <div className="app-container">
      <div>
        <button onClick={startGame}>start</button>
        <button onClick={stopGame}>stop</button>
        <button onClick={clearGame}>clear</button>
        <button onClick={randomGame}>random</button>
      </div>
      {grid.map((line, i) => {
        return (
          <div key={i} className="box-container">
            {line.map((col, j) => {
              return (
                <div
                  key={j}
                  className={`box ${col === 1 ? "box-alive" : ""}`}
                  onClick={() => {
                    const newGrid = produce(grid, (gridCopy) => {
                      gridCopy[i][j] = (gridCopy[i][j] + 1) % 2;
                    });
                    setGrid(newGrid);
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default App;
