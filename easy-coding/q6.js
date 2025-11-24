// Implement Array.prototype.map (polyfill).
function map(arr, callback, thisArg) {
  // Input validation
  if (arr == null) {
    throw new TypeError("Array.prototype.map called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const result = [];
  const length = arr.length;

  // Use traditional for loop to handle sparse arrays and get index
  for (let i = 0; i < length; i++) {
    // Only process if array has element at this index (handles sparse arrays)
    if (i in arr) {
      result[i] = callback.call(thisArg, arr[i], i, arr);
    }
  }

  return result;
}

// Optional: Add to prototype (not recommended for production)
if (!Array.prototype.map) {
  Array.prototype.map = function (callback, thisArg) {
    return map(this, callback, thisArg);
  };
}

// Test
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.map((ele, index, array) => {
  return ele * 2;
});

console.log(arr2); // [2, 4, 6, 8, 10]

// Test with sparse array
const sparseArray = [1, , 3];
const sparseResult = sparseArray.map((x) => x * 2);
console.log(sparseResult); // [2, empty, 6]

// Test with thisArg
const obj = { multiplier: 3 };
const withThis = arr.map(function (ele) {
  return ele * this.multiplier;
}, obj);
console.log(withThis); // [3, 6, 9, 12, 15]

console.log(arr2);
