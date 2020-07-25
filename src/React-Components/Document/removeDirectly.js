import { DIRECTION, traverse } from '../../../Experiment 2/caretTraverser';
import getCaretMap from '../../../Experiment 2/getCaretMap';
import getAccessMap from '../../../Experiment 2/getAccessMap';
import removeFromCompoundModels, {
  joinAlikeCompoundModels,
} from '../../../Experiment 2/removeFromCompoundModels';

/**
 *
 * @param {Array} keychainA
 * @param {Array} keychainB
 * @param {Object} parent
 * @return {Object}
 */
export function removeDirectly(keychainA, keychainB, parent) {
  if (keychainA === [] || keychainB === []) console.warn('bad array');
  const boxKeyA = keychainA[0];
  const boxKeyB = keychainB[0];

  const aIsLeft = boxKeyA.index < boxKeyB.index;
  const leftKey = aIsLeft ? boxKeyA : boxKeyB;
  const rightKey = aIsLeft ? boxKeyB : boxKeyA;

  // left index is to the right of the caret
  // opposites intended, these are indices that
  // must be deleted inclusive
  let leftIndex = getIndex(leftKey, parent, DIRECTION.RIGHT);
  let rightIndex = getIndex(rightKey, parent, DIRECTION.LEFT);
  console.log(leftIndex, rightIndex);

  if (leftIndex === 'No Delete' || rightIndex === 'No Delete') {
    return parent;
  } else {
    leftIndex = Number(leftIndex);
    rightIndex = Number(rightIndex);
  }

  const parentElementAccess = getAccessMap(parent.type, false);
  const deleteCount = rightIndex - leftIndex + 1;
  if (boxKeyA.type === boxKeyB.type && determineType(boxKeyA) === 'Box') {
    // only top level merge... may expand if actual uses
    const subModelA = traverse(parent, [boxKeyA]);
    const subModelB = traverse(parent, [boxKeyB]);
    const accessA = getAccessMap(subModelA.type, false);
    const accessB = getAccessMap(subModelB.type, false);
    const groupA = subModelA[accessA];
    const groupB = subModelB[accessB];
    const comboGroup = joinAlikeCompoundModels(groupA, groupB);
    subModelA[accessA] = comboGroup;
    removeFromCompoundModels(
      parent,
      parentElementAccess,
      leftIndex,
      deleteCount + 1
    );
  } else {
    removeFromCompoundModels(
      parent,
      parentElementAccess,
      leftIndex,
      deleteCount
    );
  }
  return parent;

  /**
   *
   * @param {Object} boxKey
   * @param {Object} model
   * @param {String} direction
   * @return {number | String}
   */
  function getIndex(boxKey, model, direction) {
    const singleKeyMap = {
      Caret: caretIndex,
      Box: boxIndex,
      Bound: boundIndex,
    };
    const type = determineType(boxKey);
    return singleKeyMap[type](boxKey, model, direction);
  }

  /**
   * @param {Object} boxKey
   * @return {String}
   */
  function determineType(boxKey) {
    if ('outside' in boxKey) {
      return 'Bound';
    } else if (boxKey.isCaret) {
      return 'Caret';
    } else {
      return 'Box';
    }
  }
  /**
   * @param {Object} boxKey
   * @param {Object} model
   * @param {String} direction
   * @return {String | number}
   * Requires Caret maps to implement getModelIndex method
   */
  function getModelIndexInDirection(boxKey, model, direction) {
    const caretMap = getCaretMap(model, false);
    let newBoxKey = boxKey;
    let done = false;
    while (!done) {
      newBoxKey = caretMap.nextItem(direction, newBoxKey);
      done = !newBoxKey.isCaret;
    }
    if ('outside' in newBoxKey) {
      return 'No Delete';
    } else {
      return caretMap.getModelIndex(newBoxKey);
    }
  }

  /**
   *
   * @param {*} boxKey
   * @param {*} model
   * @param {*} direction
   * @return {String | number}
   */
  function caretIndex(boxKey, model, direction) {
    return getModelIndexInDirection(boxKey, model, direction);
  }

  /**
   *
   * @param {*} boxKey
   * @param {*} model
   * @param {*} direction
   * @return {String | number}
   */
  function boxIndex(boxKey, model, direction) {
    let submodel = traverse(model, [boxKey]);
    if (isAtomic(submodel)) {
      const caretMap = getCaretMap(model, false);
      return caretMap.getModelIndex(boxKey);
    } else {
      const isA = boxKey === keychainA[0];
      const newKeychain = isA ? keychainA.slice(1) : keychainB.slice(1);
      const subCaretMap = getCaretMap(submodel, false);
      const boundDirection =
        direction === DIRECTION.LEFT ? 'BOUND_LEFT' : 'BOUND_RIGHT';
      const boundKeychain = [subCaretMap[boundDirection]];
      console.log(newKeychain, boundKeychain, submodel);
      submodel = removeDirectly(newKeychain, boundKeychain, submodel);
      console.log(submodel);
      return getModelIndexInDirection(boxKey, model, direction);
    }

    /**
     * @param {Object} model
     * @return {boolean}
     */
    function isAtomic(model) {
      const compounds = ['Text_Block', 'Vertical_List', 'Formula'];
      return !compounds.includes(model.type);
    }
  }

  /**
   *
   * @param {*} boxKey
   * @param {*} model
   * @param {*} direction
   * @return {String | number}
   */
  function boundIndex(boxKey, model, direction) {
    return getModelIndexInDirection(boxKey, model, direction);
  }
}

// [[ab|cde],[adfa[asdf|asd]fdf]]
// [[ab[asd]fdf]]

// [
//  [ab|cde],
//  [adfa[asdf|asd]fdf]
// ]
// ->
// [[ab[asd]fdf]]

// 1. Deleted everything in between the caret and the model
// 2. Within the model, deleted everything towards

// Direction of other key is known in all half cases

// Direction of other key is right

// Half Case A: One of the keys is a Caret
// [A|sdadfasdf]...
//   1. make Left Index s

// EXCEPTION to 1: [adfadf|] make left index a flag to indicate no deletion

// Half Case B: One of the keys is a Block
// [A[asd|asdf]asdfsdad]...
//   1. make Left Index a
//   2. Repeat Algorithm with the key and getSubview with
//     Right Bound as other key

// EXCEPTION to 1: [adfadf|] make left index a flag to indicate no deletion

// Half Case C: One of the keys is a Bound
// |[sdfasdfas]
//   1. Make the Left index s
// EXCEPTION to 1: [adfadf]| make left index a flag to indicate no deletion

// Note. Both keys should never simultaneously be bounds

// General Algorithm.
// 1. Determine which key is left and which key is right
// 2a. get the left and right indices through the half cases
// 2b. the half cases should modify the submodel if necessary by rerunning this algorithm
// 3. if either is the no delete flag return the original model
// 4. delete from the left index to the right index
// Case 1: Both keys represent Carets
// [asadbas| asdfasdfasd|asdfafd]
// [asadbas|asdfafd]

// Case 2: One of the keys represent Carets
// [asdfasdf|asdfasdf[asdfasdf|asd]]
// [asdfasdf|[|asd]]

// Case 3: Both of the keys represent Block
// [asdfasdf[asdfas|asdfasd]adfsasdf[asdfasdf|dasdfd]]
// [asdfasdf[asdfas|dasdfd]]
// or
// [asdfasdf[asdfas|][|dasdfd]]

// Case 4: One of the keys is a Bound
// [asdfad|fsdf]|
// [asdfad|]

// Case 5: Both of the keys are bounds
// |[asdfasdfasd]|
// []

// Solution to Case 1:
//   1. Find index of a and find index of d
//   2. remove from a to d

// Solution to Case 2:
//   1. Find index of a and find index of f
//   2. remove from a to f
//   3a.If the key with the block is atomic remove it
//      and do not proceed to step 3b
//   3b. Run Algorithm again but on with the
//      next level of key for the model key and
//      the first caret position of the inner block

// Solution to Case 3:
//  1. Find index of a and index of s
//  2. Remove from a to s
//  3a.If a key with the block is atomic remove it and do not go into it
//  3. Run Algorithm again but with the first key and the max index
//  4. Run Algorithm again  but with the other key and the min index
//  5. If inner blocks are compatible,merge them

// /**
//  *
//  * @param {Object} boxKeyA
//  * @param {Object} boxKeyB
//  * @param {Object} model
//  * @return {Object} model with removed
//  * both boxkeys are from within the same model
//  */
// export default function removeFromKeychain(boxKeyA, boxKeyB, model) {
//   if (boxKeyA.isCaret && boxKeyB.isCaret) {
//     if (boxKeyA.index === boxKeyB.index) {
//       console.warn('same caret');
//     } else if (boxKeyA.index < boxKeyB.index) {
//       return deleteBetweenCaretKeys(true);
//     } else {
//       return deleteBetweenCaretKeys(false);
//     }
//   } else if (boxKeyA.isCaret && !boxKeyB.isCaret) {
//     return deleteOneModelOneCaret(boxKeyA, boxKeyB);
//   } else if (!boxKeyA.isCaret && boxKeyB.isCaret) {
//     return deleteOneModelOneCaret(boxKeyB, boxKeyA);
//   } else {
//     //both model keys
//     if (boxKeyA.index === boxKeyB.index) {
//       const accessMethod = 'elements';
//       const caretMap = {};
//       const trueModelIndex = caretMap.getModelIndex(boxKeyA);
//       model[accessMethod].splice(trueModelIndex, 1);
//       return model;
//     } else {
//       const submodelA = traverse(model, [boxKeyA]);
//       const submodelB = traverse(model, [boxKeyB]);
//       if (submodelA.type === submodelB.type) {
//         // call function again on endpoints
//         const aIsLeft = boxKeyA.index < boxKeyB.index;
//         const leftKey = aIsLeft ? boxKeyA : boxKeyB;
//         const rightKey = aIsLeft ? boxKeyB : boxKeyA;
//         const subModelLeft = traverse(model, leftKey);
//         const subModelRight = traverse(model, rightKey);

//         // remove tweeners
//         const caretMap = {};
//         const leftIndex = caretMap.getModelIndex(leftKey) + 1;
//         const rightIndex = caretMap.getModelIndex(rightKey);
//         const deleteAmount = rightIndex - leftIndex;
//         const accessMethod = 'elements';
//         model[accessMethod].splice(leftIndex, deleteAmount);
//         return model;
//       } else {
//       }
//     }
//   }

//   /**
//    * @param {Object} caretKey
//    * @param {Object} modelKey
//    * @return {Object}
//    */
//   function deleteOneModelOneCaret(caretKey, modelKey) {
//     // get model caretmap
//     const caretIsLeft = caretKey.index < modelKey.index;
//     const direction = caretIsLeft ? DIRECTION.RIGHT : DIRECTION.LEFT;
//     const caretMap = {};
//     const caretModelIndex = caretMap.getModelIndexInDirection(
//       caretKey,
//       direction
//     );
//     const trueModelIndex = caretMap.getModelIndex(modelKey);
//     const leftIndex = caretIsLeft ? caretModelIndex : trueModelIndex;
//     const rightIndex = caretIsLeft ? trueModelIndex : caretModelIndex;
//     const deleteAmount = rightIndex - leftIndex + 1;
//     const accessMethod = 'elements';
//     model[accessMethod].splice(leftIndex, deleteAmount);
//     return model;
//   }

//   /**
//    *
//    * @param {boolean} aIsLeft
//    * @return {Object} new model
//    */
//   function deleteBetweenCaretKeys(aIsLeft) {
//     // get model caretmap
//     const leftKey = aIsLeft ? boxKeyA : boxKeyB;
//     const rightKey = aIsLeft ? boxKeyB : boxKeyA;

//     const caretMap = {};
//     const leftIndex = caretMap.getModelIndexInDirection(
//       leftKey,
//       DIRECTION.RIGHT
//     );
//     const rightIndex = caretMap.getModelIndexInDirection(
//       rightKey,
//       DIRECTION.LEFT
//     );
//     if (leftIndex === -1 || rightIndex === -1) {
//       console.warn('bad carets');
//     }
//     const deleteAmount = rightIndex - leftIndex + 1;
//     const accessMethod = 'elements';
//     model[accessMethod].splice(leftIndex, deleteAmount);
//     return model;
//   }
// }
