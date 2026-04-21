// 28. Rotate an array by k positions (right rotation).

const rotateByK = (arr, k) => {
  const n = arr.length;

  const restArray = arr.splice(n - k);

  return [...restArray, ...arr];
};

const arr1 = [1, 2, 3, 4, 5];

console.log(rotateByK(arr1, 2));
