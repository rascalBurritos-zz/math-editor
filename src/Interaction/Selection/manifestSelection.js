import manifest, { isNoAction } from './manifest';
import { CompoundTable } from '../Tables/nodeTable';
import { traverse } from '../Access/access';
/** @typedef {import('../../Abstract/Rectangle').default} Rectangle  */

export const manifestSelection = manifest(selectionAction, getNewParentView, {
  accumDefaultValue: [],
  mergeAccumulator: mergeRectangleArray,
});

/**
 *
 * @param {*} param0
 * @param {*} param1
 * @param {*} parentModel
 * @param {*} parentView
 * @return {Rectangle[]}
 */
function selectionAction(
  { leftIndex },
  { rightIndex },
  parentModel,
  parentView
) {
  const currentRectangles = [];
  if (isNoAction(leftIndex) || isNoAction(rightIndex)) {
    return [];
  }
  const compound = CompoundTable.retrieve(parentModel.type);
  const newRectangles = compound.getSelectionRects(
    parentView,
    leftIndex,
    rightIndex
  );
  currentRectangles.push(...newRectangles);
  return currentRectangles;
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
  return subView;
}

/**
 * @param {Rectangle[]} groupA
 * @param {Rectangle[]} groupB
 * @return {Rectangle[]}
 */
function mergeRectangleArray(groupA, groupB) {
  return groupA.concat(groupB);
}
