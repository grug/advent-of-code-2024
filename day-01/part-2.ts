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

const rightOccurrences = right.reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {} as Record<number, number>);

const similarityScores = left.map(
  (item) => item * (rightOccurrences[item] || 0)
);

console.log(similarityScores.reduce((acc, cur) => acc + cur, 0));
