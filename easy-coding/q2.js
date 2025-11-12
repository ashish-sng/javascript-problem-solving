// Q2. Reverse a string without using built-in reverse.
function reverseString(str) {
  str = str.split("");
  let left = 0,
    right = str.length - 1;
  while (left < right) {
    let temp = str[left];
    str[left] = str[right];
    str[right] = temp;
    left++, right--;
  }

  return str.join("");
}

// optimized version
function reverseString2(str) {
  let reversed = ""; // O(1) space init
  for (let i = str.length - 1; i >= 0; i--) {
    // O(n) time
    reversed += str[i]; // O(1) append
  }
  return reversed; // O(1) return
}

console.log(reverseString("hello"));
console.log(reverseString("ashish"));

console.log(reverseString2("hello"));
console.log(reverseString2("ashish"));
