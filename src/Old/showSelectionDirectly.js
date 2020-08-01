import { traverse } from '../Interaction/Access/access';
import { DIRECTION } from '../Interaction/Movement/movement';
import { NodeTable, CompoundTable } from '../Interaction/Tables/nodeTable';
/** @typedef {import('../Abstract/Rectangle').default} Rectangle */

/**
 *
 * @param {Object} keychainA
 * @param {Object} keychainB
 * @param {Object} parentView
 * @param {Object} model
 * @return {Rectangle[]}
 */
export default function showSelectionDirectly(
  keychainA,
  keychainB,
  parentView,
  parentModel
) {
  if (keychainA === [] || keychainB === []) console.warn('bad selection');
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

  const currentRectangles = [];
  let leftIndex = getIndex(leftKey, parentModel, DIRECTION.RIGHT);
  let rightIndex = getIndex(rightKey, parentModel, DIRECTION.LEFT);

  if (leftIndex === 'No Delete' || rightIndex === 'No Delete') {
    return [];
  } else {
    leftIndex = Number(leftIndex);
    rightIndex = Number(rightIndex);
  }
  const newRectangles = parentView.getSelectionRects(leftIndex, rightIndex);
  currentRectangles.push(...newRectangles);
  return currentRectangles;

  /**
   *
   * @param {Object} boxKey
   * @param {Object} view
   * @param {String} direction
   * @return {number | String}
   */
  function getIndex(boxKey, view, direction) {
    const singleKeyMap = {
      Caret: caretIndex,
      Box: boxIndex,
      Bound: boundIndex,
    };
    const type = determineType(boxKey);
    return singleKeyMap[type](boxKey, view, direction);
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
   * @param {Object} view
   * @param {String} direction
   * @return {String | number}
   * Requires Caret maps to implement getModelIndex method
   */
  function getModelIndexInDirection(boxKey, view, direction) {
    const node = NodeTable.retrieve(view.type);
    const compound = CompoundTable.retrieve(view.type);
    let newBoxKey = boxKey;
    let done = false;

    while (!done) {
      newBoxKey = node.nextItem(view, direction, newBoxKey);
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
   * @param {*} view
   * @param {*} direction
   * @return {String | number}
   */
  function caretIndex(boxKey, view, direction) {
    return getModelIndexInDirection(boxKey, view, direction);
  }

  /**
   *
   * @param {*} boxKey
   * @param {*} view
   * @param {*} direction
   * @return {String | number}
   */
  function boxIndex(boxKey, view, direction) {
    // const subView = traverse(view, [boxKey], true);
    if (isAtomic(subView)) {
      const caretMap = getCaretMap(view, true);
      return caretMap.getModelIndex(boxKey);
    } else {
      const isA = boxKey === keychainA[0];
      const newKeychain = isA ? keychainA.slice(1) : keychainB.slice(1);
      const subCaretMap = getCaretMap(subView, true);
      const boundDirection =
        direction === DIRECTION.LEFT ? 'BOUND_LEFT' : 'BOUND_RIGHT';
      const boundKeychain = [subCaretMap[boundDirection]];
      let additionalRects = showSelectionDirectly(
        newKeychain,
        boundKeychain,
        subView
      );
      const relativePos = view.getRelativePositionOfBehavior(subView);
      additionalRects = additionalRects.map((rect) => {
        return rect.addToOrigin(relativePos);
      });
      currentRectangles.push(...additionalRects);
      return getModelIndexInDirection(boxKey, view, direction);
    }

    /**
     * @param {Object} view
     * @return {boolean}
     */
    function isAtomic(view) {
      const compounds = ['Text_Block', 'Vertical_List', 'Formula'];
      return !compounds.includes(view.type);
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
