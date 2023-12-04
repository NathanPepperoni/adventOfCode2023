import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function getDigit(row, currentIndex, reverse) {
  if (!Number.isNaN(Number(row[currentIndex]))) {
    return row[currentIndex];
  }

  const coefficient = reverse ? -1 : 1;
  const index = reverse ? currentIndex + 1 : currentIndex;

  if (
    row.length > index + 5 * coefficient &&
    ["three", "seven", "eight"].includes(
      row.substring(index, index + 5 * coefficient).toLowerCase()
    )
  ) {
    const digitString = row
      .substring(index, index + 5 * coefficient)
      .toLowerCase();
    if (digitString === "three") {
      return "3";
    }
    if (digitString === "seven") {
      return "7";
    }
    if (digitString === "eight") {
      return "8";
    }
  }

  if (
    row.length > index + 4 * coefficient &&
    ["zero", "four", "five", "nine"].includes(
      row.substring(index, index + 4 * coefficient).toLowerCase()
    )
  ) {
    const digitString = row
      .substring(index, index + 4 * coefficient)
      .toLowerCase();
    if (digitString === "zero") {
      return "0";
    }
    if (digitString === "four") {
      return "4";
    }
    if (digitString === "five") {
      return "5";
    }
    if (digitString === "nine") {
      return "9";
    }
  }

  if (
    row.length > index + 3 * coefficient &&
    ["one", "two", "six"].includes(
      row.substring(index, index + 3 * coefficient).toLowerCase()
    )
  ) {
    const digitString = row
      .substring(index, index + 3 * coefficient)
      .toLowerCase();
    if (digitString === "one") {
      return "1";
    }
    if (digitString === "two") {
      return "2";
    }
    if (digitString === "six") {
      return "6";
    }
  }

  return undefined;
}

function star2() {
  const input = loadPuzzleInput(1).filter((row) => row !== "");
  let sum = 0;
  for (let row = 0; row < input.length; row++) {
    const rowString = input[row];
    let firstDigit = undefined;
    let secondDigit = undefined;
    let j = rowString.length - 1;
    for (let i = 0; i < rowString.length; i++) {
      if (firstDigit === undefined) {
        const digit = getDigit(rowString, i);
        if (digit !== undefined) {
          firstDigit = digit;
        }
      }
      if (secondDigit === undefined) {
        const digit = getDigit(rowString, j, true);
        if (digit !== undefined) {
          secondDigit = digit;
        }
      }
      j--;
    }
    sum += Number(firstDigit + secondDigit);
  }
  return sum;
}

export default star2;
