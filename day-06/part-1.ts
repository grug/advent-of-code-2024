import fs from "fs";

const input = fs
  .readFileSync("./day-06/input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

const directions: Record<
  string,
  { dxdy: [number, number]; nextDirection: string }
> = {
  N: { dxdy: [-1, 0], nextDirection: "E" },
  S: { dxdy: [1, 0], nextDirection: "W" },
  E: { dxdy: [0, 1], nextDirection: "S" },
  W: { dxdy: [0, -1], nextDirection: "N" },
};

function findStartingCoords(map: string[][]): [number, number] {
  let i, j;
  let startingCoords: [number, number] = [-1, -1];

  for (i = 0; i < map.length; i++) {
    for (j = 0; j < map.length; j++) {
      if (map[i][j] === "^") {
        startingCoords = [i, j];
        break;
      }
    }
  }

  return startingCoords;
}

function isWithinBounds(coords: [number, number], map: string[][]): boolean {
  return (
    coords[0] >= 0 &&
    coords[0] < map.length &&
    coords[1] >= 0 &&
    coords[1] < map[0].length
  );
}

function walk(map: string[][]): Set<string> {
  const uniqueCoords = new Set<string>();
  const startingCoords = findStartingCoords(map);

  uniqueCoords.add(`${startingCoords[0]},${startingCoords[1]}`);

  let currentCoords = startingCoords;
  let nextCoords = startingCoords;
  let direction = "N";
  let hasGoneOutOfBounds = false;

  do {
    nextCoords = [
      currentCoords[0] + directions[direction].dxdy[0],
      currentCoords[1] + directions[direction].dxdy[1],
    ];

    if (!isWithinBounds(nextCoords, map)) {
      hasGoneOutOfBounds = true;
      break;
    }

    if (map[nextCoords[0]][nextCoords[1]] === "#") {
      direction = directions[direction].nextDirection;
      nextCoords = [
        currentCoords[0] + directions[direction].dxdy[0],
        currentCoords[1] + directions[direction].dxdy[1],
      ];
    }

    uniqueCoords.add(`${nextCoords[0]},${nextCoords[1]}`);
    currentCoords = nextCoords;
  } while (!hasGoneOutOfBounds);

  return uniqueCoords;
}

const result = walk(input);

console.log(result.size);
