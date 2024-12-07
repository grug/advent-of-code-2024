import fs from "fs";

const directions: Record<
  string,
  { dxdy: [number, number]; nextDirection: string }
> = {
  N: { dxdy: [-1, 0], nextDirection: "E" },
  S: { dxdy: [1, 0], nextDirection: "W" },
  E: { dxdy: [0, 1], nextDirection: "S" },
  W: { dxdy: [0, -1], nextDirection: "N" },
};

function findStartingCoords(map: string[][]): [number, number, string] {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === "^") return [i, j, "N"];
    }
  }
  throw new Error("No starting position found");
}

function isWithinBounds(coords: [number, number], map: string[][]): boolean {
  return (
    coords[0] >= 0 &&
    coords[0] < map.length &&
    coords[1] >= 0 &&
    coords[1] < map[0].length
  );
}

function advance(
  coords: [number, number],
  direction: string,
  map: string[][]
): [number, number, string] {
  const directionInfo = directions[direction];
  let currentRow = coords[0];
  let currentCol = coords[1];
  let currentDirection = direction;

  while (true) {
    const nextRow = currentRow + directionInfo.dxdy[0];
    const nextCol = currentCol + directionInfo.dxdy[1];

    if (!isWithinBounds([nextRow, nextCol], map)) {
      return [currentRow, currentCol, "OUT"];
    }

    if (map[nextRow][nextCol] === "#") {
      currentDirection = directionInfo.nextDirection;
      return [currentRow, currentCol, currentDirection];
    }

    currentRow = nextRow;
    currentCol = nextCol;
  }
}

function causesInfiniteCycle(map: string[][]): boolean {
  const [startRow, startCol, startDirection] = findStartingCoords(map);
  const visited = new Set<string>();
  let current: [number, number, string] = [startRow, startCol, startDirection];

  while (true) {
    const stateKey = `${current[0]},${current[1]},${current[2]}`;

    if (visited.has(stateKey)) {
      return true;
    }

    visited.add(stateKey);

    current = advance([current[0], current[1]], current[2], map);

    if (current[2] === "OUT") {
      return false;
    }
  }
}

function findInfiniteCycleCausingCoords(map: string[][]): [number, number][] {
  const infiniteCycleCoords: [number, number][] = [];
  const [startRow, startCol] = findStartingCoords(map);

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      // Skip the starting position and already occupied cells
      if (map[i][j] === "." && !(i === startRow && j === startCol)) {
        const mapCopy = map.map((row) => [...row]);
        mapCopy[i][j] = "#";

        if (causesInfiniteCycle(mapCopy)) {
          infiniteCycleCoords.push([i, j]);
        }
      }
    }
  }

  return infiniteCycleCoords;
}

const input = fs
  .readFileSync("./day-06/input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

const infiniteCycleCoords = findInfiniteCycleCausingCoords(input);

console.log(infiniteCycleCoords.length);
