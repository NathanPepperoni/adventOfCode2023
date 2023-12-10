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
    return [...sequence, sequence[sequence.length - 1]];
  }

  const differences = [];
  for (let i = 1; i < sequence.length; i++) {
    differences.push(sequence[i] - sequence[i - 1]);
  }

  const newSeq = solveSequence(differences);

  const newValue = newSeq[newSeq.length - 1] + sequence[sequence.length - 1];

  return [...sequence, newValue];
}

function star17() {
  const input = loadPuzzleInput(9).map((row) => row.split(" ").map((val) => Number(val)));

  let sum = 0;
  input.forEach((sequence) => {
    sum += solveSequence(sequence)[sequence.length];
  });
  return sum;
}

export default star17;
