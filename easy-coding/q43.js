// 43. Implement a simple shuffle (Fisher–Yates).

// Use this anywhere you need random order!
function shuffleArray(array) {
  // Make copy so we don't change original
  const result = [...array];

  // Work backwards through array
  for (let i = result.length - 1; i > 0; i--) {
    // Pick random index from start up to i
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap current item with random one
    const temp = result[i];
    result[i] = result[randomIndex];
    result[randomIndex] = temp;
  }

  return result;
}

// ===== REAL USAGE EXAMPLES =====

// 1. Shuffle music playlist
const myPlaylist = ["Song1", "Song2", "Song3", "Song4", "Song5"];
const shuffledPlaylist = shuffleArray(myPlaylist);
console.log("Now playing:", shuffledPlaylist[0]);
const shuffledPlaylist1 = shuffleArray(shuffledPlaylist);
console.log("Now playing:", shuffledPlaylist1[0]);
const shuffledPlaylist2 = shuffleArray(shuffledPlaylist1);
console.log("Now playing:", shuffledPlaylist2[0]);
const shuffledPlaylist3 = shuffleArray(shuffledPlaylist2);
console.log("Now playing:", shuffledPlaylist3[0]);
const shuffledPlaylist4 = shuffleArray(shuffledPlaylist3);
console.log("Now playing:", shuffledPlaylist4[0]);
