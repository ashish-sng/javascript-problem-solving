// Store original implementation
const nativeMap = Array.prototype.map;

// Q6. Implement Array.prototype.map (polyfill)
function map(arr, callback, thisArg) {
  console.log("Using custom polyfill map!");

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

// Force override for testing
Array.prototype.map = function (callback, thisArg) {
  return map(this, callback, thisArg);
};

// Test
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.map((ele, index, array) => {
  return ele * 2;
});

console.log(arr2); // [2, 4, 6, 8, 10]

// Verify polyfill is being used
const isMapPolyfilled = !Array.prototype.map
  .toString()
  .includes("[native code]");
console.log({ isMapPolyfilled }); // { isMapPolyfilled: true }
