// 18. Implement a simple memoize(fn)

function memorize(fn) {
  let cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("returning memoized");
      return cache.get(key);
    }

    console.log("Not memoised");
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function add(a, b) {
  return a + b;
}

const memoizeAdd = memorize(add);

console.log(memoizeAdd(2, 3));
console.log(memoizeAdd(2, 3));
console.log(memoizeAdd(2, 3));
console.log(memoizeAdd(2, 3));
