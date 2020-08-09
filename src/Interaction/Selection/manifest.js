import { AtomTable, NodeTable, CompoundTable } from '../Tables/nodeTable';
import { isBound, boundGenerator } from '../../Text Nodes/Functional/BaseModel';
import { traverse, getSubItem } from '../Access/access';
import { DIRECTION } from '../Tables/direction';
import { oppositeDirection } from '../Movement/movement';
import { boxKeyEquals } from '../Access/keychain';
import { getAdditions } from '../../Text Nodes/Functional/Vertical List/VerticalListCompound';

export const NO_ACTION = 'No Action';
/**
 * @param {any} item
 * @return {boolean}
 */
export function isNoAction(item) {
  return item === NO_ACTION;
}

/**
 * @param {Function} action
 * @param {Function} noAction
 * @param {Function} getNewArgs
 * @param {Function} normalize
 * @return {Function}
 */
export default function manifest(action, noAction, getNewArgs, normalize) {
  /**
   *
   * @param {Array} keychainA
   * @param {Array} keychainB
   * @param {Object} parentModel
   * @param {...any} args
   * @return {Object}
   */
  return function getBetween(keychainA, keychainB, parentModel, ...args) {
    if (keychainA === [] || keychainB === []) console.warn('bad array');
    const boxKeyA = keychainA[0];
    const boxKeyB = keychainB[0];
    const compound = CompoundTable.retrieve(parentModel.type);
    if (boxKeyEquals(boxKeyA, boxKeyB)) {
      if (boxKeyA.isCaret) {
        return noAction(parentModel, { leftIndexInfo: {}, rightIndexInfo: {} });
      }
      const subModel = getSubItem(parentModel, boxKeyA, false);
      if (isAtomic(subModel)) {
        const index = compound.getModelIndex(boxKeyA);
        return action(
          { index, keychainA },
          { index, keychainB },
          parentModel,
          ...args
        );
      }
      const newArgs = getNewArgs(boxKeyA, parentModel);
      return getBetween(
        keychainA.slice(1),
        keychainB.slice(1),
        subModel,
        ...newArgs
      );
    }
    const { leftKey, rightKey } = compound.sort(boxKeyA, boxKeyB);
    const leftIndexInfo = getIndex(leftKey, parentModel, DIRECTION.RIGHT);
    const rightIndexInfo = getIndex(rightKey, parentModel, DIRECTION.LEFT);
    if (
      isNoAction(leftIndexInfo.index) ||
      isNoAction(rightIndexInfo.index) ||
      leftIndexInfo.index > rightIndexInfo.index
    ) {
      return noAction(parentModel, { leftIndexInfo, rightIndexInfo }, ...args);
    }
    const { leftKeychain, rightKeychain } = sortKeychains(
      leftKey,
      keychainA,
      keychainB
    );

    const result = action(
      { leftIndexInfo, leftKeychain },
      { rightIndexInfo, rightKeychain },
      parentModel,
      ...args
    );
    return result;

    /**
     * @param {Object} boxKey
     * @param {Object} model
     * @param {String} direction
     * @return {Object}
     */
    function getIndex(boxKey, model, direction) {
      const indexFunc =
        isBound(boxKey) || boxKey.isCaret ? notCompositeIndex : boxIndex;
      return indexFunc(boxKey, model, direction);
    }

    /**
     * @param {Object} leftKey
     * @param {Array} keychainA
     * @param {Array} keychainB
     * @return {Object}
     */
    function sortKeychains(leftKey, keychainA, keychainB) {
      const aIsLeft = keychainA[0] === leftKey;
      const leftKeychain = aIsLeft ? keychainA : keychainB;
      const rightKeychain = aIsLeft ? keychainB : keychainA;
      return { leftKeychain, rightKeychain };
    }

    /**
     * @param {Object} boxKey
     * @param {Object} model
     * @param {String} direction
     * @return {String | number}
     */
    function getModelIndexInDirection(boxKey, model, direction) {
      const node = NodeTable.retrieve(model.type);
      const compound = CompoundTable.retrieve(model.type);
      let newBoxKey = boxKey;
      let done = false;
      // let done = !newBoxKey.isCaret;
      while (!done) {
        newBoxKey = node.nextItem(model, newBoxKey, direction);
        done = !newBoxKey.isCaret;
      }
      if (isBound(newBoxKey)) {
        if (!boxKey.isCaret) {
          // this should only occur when the
          //  other index is also equal to this box key
          return NO_ACTION;
        } else {
          console.log('model index in direction of outside with caret');
          return NO_ACTION;
        }
      } else {
        return compound.getModelIndex(newBoxKey);
      }
    }

    /**
     *
     * @param {*} boxKey
     * @param {*} model
     * @param {*} direction
     * @return {Object}
     */
    function notCompositeIndex(boxKey, model, direction) {
      return { index: getModelIndexInDirection(boxKey, model, direction) };
    }

    /**
     *
     * @param {*} boxKey
     * @param {*} model
     * @param {*} direction
     * @return {Object}
     */
    function boxIndex(boxKey, model, direction) {
      const submodel = getSubItem(model, boxKey, false);
      if (isAtomic(submodel)) {
        const compound = CompoundTable.retrieve(model.type);
        return {
          index: compound.getModelIndex(boxKey),
        };
      } else {
        const isA = boxKey === keychainA[0];
        const newKeychain = isA ? keychainA.slice(1) : keychainB.slice(1);
        const node = NodeTable.retrieve(submodel.type);
        const boundKeychain = [
          node.nextItem(
            submodel,
            boundGenerator(direction)(),
            oppositeDirection(direction)
          ),
        ];
        const subModel = traverse(model, [boxKey], false);
        const newArgs = getNewArgs(boxKey, model, ...args);
        const newResults = getBetween(
          newKeychain,
          boundKeychain,
          subModel,
          ...newArgs
        );
        const additions = normalize(
          boxKey,
          model,
          direction,
          newResults,
          ...args
        );
        return {
          index: getModelIndexInDirection(boxKey, model, direction),
          additions,
          boxKey,
        };
      }
    }
  };
}

/**
 * @param {Object} model
 * @return {boolean}
 */
function isAtomic(model) {
  return AtomTable.isAtom(model.type);
}
