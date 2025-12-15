// 40. Implement retry(fn, attempts) for a promise-returning function.
// Implementation with Delay

function retry(fn, attempts, delay = 1000) {
  return async function (...args) {
    let lastError;

    for (let i = 0; i < attempts; i++) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error;

        if (i === attempts - 1) {
          throw lastError;
        }

        // Wait before retrying (with exponential backoff)
        const waitTime = delay * Math.pow(2, i);
        console.log(`Retrying in ${waitTime}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  };
}

// Test with a function that always fails
const alwaysFails = async () => {
  throw new Error("API Connection Failed");
};

// Test with a function that eventually succeeds
let attemptCount = 0;
const eventuallySucceeds = async () => {
  attemptCount++;
  if (attemptCount < 3) {
    throw new Error(`Failed on attempt ${attemptCount}`);
  }
  return `Success on attempt ${attemptCount}!`;
};

// Test with random failures
const randomFailure = async (id) => {
  const successRate = 0.3; // 30% success rate
  if (Math.random() > successRate) {
    throw new Error(`Random failure for ${id}`);
  }
  return `Success for ${id}`;
};

// Test with parameters
const paramFunction = async (a, b) => {
  if (a < b) {
    throw new Error(`${a} is less than ${b}`);
  }
  return a + b;
};

async function runTests() {
  console.log("=== Testing Retry Function ===\n");

  // Reset attemptCount for clean test
  attemptCount = 0;

  // Test 1: Function that eventually succeeds
  console.log("Test 1: Function that succeeds on 3rd attempt");
  const retryEventual = retry(eventuallySucceeds, 3, 100);
  try {
    const result = await retryEventual();
    console.log(`✓ Success: ${result}\n`);
  } catch (error) {
    console.log(`✗ Failed: ${error.message}\n`);
  }

  // Test 2: Function that always fails (should throw after all attempts)
  console.log("Test 2: Function that always fails");
  const retryAlwaysFails = retry(alwaysFails, 3, 50);
  try {
    const result = await retryAlwaysFails();
    console.log(`✓ Success: ${result}\n`);
  } catch (error) {
    console.log(`✗ Final error: ${error.message}\n`);
  }

  // Test 3: Function with parameters
  console.log("Test 3: Function with parameters");
  const retryWithParams = retry(paramFunction, 2, 50);
  try {
    // This will fail both times (5 < 10)
    const result = await retryWithParams(5, 10);
    console.log(`✓ Success: ${result}\n`);
  } catch (error) {
    console.log(`✗ Failed: ${error.message}\n`);
  }

  try {
    // This will succeed immediately (15 > 10)
    const result = await retryWithParams(15, 10);
    console.log(`✓ Success: ${result}\n`);
  } catch (error) {
    console.log(`✗ Failed: ${error.message}\n`);
  }

  // Test 4: Random failures (run multiple times)
  console.log("Test 4: Random failures (multiple runs)");
  for (let i = 1; i <= 5; i++) {
    const retryRandom = retry(randomFailure, 3, 20);
    try {
      const result = await retryRandom(`item-${i}`);
      console.log(`  Run ${i}: ✓ ${result}`);
    } catch (error) {
      console.log(`  Run ${i}: ✗ Failed after all attempts`);
    }
  }
}

// Run all tests
runTests();
