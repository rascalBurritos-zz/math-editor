import { CompoundTable } from '../Tables/nodeTable';
import { isBound } from '../../Text Nodes/Functional/BaseModel';
import { getSubItem } from '../Access/access';
import manifest from '../Selection/manifest';

export const removeBetween = manifest(
  removeAction,
  () => [],
  (bk, m, dir, results) => results
);

/**
 *
 * @param {*} param0
 * @param {*} param1
 * @param {*} parentModel
 * @return {Object} new Model
 */
function removeAction(
  { leftIndexInfo, leftKeychain },
  { rightIndexInfo, rightKeychain },
  parentModel
) {
  const compound = CompoundTable.retrieve(parentModel.type);
  let currentModel = addAdditions(parentModel, leftIndexInfo);
  currentModel = addAdditions(currentModel, rightIndexInfo);

  if (areMergeable(currentModel, leftIndexInfo.boxKey, rightIndexInfo.boxKey)) {
    const minLength = Math.min(leftKeychain.length, rightKeychain.length);
    for (
      let index = 0;
      index < minLength &&
      areMergeable(currentModel, leftKeychain[index], rightKeychain[index]);
      index++
    ) {
      const compound = CompoundTable.retrieve(currentModel.type);
      const { box: leftBox, index: leftBoxIndex } = getBox(
        leftKeychain[index],
        currentModel,
        compound
      );
      const { box: rightBox, index: rightBoxIndex } = getBox(
        leftKeychain[index],
        currentModel,
        compound
      );
      const subCompound = CompoundTable.retrieve(leftBox.type);
      const comboBox = subCompound.merge(leftBox, rightBox);
      const deleteCount = rightBoxIndex - leftBoxIndex + 1;
      return compound.splice(currentModel, leftBoxIndex, deleteCount, comboBox);
    }
  } else {
    const deleteCount = rightIndexInfo.index - leftIndexInfo.index + 1;
    return compound.splice(currentModel, leftIndexInfo.index, deleteCount);
  }

  /**
   * @param {*} key
   * @param {*} model
   * @param {*} compound
   * @return {Object}
   */
  function getBox(key, model, compound) {
    const index = compound.getModelIndex(key);
    const box = getSubItem(model, key, false);
    return { box, index };
  }

  /**
   * @param {Object} model
   * @param {Object} indexInfo
   * @return {Object}
   */
  function addAdditions(model, indexInfo) {
    if (indexInfo.additions === undefined) {
      return model;
    }
    const compound = CompoundTable.retrieve(model.type);
    const index = compound.getModelIndex(indexInfo.boxKey);
    const x = compound.splice(model, index, 1, indexInfo.additions);
    return x;
  }

  /**
   * @param {Object} model
   * @param {Object} leftKey
   * @param {Object} rightKey
   * @return {boolean}
   */
  function areMergeable(model, leftKey, rightKey) {
    if (!isCompositeKey(leftKey) || !isCompositeKey(rightKey)) {
      return false;
    }
    const leftBoxModel = getSubItem(model, leftKey, false);
    const rightBoxModel = getSubItem(model, rightKey, false);
    return leftBoxModel.type === rightBoxModel.type;
  }
  /**
   * @param {Object} boxKey
   * @return {boolean}
   */
  function isCompositeKey(boxKey) {
    return boxKey !== undefined && !boxKey.isCaret && !isBound(boxKey);
  }
}
