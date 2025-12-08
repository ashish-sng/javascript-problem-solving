// 39. Implement sleep(ms) returning a Promise.

async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

// Test 1: Basic delay
console.time("sleep1");
sleep(100).then(() => {
  console.timeEnd("sleep1"); // Should show ~100ms
});

// Test 2: Async/await usage
async function testSleep() {
  console.log("Starting at:", Date.now());
  await sleep(500);
  console.log("Ending at:", Date.now()); // ~500ms later
}

testSleep();

// Test 3: Chain multiple sleeps
sleep(100)
  .then(() => {
    console.log("100ms passed");
    return sleep(200);
  })
  .then(() => {
    console.log("300ms total passed");
  });

// Test 4: With Promise.all
Promise.all([
  sleep(100).then(() => "A"),
  sleep(200).then(() => "B"),
  sleep(50).then(() => "C"),
]).then((results) => {
  console.log(results); // ['C', 'A', 'B'] - in completion order
});

// Test 5: Zero delay (should still be async)
sleep(0).then(() => {
  console.log("This runs on next tick");
});

// Test 6: Error case - negative time?
sleep(-100).then(() => {
  console.log("What happens with negative?"); // Runs immediately
});

// Test 7: Very large delay
sleep(10000).then(() => {
  console.log("10 seconds passed");
});

// Test 8: Usage in loops
async function delayedLoop() {
  for (let i = 0; i < 3; i++) {
    console.log(i);
    await sleep(100);
  }
}

// Test 9: With try-catch
async function testWithError() {
  try {
    await sleep(100);
    throw new Error("Something went wrong");
  } catch (err) {
    console.log("Error after sleep:", err.message);
  }
}
