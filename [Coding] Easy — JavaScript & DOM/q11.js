// Q11. Remove duplicates from an array while preserving order.

function removeDuplicates(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }

  const seen = new Set();
  const result = [];

  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}

function removeDuplicates2(arr) {
  const seen = {};
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!seen[item]) {
      seen[item] = true;
      result.push(item);
    }
  }

  return result;
}

function removeDuplicates3(arr) {
  return [...new Set(arr)];
}

// Basic tests
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));
// [1, 2, 3, 4, 5]

console.log(removeDuplicates(["a", "b", "a", "c", "b"]));
// ['a', 'b', 'c']

console.log(removeDuplicates([1, 1, 1, 1]));
// [1]

console.log(removeDuplicates([]));
// []

// Mixed types
console.log(removeDuplicates([1, "1", 2, "2"]));
// [1, '1', 2, '2']

// Preserving order
console.log(removeDuplicates([3, 1, 2, 1, 3, 2]));
// [3, 1, 2]
