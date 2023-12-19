import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star16() {
  const input = loadPuzzleInput(8).filter((item) => item);
  const lrPattern = input[0].split("").map((lr) => lr === "L");

  const currentNodes = [];
  const stepMap = {};

  for (let i = 1; i < input.length; i++) {
    const label = input[i].substring(0, 3);
    const left = input[i].substring(7, 10);
    const right = input[i].substring(12, 15);
    stepMap[label] = { left: left, right: right };
    if (label[2] === "A") {
      currentNodes.push(label);
    }
  }

  let patternIndex = 0;
  let steps = 0;
  let allNodesZ = false;

  while (!allNodesZ) {
    steps++;
    if (patternIndex >= lrPattern.length) {
      patternIndex = 0;
    }
    const goLeft = lrPattern[patternIndex++];
    allNodesZ = true;
    for (let i = 0; i < currentNodes.length; i++) {
      let newNode;
      if (goLeft) {
        newNode = stepMap[currentNodes[i]].left
        currentNodes[i] = stepMap[currentNodes[i]].left;
      } else {
        newNode = stepMap[currentNodes[i]].right
        currentNodes[i] = stepMap[currentNodes[i]].right;
      }
      allNodesZ &&= newNode[2] === "Z"
    }
  }

  return steps;
}

export default star16;
