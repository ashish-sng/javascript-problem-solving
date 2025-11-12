// Q1. Implement a function to check if two strings are anagrams
function anagramCheck(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const charCount = {};

  for (let e of str1) {
    if (charCount.hasOwnProperty(e)) {
      charCount[e]++;
    } else {
      charCount[e] = 1;
    }
  }

  for (let e of str2) {
    if (charCount.hasOwnProperty(e) && charCount[e] > 0) {
      charCount[e]--;
    } else {
      return false;
    }
  }

  return true;
}

function anagramCheck2(str1, str2) {
  if (str1.length !== str2.length) return false;

  const charCount = new Array(26).fill(0);

  for (let i = 0; i < str1.length; i++) {
    charCount[str1.charCodeAt(i) - 97]++;
    charCount[str2.charCodeAt(i) - 97]--;
  }

  return charCount.every((count) => count === 0);
}

console.log(anagramCheck("listen", "silent"));
console.log(anagramCheck("hello", "world"));

console.log(anagramCheck2("listen", "silent"));
console.log(anagramCheck2("hello", "world"));
