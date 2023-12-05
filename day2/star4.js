import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const colors = ["red", "green", "blue"];
const colorLimits = {
  red: 12,
  green: 13,
  blue: 14,
};

function star4() {
  const games = loadPuzzleInput(2).filter((input) => input.length);
  let sum = 0;
  games.forEach((game) => {
    const rounds = game.split(":")[1].split(";");
    const minimums = {
      red: 0,
      green: 0,
      blue: 0,
    };
    rounds.forEach((round) => {
      const cubes = round.split(",");
      cubes.forEach((cube) => {
        colors.forEach((color) => {
          if (cube.includes(color)) {
            const cubeCount = Number(cube.replace(color, "").replace(" ", ""));
            if (cubeCount > minimums[color]) {
              minimums[color] = cubeCount;
            }
          }
        });
      });
    });
    const power = minimums.red * minimums.green * minimums.blue;
    sum += power;
  });
  return sum;
}

export default star4;
