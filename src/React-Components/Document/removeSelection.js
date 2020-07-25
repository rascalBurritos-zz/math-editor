import { traverse } from '../../../Experiment 2/caretTraverser';
// import VerticalListCaretMap from '../../../Experiment 2/VerticalListCaretMap';
// import TextBlockCaretMap from '../../../Experiment 2/TextBlockCaretMap';
// import getCaretMap from '../../../Experiment 2/getCaretMap';
import { removeDirectly } from './removeDirectly';
import getAccessMap from '../../../Experiment 2/getAccessMap';

/**
 *
 * @param {Array} keychainA
 * @param {Array} keychainB
 * @param {Object} model
 * @return {Object}
 */
export default function removeSelection(keychainA, keychainB, model) {
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
  if (commonAncestorIndex === 0) {
    return { model: newCommonAncestor };
  }
  const commonAncestorParent = traverse(
    model,
    keychainA.slice(0, commonAncestorIndex - 1)
  );
  const accessor = getAccessMap(commonAncestorParent.type, false);
  const caIndexWithinParent = commonAncestorParent[accessor].indexOf(
    commonAncestor
  );
  commonAncestorParent[accessor][caIndexWithinParent] = newCommonAncestor;

  return { model };

  /**
   * @param {Object} model
   * @param {Array} keychain
   * @param {number} index
   * @return {Object} submodel
   */
  function getCommonAncestor(model, keychain, index) {
    const commonKeychain = keychain.slice(0, index);
    return traverse(model, commonKeychain);
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
   */
  function boxKeyEquals(boxkeyA, boxkeyB) {
    return boxkeyA.index === boxkeyB.index;
  }
}

// /**
//  *
//  * @param {*} boxKeyA
//  * @param {*} boxKeyB
//  * @param {*} submodel
//  */
// function getBetween(boxKeyA, boxKeyB, parent) {
//   const accessElementIndex = 0;
//   const [leftKey, rightKey] =
//     boxKeyA.index < boxKeyB.index ? [boxKeyA, boxKeyB] : [boxKeyB, boxKeyA];
//   const leftModelIndex = getModelIndex(leftKey, parent, DIRECTION.RIGHT);
//   const rightModelIndex = getModelIndex(rightKey, parent, DIRECTION.LEFT);
//   // if same or goes in wrong direction might be problemo
//   if (leftModelIndex === -1 || rightModelIndex === -1) {
//     console.warn('wrong direction');
//   }
//   const deleteAmount = rightModelIndex - leftModelIndex;
//   parent[accessElementIndex].splice(leftModelIndex, deleteAmount);
// }

// /**
//  * @param {Object} boxKey
//  * @param {Object} parent
//  */
// function getModelIndex(boxKey, parent, direction) {
//   const caretMaps = {
//     Vertical_List: VerticalListCaretMap,
//     Text_Block: TextBlockCaretMap,
//   };
//   const caretMap = new caretMaps[parent.type](parent);
//   return caretMap.getModelIndex(boxKey, direction);
// }
