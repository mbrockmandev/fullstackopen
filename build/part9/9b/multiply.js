"use strict";
const parseArguments = (args) => {
    if (args.length < 4)
        throw new Error("Not enough arguments");
    if (args.length > 4)
        throw new Error("Too many arguments");
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3]),
        };
    }
    else {
        throw new Error("Provided values were not numbers!");
    }
};
const multiply = (a, b, message) => {
    console.log(message + a * b);
    return a * b;
};
try {
    const { value1, value2 } = parseArguments(process.argv);
    multiply(value1, value2, `Multiplied ${value1} and ${value2}, the result is: `);
}
catch (error) {
    let errorMsg = "Whoops!";
    if (error instanceof Error) {
        errorMsg += " Error: " + error.message;
    }
    console.error(errorMsg);
}
