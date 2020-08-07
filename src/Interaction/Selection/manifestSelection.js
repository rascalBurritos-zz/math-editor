import manifest from './manifest';
import { CompoundTable, NodeTable } from '../Tables/nodeTable';
import { traverse } from '../Access/access';
/** @typedef {import('../../Abstract/Rectangle').default} Rectangle  */

export const manifestSelection = manifest(
  selectionAction,
  noAction,
  getNewParentView,
  normalizeRectangles
);

/**
 *
 * @param {*} param0
 * @param {*} param1
 * @param {*} parentModel
 * @param {*} parentView
 * @return {Rectangle[]}
 */
function selectionAction(
  { leftIndexInfo },
  { rightIndexInfo },
  parentModel,
  parentView
) {
  const compound = CompoundTable.retrieve(parentModel.type);
  const rects = compound.getSelectionRects(
    parentView,
    leftIndexInfo,
    rightIndexInfo
  );
  expandRects(parentView, rects);
  return rects;
}

/**
 *
 * @param {*} parentView
 * @param {*} rects
 */
function expandRects(parentView, rects) {
  const node = NodeTable.retrieve(parentView.type);
  if ('expandSelection' in node) {
    console.log(rects);
    node.expandSelection(parentView, rects);
  }
}

/**
 * @param  {...any} additions
 * @return {Array}
 */
function noAction(...additions) {
  const sum = [];
  for (const add of additions) {
    sum.push(...add);
  }
  return sum;
}
/**
 *
 * @param {*} boxKey
 * @param {*} model
 * @param {*} direction
 * @param {*} results
 * @param {*} parentView
 * @return {Rectangle[]}
 */
function normalizeRectangles(boxKey, model, direction, results, parentView) {
  const node = NodeTable.retrieve(model.type);
  const relativePos = node.getRelativePositionOfBox(parentView, boxKey);
  for (const rect of results) {
    rect.addToOrigin(relativePos);
  }
  return results;
}

/**
 *
 * @param {*} boxKey
 * @param {*} parentModel
 * @param {*} parentView
 * @return {Object}
 */
function getNewParentView(boxKey, parentModel, parentView) {
  const subView = traverse(parentView, [boxKey], true);
  return [subView];
}