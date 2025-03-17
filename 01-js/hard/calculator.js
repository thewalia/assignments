/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }

  // Add a number to the result
  add(number) {
    this.result += number;
  }

  // Subtract a number from the result
  subtract(number) {
    this.result -= number;
  }

  // Multiply the result by a number
  multiply(number) {
    this.result *= number;
  }

  // Divide the result by a number
  divide(number) {
    if (number === 0) {
      throw new Error("Cannot divide by zero");
    }
    this.result /= number;
  }

  // Clear the result
  clear() {
    this.result = 0;
  }

  // Get the current result
  getResult() {
    return this.result;
  }

  // Calculate the result of a string expression
  calculate(expression) {
    // Remove all whitespaces
    expression = expression.replace(/\s+/g, '');

    // Validate the expression to make sure it's a valid mathematical expression
    if (/[^0-9+\-*/().]/.test(expression)) {
      throw new Error("Invalid characters in the expression");
    }

    // Try to evaluate the expression safely
    try {
      this.result = eval(expression);

      if (!Number.isFinite(this.result)) {
        throw new Error("Mathematical error (possibly division by zero or invalid result)");
      }
      
      return this.result;
    } catch (e) {
      throw new Error("Invalid mathematical expression");
    }
  }
}

module.exports = Calculator;
