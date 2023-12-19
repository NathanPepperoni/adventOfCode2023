import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star15() {
  const input = loadPuzzleInput(8).filter((item) => item);
  const lrPattern = input[0].split("").map((lr) => lr === "L");

  const stepMap = {};

  for (let i = 1; i < input.length; i++) {
    const label = input[i].substring(0, 3);
    const left = input[i].substring(7, 10);
    const right = input[i].substring(12, 15);
    stepMap[label] = { left: left, right: right };
  }

  let currentNode = "AAA";
  let patternIndex = 0;
  let steps = 0;

  while (currentNode !== "ZZZ") {
    steps++;
    if (patternIndex >= lrPattern.length) {
      patternIndex = 0;
    }
    const goLeft = lrPattern[patternIndex++];
    if (goLeft) {
      currentNode = stepMap[currentNode].left;
    } else {
      currentNode = stepMap[currentNode].right;
    }
  }

  return steps;
}

export default star15;
