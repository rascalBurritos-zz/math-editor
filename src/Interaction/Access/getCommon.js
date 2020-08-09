import { traverse } from './access';
import { DangerousSetContainer } from '../Removal/dangerousSetContainer';

/**
 * @param {Object} item
 * @param {Array} keychain
 * @param {number} index
 * @param {Object} viewCollection
 * @return {Object} subunit
 */
export function getCommonAncestor(
  item,
  keychain,
  index,
  viewCollection = false
) {
  const commonKeychain = keychain.slice(0, index + 1);
  return traverse(item, commonKeychain, viewCollection);
}

/**
 * @param {Array} keychainA
 * @param {Array} keychainB
 * @return {number}
 */
export function getCommonAncestorIndex(keychainA, keychainB) {
  const shortestLength = Math.min(keychainA.length, keychainB.length);
  for (let index = 0; index < shortestLength; index++) {
    if (!boxKeyEquals(keychainA[index], keychainB[index])) {
      return index - 1;
    }
  }
  console.warn('NO COMMON');
  return -1;
}

/**
 * @param {*} boxkeyA
 * @param {*} boxkeyB
 * @return {boolean}
 * NOTE: Only valid for boxkeys on same level with same parent
 * NOTE: only compares indices
 */
function boxKeyEquals(boxkeyA, boxkeyB) {
  return JSON.stringify(boxkeyA) === JSON.stringify(boxkeyB);
}

/**
 *
 * @param {*} model
 * @param {*} parentKeychain
 * @param {*} toInsert
 */
export function dangerousSetParent(model, parentKeychain, toInsert) {
  const commonAncestorParent = traverse(
    model,
    parentKeychain.slice(0, -1),
    false
  );
  const dangerSetParent = DangerousSetContainer.retrieve(
    commonAncestorParent.type,
    false
  );
  dangerSetParent(
    commonAncestorParent,
    parentKeychain[parentKeychain.length - 1],
    toInsert
  );
}
