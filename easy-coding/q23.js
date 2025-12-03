// 23. Sum numbers in a nested array (recursively).

function SumArr(arr) {
  if (!Array.isArray(arr)) {
    throw Error("Not an Array");
  }

  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      sum += SumArr(arr[i]);
    } else if (i in arr) {
      sum += arr[i];
    }
  }
  return sum;
}

// test cases
const arr0 = [1, 2, 3, 4, 5, 6, 7];
const arr1 = [1, 2, 3, [4, 5], 6, 7];
const arr2 = [1, 2, 3, [4, 5, 6], , 7];
const arr3 = {};

console.log(SumArr(arr0));
console.log(SumArr(arr1));
console.log(SumArr(arr2));
console.log(SumArr(arr3));
