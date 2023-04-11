export type Operation = "multiply" | "add" | "divide";

export const calculator = (a: number, b: number, op: Operation): number => {
  if (op === "multiply") {
    return a * b;
  } else if (op === "add") {
    return a + b;
  } else if (op === "divide") {
    if (b === 0) throw new Error("Cannot divide by 0.");
    return a / b;
  } else {
    throw new Error(
      "Invalid operation. Try again with multiply, add, or divide."
    );
  }
};

try {
  console.log(calculator(1, 5, "divide"));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";

  if (error instanceof Error) {
    errorMessage += errorMessage;
  }
  console.log(errorMessage);
}
