// 31. Check balanced parentheses using a stack.

function isBalanced(str) {
  // Create a stack to track opening brackets
  const stack = [];

  // Define matching pairs
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  // Define opening brackets for quick lookup
  const opening = new Set(["(", "[", "{"]);

  // Iterate through each character
  for (let char of str) {
    if (opening.has(char)) {
      // Push opening bracket to stack
      stack.push(char);
    } else if (pairs[char]) {
      // Check if stack is empty or top doesn't match
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
    // Ignore other characters
  }

  // If stack is empty, all brackets were matched
  return stack.length === 0;
}

// Test cases
console.log(isBalanced("()")); // true
console.log(isBalanced("({[]})")); // true
console.log(isBalanced("({)}")); // false
console.log(isBalanced("((()))")); // true
console.log(isBalanced("([)]")); // false
console.log(isBalanced("")); // true (empty string is balanced)
console.log(isBalanced("{[()]}")); // true
console.log(isBalanced("{[}")); // false
console.log(isBalanced("((())")); // false (missing closing)
