// Check if a string is a palindrome; ignore non-alphanumerics
function isPalindrome(str) {
  str = str.split("");
  str = str.filter((ch) => {
    if (
      (ch >= "0" && ch <= "9") ||
      (ch >= "a" && ch <= "z") ||
      (ch >= "A" && ch <= "Z")
    ) {
      return true;
    }
    return false;
  });

  let i = 0,
    j = str.length - 1;

  while (i <= j) {
    if (str[i] !== str[j]) return false;
    i++, j--;
  }
  return true;
}

function isPalindromeOptimised(str) {
  str = str.toLowerCase().split("");

  str = str.filter((ch) => /[a-z0-9]/.test(ch));

  let i = 0,
    j = str.length - 1;

  while (i <= j) {
    if (str[i] !== str[j]) return false;
    i++, j--;
  }
  return true;
}

console.log(isPalindromeOptimised("qwe# $qwe12"));
console.log(isPalindromeOptimised("race#car"));
console.log(isPalindromeOptimised("asdf$%fdsa"));
