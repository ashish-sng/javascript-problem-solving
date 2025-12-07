// 30. Implement a simple LRU cache (very small capacity).

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // key → value // Map preserves insertion order!
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key); // Remove from old position
    this.map.set(key, val); // Add to end (most recent)
    return val;
  }

  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    if (this.map.size >= this.capacity) {
      // Delete first key (least recent)
      const first = this.map.keys().next().value;
      this.map.delete(first);
    }
    this.map.set(key, value);
  }
}

const cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3); // evicts key 2
console.log(cache.get(2)); // -1 (not found)
cache.put(4, 4); // evicts key 1
console.log(cache.get(1)); // -1
console.log(cache.get(3)); // 3
console.log(cache.get(4)); // 4
