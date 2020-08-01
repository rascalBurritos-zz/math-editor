import { removeDirectly } from './removeDirectly';
import { traverse } from '../../Interaction/Access/access';

/**
 *
 * @param {Array} keychainA
 * @param {Array} keychainB
 * @param {Object} model
 * @return {Object}
 */
export default function removeSelection(keychainA, keychainB, model) {
  if (keychainsEqual(keychainA, keychainB)) return {};
  const commonAncestorIndex = getCommonAncestorIndex(keychainA, keychainB);
  const commonAncestor = getCommonAncestor(
    model,
    keychainA,
    commonAncestorIndex
  );
  const subChainA = keychainA.slice(commonAncestorIndex);
  const subChainB = keychainB.slice(commonAncestorIndex);
  const newCommonAncestor = removeDirectly(
    subChainA,
    subChainB,
    commonAncestor
  );
  let newModel;
  if (commonAncestorIndex === 0) {
    newModel = newCommonAncestor;
  } else {
    const commonAncestorParent = traverse(
      model,
      keychainA.slice(0, commonAncestorIndex - 1),
      false
    );
    const accessor = getAccessMap(commonAncestorParent.type, false);
    const caIndexWithinParent = commonAncestorParent[accessor].indexOf(
      commonAncestor
    );
    commonAncestorParent[accessor][caIndexWithinParent] = newCommonAncestor;
    newModel = model;
  }
  const leftKeychain =
    subChainA[0].index < subChainB[0].index ? keychainA : keychainB;
  const selection = { anchor: leftKeychain, focus: leftKeychain };
  return { model: newModel, selection };

  /**
   * @param {Object} model
   * @param {Array} keychain
   * @param {number} index
   * @return {Object} submodel
   */
  function getCommonAncestor(model, keychain, index) {
    const commonKeychain = keychain.slice(0, index);
    return traverse(model, commonKeychain, false);
  }

  /**
   * @param {Array} keychainA
   * @param {Array} keychainB
   * @return {number}
   */
  function getCommonAncestorIndex(keychainA, keychainB) {
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
   *
   * @param {*} boxkeyA
   * @param {*} boxkeyB
   * @return {boolean}
   * NOTE: Only valid for boxkeys on same level with same parent
   * NOTE: only compares indices
   */
  function boxKeyEquals(boxkeyA, boxkeyB) {
    return boxkeyA.index === boxkeyB.index;
  }
}
