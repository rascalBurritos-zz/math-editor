import Rectangle from '../../../Abstract/Rectangle';
import Point from '../../../Abstract/Point';
import { isBound, isLeftBound, isRightBound } from '../BaseModel';
import { CompoundTable } from '../../../Interaction/Tables/nodeTable';
import { TEXT_BLOCK_TYPE } from './TextBlockNode';
/** @typedef {import('./textBlockViewFactory').TextBlockView} TextBlockView  */

CompoundTable.register(TEXT_BLOCK_TYPE, {
  getInsertIndex,
  getModelIndex,
  getSelectionRects,
  splice,
  retrieve,
  sort,
});

/**
 * @param {TextBlockView} textBlockView
 * @param {number} leftIndex
 * @param {number} rightIndex
 * @return {Rectangle[]}
 * NOTE: inclusive, i.e. includes endpoints
 */
function getSelectionRects(textBlockView, leftIndex, rightIndex) {
  const left = textBlockView.elements
    .slice(0, leftIndex)
    .reduce((acc, curr) => {
      return acc + curr.metrics.width;
    }, 0);
  const width = textBlockView.elements
    .slice(leftIndex, rightIndex + 1)
    .reduce((acc, curr) => {
      return acc + curr.metrics.width;
    }, 0);
  const top = 0;
  const height = textBlockView.metrics.height + textBlockView.metrics.depth;
  return [new Rectangle(new Point(top, left), height, width)];
}

/**
 *
 * @param {Object} boxKey
 * @return {number}
 */
export function getModelIndex(boxKey) {
  if (isBound(boxKey)) {
    console.log('invalid model index');
  } else if (boxKey.isCaret) {
    console.log('Cannot get model index of caret');
  }
  return Math.floor(boxKey.index / 2);
}
/**
 * @param {Object} boxKey
 * @return {number}
 */
function getInsertIndex(boxKey) {
  if (boxKey.isCaret) {
    return boxKey.index / 2;
  } else {
    console.log('Bad box key');
    return;
  }
}

/**
 *
 * @param {Object} model
 * @param {number} leftIndex
 * @param {number} deleteCount
 * @param  {...Object} toInsert
 * @return {String}
 */
function splice(model, leftIndex, deleteCount, ...toInsert) {
  const contentArray = model.contents.split('');
  contentArray.splice(leftIndex, deleteCount, ...toInsert);
  const newContents = contentArray.join('');
  return newContents;
}

/**
 *
 * @param {Object} model
 * @param {number} leftIndex
 * @param {number} rightIndex
 */
function retrieve(model, leftIndex, rightIndex) {}

/**
 * @param {Object} boxKeyA
 * @param {Object} boxKeyB
 * @return { Object}}
 */
export function sort(boxKeyA, boxKeyB) {
  let aIsLeft;
  if (isLeftBound(boxKeyA) || isRightBound(boxKeyB)) {
    aIsLeft = true;
  } else if (isRightBound(boxKeyA) || isLeftBound(boxKeyB)) {
    aIsLeft = false;
  } else {
    aIsLeft = boxKeyA.index < boxKeyB.index;
  }
  const leftKey = aIsLeft ? boxKeyA : boxKeyB;
  const rightKey = aIsLeft ? boxKeyB : boxKeyA;
  return { leftKey, rightKey };
}
