// Return indices of two numbers summing to target (Two Sum).
function twoSum(arr, target) {
  arr = arr.sort();
  let i = 0,
    j = arr.length - 1;

  while (i <= j) {
    if (arr[i] + arr[j] === target) {
      return [i, j];
    } else if (arr[i] + arr[j] > target) {
      j--;
    } else if (arr[i] + arr[j] < target) {
      i++;
    }
  }

  return [-1, -1];
}

console.log(twoSum([1, 2, 3, 6, 7, 9], 13));
