// 14. Implement throttle(fn, delay).

function throttle(fn, delay) {
  let isThrottled = false;

  return function (...args) {
    if (isThrottled) return;

    fn.apply(this, args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
    }, delay);
  };
}

const throttledLog = throttle(() => {
  console.log("run");
}, 5000);

setInterval(() => throttledLog(), 100);

// loadash style with leading and trailing props
function throttle(fn, delay, options = { leading: true, trailing: true }) {
  let lastCallTime = 0;
  let timerId = null;
  let lastArgs;
  let lastThis;

  const { leading, trailing } = options;

  function invoke(time) {
    lastCallTime = time;
    fn.apply(lastThis, lastArgs);
    lastArgs = lastThis = null;
  }

  function startTimer(callback, wait) {
    return setTimeout(callback, wait);
  }

  function trailingInvoke() {
    const now = Date.now();
    if (trailing && lastArgs) {
      invoke(now);
    }
    timerId = null;
  }

  return function (...args) {
    const now = Date.now();

    if (!lastCallTime && !leading) {
      lastCallTime = now;
    }

    const remaining = delay - (now - lastCallTime);

    lastArgs = args;
    lastThis = this;

    if (remaining <= 0 || remaining > delay) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      invoke(now);
    } else if (!timerId && trailing) {
      timerId = startTimer(trailingInvoke, remaining);
    }
  };
}
