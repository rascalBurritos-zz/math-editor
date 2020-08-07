/**
 *
 * @param {Function} func
 * @param {number} delay
 */
export default function debounce(func, delay) {
  let timeout = false;
  return function (...args) {
    if (!timeout) {
      func.apply(this, args);
      timeout = true;
      setTimeout(() => (timeout = false), delay);
    } else {
      console.log('In Timeout');
    }
  };
}
