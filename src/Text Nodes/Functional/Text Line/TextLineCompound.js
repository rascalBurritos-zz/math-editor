import { CompoundTable } from '../../../Interaction/Tables/nodeTable';
import { TEXT_LINE_TYPE } from './TextLineViewFactory';
import { getModelIndex, sort } from '../Text Block/TextBlockCompound';
import { getAdditions } from '../Vertical List/VerticalListCompound';
import Rectangle from '../../../Abstract/Rectangle';
import Point from '../../../Abstract/Point';
import { getRelativePositionWithElementIndex } from '../Text Block/TextBlockNode';

CompoundTable.register(TEXT_LINE_TYPE, {
  getModelIndex,
  splice,
  merge,
  sort,
  getSelectionRects,
});

/**
 *
 * @param {*} view
 * @param {*} leftIndexInfo
 * @param {*} rightIndexInfo
 * @return {Array}
 */
function getSelectionRects(view, leftIndexInfo, rightIndexInfo) {
  const leftAdditions = getAdditions(leftIndexInfo);
  let left = 0;
  let right = 0;
  if (leftAdditions.length > 0) {
    left = Math.min(...leftAdditions.map((rect) => rect.origin.left));
  } else {
    left = getRelativePositionWithElementIndex(view, leftIndexInfo.index).left;
  }
  const rightAdditions = getAdditions(rightIndexInfo);
  if (rightAdditions.length > 0) {
    right = Math.max(
      ...rightAdditions.map((rect) => rect.origin.left + rect.width)
    );
  } else {
    right =
      getRelativePositionWithElementIndex(view, rightIndexInfo.index).left +
      view.elements[rightIndexInfo.index].metrics.width;
  }
  const cs = view.componentStyle;
  const height = cs.height + cs.marginBottom;
  const width = right - left;
  return [new Rectangle(new Point(0, left), height, width)];
}

/**
 *
 * @param {*} model
 * @param {*} leftIndex
 * @param {*} deleteCount
 * @param  {...any} toInsert
 */
function splice(model, leftIndex, deleteCount, ...toInsert) {
  model.elements.splice(leftIndex, deleteCount, ...toInsert);
}

/**
 *
 * @param {*} modelA
 * @param {*} modelB
 */
function merge(modelA, modelB) {
  modelA.elements = modelA.elements.concat(modelB.elements);
}
