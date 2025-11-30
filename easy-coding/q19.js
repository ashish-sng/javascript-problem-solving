// 19. Chunk an array into subarrays of size k.

function chunkSlice(arr, k) {
  const res = [];

  for (let i = 0; i < arr.length; i += k) {
    res.push(arr.slice(i, i + k));
  }

  return res;
}

function chunkSplice(arr, k) {
  let res = [];

  while (arr.length > 0) {
    res.push(arr.splice(0, k));
  }

  return res;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(chunkSlice(arr, 2));
console.log(chunkSplice(arr, 2));
