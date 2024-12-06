import fs from "fs";

const input = fs
  .readFileSync("./day-04/input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(""));

const directions: Record<string, [number, number]> = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
  upLeft: [-1, -1],
  upRight: [-1, 1],
  downLeft: [1, -1],
  downRight: [1, 1],
};

type Direction = keyof typeof directions;

function findWord(
  wordToFind: string,
  board: string[][],
  direction: Direction,
  [startingX, startingY]: [number, number]
) {
  let found = false;

  for (let i = 0; i < wordToFind.length; i++) {
    const [dx, dy] = directions[direction];
    const x = startingX + dx * i;
    const y = startingY + dy * i;

    if (x < 0 || y < 0 || x >= board.length || y >= board[0].length) {
      break;
    }

    if (board[x][y] !== wordToFind[i]) {
      break;
    }

    if (i === wordToFind.length - 1) {
      found = true;
    }
  }

  return found;
}

let timesFound = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const letter = input[i][j];
    if (letter === "X") {
      Object.keys(directions).forEach((direction) => {
        if (findWord("XMAS", input, direction, [i, j])) {
          timesFound++;
        }
      });
    }
  }
}

console.log(timesFound);
