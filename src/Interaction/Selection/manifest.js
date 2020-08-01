import { CompoundTable, NodeTable } from '../Tables/nodeTable';
import { DIRECTION } from '../Movement/movement';
import { isBound, boundGenerator } from '../../Text Nodes/Functional/BaseModel';
import { traverse } from '../Access/access';

export const NO_ACTION = 'No Action';
/**
 * @param {any} item
 * @return {boolean}
 */
export function isNoAction(item) {
  return item !== NO_ACTION;
}

/**
 * @param {Function} action
 * @param {Function} getNewArgs
 * @return {Function}
 */
export default function manifest(
  action,
  getNewArgs,
  { accumDefaultValue, mergeAccumulator }
) {
  /**
   *
   * @param {Array} keychainA
   * @param {Array} keychainB
   * @param {Object} parentModel
   * @param {...any} args
   * @return {Object}
   */
  return function getBetween(keychainA, keychainB, parentModel, ...args) {
    if (keychainA === [] || keychainB === []) console.warn('bad array');
    const boxKeyA = keychainA[0];
    const boxKeyB = keychainB[0];
    const compound = CompoundTable.retrieve(parentModel.type);
    const { leftKey, rightKey } = compound.sort(boxKeyA, boxKeyB);
    let accumulator = accumDefaultValue;
    const leftIndex = getIndex(leftKey, parent, DIRECTION.RIGHT);
    const rightIndex = getIndex(rightKey, parent, DIRECTION.LEFT);
    return action(
      { leftIndex, leftKey },
      { rightIndex, rightKey },
      parentModel,
      ...args
    );

    /**
     * @param {Object} boxKey
     * @param {Object} model
     * @param {String} direction
     * @return {number | String}
     */
    function getIndex(boxKey, model, direction) {
      const indexFunc =
        isBound(boxKey) || boxKey.isCaret ? getModelIndexInDirection : boxIndex;
      return indexFunc(boxKey, model, direction);
    }

    /**
     * @param {Object} boxKey
     * @param {Object} model
     * @param {String} direction
     * @return {String | number}
     * Requires Caret maps to implement getModelIndex method
     */
    function getModelIndexInDirection(boxKey, model, direction) {
      const node = NodeTable.retrieve(model.type);
      const compound = CompoundTable.retrieve(model.type);
      let newBoxKey = boxKey;
      let done = false;
      while (!done) {
        newBoxKey = node.nextItem(model, newBoxKey, direction);
        done = !newBoxKey.isCaret;
      }
      if (isBound(newBoxKey)) {
        return NO_ACTION;
      } else {
        return compound.getModelIndex(newBoxKey);
      }
    }

    /**
     *
     * @param {*} boxKey
     * @param {*} model
     * @param {*} direction
     * @return {String | number}
     */
    function boxIndex(boxKey, model, direction) {
      const submodel = traverse(model, [boxKey], false);
      if (isAtomic(submodel)) {
        const compound = CompoundTable.retrieve(model.type);
        return compound.getModelIndex(boxKey);
      } else {
        const isA = boxKey === keychainA[0];
        const newKeychain = isA ? keychainA.slice(1) : keychainB.slice(1);
        const bound = boundGenerator(direction);
        const boundKeychain = [bound];
        const newArgs = getNewArgs(boxKey, model, direction, ...args);
        accumulator = mergeAccumulator(
          accumulator,
          getBetween(newKeychain, boundKeychain, submodel, ...newArgs)
        );
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
  };
}

// /**
//  * @return {Object}
//  */
// function testRemove({ leftIndex, leftKey }, { rightIndex, rightKey }, parent) {
//   if (leftIndex === 'No Delete' || rightIndex === 'No Delete') {
//     return parent;
//   } else {
//     leftIndex = Number(leftIndex);
//     rightIndex = Number(rightIndex);
//   }
//   const parentElementAccess = getAccessMap(parent.type, false);
//   const deleteCount = rightIndex - leftIndex + 1;
//   if (boxKeyA.type === boxKeyB.type && determineType(boxKeyA) === 'Box') {
//     // only top level merge... may expand if actual uses
//     const leftSubModel = traverse(parent, [leftKey], false);
//     const rightSubModel = traverse(parent, [rightKey], false);
//     const leftAccess = getAccessMap(leftSubModel.type, false);
//     const rightAccess = getAccessMap(rightSubModel.type, false);
//     const leftGroup = leftSubModel[leftAccess];
//     const rightGroup = rightSubModel[rightAccess];
//     const comboGroup = joinAlikeCompoundModels(leftGroup, rightGroup);
//     leftSubModel[leftAccess] = comboGroup;
//     removeFromCompoundModels(
//       parent,
//       parentElementAccess,
//       leftIndex,
//       deleteCount + 1
//     );
//   } else {
//     removeFromCompoundModels(
//       parent,
//       parentElementAccess,
//       leftIndex,
//       deleteCount
//     );
//   }
//   return parent;
// }
