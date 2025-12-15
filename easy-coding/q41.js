// 41. Serialize query params from an object (to URL string).

function serializeParams(params) {
  const parts = [];

  for (const [key, value] of Object.entries(params)) {
    // Encode both key and value
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(value);
    parts.push(`${encodedKey}=${encodedValue}`);
  }

  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

// Usage
const params = {
  name: "John Doe",
  age: 30,
  city: "New York",
};

console.log(serializeParams(params));
// Output: ?name=John%20Doe&age=30&city=New%20York
