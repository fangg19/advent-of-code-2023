//only 12 red cubes, 13 green cubes, and 14 blue cubes
import * as fs from "fs";

const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

function getRawLines() {
  try {
    const data = fs.readFileSync("./input.txt", "utf-8");
    return data.split("\n").map((line) => line.replace("\r", "")) ?? [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

function createGameObject(line: string) {
  const splitLine = line.split(":");
  const game = splitLine[0].split(" ")[1];
  const gameNumber = parseInt(game);
  const gameConfig = splitLine[1];

  const gameConfigSplit = gameConfig.split(";");
  let gameConfigObject = {};

  let arrOfThrows = [];
  for (const config of gameConfigSplit) {
    const numberAndColor = config.split(",");

    for (const nc of numberAndColor) {
      const ncSplit = nc.trim().split(" ");
      const number = parseInt(ncSplit[0]);
      const color = ncSplit[1];
      gameConfigObject = {
        ...gameConfigObject,
        [color]: number,
      };
    }

    arrOfThrows.push(gameConfigObject);
  }

  return {
    [gameNumber]: arrOfThrows,
  };
}

function filterGameObjects(gameObjects: any[]) {
  const filteredGames = [];
  for (const game of gameObjects) {
    const gameNumber = Object.keys(game)[0];
    const gameConfig = game[gameNumber];
    console.log(gameConfig);
    let isOk = false;
    for (const config of gameConfig) {
      const redCubes = config["red"] ?? 0;
      const greenCubes = config["green"] ?? 0;
      const blueCubes = config["blue"] ?? 0;

      if (
        redCubes <= MAX_RED_CUBES &&
        greenCubes <= MAX_GREEN_CUBES &&
        blueCubes <= MAX_BLUE_CUBES
      ) {
        isOk = true;
      } else {
        isOk = false;
        break;
      }
    }
    if (isOk) {
      filteredGames.push(game);
    }
  }
  return filteredGames;
}

function getPower(game) {
  let maxRed = 0;
  let maxGreen = 0;
  let maxBlue = 0;
  for (const set of game) {
    const redCubes = set["red"] ?? 0;
    const greenCubes = set["green"] ?? 0;
    const blueCubes = set["blue"] ?? 0;
    if (redCubes > maxRed) {
      maxRed = redCubes;
    }
    if (greenCubes > maxGreen) {
      maxGreen = greenCubes;
    }
    if (blueCubes > maxBlue) {
      maxBlue = blueCubes;
    }
  }
  return maxRed * maxGreen * maxBlue;
}

function main() {
  const rawLines = getRawLines();
  const gameObjects = rawLines.map((line) => createGameObject(line));
  const filtered = filterGameObjects(gameObjects);
  const sum = filtered
    .map((game) => parseInt(Object.keys(game)[0]))
    .reduce((a, b) => a + b, 0);
  // return sum
  const arrOfPowers = gameObjects.map((game) =>
    getPower(game[Object.keys(game)[0]]),
  );
  return arrOfPowers.reduce((a, b) => a + b, 0);
}

main();
