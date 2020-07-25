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

  let aIsLeft;
  if (
    boxKeyA.outside === DIRECTION.LEFT ||
    boxKeyB.outside === DIRECTION.RIGHT
  ) {
    aIsLeft = true;
  } else if (
    boxKeyA.outside === DIRECTION.RIGHT ||
    boxKeyB.outside === DIRECTION.LEFT
  ) {
    aIsLeft = false;
  } else {
    aIsLeft = boxKeyA.index < boxKeyB.index;
  }
  const leftKey = aIsLeft ? boxKeyA : boxKeyB;
  const rightKey = aIsLeft ? boxKeyB : boxKeyA;

  // left index is to the right of the caret
  // opposites intended, these are indices that
  // must be deleted inclusive
  let leftIndex = getIndex(leftKey, parent, DIRECTION.RIGHT);
  let rightIndex = getIndex(rightKey, parent, DIRECTION.LEFT);

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
      submodel = removeDirectly(newKeychain, boundKeychain, submodel);
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
