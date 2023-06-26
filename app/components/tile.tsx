import { useRef, useState } from "react";
type Tile = {
  tile: number;
  row: number;
  col: number;
  image: { src: string; naturalWidth: number; naturalHeight: number };
  gridSize: number;
  winConditionMet: boolean;
};

export default function Tile({
  tile,
  row,
  col,
  image,
  gridSize,
  winConditionMet,
}: Tile) {
  const xAspect =
    image.naturalWidth / Math.min(image.naturalHeight, image.naturalWidth);
  const yAspect =
    image.naturalHeight / Math.min(image.naturalHeight, image.naturalWidth);
  let imageScale = 100;
  if (image.naturalWidth > image.naturalHeight) {
    imageScale =
      (Math.max(image.naturalHeight, image.naturalWidth) /
        Math.min(image.naturalHeight, image.naturalWidth)) *
      100 *
      gridSize;
  } else {
    imageScale = 100 * gridSize;
  }

  const xGridPos = (tile - 1) % gridSize; // [0, 1, 2, ...]
  const yGridPos = Math.floor((tile - 1) / gridSize); // [0, 1, 2, ...]

  const xTrim = (xAspect - 1) / (2 * xAspect);
  const yTrim = (yAspect - 1) / (2 * yAspect);

  const xStart = xTrim + (xGridPos / gridSize) * (1 - 2 * xTrim);
  const yStart = yTrim + (yGridPos / gridSize) * (1 - 2 * yTrim);

  const xEnd = xTrim + ((xGridPos + 1) / gridSize) * (1 - 2 * xTrim);
  const yEnd = yTrim + ((yGridPos + 1) / gridSize) * (1 - 2 * yTrim);

  const xOffset = xStart / (1 - xEnd + xStart);
  const yOffset = yStart / (1 - yEnd + yStart);

  if (tile === 1) {
    console.log("width", image.naturalWidth);
    console.log("height", image.naturalHeight);
    console.log("image scale", imageScale);
    console.log("GridSize", gridSize);
    console.log("xTrim", xTrim);
    console.log("yTrim", yTrim);
  }
  console.log(
    tile,
    "x-pos",
    xGridPos,
    "y-pos",
    yGridPos,
    "xStart",
    xStart,
    "xEnd",
    xEnd,
    "yStart",
    yStart,
    "yEnd",
    yEnd,
    "xOffset",
    xOffset,
    "yOffset",
    yOffset
  );
  return (
    <div
      key={`${row}-${col}`}
      className={`aspect-square ${tile === 1 ? "bg-blue-400" : ""}`}
      style={
        (tile !== 1 || winConditionMet) && image
          ? {
              backgroundImage: `url(${image.src})`,
              backgroundPositionX: `${xOffset * 100}%`,
              backgroundPositionY: `${yOffset * 100}%`,
              backgroundSize: `${imageScale}%`,
            }
          : undefined
      }
    ></div>
  );
}
