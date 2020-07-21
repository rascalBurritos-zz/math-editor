import { DIRECTION } from './caretTraverser';

export default class CaretMap {
  /**
   *
   */
  constructor() {
    this.BOUND_LEFT = { outside: 'Left' };
    this.BOUND_RIGHT = { outside: 'Right' };
    this.BOUND_UP = { outside: 'Up' };
    this.BOUND_DOWN = { outside: 'Down' };
    this.isRightBound = this.isBoundGenerator(this.BOUND_RIGHT);
    this.isLeftBound = this.isBoundGenerator(this.BOUND_LEFT);
    this.isUpBound = this.isBoundGenerator(this.BOUND_UP);
    this.isDownBound = this.isBoundGenerator(this.BOUND_DOWN);
  }

  /**
   *
   * @param {Object} key
   * @return {boolean}
   */
  isBound(key) {
    return (
      this.isRightBound(key) ||
      this.isLeftBound(key) ||
      this.isUpBound(key) ||
      this.isDownBound(key)
    );
  }

  /**
   *
   * @param {Object} bound
   * @return {Function}
   */
  isBoundGenerator(bound) {
    return (key) => {
      if (typeof key === 'object') {
        return key.outside === bound.outside;
      } else {
        return false;
      }
    };
  }

  /**
   * @param {String} direction
   * @param {Object} boxKey
   * @return {*}
   */
  getBoxInDirection(direction, boxKey) {
    switch (direction) {
      case DIRECTION.RIGHT:
        return this.getRight(boxKey);
      case DIRECTION.LEFT:
        return this.getLeft(boxKey);
      case DIRECTION.UP:
        return this.getUp(boxKey);
      case DIRECTION.DOWN:
        return this.getDown(boxKey);
      default:
        return;
    }
  }

  /**
   * @abstract
   * @param {Object} boxKey
   */
  getRight(boxKey) {}
  /**
   * @abstract
   * @param {Object} boxKey
   */
  getLeft(boxKey) {}
  /**
   * @abstract
   * @param {Object} boxKey
   */
  getUp(boxKey) {}
  /**
   * @abstract
   * @param {Object} boxKey
   */
  getDown(boxKey) {}
}
