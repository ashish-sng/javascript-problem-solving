// 27. Implement a range(start, end) generator using closures.

/**
 * Creates a range generator using closures
 * @param {number} start - Starting number (inclusive)
 * @param {number} end - Ending number (exclusive)
 * @returns {Function} A function that returns next value each time called
 */
function createRange(start, end) {
  // Current holds the current value - this is "closed over"
  let current = start;

  // Return a function that "remembers" current
  return function () {
    // Check if we've reached the end
    if (current >= end) {
      // Could return undefined, null, or throw an error
      return undefined;
    }

    // Get current value, then increment for next call
    const value = current;
    current++;
    return value;
  };
}

// Usage
const range = createRange(1, 5);
console.log(range()); // 1
console.log(range()); // 2
console.log(range()); // 3
console.log(range()); // 4
console.log(range()); // undefined (5 is not returned, end is exclusive)
