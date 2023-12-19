import loadPuzzleInput from "../utils/loadPuzzleInput.js";

class Part {
  x;
  m;
  a;
  s;

  constructor(partString) {
    const newString = partString
      .replaceAll("=", '": ')
      .replace("{", '{"')
      .replaceAll(",", ',"');
    const parsed = JSON.parse(newString);

    this.x = parsed.x;
    this.m = parsed.m;
    this.a = parsed.a;
    this.s = parsed.s;
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

  evaluatePart(part) {
    for (let seq = 0; seq < this.sequence.length; seq++) {
      const flow = this.sequence[seq];
      if (!flow.includes(":")) {
        return flow;
      }
      const flowSplit = flow.split(":");
      const evaluator = flowSplit[0];
      const matches = eval(`part.${evaluator}`);

      if (matches) {
        return flowSplit[1];
      }
    }
  }
}

function star37() {
  const input = loadPuzzleInput(19);
  const workflows = {};
  const parts = [];
  let finishedWorkflow = false;
  input.forEach((row) => {
    if (row === "") {
      finishedWorkflow = true;
    } else if (!finishedWorkflow) {
      const newWorkflow = new Workflow(row);
      workflows[newWorkflow.label] = newWorkflow;
    } else {
      parts.push(new Part(row));
    }
  });

  const rejected = [];
  const accepted = [];

  parts.forEach((part) => {
    let notSorted = true;
    let currentTarget = "in";
    while (notSorted) {
      if (currentTarget === "R") {
        rejected.push(part);
        notSorted = false;
      } else if (currentTarget === "A") {
        accepted.push(part);
        notSorted = false;
      } else {
        currentTarget = workflows[currentTarget].evaluatePart(part);
      }
    }
  });

  let sum = 0;
  accepted.forEach((part) => {
    sum += part.x + part.m + part.a + part.s;
  });
  return sum;
}

export default star37;
