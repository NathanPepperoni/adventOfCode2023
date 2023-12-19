import loadPuzzleInput from "../utils/loadPuzzleInput.js";

class Range {
  min;
  max;

  constructor(min, max) {
    this.min = min || 1;
    this.max = max || 4000;
  }

  newMin(val) {
    if (val > this.min) {
      this.min = val;
    }
  }

  newMax(val) {
    if (val < this.max) {
      this.max = val;
    }
  }

  getCount() {
    if (this.max < this.min) {
      return 0;
    }
    return this.max - this.min + 1;
  }
}

class Possibilities {
  xRange;
  mRange;
  aRange;
  sRange;

  constructor(xRange, mRange, aRange, sRange) {
    this.xRange = xRange || new Range();
    this.mRange = mRange || new Range();
    this.aRange = aRange || new Range();
    this.sRange = sRange || new Range();
  }

  getComboCount() {
    const xCount = this.xRange.getCount();
    const aCount = this.aRange.getCount();
    const mCount = this.mRange.getCount();
    const sCount = this.sRange.getCount();

    return xCount * mCount * aCount * sCount;
  }

  copy() {
    const newXRange = new Range(this.xRange.min, this.xRange.max);
    const newMRange = new Range(this.mRange.min, this.mRange.max);
    const newARange = new Range(this.aRange.min, this.aRange.max);
    const newSRange = new Range(this.sRange.min, this.sRange.max);
    return new Possibilities(newXRange, newMRange, newARange, newSRange);
  }
}

class Workflow {
  label;
  sequence;

  constructor(workflowString) {
    this.label = workflowString.split("{")[0];
    const parsed = workflowString
      .replace(this.label, "")
      .replace("{", "")
      .replace("}", "");
    this.sequence = parsed.split(",");
  }

  getTargets(possibilities) {
    const newTargets = [];
    const seqPossibilities = possibilities.copy();
    for (let seq = 0; seq < this.sequence.length; seq++) {
      const currentPossibilities = seqPossibilities.copy();

      const flow = this.sequence[seq];
      if (!flow.includes(":")) {
        newTargets.push({
          label: flow,
          possibilities: currentPossibilities,
        });
        continue;
      }
      const flowSplit = flow.split(":");
      const evaluator = flowSplit[0];
      const target = flowSplit[1];
      const label = evaluator[0];
      if (evaluator.includes(">")) {
        const number = Number(evaluator.split(">")[1]);
        switch (label) {
          case "x":
            currentPossibilities.xRange.newMin(number + 1);
            seqPossibilities.xRange.newMax(number);
            break;
          case "m":
            currentPossibilities.mRange.newMin(number + 1);
            seqPossibilities.mRange.newMax(number);
            break;

          case "a":
            currentPossibilities.aRange.newMin(number + 1);
            seqPossibilities.aRange.newMax(number);
            break;

          case "s":
            currentPossibilities.sRange.newMin(number + 1);
            seqPossibilities.sRange.newMax(number);
            break;
        }
      }
      if (evaluator.includes("<")) {
        const number = Number(evaluator.split("<")[1]);
        switch (label) {
          case "x":
            currentPossibilities.xRange.newMax(number - 1);
            seqPossibilities.xRange.newMin(number);
            break;

          case "m":
            currentPossibilities.mRange.newMax(number - 1);
            seqPossibilities.mRange.newMin(number);
            break;

          case "a":
            currentPossibilities.aRange.newMax(number - 1);
            seqPossibilities.aRange.newMin(number);
            break;

          case "s":
            currentPossibilities.sRange.newMax(number - 1);
            seqPossibilities.sRange.newMin(number);
            break;
        }
      }
      newTargets.push({
        label: target,
        possibilities: currentPossibilities,
      });
    }

    return newTargets;
  }
}

function star38() {
  const input = loadPuzzleInput(19);
  const workflows = {};
  let finishedWorkflow = false;
  input.forEach((row) => {
    if (row === "") {
      finishedWorkflow = true;
    } else if (!finishedWorkflow) {
      const newWorkflow = new Workflow(row);
      workflows[newWorkflow.label] = newWorkflow;
    }
  });

  const accepted = [];

  const queue = [{ label: "in", possibilities: new Possibilities() }];
  while (queue.length) {
    const currentTarget = queue.shift();
    if (currentTarget.label === "A") {
      accepted.push(currentTarget.possibilities);
      continue;
    }
    if (currentTarget.label === "R") {
      continue;
    }
    const newTargets = workflows[currentTarget.label].getTargets(
      currentTarget.possibilities
    );
    queue.push(...newTargets);
  }

  let sum = 0;
  accepted.forEach((possibilities) => {
    sum += possibilities.getComboCount();
  });
  return sum;
}

export default star38;
