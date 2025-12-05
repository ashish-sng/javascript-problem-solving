// 26. Write a function to flatten an object with dot notation keys.

function flattenObjectSimple(obj, prefix = "", result = {}) {
  // Loop through each property
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Create the full key with dot notation
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      // Check what type of value we have
      if (value && typeof value === "object" && !Array.isArray(value)) {
        // It's an object - recursively flatten it
        flattenObjectSimple(value, fullKey, result);
      } else if (Array.isArray(value)) {
        // It's an array - treat array indices as keys
        for (let i = 0; i < value.length; i++) {
          const arrayKey = `${fullKey}.${i}`;
          const arrayValue = value[i];

          // Check if array element is an object
          if (
            arrayValue &&
            (typeof arrayValue === "object" || Array.isArray(arrayValue))
          ) {
            flattenObjectSimple(arrayValue, arrayKey, result);
          } else {
            result[arrayKey] = arrayValue;
          }
        }

        // Also store the array itself if empty
        if (value.length === 0) {
          result[fullKey] = [];
        }
      } else {
        // It's a primitive value - add directly
        result[fullKey] = value;
      }
    }
  }

  return result;
}

// Example 1: Simple nesting
console.log(
  flattenObjectSimple({
    name: "John",
    address: {
      city: "NYC",
      zip: 10001,
    },
  })
);
// Output: { "name": "John", "address.city": "NYC", "address.zip": 10001 }

// Example 2: Multiple levels
console.log(
  flattenObjectSimple({
    a: {
      b: {
        c: {
          d: 1,
        },
      },
    },
  })
);
// Output: { "a.b.c.d": 1 }

// Example 3: Arrays
console.log(
  flattenObjectSimple({
    items: ["apple", "banana"],
    matrix: [
      [1, 2],
      [3, 4],
    ],
  })
);
// Output: {
//   "items.0": "apple",
//   "items.1": "banana",
//   "matrix.0.0": 1,
//   "matrix.0.1": 2,
//   "matrix.1.0": 3,
//   "matrix.1.1": 4
// }

// Example 4: Mixed types
console.log(
  flattenObjectSimple({
    x: null,
    y: undefined,
    z: {
      a: true,
      b: false,
    },
  })
);
// Output: { "x": null, "y": undefined, "z.a": true, "z.b": false }
