// 33. Remove falsy values from an array (clean).

function clearArray(arr) {
  return arr.filter((ele) => !!ele);
}

console.log(clearArray([1, 2, 3, , null, 78, undefined, {}]));
