"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculator = void 0;
const calculator = (a, b, op) => {
    if (op === "multiply") {
        return a * b;
    }
    else if (op === "add") {
        return a + b;
    }
    else if (op === "divide") {
        if (b === 0)
            throw new Error("Cannot divide by 0.");
        return a / b;
    }
    else {
        throw new Error("Invalid operation. Try again with multiply, add, or divide.");
    }
};
exports.calculator = calculator;
try {
    console.log((0, exports.calculator)(1, 5, "divide"));
}
catch (error) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
        errorMessage += errorMessage;
    }
    console.log(errorMessage);
}
