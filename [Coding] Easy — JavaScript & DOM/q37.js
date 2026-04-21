//  37. Write a function to dedupe objects by id.

function dedupeObj(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }

  const seenIds = new Set();
  const result = [];

  for (const obj of arr) {
    // Handle missing id property
    if (!obj || typeof obj !== "object" || !("id" in obj)) {
      continue;
    }

    const id = obj.id;

    if (!seenIds.has(id)) {
      seenIds.add(id);
      result.push(obj);
    }
  }

  return result;
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice Again" }, // Duplicate id: 1
  { id: 3, name: "Charlie" },
  { id: 2, name: "Bob Different" }, // Duplicate id: 2
];

console.log(dedupeObj(users));
