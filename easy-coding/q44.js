// 44. Check if two objects have the same keys (ignore values).

// Order-independent key comparison
function areObjectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Quick length check
  if (keys1.length !== keys2.length) return false;

  // Sort keys before comparing
  keys1.sort();
  keys2.sort();

  // Compare sorted keys
  for (let i = 0; i < keys1.length; i++) {
    if (keys1[i] !== keys2[i]) return false;
  }

  return true;
}

function compareObjectKeysUsingSet(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  // Create Sets for faster lookup
  const keysSet = new Set(keys1);

  // Check if every key in keys2 exists in keysSet
  return keys2.every((key) => keysSet.has(key));
}

const obj1 = { a: "1", b: "2", c: "3" };
const obj2 = { a: "1", b: "2", c: "3" };
const obj3 = { a: "1", b: "2", c: "4" }; // Different value
const obj4 = { a: "1", b: "2", c: "3", d: "4" }; // Extra key

console.log(areObjectsEqual(obj1, obj2)); // true
console.log(areObjectsEqual(obj1, obj3)); // false
console.log(areObjectsEqual(obj1, obj4)); // false
