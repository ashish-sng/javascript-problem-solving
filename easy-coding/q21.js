// 21. Implement deep equality check for primitives and plain objects.

function deepEqual(a, b) {
  // 1. Handle primitive comparison (including NaN, null, undefined)
  if (a === b) {
    // This handles primitives and same reference
    // But need special case for NaN
    return a !== 0 || 1 / a === 1 / b; // handles -0 vs +0
  }

  // 2. Check if either is null or not an object
  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }

  // 3. Special case: NaN comparison
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  // 4. Check if they're the same type
  if (a.constructor !== b.constructor) {
    return false;
  }

  // 5. Handle arrays
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // 6. Handle objects
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}

// test cases
// Primitives
console.log(deepEqual(42, 42)); // true
console.log(deepEqual("hello", "hello")); // true
console.log(deepEqual(42, "42")); // false

// Arrays
console.log(deepEqual([1, 2, 3], [1, 2, 3])); // true
console.log(deepEqual([1, [2, 3]], [1, [2, 3]])); // true
console.log(deepEqual([1, 2, 3], [1, 2])); // false

// Objects
console.log(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
console.log(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })); // true
console.log(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })); // true (order doesn't matter)
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 })); // false
