import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star11() {
  const input = loadPuzzleInput(6).filter((item) => item);
  const times = input[0]
    .replace("Time:      ", "")
    .split(" ")
    .filter((item) => item)
    .map((item) => Number(item));
  const distances = input[1]
    .replace("Distance:  ", "")
    .split(" ")
    .filter((item) => item)
    .map((item) => Number(item));

  let sum = 1
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    let possibleWins = 0;
    for (let letGoTime = 0; letGoTime < time; letGoTime++) {
      if (letGoTime * (time - letGoTime) > distance) {
        possibleWins++;
      }
    }

    sum *= possibleWins;
  }

  return sum
}

export default star11;
