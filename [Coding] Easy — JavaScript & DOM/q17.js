// 17. Implement a function once(fn) that runs a function only once.
// brute force approach that just works.
function once(fn) {
  let once = false;

  return () => {
    if (once) return;
    fn();
    once = true;
  };
}

// better that handles args and preserves 'this'
function once2(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

function fn() {
  console.log("yoo function called");
  return "return value";
}

const callOnce = once2(fn);

console.log(callOnce()); // "yoo function called" then "return value"
console.log(callOnce()); // "return value" (no console log)
console.log(callOnce()); // "return value" (no console log)
