import { traverse } from '../Access/access';

/**
 * @param {Object} unit
 * @param {Array} keychain
 * @param {number} index
 * @param {boolean} isView
 * @return {Object} subunit
 */
export function getCommonAncestor(unit, keychain, index, isView) {
  const commonKeychain = keychain.slice(0, index);
  return traverse(unit, commonKeychain, isView);
}

/**
 * @param {Array} keychainA
 * @param {Array} keychainB
 * @return {number}
 */
export function getCommonAncestorIndex(keychainA, keychainB) {
  const shortestLength =
    keychainA.length > keychainB.length ? keychainA.length : keychainB.length;
  let commonAncestorIndex = shortestLength; // 0 is root
  for (let index = 0; index < shortestLength; index++) {
    if (!boxKeyEquals(keychainA[index], keychainB[index])) {
      commonAncestorIndex = index;
      break;
    }
  }
  return commonAncestorIndex;
}

/**
 * @param {*} boxkeyA
 * @param {*} boxkeyB
 * @return {boolean}
 * NOTE: Only valid for boxkeys on same level with same parent
 * NOTE: only compares indices
 */
function boxKeyEquals(boxkeyA, boxkeyB) {
  return boxkeyA.index === boxkeyB.index;
}
