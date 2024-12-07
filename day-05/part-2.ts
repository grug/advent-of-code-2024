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

function fixIt(update: number[]): number[] {
  const offendingElements: number[] = [];
  const validElements: number[] = [];

  for (const element of update) {
    if (validElements.every((v) => mappings[v]?.includes(element))) {
      validElements.push(element);
    } else {
      offendingElements.push(element);
    }
  }

  for (const offending of offendingElements) {
    for (let i = 0; i <= validElements.length; i++) {
      const testUpdate = [
        ...validElements.slice(0, i),
        offending,
        ...validElements.slice(i),
      ];
      if (isUpdateGood(testUpdate)) {
        validElements.splice(i, 0, offending);
        break;
      }
    }
  }

  return validElements;
}

function isUpdateGood(update: number[]): boolean {
  return update.every((u, idx) => {
    const rest = update.slice(idx + 1);
    return rest.every((r) => mappings[u]?.includes(r));
  });
}

let total = 0;
let isGood = true;

updates.forEach((update) => {
  isGood = isUpdateGood(update);

  if (!isGood) {
    const fixed = fixIt(update);
    total += getMiddleElement(fixed);
  }
});

console.log(total);
