class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(eventName, callback) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(callback);

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this._events[eventName];
    if (!listeners || listeners.length === 0) {
      return false;
    }
    for (let i = 0; i < listeners.length; i++) {
      const callback = listeners[i];
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in event listener for ${eventName}:`, error);
      }
    }

    return true;
  }

  off(eventName, callbackToRemove) {
    const listeners = this._events[eventName];
    if (!listeners || listeners.length === 0) {
      return this;
    }
    for (let i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i] === callbackToRemove) {
        listeners.splice(i, 1);
      }
    }
    if (listeners.length === 0) {
      delete this._events[eventName];
    }

    return this;
  }
}

// ============================================================================
// EXAMPLE 1: Basic Usage - Step by Step
// ============================================================================

{
  console.log("=== EXAMPLE 1: Basic Step-by-Step ===");

  // Step 1: Create an event emitter
  const emitter = new EventEmitter();

  console.log("1. Created new EventEmitter");
  console.log("   emitter._events =", emitter._events); // {}

  // Step 2: Add a listener for 'click' event
  const clickHandler = function (x, y) {
    console.log(`   Click handler called with: (${x}, ${y})`);
  };

  emitter.on("click", clickHandler);

  console.log("2. Added click listener");
  console.log("   emitter._events =", emitter._events);
  // Now emitter._events looks like:
  // {
  //   'click': [ [Function: clickHandler] ]
  // }

  // Step 3: Emit the 'click' event
  console.log("3. Emitting 'click' event with (100, 200)");
  emitter.emit("click", 100, 200);
  // What happens internally:
  // 1. emitter.emit('click', 100, 200) is called
  // 2. It gets listeners = emitter._events['click'] = [clickHandler]
  // 3. It loops through listeners: [clickHandler]
  // 4. It calls clickHandler(100, 200)
  // 5. Output: "Click handler called with: (100, 200)"

  // Step 4: Add another click listener
  const anotherClickHandler = function () {
    console.log("   Another click handler!");
  };

  emitter.on("click", anotherClickHandler);

  console.log("4. Added another click listener");
  console.log("   emitter._events =", emitter._events);
  // Now emitter._events looks like:
  // {
  //   'click': [ [Function: clickHandler], [Function: anotherClickHandler] ]
  // }

  // Step 5: Emit again - BOTH handlers should run
  console.log("5. Emitting 'click' event again");
  emitter.emit("click", 300, 400);
  // Output:
  // "Click handler called with: (300, 400)"
  // "Another click handler!"

  // Step 6: Remove the first click handler
  console.log("6. Removing first click handler");
  emitter.off("click", clickHandler);

  console.log("   emitter._events =", emitter._events);
  // Now emitter._events looks like:
  // {
  //   'click': [ [Function: anotherClickHandler] ]
  // }

  // Step 7: Emit again - only second handler should run
  console.log("7. Emitting 'click' event one more time");
  emitter.emit("click", 500, 600);
  // Output: "Another click handler!" only

  // Step 8: Remove all listeners
  console.log("8. Removing all click listeners");
  emitter.off("click", anotherClickHandler);

  console.log("   emitter._events =", emitter._events); // {}
  // The 'click' key is deleted entirely because the array is empty

  // Step 9: Try to emit with no listeners
  console.log("9. Emitting 'click' with no listeners");
  const result = emitter.emit("click", 700, 800);
  console.log("   Result of emit with no listeners:", result); // false
}
