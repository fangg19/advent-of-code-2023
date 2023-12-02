import fs from "fs";

function getLines() {
  try {
    const data = fs.readFileSync("./input.txt", "utf-8");
    return data.split("\n");
  } catch (err) {
    console.error(err);
  }
}

function main() {
  const lines = getLines();
  let sum = 0;
  let arrOfStringNumbers: string[] = [];

  if (Array.isArray(lines)) {
    for (const line of lines) {
      let stringNum = "";

      for (const char of line) {
        if (!isNaN(parseInt(char))) {
          stringNum += char;
        }
      }

      if (stringNum !== "") {
        const num = stringNum[0] + stringNum[stringNum.length - 1];
        arrOfStringNumbers.push(num);
      }
    }
  }
  for (const stringNum of arrOfStringNumbers) {
    sum += parseInt(stringNum);
  }

  return sum;
}

console.log("The sum of all numbers in the file is: ", main());
main();
