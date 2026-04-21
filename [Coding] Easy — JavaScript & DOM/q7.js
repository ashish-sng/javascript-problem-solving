// Q7. Implement Array.prototype.filter (polyfill).
function filter(arr, callback, thisArg) {
  console.log("Using custom polyfill filter!");

  // Input Validation
  if (arr == null) {
    throw new Error("Array.prototype.filter called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const result = [];
  const length = arr.length;

  for (let i = 0; i < length; i++) {
    if (i in arr) {
      if (callback.call(thisArg, arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }
  }

  return result;
}

Array.prototype.filter = function (callback, thisArg) {
  return filter(this, callback, thisArg);
};

// Test cases
const arr = [1, 2, 3, 4, 5, 6];

// Basic functionality
console.log(arr.filter((x) => x % 2 === 0)); // [2, 4, 6]

// Sparse arrays
const sparse = [1, , 3, , 5];
console.log(sparse.filter((x) => x !== undefined)); // [1, 3, 5]

// thisArg binding
const obj = { threshold: 3 };
console.log(
  arr.filter(function (x) {
    return x > this.threshold;
  }, obj)
); // [4, 5, 6]

// Edge cases
try {
  [].filter(null); // Should throw TypeError
} catch (e) {
  console.log("Correctly threw error:", e.message);
}
