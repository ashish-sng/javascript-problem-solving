// Find the first non-repeating character in a string.
// brute force
function nonRepeatingCharacter(str) {
  const map = {};
  const strArr = str.toLowerCase().split(""); // not case sensitive
  for (i of strArr) {
    if (map.hasOwnProperty(i)) {
      map[i] = map[i] + 1;
    } else {
      map[i] = 1;
    }
  }

  for (i of strArr) {
    if (map[i] == 1) return i;
  }
}

function nonRepeatingCharacterOptimsed(str) {
  const charCount = {};
  const normalizedStr = str.toLowerCase();

  // Count characters
  for (const char of normalizedStr) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Find first non-repeating character
  for (const char of normalizedStr) {
    if (charCount[char] === 1) {
      return char;
    }
  }

  return null; // Explicit return for no match
}

console.log(nonRepeatingCharacter("Ashish"));
console.log(nonRepeatingCharacter("Shivam"));
console.log(nonRepeatingCharacter("racecar"));
