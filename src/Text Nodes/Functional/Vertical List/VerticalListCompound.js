import Rectangle from '../../../Abstract/Rectangle';
import Point from '../../../Abstract/Point';
import { isBound } from '../BaseModel';
import { CompoundTable } from '../../../Interaction/Tables/nodeTable';
import { sort } from '../Text Block/TextBlockCompound';
import { VERTICAL_LIST_TYPE } from './VerticalListViewFactory';
import { getElements } from '../Text Environment/TextEnvCompound';
/** @typedef {import('./VerticalListViewFactory').VerticalListView} VerticalListView  */

CompoundTable.register(VERTICAL_LIST_TYPE, {
  getSelectionRects,
  getModelIndex,
  splice,
  merge,
  sort,
});

/**
 * @param {VerticalListView} view
 * @param {Object} leftIndexInfo
 * @param {Object} rightIndexInfo
 * @return {Rectangle[]}
 * NOTE: inclusive, i.e. includes endpoints
 */
function getSelectionRects(view, leftIndexInfo, rightIndexInfo) {
  const leftIndex = leftIndexInfo.index;
  const rightIndex = rightIndexInfo.index;
  const top = view.elements.slice(0, leftIndex).reduce((acc, element) => {
    const currentMetric = element.metrics;
    const marginBottom = element.componentStyle.marginBottom;
    return acc + currentMetric.height + currentMetric.depth + marginBottom;
  }, 0);
  const height = view.elements
    .slice(leftIndex, rightIndex + 1)
    .reduce((acc, element) => {
      const marginBottom = element.componentStyle.marginBottom;
      return acc + element.metrics.height + marginBottom;
    }, 0);
  const left = 0;
  const width = view.metrics.width;
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
