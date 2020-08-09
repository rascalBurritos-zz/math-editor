import Rectangle from '../../../Abstract/Rectangle';
import Point from '../../../Abstract/Point';
import { isBound, isLeftBound, isRightBound } from '../BaseModel';
import { CompoundTable } from '../../../Interaction/Tables/nodeTable';
import { TEXT_BLOCK_TYPE } from '../Node Types';
/** @typedef {import('./textBlockViewFactory').TextBlockView} TextBlockView  */

CompoundTable.register(TEXT_BLOCK_TYPE, {
  getModelIndex,
  getSelectionRects,
  splice,
  merge,
  sort,
});

/**
 * @param {TextBlockView} textBlockView
 * @param {Object} leftIndexInfo
 * @param {Object} rightIndexInfo
 * @return {Rectangle[]}
 * NOTE: inclusive, i.e. includes endpoints
 */
function getSelectionRects(textBlockView, leftIndexInfo, rightIndexInfo) {
  const left = textBlockView.elements
    .slice(0, leftIndexInfo.index)
    .reduce((acc, curr) => {
      return acc + curr.metrics.width;
    }, 0);
  const width = textBlockView.elements
    .slice(leftIndexInfo.index, rightIndexInfo.index + 1)
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
export function getInsertIndex(boxKey) {
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
 */
function splice(model, leftIndex, deleteCount, ...toInsert) {
  const contentArray = model.content.split('');
  contentArray.splice(leftIndex, deleteCount, ...toInsert);
  model.content = contentArray.join('');
}

/**
 * @param {Object} modelA
 * @param {Object} modelB
 */
function merge(modelA, modelB) {
  const content = modelA.content.concat(modelB.content);
  modelA.content = content;
}

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
