/**
 * @param {Array} keychainA
 * @param {Array} keychainB
 * @return {boolean}
 */
export default function keychainsEqual(keychainA, keychainB) {
  if (keychainA.length !== keychainB.length) return false;
  for (let i = 0; i < keychainA.length; i++) {
    if (!boxKeyEquals(keychainA[i], keychainB[i])) {
      return false;
    }
  }
  return true;
}

/**
 * @param {*} boxKeyA
 * @param {*} boxKeyB
 * @return {boolean}
 */
function boxKeyEquals(boxKeyA, boxKeyB) {
  return JSON.stringify(boxKeyA) === JSON.stringify(boxKeyB);
}
