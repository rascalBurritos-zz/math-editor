import manifest, { isNoAction } from './manifest';
import { CompoundTable, NodeTable } from '../Tables/nodeTable';
import { traverse } from '../Access/access';
/** @typedef {import('../../Abstract/Rectangle').default} Rectangle  */

export const manifestSelection = manifest(
  selectionAction,
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
  if (isNoAction(leftIndexInfo.index) || isNoAction(rightIndexInfo.index)) {
    return [];
  }
  const leftAdditions = getAdditions(leftIndexInfo);
  const rightAdditions = getAdditions(rightIndexInfo);
  const compound = CompoundTable.retrieve(parentModel.type);
  const newRectangles = compound.getSelectionRects(
    parentView,
    leftIndexInfo.index,
    rightIndexInfo.index
  );
  return newRectangles.concat(leftAdditions, rightAdditions);

  /**
   * @param {Object} indexInfo
   * @return {boolean}
   */
  function getAdditions(indexInfo) {
    const add = indexInfo.additions;
    return add ? add : [];
  }
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
  return results.map((rect) => {
    return rect.addToOrigin(relativePos);
  });
}

/**
 *
 * @param {*} boxKey
 * @param {*} parentModel
 * @param {*} direction
 * @param {*} parentView
 * @return {Object}
 */
function getNewParentView(boxKey, parentModel, direction, parentView) {
  const subView = traverse(parentView, [boxKey], true);
  return [subView];
}
