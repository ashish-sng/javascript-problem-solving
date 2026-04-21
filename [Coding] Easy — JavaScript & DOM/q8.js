// Q8. Implement Array.prototype.reduce (polyfill).

Array.prototype.myReduce = function (callback, initialValue) {
  // 1. Check if callback is a function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const array = this;
  const length = array.length;

  // 2. Handle empty array with no initial value
  if (length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let accumulator;
  let startIndex;

  // 3. Determine initial accumulator value and starting index
  if (initialValue !== undefined) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    accumulator = array[0];
    startIndex = 1;
  }

  // 4. Iterate through the array
  for (let i = startIndex; i < length; i++) {
    // Skip holes in sparse arrays
    if (i in array) {
      accumulator = callback(accumulator, array[i], i, array);
    }
  }

  return accumulator;
};

// Basic usage - sum of numbers
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// Without initial value
const sum2 = numbers.myReduce((acc, curr) => acc + curr);
console.log(sum2); // 15

// Flatten array
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flat = nested.myReduce((acc, curr) => acc.concat(curr), []);
console.log(flat); // [1, 2, 3, 4, 5, 6]

// Group objects by property
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 },
];

const grouped = people.myReduce((acc, person) => {
  const age = person.age;
  if (!acc[age]) acc[age] = [];
  acc[age].push(person);
  return acc;
}, {});

console.log(grouped);
// { '25': [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
//   '30': [{ name: 'Bob', age: 30 }] }

// Empty array with initial value
[].myReduce((acc, curr) => acc + curr, 0); // Returns 0

// Empty array without initial value
[].myReduce((acc, curr) => acc + curr); // Throws TypeError

// Sparse arrays
const sparse = [1, , 3];
const result = sparse.myReduce((acc, curr) => acc + (curr || 0), 0);
console.log(result); // 4

// Non-function callback
try {
  [1, 2, 3].myReduce("not a function");
} catch (e) {
  console.log(e.message); // "not a function is not a function"
}
