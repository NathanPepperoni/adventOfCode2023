import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star12() {
  const input = loadPuzzleInput(6).filter((item) => item);
  const time = Number(input[0].replace("Time:      ", "").replaceAll(" ", ""));
  const distance = Number(
    input[1].replace("Distance:  ", "").replaceAll(" ", "")
  );

  let possibleWins = 0;
  for (let letGoTime = 0; letGoTime < time; letGoTime++) {
    if (letGoTime * (time - letGoTime) > distance) {
      possibleWins++;
    }
  }

  return possibleWins;
}

export default star12;
