// 38. Find the most frequent element in an array (mode).

function mostFrequentElement(arr) {
  if (!Array.isArray(arr)) {
    throw Error("Input must be an array");
  }

  const freq = new Map();

  let mostFreqElement = "";
  let mostFrequentCount = 0;

  arr.forEach((element) => {
    if (freq.has(element)) {
      freq.set(element, freq.get(element) + 1);
    } else {
      freq.set(element, 1);
    }
    const count = freq.get(element);
    if (count > mostFrequentCount) {
      mostFreqElement = element;
      mostFrequentCount = count;
    }
  });

  console.log({ mostFreqElement, mostFrequentCount });
}

// Test 1: Simple array with clear winner
mostFrequentElement([1, 2, 2, 3, 2, 4]);
// Expected: {mostFreqElement: 2, mostFrequentCount: 3}

// Test 2: All elements same
mostFrequentElement([5, 5, 5, 5]);
// Expected: {mostFreqElement: 5, mostFrequentCount: 4}

// Test 3: No repeats (first element wins)
mostFrequentElement([1, 2, 3, 4]);
// Expected: {mostFreqElement: 1, mostFrequentCount: 1}

// Test 4: Empty array
mostFrequentElement([]);
// Expected: {mostFreqElement: "", mostFrequentCount: 0}

// Test 5: Single element array
mostFrequentElement([7]);
// Expected: {mostFreqElement: 7, mostFrequentCount: 1}

// Test 6: Multiple elements with same frequency (first one wins)
mostFrequentElement([1, 2, 1, 2, 3]);
// Expected: {mostFreqElement: 1, mostFrequentCount: 2} (or 2 with count 2)

// Test 7: With zero as element
mostFrequentElement([0, 0, 1, 2]);
// Expected: {mostFreqElement: 0, mostFrequentCount: 2}

// Test 8: With false as element
mostFrequentElement([false, false, true]);
// Expected: {mostFreqElement: false, mostFrequentCount: 2}

// Test 9: Different data types
mostFrequentElement([1, "1", 1, "1"]);
// Expected: {mostFreqElement: 1, mostFrequentCount: 2}
// or {'1', 2} depending on type equality

// Test 10: Objects and arrays (by reference)
mostFrequentElement([{}, {}, [1], [1]]);
// Expected: {mostFreqElement: {}, mostFrequentCount: 1}
// (different references, so each is unique)

// Test 11: Same object reference
const obj = { a: 1 };
mostFrequentElement([obj, obj, { a: 1 }]);
// Expected: {mostFreqElement: obj, mostFrequentCount: 2}

// Test 12: null and undefined
mostFrequentElement([null, null, undefined, 1]);
// Expected: {mostFreqElement: null, mostFrequentCount: 2}

// Test 13: NaN values
mostFrequentElement([NaN, NaN, 1, 2]);
// Expected: {mostFreqElement: NaN, mostFrequentCount: 1}
// Because NaN !== NaN, so each NaN is unique

// Test 14: Empty strings
mostFrequentElement(["", "", "a", "b"]);
// Expected: {mostFreqElement: '', mostFrequentCount: 2}

// Test 15: Large array
const largeArray = Array.from({ length: 10000 }, (_, i) => i % 100);
mostFrequentElement(largeArray);
// Expected: {mostFreqElement: 0, mostFrequentCount: 100}

// Test 16: All unique large array
const allUnique = Array.from({ length: 1000 }, (_, i) => i);
mostFrequentElement(allUnique);
// Expected: {mostFreqElement: 0, mostFrequentCount: 1}

// Test 17: Non-array input
mostFrequentElement("hello");
// Expected: Throws error "It's not an Array Type."

// Test 18: null input
mostFrequentElement(null);
// Expected: Throws error

// Test 19: undefined input
mostFrequentElement(undefined);
// Expected: Throws error

// Test 20: Number input
mostFrequentElement(42);
// Expected: Throws error

// Test 21: Negative numbers
mostFrequentElement([-1, -1, 0, 1]);
// Expected: {mostFreqElement: -1, mostFrequentCount: 2}

// Test 22: Decimal numbers
mostFrequentElement([1.5, 1.5, 2.0, 2.0, 2.0]);
// Expected: {mostFreqElement: 2.0, mostFrequentCount: 3}

// Test 23: Boolean and number mixing
mostFrequentElement([true, 1, true, 1]);
// Expected: {mostFreqElement: true, mostFrequentCount: 2}

// Test 24: Symbol uniqueness
const sym1 = Symbol("test");
const sym2 = Symbol("test");
mostFrequentElement([sym1, sym2, sym1]);
// Expected: {mostFreqElement: sym1, mostFrequentCount: 2}

// Test 26: Tie - your code returns first encountered
mostFrequentElement(["a", "b", "a", "b", "c"]);
// Expected: {mostFreqElement: 'a', mostFrequentCount: 2}
// (or 'b' with same count)
