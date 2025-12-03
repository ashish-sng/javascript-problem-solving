// 22. Implement a curry(fn) utility.

/**
 * CURRY FUNCTION IMPLEMENTATION - BRUTE FORCE APPROACH
 */

function curry(fn) {
  // STEP 1: Return a new function that will handle the currying
  // We use a named function (curried) so it can call itself recursively
  return function curried(...args) {
    // STEP 2: Check if we have enough arguments to call the original function

    // fn.length gives us the number of parameters the function expects
    // For example: function sum(a, b, c) has fn.length = 3
    // args.length is how many arguments we've received so far

    // CASE 1: We have ALL the arguments we need (or more)
    if (args.length >= fn.length) {
      // We can now call the original function!
      // Use apply() to:
      // 1. Preserve the 'this' context (important for methods)
      // 2. Pass all arguments as an array
      return fn.apply(this, args);
    }

    // CASE 2: We DON'T have enough arguments yet
    // We need to return a NEW function that will collect MORE arguments
    else {
      // Return a function that takes more arguments
      return function (...moreArgs) {
        // When this new function is called with moreArgs:
        // 1. Combine the previous arguments (args) with the new ones (moreArgs)
        // 2. Call curried again with the combined arguments
        // 3. This creates a chain: each call either executes or returns another function

        // Example walkthrough for curriedSum(1)(2)(3):
        // 1st call: curried(1) → returns function (needs more args)
        // 2nd call: function(2) → calls curried(1, 2) → returns function (needs more)
        // 3rd call: function(3) → calls curried(1, 2, 3) → executes sum(1, 2, 3)

        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// ============================================================================
// VISUAL EXAMPLE - LET'S TRACE THROUGH THE EXECUTION
// ============================================================================

console.log("=== EXAMPLE 1: Basic Usage ===");

function sum(a, b, c) {
  console.log(`Executing sum with: ${a}, ${b}, ${c}`);
  return a + b + c;
}

// Create curried version
const curriedSum = curry(sum);

console.log("Call: curriedSum(1, 2, 3)");
console.log("Result:", curriedSum(1, 2, 3)); // 6
console.log("---");

console.log("Call: curriedSum(1)(2)(3)");
console.log("Result:", curriedSum(1)(2)(3)); // 6
console.log("---");

console.log("Call: curriedSum(1, 2)(3)");
console.log("Result:", curriedSum(1, 2)(3)); // 6

// ============================================================================
// EXAMPLE 2: Let's trace step-by-step what happens
// ============================================================================

console.log("\n=== EXAMPLE 2: Step-by-Step Trace ===");

function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);

// Let's trace through: curriedMultiply(2)(3)(4)
console.log("Step 1: curriedMultiply(2)");
const step1 = curriedMultiply(2);
// What happens:
// 1. curried is called with args = [2]
// 2. fn.length = 3 (multiply needs 3 args)
// 3. args.length = 1 (we have only 1 arg)
// 4. 1 < 3, so return new function
// step1 is now a function that expects more arguments

console.log("Step 2: step1(3)");
const step2 = step1(3);
// What happens:
// 1. step1 is the function returned in step 1
// 2. It receives arg = 3, so moreArgs = [3]
// 3. It calls curried.apply(this, [2].concat([3])) = curried(2, 3)
// 4. curried is called with args = [2, 3]
// 5. 2 < 3, so return another function
// step2 is now a function that expects one more argument

console.log("Step 3: step2(4)");
const result = step2(4);
// What happens:
// 1. step2 receives arg = 4, so moreArgs = [4]
// 2. It calls curried.apply(this, [2, 3].concat([4])) = curried(2, 3, 4)
// 3. curried is called with args = [2, 3, 4]
// 4. 3 >= 3, so we have enough arguments!
// 5. Call multiply.apply(this, [2, 3, 4]) = multiply(2, 3, 4)
// 6. Returns 2 * 3 * 4 = 24

console.log("Final result:", result); // 24

// ============================================================================
// EXAMPLE 3: Practical Use Case - Creating Specialized Functions
// ============================================================================

console.log("\n=== EXAMPLE 3: Practical Use - Logging ===");

function createLog(level, timestamp, message, source) {
  return `[${level}] ${timestamp} - ${source}: ${message}`;
}

const curriedLog = curry(createLog);

// Create specialized loggers
const errorLogger = curriedLog("ERROR");
const errorLoggerToday = errorLogger("2024-01-15 10:30:00");
const appErrorLogger = errorLoggerToday("App");

// Now use the specialized logger
console.log(appErrorLogger("Database connection failed"));
// Output: [ERROR] 2024-01-15 10:30:00 - App: Database connection failed

console.log(appErrorLogger("User not found"));
// Output: [ERROR] 2024-01-15 10:30:00 - App: User not found

// ============================================================================
// EXAMPLE 4: With Context (this) Preservation
// ============================================================================

console.log("\n=== EXAMPLE 4: Context Preservation ===");

const calculator = {
  base: 10,
  add: function (a, b, c) {
    return this.base + a + b + c;
  },
};

// Curry the method
calculator.curriedAdd = curry(calculator.add);

// Call it - 'this' should refer to calculator
const addFive = calculator.curriedAdd(5);
const addFiveAndTwo = addFive(2);

console.log("Result:", addFiveAndTwo(3)); // 20 (10 + 5 + 2 + 3)
// 'this.base' correctly refers to calculator.base = 10
