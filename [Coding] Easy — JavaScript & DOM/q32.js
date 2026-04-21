// 32. Implement a basic binary search on a sorted array.

function binarySearch(arr, target) {
  const n = arr.length;
  let targetIndex = -1;

  let left = 0,
    right = n - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) {
      targetIndex = mid;
      break;
    } else if (target < arr[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  if (targetIndex !== -1) {
    console.log(
      `Found the element in the array, It is at ${targetIndex + 1} position.`
    );
  } else {
    console.log("Element not found.");
  }
}

const arr1 = [1, 2, 3, 4, 5, 6, 7, 8];

binarySearch(arr1, 7);

binarySearch([], 5);
// left=0, right=-1 → loop never enters → returns -1 ✓

binarySearch([5], 5);
// left=0, right=0 → enters loop
// mid=0 → arr[0]==5 → returns 0 ✓

binarySearch([5], 3);
// left=0, right=0 → enters loop
// mid=0 → arr[0]!=3, target<arr[mid] → right=-1
// left=0, right=-1 → loop ends → returns -1 ✓

binarySearch([1, 3], 3);
// Step 1: left=0, right=1 → mid=0 → arr[0]=1 < 3 → left=1
// Step 2: left=1, right=1 → mid=1 → arr[1]=3 → returns 1 ✓

binarySearch([1, 2, 3, 4, 5], 1); // First element
// Works correctly

binarySearch([1, 2, 3, 4, 5], 5); // Last element
// Works correctly

binarySearch([1, 3, 5, 7], 4); // Between elements
// Will eventually make left > right and return -1
