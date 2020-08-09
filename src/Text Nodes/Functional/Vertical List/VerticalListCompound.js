import Rectangle from '../../../Abstract/Rectangle';
import Point from '../../../Abstract/Point';
import { isBound } from '../BaseModel';
import { CompoundTable } from '../../../Interaction/Tables/nodeTable';
import { sort } from '../Text Block/TextBlockCompound';
import { VERTICAL_LIST_TYPE } from '../Node Types';
import { getChildViewsFromId } from '../getChildViews';
/** @typedef {import('./VerticalListViewFactory').VerticalListView} VerticalListView  */

CompoundTable.register(VERTICAL_LIST_TYPE, {
  getSelectionRects,
  getModelIndex,
  splice,
  merge,
  sort,
});

/**
 * @param {*} viewCollection
 * @param {*} id
 * @param {Object} leftIndexInfo
 * @param {Object} rightIndexInfo
 * @return {Rectangle[]}
 * NOTE: inclusive, i.e. includes endpoints
 */
function getSelectionRects(viewCollection, id, leftIndexInfo, rightIndexInfo) {
  const leftIndex = leftIndexInfo.index;
  const rightIndex = rightIndexInfo.index;
  const elements = getChildViewsFromId(viewCollection, id);
  const top = elements.slice(0, leftIndex).reduce((acc, element) => {
    const cs = element.componentStyle;
    return acc + cs.heigth + cs.marginBottom;
  }, 0);
  const height = elements
    .slice(leftIndex, rightIndex + 1)
    .reduce((acc, element) => {
      const marginBottom = element.componentStyle.marginBottom;
      return acc + element.metrics.height + marginBottom;
    }, 0);
  const left = 0;
  const width = viewCollection[id].metrics.width;
  const leftAdditions = getAdditions(leftIndexInfo);
  const rightAdditions = getAdditions(rightIndexInfo);
  return [
    ...leftAdditions,
    new Rectangle(new Point(top, left), height, width),
    ...rightAdditions,
  ];
}

/**
 * @param {Object} indexInfo
 * @return {Array}
 */
export function getAdditions(indexInfo) {
  const add = indexInfo.additions;
  return add ? add : [];
}

/**
 *
 * @param {Object} boxKey
 * @return {number}
 */
function getModelIndex(boxKey) {
  if (isBound(boxKey)) {
    console.log('invalid model index');
  }
  return boxKey.index;
}

/**
 *
 * @param {Object} model
 * @param {number} leftIndex
 * @param {number} deleteCount
 * @param  {...any} toInsert
 */
export function splice(model, leftIndex, deleteCount, ...toInsert) {
  model.elements.splice(leftIndex, deleteCount, ...toInsert);
}

/**
 * @param {Object} modelA
 * @param {Object} modelB
 */
export function merge(modelA, modelB) {
  const elements = modelA.elements.concat(modelB.elements);
  modelA.elements = elements;
}
