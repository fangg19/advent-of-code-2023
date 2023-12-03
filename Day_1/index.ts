import * as fs from "fs";

const stringNumbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function getRawLines() {
  try {
    const data = fs.readFileSync("./input.txt", "utf-8");
    return data.split("\n").map((line) => line.replace("\r", "")) ?? [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

function getFirstNumber(lines: string[], length: number): string[] {
  let newLine: string;
  if (length === 0) {
    return lines;
  }
  const newArr = lines.map((line) => {
    if (
      !isNaN(parseInt(line.charAt(0))) &&
      !isNaN(parseInt(line.charAt(line.length - 1)))
    ) {
      return line;
    }

    if (!isNaN(parseInt(line.charAt(0)))) {
      return line;
    }

    for (const stringNum of stringNumbers) {
      const numberToReplace = (stringNumbers.indexOf(stringNum) + 1).toString();

      if (line.startsWith(stringNum)) {
        newLine = line.replace(stringNum, numberToReplace);
        break;
      }

      newLine = line.slice(1);
    }

    return newLine;
  });
  return getFirstNumber(newArr, length - 1);
}

function getLastNumber(lines: string[], length: number): string[] {
  let newLine: string;
  if (length === 0) {
    return lines;
  }
  const newArr = lines.map((line) => {
    if (
      !isNaN(parseInt(line.charAt(0))) &&
      !isNaN(parseInt(line.charAt(line.length - 1)))
    ) {
      return line;
    }

    if (!isNaN(parseInt(line.charAt(line.length - 1)))) {
      return line;
    }

    for (const stringNum of stringNumbers) {
      const numberToReplace = (stringNumbers.indexOf(stringNum) + 1).toString();

      if (line.endsWith(stringNum)) {
        newLine = line.replace(stringNum, numberToReplace);
        break;
      }

      newLine = line.substring(0, line.length - 1);
    }

    return newLine;
  });

  return getLastNumber(newArr, length - 1);
}

function main() {
  const rawLines = getRawLines();
  let arrOfStringNumbers: number[] = [];

  const firstWordNumber = getFirstNumber(rawLines, rawLines.length);
  const lines = getLastNumber(firstWordNumber, rawLines.length);

  for (const line of lines) {
    let stringNum = "";
    for (const char of line) {
      if (!isNaN(parseInt(char))) {
        stringNum += char;
      }
    }

    if (stringNum !== "") {
      const number = Number(stringNum[0] + stringNum[stringNum.length - 1]);
      arrOfStringNumbers.push(number);
    }
  }

  arrOfStringNumbers.reduce((a, b) => a + b);
}

main();
