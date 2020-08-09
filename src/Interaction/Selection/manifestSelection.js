import manifest from './manifest';
import { CompoundTable, NodeTable } from '../Tables/nodeTable';
import { getSubItem } from '../Access/access';
import { getAdditions } from '../../Text Nodes/Functional/Vertical List/VerticalListCompound';
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
 * @param {*} viewCollection
 * @return {Rectangle[]}
 */
function selectionAction(
  { leftIndexInfo },
  { rightIndexInfo },
  parentModel,
  parentView,
  viewCollection
) {
  const compound = CompoundTable.retrieve(parentModel.type);
  const rects = compound.getSelectionRects(
    viewCollection,
    parentView.id,
    leftIndexInfo,
    rightIndexInfo
  );
  return rects;
}

/**
 * @param  {Object} parentModel
 * @param  {Object} Object
 * @param  {Object} parentView
 * @param  {Object} viewCollection
 * @return {Array}
 */
function noAction(
  parentModel,
  { leftIndexInfo, rightIndexInfo },
  parentView,
  viewCollection
) {
  const leftAdd = getAdditions(leftIndexInfo);
  const rightAdd = getAdditions(rightIndexInfo);
  return [...leftAdd, ...rightAdd];
}
/**
 *
 * @param {*} boxKey
 * @param {*} model
 * @param {*} direction
 * @param {*} results
 * @param {*} parentView
 * @param {*} viewCollection
 * @return {Rectangle[]}
 */
function normalizeRectangles(
  boxKey,
  model,
  direction,
  results,
  parentView,
  viewCollection
) {
  const node = NodeTable.retrieve(model.type);
  const relativePos = node.getRelativePositionOfBox(
    viewCollection,
    parentView.id,
    boxKey
  );
  if (expandRects(parentView, results)) {
    relativePos.top = 0;
  }
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
 * @param {*} viewCollection
 * @return {Object}
 */
function getNewParentView(boxKey, parentModel, parentView, viewCollection) {
  const subView = getSubItem(parentView, boxKey, viewCollection);
  return [subView, viewCollection];
}

/**
 * @param {*} parentView
 * @param {*} rects
 * @return {boolean}
 */
function expandRects(parentView, rects) {
  const node = NodeTable.retrieve(parentView.type);
  if ('expandSelection' in node) {
    node.expandSelection(parentView, rects);
    return true;
  }
  return false;
}
