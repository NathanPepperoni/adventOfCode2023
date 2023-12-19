import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function tilt(input) {
  for (let col = 0; col < input[0].length; col++) {
    let nextFreeSpace = -1;
    for (let row = 0; row < input.length; row++) {
      if (input[row][col] === "." && nextFreeSpace < 0) {
        nextFreeSpace = row;
      }
      if (input[row][col] === "O" && nextFreeSpace >= 0) {
        input[nextFreeSpace][col] = "O";
        input[row][col] = ".";
        nextFreeSpace = nextFreeSpace + 1;
      }
      if (input[row][col] === "#") {
        nextFreeSpace = -1;
      }
    }
  }
}

function star27() {
  const input = loadPuzzleInput(14)
    .filter((item) => item)
    .map((row) => row.split(""));

  let rowValue = input.length;
  let sum = 0;
  tilt(input);

  // input.forEach((row) => console.log(row.join("")));
  for (let row = 0; row < input.length; row++) {
    for (let char = 0; char < input[0].length; char++) {
      if (input[row][char] === "O") {
        sum += rowValue;
      }
    }
    rowValue--;
  }
  return sum;
}

export default star27;
