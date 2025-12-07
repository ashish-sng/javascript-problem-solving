// 35. Implement get(obj, path, defaultVal) path accessor.

function simpleGet(obj, path, defaultValue) {
  const keys = Array.isArray(path) ? path : path.split(".");
  let result = obj;

  for (let key of keys) {
    if (result == null || result[key] === undefined) {
      return defaultValue;
    }
    result = result[key];
  }

  return result;
}

function get(obj, path, defaultValue) {
  if (!obj || typeof obj !== "object") {
    return defaultValue;
  }

  // Handle array path
  if (Array.isArray(path)) {
    let result = obj;
    for (const key of path) {
      if (result == null || result[key] === undefined) {
        return defaultValue;
      }
      result = result[key];
    }
    return result;
  }

  // Handle string path with dots, brackets, etc.
  const keys = path
    .replace(/\[(\w+)\]/g, ".$1") // Convert [index] to .index
    .replace(/\["([^"]+)"\]/g, ".$1") // Convert ["key"] to .key
    .replace(/\['([^']+)'\]/g, ".$1") // Convert ['key'] to .key
    .split(".")
    .filter(Boolean);

  let result = obj;
  for (const key of keys) {
    if (result == null || result[key] === undefined) {
      return defaultValue;
    }
    result = result[key];
  }

  return result;
}

const obj = {
  a: {
    b: {
      c: [1, 2, 3],
      d: "hello",
    },
  },
  users: [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
  ],
};

// Test cases:
console.log(get(obj, "a.b.c")); // [1, 2, 3]
console.log(get(obj, "a.b.c[0]")); // 1
console.log(get(obj, "a.b.e")); // undefined
console.log(get(obj, "a.b.e", "default")); // "default"
console.log(get(obj, "users[1].name")); // "Bob"
console.log(get(obj, ["users", 1, "name"])); // "Bob" (array path)
