import { CompoundTable } from '../Tables/nodeTable';
import manifest, { isNoAction } from '../Selection/manifest';
import { getAdditions } from '../../Text Nodes/Functional/Vertical List/VerticalListCompound';

export const removeBetween = manifest(
  removeAction,
  noAction,
  () => [],
  (bk, m, dir, results) => results
);

/**
 * @param {*} parentModel
 * @param {*} additions
 * @param  {...any} args
 * @return {Object}
 */
function noAction(parentModel, { leftIndexInfo, rightIndexInfo }, ...args) {
  if (arguments.length < 2) {
    throw new Error();
  }
  const parents = addAdditions(leftIndexInfo, rightIndexInfo);
  const neitherNoAction =
    !isNoAction(leftIndexInfo) && !isNoAction(rightIndexInfo);
  if (areMergeable(parents.left, parents.right) && neitherNoAction) {
    for (const [index, leftParentObj] of parents.left.entries()) {
      const leftParent = leftParentObj.parentModel;
      const rightParent = parents.right[index].parentModel;
      const compound = CompoundTable.retrieve(leftParent.type);
      compound.merge(leftParent, rightParent);
      if (index + 1 < parents.left.length) {
        const leftIndex = parents.right[index + 1].leftIndexInfo.index;
        const gp = parents.right[index + 1].parentModel;
        const gpCompound = CompoundTable.retrieve(gp.type);
        gpCompound.splice(gp, leftIndex, 1);
      }
    }
    const compound = CompoundTable.retrieve(parentModel.type);
    compound.splice(parentModel, leftIndexInfo.index, 1);
  }
  return [...parents.deep, { parentModel, leftIndexInfo, rightIndexInfo }];
  // need to merge if neither are bounds
}

/**
 *
 * @param {*} param0
 * @param {*} param1
 * @param {*} parentModel
 * @return {*} parentModel
 */
function removeAction(
  { leftIndexInfo, leftKeychain },
  { rightIndexInfo, rightKeychain },
  parentModel
) {
  const compound = CompoundTable.retrieve(parentModel.type);
  const parents = addAdditions(leftIndexInfo, rightIndexInfo);
  if (areMergeable(parents.left, parents.right)) {
    console.log('merged');
    for (const [index, leftParentObj] of parents.left.entries()) {
      const leftParent = leftParentObj.parentModel;
      const rightParent = parents.right[index].parentModel;
      const compound = CompoundTable.retrieve(leftParent.type);
      compound.merge(leftParent, rightParent);
      if (index + 1 < parents.left.length) {
        const leftIndex = parents.right[index + 1].leftIndexInfo.index;
        const gp = parents.right[index + 1].parentModel;
        const gpCompound = CompoundTable.retrieve(gp.type);
        gpCompound.splice(gp, leftIndex, 1);
      }
    }
    const deleteCount = rightIndexInfo.index - leftIndexInfo.index + 2;
    compound.splice(parentModel, leftIndexInfo.index, deleteCount);
  } else {
    const deleteCount = rightIndexInfo.index - leftIndexInfo.index + 1;
    compound.splice(parentModel, leftIndexInfo.index, deleteCount);
  }
  return [...parents.deep, { parentModel, leftIndexInfo, rightIndexInfo }];
}
/**
 * @param {Object} parentChainA
 * @param {Object} parentChainB
 * @return {boolean}
 */
function areMergeable(parentChainA, parentChainB) {
  if (parentChainA.length !== parentChainB.length || parentChainB.length < 1) {
    return false;
  }
  for (const [index, parentAObj] of parentChainA.entries()) {
    const parentA = parentAObj.parentModel;
    const parentB = parentChainB[index].parentModel;
    if (parentA.type !== parentB.type) {
      return false;
    }
  }
  return true;
}

/**
 * @param {*} leftInfo
 * @param {*} rightInfo
 * @return {Object}
 */
function addAdditions(leftInfo, rightInfo) {
  const leftAdditions = getAdditions(leftInfo);
  const rightAdditions = getAdditions(rightInfo);
  return getParents(leftAdditions, rightAdditions);
}
/**
 *
 * @param {*} leftAdditions
 * @param {*} rightAdditions
 * @return {Object}
 */
function getParents(leftAdditions, rightAdditions) {
  const deep =
    leftAdditions.length > rightAdditions.length
      ? leftAdditions
      : rightAdditions;
  return {
    left: leftAdditions,
    right: rightAdditions,
    deep,
  };
}
