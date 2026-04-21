// Q10. Flatten a 1-level nested array (e.g., [1,[2,3],4] => [1,2,3,4]).
//brute force that I could think of in the first go
function flattenOneLevelNestedArray(arr) {
  let result = [];
  for (let i of arr) {
    if (typeof i == "object") {
      for (let j of i) {
        result.push(j);
      }
    } else {
      result.push(i);
    }
  }
  return result;
}

// another way of implementation
function flattenOneLevelNestedArray2(arr) {
  const result = [];

  for (const element of arr) {
    if (Array.isArray(element)) {
      // Use spread operator or push with multiple arguments
      result.push(...element);
    } else {
      result.push(element);
    }
  }

  return result;
}

// another way of implementation
function flattenOneLevelNestedArray3(arr) {
  return arr.flat();
}

// More Robust Version with Error Handling
function flattenOneLevelNestedArray4(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }

  const result = [];

  for (const element of arr) {
    if (Array.isArray(element)) {
      // Check if nested arrays should be flattened beyond one level
      for (const nestedElement of element) {
        if (Array.isArray(nestedElement)) {
          throw new Error("Array contains more than one level of nesting");
        }
      }
      result.push(...element);
    } else {
      result.push(element);
    }
  }

  return result;
}

console.log(flattenOneLevelNestedArray([1, [2, 3], 4]));
