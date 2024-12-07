import fs from "fs";

const input = fs.readFileSync("./day-05/input.txt", "utf8").split("\n\n");

const rules = input[0].split("\n").map((rule) => rule.split("|").map(Number));
const updates = input[1]
  .split("\n")
  .map((update) => update.split(",").map(Number));

const getMiddleElement = (arr: number[]) => arr[Math.floor(arr.length / 2)];

const mappings: Record<number, number[]> = {};

rules.forEach(([key, value]) => {
  if (!mappings[key]) {
    mappings[key] = [];
  }
  mappings[key].push(value);
});

let total = 0;
let isGood = true;

updates.forEach((update) => {
  isGood = update.every((u, idx) => {
    const rest = update.slice(idx + 1);
    return rest.every((r) => mappings[u]?.includes(r));
  });

  if (isGood) {
    total += getMiddleElement(update);
  }
});

console.log(total);
