"use client";

import { use, useEffect, useState } from "react";
import RandomImageButton from "./randomImage";
import Tile from "./tile";
import checkParity from "./gridParity";
import Dropdown from "./dropdown";
import ShuffleButton from "./shuffleButton";

export default function BrickSlider() {
  const [image, setImageUrl] = useState({
    src: "",
    naturalWidth: 0,
    naturalHeight: 0,
  });
  const [gridSize, setGridSize] = useState(3);
  const [gridClass, setGridClass] = useState("grid-cols-3");
  const [grid, setGrid] = useState<number[][]>([]);
  const [winConditionMet, setWinConditionMet] = useState(false);

  const generateSquareArray = (sideLength: number) => {
    const totalElements = sideLength * sideLength;
    const sequentialArray = Array.from(
      { length: totalElements },
      (_, index) => index + 1
    );
    const shuffledArray = sequentialArray.sort(() => Math.random() - 0.5);

    const squareArray = [];
    let currentIndex = 0;

    for (let i = 0; i < sideLength; i++) {
      const row = [];
      for (let j = 0; j < sideLength; j++) {
        row.push(shuffledArray[currentIndex]);
        currentIndex++;
      }
      squareArray.push(row);
    }

    // Swap element with value 1 to [1, 1]
    const indexOfOne = squareArray.findIndex((row) => row.includes(1));
    const rowWithOne = squareArray[indexOfOne];
    const colIndexOfOne = rowWithOne.indexOf(1);

    if (indexOfOne !== 0 || colIndexOfOne !== 0) {
      rowWithOne[colIndexOfOne] = squareArray[0][0];
      squareArray[0][0] = 1;
    }
    console.log("new array:", squareArray);
    //Check if the puzzle is solvable (parity), if not, swap two tiles to invert the parity.
    if (!checkParity(squareArray)) {
      console.log("puzzle not solvable, swapping two other tiles position..");
      const tileSwapValue = squareArray[1][1];
      squareArray[1][1] = squareArray[1][0];
      squareArray[1][0] = tileSwapValue;
      console.log("final array:", squareArray);
    }

    return squareArray;
  };

  const handleTileClick = (rowIndex: number, colIndex: number) => {
    const adjacentTileIndices = [
      { row: rowIndex - 1, col: colIndex }, // above
      { row: rowIndex + 1, col: colIndex }, // below
      { row: rowIndex, col: colIndex - 1 }, // left
      { row: rowIndex, col: colIndex + 1 }, // right
    ];

    const adjacentTile = adjacentTileIndices.find(({ row, col }) => {
      return (
        row >= 0 &&
        row < gridSize &&
        col >= 0 &&
        col < gridSize &&
        grid[row][col] === 1
      );
    });

    if (adjacentTile) {
      const newGrid = [...grid];
      const temp = newGrid[rowIndex][colIndex];
      newGrid[rowIndex][colIndex] = newGrid[adjacentTile.row][adjacentTile.col];
      newGrid[adjacentTile.row][adjacentTile.col] = temp;
      setGrid(newGrid);
    }
  };

  useEffect(() => {
    setGrid(generateSquareArray(gridSize));
  }, []);

  const shuffle = () => {
    setGrid(generateSquareArray(gridSize));
    setWinConditionMet(false);
  };

  const handleGridSizeChange = (number: number) => {
    setGridSize(number);
    setGrid(generateSquareArray(number));
    setGridClass("grid-cols-" + number);
  };

  useEffect(() => {
    grid !== null && checkWinCondition(grid.flat())
      ? setWinConditionMet(true)
      : null;
  }, [grid]);

  useEffect(() => {
    setWinConditionMet(false);
  }, [image, gridSize]);

  const checkWinCondition = (arr: number[]) => {
    return arr
      .map((value, index) => value - 1 === index)
      .every((result) => result);
  };

  return (
    <div className=" h-full max-h-full m-2 rounded-lg">
      <div className="text-2xl text-center font-mono py-3 border-0">
        Sliding Tile Puzzle Game
      </div>
      <div className="py-4">
        <div className="flex-col justify-center ">
          <div className={`grid ${gridClass} gap-0`}>
            {grid?.map((row, rowIndex) =>
              row.map((tile, colIndex) => (
                <div
                  className={`shrink max-w-12 border-blue-400 border-${
                    winConditionMet ? 0 : 2
                  }`}
                  key={`${rowIndex}${colIndex}`}
                  onClick={
                    !winConditionMet
                      ? () => handleTileClick(rowIndex, colIndex)
                      : undefined
                  }
                >
                  <Tile
                    tile={tile}
                    image={image}
                    gridSize={gridSize}
                    row={rowIndex}
                    col={colIndex}
                    winConditionMet={winConditionMet}
                  />
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center gap-3 py-3 w-100">
            <div>
              <RandomImageButton getImage={setImageUrl} />
            </div>
            <div>
              <ShuffleButton shuffle={shuffle} />
            </div>
            <div>
              <Dropdown
                onGridSizeChange={handleGridSizeChange}
                gridSize={gridSize}
              />
            </div>
          </div>
          <div className="text-center font-mono font-extrabold text-2xl">
            {winConditionMet && "Puzzle complete!"}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4"></div>
        <div className="grid grid-cols-3 gap-4"></div>
        <div className="grid grid-cols-4 gap-4"></div>
        <div className="grid grid-cols-5 gap-4"></div>
        <div className="grid grid-cols-6 gap-4"></div>
      </div>
    </div>
  );
}
