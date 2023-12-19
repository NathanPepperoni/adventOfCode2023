import loadPuzzleInput from "../utils/loadPuzzleInput.js";

class Point {
  row;
  col;

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

function getExpandedSpace(grid) {
  const expandedSpace = [];

  for (let row = 0; row < grid.length; row++) {
    expandedSpace.push([...grid[row]]);
    if (!grid[row].includes("#")) {
      expandedSpace.push([...grid[row]]);
    }
  }

  for (let col = 0; col < expandedSpace[0].length; col++) {
    let isEmpty = true;
    for (let row = 0; row < expandedSpace.length; row++) {
      isEmpty &&= expandedSpace[row][col] === ".";
    }
    if (isEmpty) {
      for (let row = 0; row < expandedSpace.length; row++) {
        expandedSpace[row].splice(col, 0, ".");
      }
      col++;
    }
  }

  return expandedSpace;
}

function distanceBetweenTwoPoints(pointA, pointB) {
  const rise = Math.abs(pointA.row - pointB.row);
  const run = Math.abs(pointA.col - pointB.col);

  return rise + run;
}

function star21() {
  const grid = loadPuzzleInput(11)
    .filter((item) => item)
    .map((row) => row.split(""));

  const expandedSpace = getExpandedSpace(grid);

  const galaxyPoints = [];

  for (let row = 0; row < expandedSpace.length; row++) {
    for (let col = 0; col < expandedSpace[0].length; col++) {
      if (expandedSpace[row][col] === "#") {
        galaxyPoints.push(new Point(row, col));
      }
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

export default star21;
