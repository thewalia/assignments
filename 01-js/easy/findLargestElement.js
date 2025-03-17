/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    const largest = Math.max(...numbers)
    return Number.isFinite(largest) ? largest : undefined
}

module.exports = findLargestElement;