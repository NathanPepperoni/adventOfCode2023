import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star1() {
    const input = loadPuzzleInput(1).filter(row => row !== "");
    let sum = 0;
    for (let row = 0; row < input.length; row++){
        const rowString = input[row];
        let firstDigit = undefined;
        let secondDigit = undefined;
        let j = rowString.length - 1
        for (let i = 0; i < rowString.length; i++) {
            if (firstDigit === undefined && !Number.isNaN(Number(rowString[i]))) {
                firstDigit = rowString[i];
            }
            if (secondDigit === undefined && !Number.isNaN(Number(rowString[j]))) {
                secondDigit = rowString[j];
            }
            j--;
        }
        sum += Number(firstDigit + secondDigit)
    }
    return sum;
}

export default star1;
