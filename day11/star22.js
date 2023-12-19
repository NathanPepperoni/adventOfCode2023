import loadPuzzleInput from "../utils/loadPuzzleInput.js";

class Point {
  row;
  col;
  expandedRow;
  expandedCol;

  constructor(row, col) {
    this.row = row;
    this.expandedRow = row;
    this.col = col;
    this.expandedCol = col;
  }
}

function distanceBetweenTwoPoints(pointA, pointB) {
  const rise = Math.abs(pointA.expandedRow - pointB.expandedRow);
  const run = Math.abs(pointA.expandedCol - pointB.expandedCol);

  return rise + run;
}

function star22() {
  const grid = loadPuzzleInput(11)
    .filter((item) => item)
    .map((row) => row.split(""));

  const galaxyPoints = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "#") {
        galaxyPoints.push(new Point(row, col));
      }
    }
  }

  for (let row = 0; row < grid.length; row++) {
    if (!grid[row].includes("#")) {
      galaxyPoints.forEach((galaxy) => {
        if (galaxy.row > row) {
          galaxy.expandedRow += 999999;
        }
      });
    }
  }

  for (let col = 0; col < grid[0].length; col++) {
    let isEmpty = true;
    for (let row = 0; row < grid.length; row++) {
      isEmpty &&= grid[row][col] === ".";
    }
    if (isEmpty) {
      galaxyPoints.forEach((galaxy) => {
        if (galaxy.col > col) {
          galaxy.expandedCol += 999999;
        }
      });
    }
  }

  let sum = 0;
  for (let galaxy = 0; galaxy < galaxyPoints.length; galaxy++) {
    for (
      let pairGalaxy = galaxy + 1;
      pairGalaxy < galaxyPoints.length;
      pairGalaxy++
    ) {
      const distance = distanceBetweenTwoPoints(
        galaxyPoints[galaxy],
        galaxyPoints[pairGalaxy]
      );
      sum += distance;
    }
  }

  return sum;
}

export default star22;
