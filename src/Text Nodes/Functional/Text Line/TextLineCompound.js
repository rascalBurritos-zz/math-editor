import { CompoundTable } from '../../../Interaction/Tables/nodeTable';
import { getModelIndex, sort } from '../Text Block/TextBlockCompound';
import { getAdditions } from '../Vertical List/VerticalListCompound';
import Rectangle from '../../../Abstract/Rectangle';
import Point from '../../../Abstract/Point';
import { getRelativePositionWithElementIndex } from '../Text Block/TextBlockNode';
import { TEXT_LINE_TYPE } from '../Node Types';
import { getChildViewsFromId } from '../getChildViews';

CompoundTable.register(TEXT_LINE_TYPE, {
  getModelIndex,
  splice,
  merge,
  sort,
  getSelectionRects,
});

/**
 *
 * @param {*} viewCollection
 * @param {*} id
 * @param {*} leftIndexInfo
 * @param {*} rightIndexInfo
 * @return {Array}
 */
function getSelectionRects(viewCollection, id, leftIndexInfo, rightIndexInfo) {
  const leftAdditions = getAdditions(leftIndexInfo);
  let left = 0;
  let right = 0;
  if (leftAdditions.length > 0) {
    left = Math.min(...leftAdditions.map((rect) => rect.origin.left));
  } else {
    left = getRelativePositionWithElementIndex(
      viewCollection,
      id,
      leftIndexInfo.index
    ).left;
  }
  const rightAdditions = getAdditions(rightIndexInfo);
  if (rightAdditions.length > 0) {
    right = Math.max(
      ...rightAdditions.map((rect) => rect.origin.left + rect.width)
    );
  } else {
    const elements = getChildViewsFromId(viewCollection, id);
    right =
      getRelativePositionWithElementIndex(
        viewCollection,
        id,
        rightIndexInfo.index
      ).left + elements[rightIndexInfo.index].metrics.width;
  }
  const cs = viewCollection[id].componentStyle;
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
