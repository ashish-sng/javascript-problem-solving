// 13. Implement debounce(fn, delay)

function debounce(fn, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

function sayHello() {
  console.log("Hello debounced!");
}

const debouncedHello = debounce(sayHello, 1000);

// Calls:
debouncedHello();
debouncedHello();
debouncedHello();
