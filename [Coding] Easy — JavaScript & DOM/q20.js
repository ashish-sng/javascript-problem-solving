// 20. Group an array of objects by a key (e.g., department).

function groupByKey(arr, key) {
  let result = {};
  for (let obj of arr) {
    if (obj.hasOwnProperty(key) && result.hasOwnProperty(obj[key])) {
      result[obj[key]].push(obj);
    } else {
      result[obj[key]] = [obj];
    }
  }

  return result;
}

const arr = [
  { name: "Alice", department: "HR" },
  { name: "Bob", department: "Engineering" },
  { name: "Charlie", department: "HR" },
  { name: "David", department: "Finance" },
];

console.log(groupByKey(arr, "department"));
