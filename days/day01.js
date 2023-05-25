import { readTextFile, splitLines } from "../utils/files.js";

const calories = splitLines(readTextFile("./inputs/day1.txt"));

const elfCalorieCounts = [];
let runningTotalOfCalories = 0;
for (let i = 0; i < calories.length; i++) {
  if (calories[i] === "") {
    elfCalorieCounts.push(runningTotalOfCalories);
    runningTotalOfCalories = 0;
  } else {
    runningTotalOfCalories += parseInt(calories[i]);
  }
}

const sortedElfCalorieCounts = elfCalorieCounts.sort((a, b) =>
  a > b ? -1 : 1
);

console.log("Part 1 Solution:", sortedElfCalorieCounts[0]);

console.log(
  "Part 2 Solution:",
  sortedElfCalorieCounts[0] +
    sortedElfCalorieCounts[1] +
    sortedElfCalorieCounts[2]
);
