// Q9. Count character frequencies in a string (return an object).

function countCharFreq(str, caseSensitive = true) {
  const obj = {};

  if (!caseSensitive) {
    str = str.toLowerCase();
  }

  for (let i of str) {
    obj.hasOwnProperty(i) ? obj[i]++ : (obj[i] = 1);
  }

  return obj;
}

console.log(countCharFreq("Ashish"));
console.log(countCharFreq("racecar"));
console.log(countCharFreq("Racecar", false));
console.log(countCharFreq("Shivam"));
