import loadPuzzleInput from "../utils/loadPuzzleInput.js";

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

function star29() {
  const input = loadPuzzleInput(15)[0].split(",");

  let sum = 0;
  input.forEach((string) => (sum += hash(string)));
  return sum;
}

export default star29;
