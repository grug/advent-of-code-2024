import fs from "fs";

const input = fs
  .readFileSync("./day-04/input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

function findXmas(board: string[][], [x, y]: [number, number]): boolean {
  const isValidPosition = (x: number, y: number) =>
    x >= 0 && x < board.length && y >= 0 && y < board[0].length;

  if (
    !isValidPosition(x - 1, y - 1) ||
    !isValidPosition(x + 1, y + 1) ||
    !isValidPosition(x - 1, y + 1) ||
    !isValidPosition(x + 1, y - 1)
  ) {
    return false;
  }

  const topLeftBottomRight = [
    board[x - 1][y - 1],
    board[x][y],
    board[x + 1][y + 1],
  ];
  const topRightBottomLeft = [
    board[x - 1][y + 1],
    board[x][y],
    board[x + 1][y - 1],
  ];

  const isXmas = (arr: string[]) => arr.sort().join("") === "AMS";

  return isXmas(topLeftBottomRight) && isXmas(topRightBottomLeft);
}

let timesFound = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const letter = input[i][j];
    if (letter === "A") {
      if (findXmas(input, [i, j])) {
        timesFound++;
      }
    }
  }
}

console.log(timesFound);
