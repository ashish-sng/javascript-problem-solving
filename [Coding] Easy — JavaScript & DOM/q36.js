// 36. Implement set(obj, path, value) to create nested paths.

function set(obj, path, value) {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    // If the key doesn't exist or isn't an object, create it
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }

  // Set the value on the last key
  current[keys[keys.length - 1]] = value;
  return obj;
}

const obj1 = {};
set(obj1, "a.b.c", 100);

console.log(obj1);
