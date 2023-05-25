import { readTextFile, splitLines } from "../utils/files.js";
const fileLines = splitLines(readTextFile("./inputs/day2.txt"));

/* Populate arrays with the moves */
const opponentMoves = [];
const desiredResults = [];

for (let i = 0; i < fileLines.length; i++) {
  if (fileLines[i] === "") {
    continue;
  }
  opponentMoves.push(fileLines[i].split(" ")[0]);
  desiredResults.push(fileLines[i].split(" ")[1]);
}

/* For part 1, pretend that the desired result is my move */
console.log("Answer to part 1:", calculateScore(opponentMoves, desiredResults));

/* For part 2, figure out what move I need to make to achieve the desired result */
/**
 * @type {string[]}
 */
const myMoves = [];

for (let i = 0; i < opponentMoves.length; i++) {
  const opponentMove = opponentMoves[i];
  const desiredResult = desiredResults[i];
  if (desiredResult === "X") {
    myMoves.push(getLosingMove(opponentMove));
  } else if (desiredResult === "Y") {
    myMoves.push(getTieMove(opponentMove));
  } else if (desiredResult === "Z") {
    myMoves.push(getWinningMove(opponentMove));
  } else {
    throw Error(`Invalid move: ${desiredResult}`);
  }
}

console.log("Answer to part 2:", calculateScore(opponentMoves, myMoves));

/*------------------ Helper functions ------------------*/

/**
 * @param {string[]} opponentMoves
 * @param {string[]} myMoves
 */
function calculateScore(opponentMoves, myMoves) {
  let totalPoints = 0;
  for (let i = 0; i < opponentMoves.length; i++) {
    const opponentMove = opponentMoves[i];
    const myMove = myMoves[i];
    if (didIWin(opponentMove, myMove)) {
      totalPoints += 6;
    } else if (didITie(opponentMove, myMove)) {
      totalPoints += 3;
    }
    totalPoints += getPointsForMove(myMove);
  }
  return totalPoints;
}

/**
 * @param {string} opponentMove
 */
function getLosingMove(opponentMove) {
  if (opponentMove === "A") {
    return "Z";
  }
  if (opponentMove === "B") {
    return "X";
  }
  if (opponentMove === "C") {
    return "Y";
  }
  throw Error(`Invalid move: ${opponentMove}`);
}

/**
 * @param {string} opponentMove
 */
function getTieMove(opponentMove) {
  if (opponentMove === "A") {
    return "X";
  }
  if (opponentMove === "B") {
    return "Y";
  }
  if (opponentMove === "C") {
    return "Z";
  }
  throw Error(`Invalid move: ${opponentMove}`);
}

/**
 * @param {string} opponentMove
 */
function getWinningMove(opponentMove) {
  if (opponentMove === "A") {
    return "Y";
  }
  if (opponentMove === "B") {
    return "Z";
  }
  if (opponentMove === "C") {
    return "X";
  }
  throw Error(`Invalid move: ${opponentMove}`);
}

/**
 * @param {string} move
 */
function getPointsForMove(move) {
  if (move === "X") {
    return 1;
  } else if (move === "Y") {
    return 2;
  } else if (move === "Z") {
    return 3;
  }
  throw Error(`Invalid move: ${move}`);
}

/**
 * @param {string} opponentMove
 * @param {string} myMove
 */
function didIWin(opponentMove, myMove) {
  if (opponentMove === "A") {
    return myMove === "Y";
  }
  if (opponentMove === "B") {
    return myMove === "Z";
  }
  if (opponentMove === "C") {
    return myMove === "X";
  }
  throw Error(`Invalid opponent move: ${opponentMove}`);
}

/**
 * @param {string} opponentMove
 * @param {string} myMove
 */
function didITie(opponentMove, myMove) {
  if (opponentMove === "A") {
    return myMove === "X";
  }
  if (opponentMove === "B") {
    return myMove === "Y";
  }
  if (opponentMove === "C") {
    return myMove === "Z";
  }
  throw Error(`Invalid opponent move: ${opponentMove}`);
}
