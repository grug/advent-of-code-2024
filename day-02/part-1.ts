import fs from "fs";

const reports = fs
  .readFileSync("./day-02/input.txt", "utf8")
  .split("\n")
  .map((report) => report.split(" ").map(Number));

function isSafe(arr: number[]) {
  const isAscending = arr.every(
    (v, i, a) =>
      i === 0 ||
      (v >= a[i - 1] &&
        Math.abs(v - a[i - 1]) <= 3 &&
        Math.abs(v - a[i - 1]) > 0)
  );
  const isDescending = arr.every(
    (v, i, a) =>
      i === 0 ||
      (v <= a[i - 1] &&
        Math.abs(v - a[i - 1]) <= 3 &&
        Math.abs(v - a[i - 1]) > 0)
  );

  return isAscending || isDescending;
}

let validReports = 0;

for (const report of reports) {
  if (isSafe(report)) {
    validReports++;
  }
}

console.log(validReports);
