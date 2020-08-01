import { DIRECTION } from '../../Interaction/Tables/direction';

export const getBoundLeft = boundGenerator(DIRECTION.LEFT);
export const getBoundRight = boundGenerator(DIRECTION.RIGHT);
export const getBoundUp = boundGenerator(DIRECTION.UP);
export const getBoundDown = boundGenerator(DIRECTION.DOWN);

/**
 * @param {String} direction
 * @return {Function}
 */
export function boundGenerator(direction) {
  return () => {
    return { outside: direction };
  };
}

export const isRightBound = isBoundGenerator(getBoundRight());
export const isLeftBound = isBoundGenerator(getBoundLeft());
export const isUpBound = isBoundGenerator(getBoundUp());
export const isDownBound = isBoundGenerator(getBoundDown());
/**
 *
 * @param {Object} bound
 * @return {Function}
 */
function isBoundGenerator(bound) {
  return (key) => {
    if (typeof key === 'object') {
      return key.outside === bound.outside;
    } else {
      return false;
    }
  };
}
/**
 *
 * @param {Object} key
 * @return {boolean}
 */
export function isBound(key) {
  return (
    isRightBound(key) || isLeftBound(key) || isUpBound(key) || isDownBound(key)
  );
}

/**
 * @param {Object} obj
 * @param {Function} obj.getRight
 * @param {Function} obj.getLeft
 * @param {Function} obj.getUp
 * @param {Function} obj.getDown
 * @return {*}
 */
export function nextItemGenerator({ getRight, getLeft, getUp, getDown }) {
  return (model, boxKey, direction) => {
    switch (direction) {
      case DIRECTION.RIGHT:
        return getRight(model, boxKey);
      case DIRECTION.LEFT:
        return getLeft(model, boxKey);
      case DIRECTION.UP:
        return getUp(model, boxKey);
      case DIRECTION.DOWN:
        return getDown(model, boxKey);
      default:
        return;
    }
  };
}
