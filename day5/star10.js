import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const isntEmpty = (item) => item;

function getDestinationFromSource(source, mapData) {
  for (let i = 0; i < mapData.length; i++) {
    const mapDest = mapData[i][0];
    const mapSource = mapData[i][1];
    const mapRange = mapData[i][2];

    if (mapSource <= source && source < mapSource + mapRange) {
      const diff = source - mapSource;
      return mapDest + diff;
    }
  }
  return source;
}

function star10() {
  const input = loadPuzzleInput(5, "\n\n");

  const seeds = input[0].replace("seeds: ", "").split(" ").filter(isntEmpty);
  const seedsToSoilMap = input[1]
    .replace("seed-to-soil map:\n", "")
    .split("\n")
    .map((mapping) => mapping.split(" ").map((entry) => Number(entry)))
    .filter(isntEmpty);
  const soilToFertilizer = input[2]
    .replace("soil-to-fertilizer map:\n", "")
    .split("\n")
    .map((mapping) => mapping.split(" ").map((entry) => Number(entry)))
    .filter(isntEmpty);
  const fertilizerToWater = input[3]
    .replace("fertilizer-to-water map:\n", "")
    .split("\n")
    .map((mapping) => mapping.split(" ").map((entry) => Number(entry)))
    .filter(isntEmpty);
  const waterToLight = input[4]
    .replace("water-to-light map:\n", "")
    .split("\n")
    .map((mapping) => mapping.split(" ").map((entry) => Number(entry)))
    .filter(isntEmpty);
  const lightToTemperature = input[5]
    .replace("light-to-temperature map:\n", "")
    .split("\n")
    .map((mapping) => mapping.split(" ").map((entry) => Number(entry)))
    .filter(isntEmpty);
  const temperatureToHumidity = input[6]
    .replace("temperature-to-humidity map:\n", "")
    .split("\n")
    .map((mapping) => mapping.split(" ").map((entry) => Number(entry)))
    .filter(isntEmpty);
  const humidityToLocation = input[7]
    .replace("humidity-to-location map:\n", "")
    .split("\n")
    .map((mapping) => mapping.split(" ").map((entry) => Number(entry)))
    .filter(isntEmpty);

  let minLocation = Number.MAX_VALUE;

  const seedPairs = [];

  for (let i = 0; i < seeds.length - 1; i += 2) {
    seedPairs.push([seeds[i], seeds[i + 1]]);
  }

  seedPairs.forEach((pair) => {
    let seed = Number(pair[0]);
    const lastSeed = Number(pair[0]) + Number(pair[1]);

    while (seed < lastSeed) {
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
      seed++;
    }
  });

  return minLocation;
}

export default star10;
