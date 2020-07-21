import getCaretMap from './getCaretMap';

export const DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  UP: 'UP',
  DOWN: 'DOWN',
};

/**
 * @param {Array} keyChain
 * @param {*} model
 * @param {String} direction TYPE DIRECTION
 * @return {Array} new caret keychain
 */
export default function caretTraverser(keyChain, model, direction) {
  const parentKeyChain = keyChain.slice(0, -1);
  const parent = traverse(model, parentKeyChain);
  const caretMap = getCaretMap(parent);
  const caretKey = keyChain[keyChain.length - 1];
  const boxKey = caretMap.getBoxInDirection(direction, caretKey);
  if (caretMap.isBound(boxKey)) {
    if (parent === model) {
      const safeDirection = oppositeDirection(direction);
      return caretTraverser([boxKey], model, safeDirection);
    } else {
      return caretTraverser(parentKeyChain, model, direction);
    }
    // step out
  } else if (direction === DIRECTION.UP || direction === DIRECTION.DOWN) {
    return [...parentKeyChain, boxKey];
  } else if (!boxKey.isCaret) {
    // opposites intended
    const finalBoxKey =
      direction == DIRECTION.LEFT ? caretMap.BOUND_RIGHT : caretMap.BOUND_LEFT;
    const newKeyChain = [...parentKeyChain, boxKey, finalBoxKey];
    return caretTraverser(newKeyChain, model, direction);
  } else {
    return [...parentKeyChain, boxKey];
  }

  /**
   *
   * @param {String} direction
   * @return {String} opposite direction
   */
  function oppositeDirection(direction) {
    return direction === DIRECTION.LEFT ? DIRECTION.RIGHT : DIRECTION.LEFT;
  }
}

/**
 *
 * @param {Object} model
 * @param {Array} keychain
 * @return {Object}
 */
export function traverse(model, keychain) {
  const p = keychain.reduce((submodel, boxKey) => {
    return boxKey.modelAccess.reduce((partition, curr) => {
      return partition[curr];
    }, submodel);
  }, model);
  return p;
}
