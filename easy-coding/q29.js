// 29. Find intersection of two arrays (unique values).

const findIntersection = (arr1, arr2) => {
  const set1 = new Set(arr1);

  const set2 = new Set(arr2);

  const result = set1.intersection(set2);

  console.log([...result]);
};

findIntersection([], [1, 2, 3]);

findIntersection([1, 2, 3], []);

findIntersection([], []);

findIntersection([1, 2, 2, 3], [2, 2, 4]);

findIntersection([1, 2, 3], [4, 5, 6]);

findIntersection([1, "2", true], ["2", 1, false]);

findIntersection([1, null, undefined], [null, 2, undefined]);

findIntersection([1, NaN, 3], [NaN, 2, 3]);
