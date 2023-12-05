import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const colors = ["red", "green", "blue"];
const colorLimits = {
  red: 12,
  green: 13,
  blue: 14,
};

function star3() {
  const games = loadPuzzleInput(2).filter((input) => input.length);
  let sum = 0;
  games.forEach((game) => {
    const id = Number(game.split(":")[0].replace("Game ", ""));
    const rounds = game.split(":")[1].split(";");
    let validGame = true;
    rounds.forEach((round) => {
      const cubes = round.split(",");
      cubes.forEach((cube) => {
        colors.forEach((color) => {
          if (cube.includes(color)) {
            const cubeCount = Number(cube.replace(color, "").replace(" ", ""));
            if (cubeCount > colorLimits[color]) {
              validGame = false;
            }
          }
        });
      });
    });
    if (validGame) {
      sum += id;
    }
  });
  return sum;
}

export default star3;
