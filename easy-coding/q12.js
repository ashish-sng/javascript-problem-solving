// Q12. Merge two sorted arrays into a single sorted array.

function merge(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error("Params are not of type Array");
  }

  // Convert sparse arrays -> remove empty slots
  arr1 = arr1.filter((v) => v !== undefined);
  arr2 = arr2.filter((v) => v !== undefined);

  let i = 0,
    j = 0;
  const result = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] > arr2[j]) {
      result.push(arr2[j++]);
    } else {
      result.push(arr1[i++]);
    }
  }

  // Add remaining
  return result.concat(arr1.slice(i)).concat(arr2.slice(j));
}

const arr1 = [2, , 4, , 5, 8]; // sparse
const arr2 = [1, 3, , 7, 10]; // sparse

console.log(merge(arr1, arr2));
