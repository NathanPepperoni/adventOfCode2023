import loadPuzzleInput from "../utils/loadPuzzleInput.js";

class LensBox {
  lenses;

  constructor() {
    this.lenses = new Map();
  }

  removeLens(label) {
    this.lenses.delete(label);
  }

  addLens(label, focalValue) {
    this.lenses.set(label, focalValue);
  }

  getFocusingPower(boxNumber) {
    let lensSlot = 1;
    let totalFocusingPower = 0;
    this.lenses.forEach((focalValue) => {
      let focusingPower = 1 + boxNumber;
      focusingPower *= lensSlot;
      focusingPower *= Number(focalValue);
      totalFocusingPower += focusingPower;
      lensSlot++;
    });
    return totalFocusingPower;
  }
}

function hash(string) {
  let hashValue = 0;
  string.split("").forEach((char) => {
    const asciiNumber = char.charCodeAt();

    hashValue += asciiNumber;
    hashValue *= 17;
    hashValue %= 256;
  });

  return hashValue;
}

function star30() {
  const input = loadPuzzleInput(15)[0].split(",");

  const hashMap = Array.from(Array(256), () => new LensBox());
  input.forEach((string) => {
    if (string.includes("=")) {
      const split = string.split("=");
      const label = split[0];
      const focalValue = split[1];
      const boxNumber = hash(label);
      hashMap[boxNumber].addLens(label, focalValue);
    }
    if (string.includes("-")) {
      const split = string.split("-");
      const label = split[0];
      const boxNumber = hash(label);
      hashMap[boxNumber].removeLens(label);
    }
  });

  let sum = 0;
  for (let i = 0; i < 256; i++) {
    sum += hashMap[i].getFocusingPower(i);
  }
  return hashMap.filter(box => box.lenses.size > 0).length;
}

export default star30;
