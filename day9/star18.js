import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function solveSequence(sequence) {
  let hasOnlyZero = true;
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] !== 0) {
      hasOnlyZero = false;
      break;
    }
  }

  if (hasOnlyZero) {
    return [sequence[0], ...sequence];
  }

  const differences = [];
  for (let i = 1; i < sequence.length; i++) {
    differences.push(sequence[i] - sequence[i - 1]);
  }

  const newSeq = solveSequence(differences);

  const newValue = sequence[0] - newSeq[0]

  return [newValue, ...sequence];
}

function star18() {
  const input = loadPuzzleInput(9).map((row) => row.split(" ").map((val) => Number(val)));

  let sum = 0;
  input.forEach((sequence) => {
    sum += solveSequence(sequence)[0];
  });
  return sum;
}

export default star18;
