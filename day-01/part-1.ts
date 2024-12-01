import fs from "fs";

const [left, right] = fs
  .readFileSync("./day-01/input.txt", "utf8")
  .split("\n")
  .map((item) => item.split("   ").map(Number))
  .reduce(
    (acc, cur) => {
      acc[0].push(cur[0]);
      acc[1].push(cur[1]);
      return acc;
    },
    [[], []] as number[][]
  );

const leftSorted = left.sort((a, b) => a - b);
const rightSorted = right.sort((a, b) => a - b);

const differences = leftSorted.map((item, index) =>
  Math.abs(item - rightSorted[index])
);

console.log(differences.reduce((acc, cur) => acc + cur, 0));
