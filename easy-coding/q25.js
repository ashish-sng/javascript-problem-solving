// 25. Implement a basic Promise.all (assume inputs resolve).

/**
 * IMPLEMENTATION OF Promise.all (assuming all promises resolve)
 *
 * @param {Array} promises - Array of promises and/or regular values
 * @returns {Promise} - Promise that resolves to array of results
 */
function PromiseAll(promises) {
  // STEP 1: Return a new Promise (this is what Promise.all does)
  return new Promise((resolve) => {
    // EDGE CASE 1: Input is not an array
    // Real Promise.all would reject, but since we assume all resolve,
    // we'll handle this gracefully
    if (!Array.isArray(promises)) {
      return resolve([]);
    }

    // EDGE CASE 2: Empty array input
    // Promise.all([]) resolves immediately with []
    if (promises.length === 0) {
      return resolve([]);
    }

    // STEP 2: Prepare to track results
    // We need to:
    // 1. Store results in correct order (use array with same length)
    // 2. Track how many promises have resolved

    const results = new Array(promises.length); // Pre-sized array
    let resolvedCount = 0;

    // STEP 3: Process each item in the input array
    promises.forEach((item, index) => {
      // QUESTION: Is this item a promise?
      // We can check by seeing if it has a .then method

      if (item && typeof item.then === "function") {
        // YES: It's a promise
        // Wait for it to resolve
        item.then((value) => {
          // IMPORTANT: Store at the CORRECT index (not push!)
          // This maintains input order regardless of resolution order
          results[index] = value;
          resolvedCount++;

          // CHECK: Have all promises resolved?
          if (resolvedCount === promises.length) {
            // YES: Resolve the main promise with all results
            resolve(results);
          }
        });
        // Note: We're assuming no rejections (per problem statement)
      } else {
        // NO: It's not a promise (regular value)
        // Store it immediately
        results[index] = item;
        resolvedCount++;

        // CHECK: Were all items non-promises?
        if (resolvedCount === promises.length) {
          // YES: We can resolve immediately
          resolve(results);
        }
      }
    });
  });
}

function SimplePromiseAll(promises) {
  // We're returning a promise
  return new Promise((resolve) => {
    // We'll collect results here
    const results = [];
    let done = 0;

    // For each input item
    for (let i = 0; i < promises.length; i++) {
      const item = promises[i];

      // Make sure it's a promise (even if it's not)
      Promise.resolve(item).then((value) => {
        // Put result in right spot
        results[i] = value;
        done++;

        // If all done, we're finished!
        if (done === promises.length) {
          resolve(results);
        }
      });
    }

    // Special case: empty array
    if (promises.length === 0) {
      resolve([]);
    }
  });
}

// Test Helper

// Demonstration of the async race condition
console.log("=== DEMONSTRATION: Why Tests Run Out of Order ===");

// Create promises that resolve at different times
const promiseA = new Promise((resolve) => {
  setTimeout(() => {
    console.log("  Promise A resolved after 300ms");
    resolve("A");
  }, 300);
});

const promiseB = new Promise((resolve) => {
  setTimeout(() => {
    console.log("  Promise B resolved after 100ms");
    resolve("B");
  }, 100);
});

const promiseC = new Promise((resolve) => {
  setTimeout(() => {
    console.log("  Promise C resolved after 200ms");
    resolve("C");
  }, 200);
});

console.log("\n1. Starting Promise.all with [A, B, C]:");
console.log("   A takes 300ms, B takes 100ms, C takes 200ms");

PromiseAll([promiseA, promiseB, promiseC]).then((results) => {
  console.log("\n2. Promise.all completed!");
  console.log("   Results:", results);
  console.log("   Notice: Even though B resolved first, then C, then A...");
  console.log("   ...the results are still in order: ['A', 'B', 'C']");
});

console.log("\n3. This line logs immediately (before any promises resolve)");
console.log("   Because Promise.all is async!");

// Run after a delay to see the output
setTimeout(() => {
  console.log("\n=== REAL TEST IN ORDER ===");
  runRealTest();
}, 1000);

async function runRealTest() {
  console.log("\nTest 1: Basic promises");
  const result1 = await PromiseAll([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ]);
  console.log("Result:", result1);

  console.log("\nTest 2: With setTimeout");
  const result2 = await PromiseAll([
    new Promise((r) => setTimeout(() => r("first"), 500)),
    new Promise((r) => setTimeout(() => r("second"), 200)),
    "third", // Non-promise value
  ]);
  console.log("Result:", result2);
  console.log(
    "Notice: 'second' resolves before 'first', but order is preserved!"
  );
}
