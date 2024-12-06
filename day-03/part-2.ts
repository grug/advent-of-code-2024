import fs from "fs";

const tokens = fs
  .readFileSync("./day-03/input.txt", "utf8")
  .split(/(?=mul\(|do\(\)|don't\(\))/);

let enabled = true;
let total = 0;

for (const token of tokens) {
  if (token.startsWith("do()")) {
    enabled = true;
  } else if (token.startsWith("don't()")) {
    enabled = false;
  } else if (enabled && token.startsWith("mul(")) {
    const match = token.match(/mul\((\d+),(\d+)\)/);
    if (match) {
      const a = parseInt(match[1], 10);
      const b = parseInt(match[2], 10);
      total += a * b;
    }
  }
}

console.log(total);
