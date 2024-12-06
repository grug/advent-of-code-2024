import fs from "fs";

const answer = Array.from(
  fs.readFileSync("./day-03/input.txt", "utf8").matchAll(/mul\((\d+),(\d+)\)/gi)
)
  .map((match) => [match[1], match[2]].map(Number))
  .reduce((acc, [a, b]) => acc + a * b, 0);

console.log(answer);
