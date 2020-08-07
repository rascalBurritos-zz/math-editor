import { getCommonAncestorIndex, getCommonAncestor } from '../Access/getCommon';
import { NodeTable, CompoundTable } from '../Tables/nodeTable';
import { keychainsEqual } from '../Access/keychain';
import { isBound } from '../../Text Nodes/Functional/BaseModel';
import { DIRECTION } from '../Tables/direction';
import { oppositeDirection } from '../Movement/movement';

/**
 * @param {Object} model
 * @param {Array} anchorChain
 * @param {Array} focusChain
 * @return {Object}
 */
export default function keychainsToSelection(model, anchorChain, focusChain) {
  if (keychainsEqual(anchorChain, focusChain)) {
    return {
      commonKeychain: anchorChain,
      anchor: anchorChain,
      focus: focusChain,
    };
  }
  // assumption: if keychains are not equal then
  // their common ancestor is not the last element

  const commonIndex = getCommonAncestorIndex(anchorChain, focusChain);
  const commonAncestor = getCommonAncestor(
    model,
    anchorChain,
    commonIndex,
    false
  );
  const commonKeychain = anchorChain.slice(0, commonIndex + 1);
  const compound = CompoundTable.retrieve(model.type);
  let { leftKey, rightKey } = compound.sort(
    anchorChain[commonIndex + 1],
    focusChain[commonIndex + 1]
  );
  leftKey = getNextModelKey(commonAncestor, leftKey, DIRECTION.RIGHT);
  rightKey = getNextModelKey(commonAncestor, rightKey, DIRECTION.LEFT);
  return {
    commonKeychain,
    leftKey,
    rightKey,
    anchor: anchorChain,
    focus: focusChain,
  };

  /**
   * @param {Object} model
   * @param {Object} key
   * @param {String} direction
   * @return {Object}
   */
  function getNextModelKey(model, key, direction) {
    if (isBound(key)) {
      if (key.outside === direction) {
        return getNextModelKey(model, key, oppositeDirection(direction));
      } else {
        const node = NodeTable.retrieve(model.type);
        const newKey = node.nextItem(model, key, direction);
        return getNextModelKey(model, newKey, direction);
      }
    } else if (key.isCaret) {
      const node = NodeTable.retrieve(model.type);
      const newKey = node.nextItem(model, key, direction);
      return getNextModelKey(model, newKey, direction);
    } else {
      return key;
    }
  }
}
