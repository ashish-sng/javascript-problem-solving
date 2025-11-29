// 16. Capitalize the first letter of every word in a sentence.

// 1. Brute Force Approach
function capitalizeFirstLetterOfEachWordInASentence(str) {
  const arr = str.split(" ");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length == 0) continue;

    let firstChar = arr[i][0];

    let restWord = arr[i].slice(1);

    arr[i] = firstChar.toUpperCase() + restWord;
  }

  return arr.join(" ");
}

// 2. Intuitive Modern Approach
function capitalizeFirstLetterOfEachWordInASentence2(str) {
  return str
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

console.log(
  capitalizeFirstLetterOfEachWordInASentence("hey john! how you doing bro?")
);

console.log(
  capitalizeFirstLetterOfEachWordInASentence2(
    "hey john! how you doing bro? wanna hangout?"
  )
);
