// 34. Sum values by key across an array of objects.

function sumByKey(arr, key) {
  let sum = 0;
  for (let i of arr) {
    if (i.hasOwnProperty(key) && typeof i[key] === "number") {
      sum += i[key];
    }
  }

  return sum;
}

const data = [
  { category: "food", amount: 100 },
  { category: "food", amount: 200 },
  { category: "clothing", amount: 150 },
];

console.log(sumByKey(data, "amount")); // 450
console.log(sumByKey(data, "category")); // Should handle non-numeric or return 0
