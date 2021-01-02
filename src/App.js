import { useState } from "react";
import produce from "immer";
const numRows = 50;
const numCols = 50;

const App = () => {
  const [grid, setGrid] = useState(() => {
    let grid = [];
    for (let i = 0; i < numRows; i += 1) {
      grid.push(new Array(numCols).fill(0));
    }

    return grid;
  });

  return (
    <div className="app-container">
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
