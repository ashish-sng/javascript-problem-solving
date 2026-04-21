// 15. Find the longest common prefix among strings.
var longestCommonPrefix = function (strs) {
  // Edge case: if array is empty, return empty string
  if (strs.length === 0) return "";

  // We'll check each character position one by one
  for (let i = 0; i < strs[0].length; i++) {
    const char = strs[0][i]; // Get the character from first string

    // Compare this character with all other strings
    for (let j = 1; j < strs.length; j++) {
      // Two conditions to stop:
      // 1. If current string is shorter than our position
      // 2. If characters don't match
      if (i === strs[j].length || strs[j][i] !== char) {
        return strs[0].substring(0, i); // Return prefix found so far
      }
    }
  }

  // If we complete the loop, entire first string is common prefix
  return strs[0];
};

strs = ["flower", "flow", "flight"];
str2 = ["dog", "racecar", "car"];
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // ""
console.log(longestCommonPrefix(["ab", "a"])); // "a"
console.log(longestCommonPrefix([""])); // ""
console.log(longestCommonPrefix([])); // ""
