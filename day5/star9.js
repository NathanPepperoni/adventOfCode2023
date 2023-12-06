import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const isntEmpty = (item) => item;

function getDestinationFromSource(source, mapData) {
  const numSource = Number(source);
  for (let i = 0; i < mapData.length; i++) {
    const mapDest = Number(mapData[i].split(" ")[0]);
    const mapSource = Number(mapData[i].split(" ")[1]);
    const mapRange = Number(mapData[i].split(" ")[2]);

    if (mapSource <= numSource && numSource < mapSource + mapRange) {
      const diff = numSource - mapSource;
      return (mapDest + diff).toString();
    }
  }
  return source;
}

function star9() {
  const input = loadPuzzleInput(5, "\n\n");

  const seeds = input[0].replace("seeds: ", "").split(" ").filter(isntEmpty);
  const seedsToSoilMap = input[1]
    .replace("seed-to-soil map:\n", "")
    .split("\n")
    .filter(isntEmpty);
  const soilToFertilizer = input[2]
    .replace("soil-to-fertilizer map:\n", "")
    .split("\n")
    .filter(isntEmpty);
  const fertilizerToWater = input[3]
    .replace("fertilizer-to-water map:\n", "")
    .split("\n")
    .filter(isntEmpty);
  const waterToLight = input[4]
    .replace("water-to-light map:\n", "")
    .split("\n")
    .filter(isntEmpty);
  const lightToTemperature = input[5]
    .replace("light-to-temperature map:\n", "")
    .split("\n")
    .filter(isntEmpty);
  const temperatureToHumidity = input[6]
    .replace("temperature-to-humidity map:\n", "")
    .split("\n")
    .filter(isntEmpty);
  const humidityToLocation = input[7]
    .replace("humidity-to-location map:\n", "")
    .split("\n")
    .filter(isntEmpty);

  let minLocation = Number.MAX_VALUE;

  seeds.forEach((seed) => {
    const soil = getDestinationFromSource(seed, seedsToSoilMap);
    const fertilizer = getDestinationFromSource(soil, soilToFertilizer);
    const water = getDestinationFromSource(fertilizer, fertilizerToWater);
    const light = getDestinationFromSource(water, waterToLight);
    const temperature = getDestinationFromSource(light, lightToTemperature);
    const humidity = getDestinationFromSource(
      temperature,
      temperatureToHumidity
    );
    const location = getDestinationFromSource(humidity, humidityToLocation);

    minLocation = Math.min(location, minLocation);
  });

  return minLocation;
}

export default star9;
