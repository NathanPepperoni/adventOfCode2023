import loadPuzzleInput from "../utils/loadPuzzleInput.js";

class Point {
  row;
  col;

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

function findStartingPoint(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "S") {
        return new Point(row, col);
      }
    }
  }
}

function findMaxPoint(grid) {
  let max = Number.MIN_VALUE;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const value = grid[row][col];
      if (typeof value === "number" && value > max) {
        max = grid[row][col];
      }
    }
  }
  return max;
}

function getOptions(grid, point) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  const options = [];
  // N
  if (point.row > 0) {
    const valueN = grid[point.row - 1][point.col];
    const isHigherNumber =
      typeof valueN === "number" && valueN > grid[point.row][point.col] + 1;
    if (["|", "7", "F"].includes(valueN) || isHigherNumber) {
      grid[point.row - 1][point.col] = grid[point.row][point.col] + 1;
      options.push(new Point(point.row - 1, point.col));
    }
  }

  // E
  if (point.col < gridWidth - 1) {
    const valueE = grid[point.row][point.col + 1];
    const isHigherNumber =
      typeof valueE === "number" && valueE > grid[point.row][point.col] + 1;

    if (["-", "7", "J"].includes(valueE) || isHigherNumber) {
      options.push(new Point(point.row, point.col + 1));
      grid[point.row][point.col + 1] = grid[point.row][point.col] + 1;
    }
  }

  // S
  if (point.row < gridHeight - 1) {
    const valueS = grid[point.row + 1][point.col];
    const isHigherNumber =
      typeof valueS === "number" && valueS > grid[point.row][point.col] + 1;
    if (["|", "L", "J"].includes(valueS) || isHigherNumber) {
      grid[point.row + 1][point.col] = grid[point.row][point.col] + 1;
      options.push(new Point(point.row + 1, point.col));
    }
  }

  // W
  if (point.col > 0) {
    const valueW = grid[point.row][point.col - 1];
    const isHigherNumber =
      typeof valueW === "number" && valueW > grid[point.row][point.col] + 1;
    if (["-", "L", "F"].includes(valueW) || isHigherNumber) {
      options.push(new Point(point.row, point.col - 1));
      grid[point.row][point.col - 1] = grid[point.row][point.col] + 1;
    }
  }

  return options;
}

function getZoneOptions(grid, point) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  const options = [];
  // N
  if (point.row > 0) {
    const valueN = grid[point.row - 1][point.col];
    const isHigherNumber =
      typeof valueN === "number" && valueN > grid[point.row][point.col] + 1;
    if (["|", "7", "F"].includes(valueN) || isHigherNumber) {
      grid[point.row - 1][point.col] = grid[point.row][point.col] + 1;
      options.push(new Point(point.row - 1, point.col));
    }
  }

  // E
  if (point.col < gridWidth - 1) {
    const valueE = grid[point.row][point.col + 1];
    const isHigherNumber =
      typeof valueE === "number" && valueE > grid[point.row][point.col] + 1;

    if (["-", "7", "J"].includes(valueE) || isHigherNumber) {
      options.push(new Point(point.row, point.col + 1));
      grid[point.row][point.col + 1] = grid[point.row][point.col] + 1;
    }
  }

  // S
  if (point.row < gridHeight - 1) {
    const valueS = grid[point.row + 1][point.col];
    const isHigherNumber =
      typeof valueS === "number" && valueS > grid[point.row][point.col] + 1;
    if (["|", "L", "J"].includes(valueS) || isHigherNumber) {
      grid[point.row + 1][point.col] = grid[point.row][point.col] + 1;
      options.push(new Point(point.row + 1, point.col));
    }
  }

  // W
  if (point.col > 0) {
    const valueW = grid[point.row][point.col - 1];
    const isHigherNumber =
      typeof valueW === "number" && valueW > grid[point.row][point.col] + 1;
    if (["-", "L", "F"].includes(valueW) || isHigherNumber) {
      options.push(new Point(point.row, point.col - 1));
      grid[point.row][point.col - 1] = grid[point.row][point.col] + 1;
    }
  }

  return options;
}

function paintZone(grid, point) {
  let queue = [point];

  let zone = [point]

  let isOutside = true;
  while (queue.length > 0) {
    let newQueue = [];

    queue.forEach((option) => {
      const newOptions = getOptions(grid, option);
      newQueue = newQueue.concat(newOptions);
    });

    queue = newQueue;
  }
}

function star20() {
  const grid = loadPuzzleInput(10)
    .filter((item) => item)
    .map((row) => row.split(""));

  const startingPoint = findStartingPoint(grid);

  grid[startingPoint.row][startingPoint.col] = 0;

  let queue = [startingPoint];

  while (queue.length > 0) {
    let newQueue = [];

    queue.forEach((option) => {
      const newOptions = getOptions(grid, option);
      newQueue = newQueue.concat(newOptions);
    });

    queue = newQueue;
  }

  return findMaxPoint(grid);
}

export default star20;
