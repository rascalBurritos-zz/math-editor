import CaretMap from './CaretMap';

export default class TextBlockCaretMap extends CaretMap {
  /**
   *
   * @param {Object} info
   */
  constructor(info) {
    super();
    this.numElements = info.numElements;
  }

  /**
   * @param {String} direction
   * @param {Object} boxKey
   * @return {*}
   */
  nextItemOnCaretPath(direction, boxKey) {
    let done = false;
    let nextItem = boxKey;
    while (!done) {
      nextItem = this.nextItem(direction, nextItem);
      done = this.isBound(nextItem) || nextItem.isCaret;
    }
    return nextItem;
  }

  /**
   *
   * @param {Object} boxKey
   * @return {number}
   */
  getModelIndex(boxKey) {
    if ('outside' in boxKey) {
      console.log('invalid model index');
    } else if (boxKey.isCaret) {
      console.log('Cannot get model index of caret');
    }
    return Math.floor(boxKey.index / 2);
  }

  /**
   * @param {Object} boxKey
   * @return {Object} new Box key
   */
  getUp(boxKey) {
    if (this.isDownBound(boxKey)) {
      return this.finalize(this.minIndex);
    }
    return this.BOUND_UP;
  }
  /**
   * @param {Object} boxKey
   * @return {Object} new Box key
   */
  getDown(boxKey) {
    if (this.isUpBound(boxKey)) {
      return this.finalize(this.minIndex);
    }
    return this.BOUND_DOWN;
  }
  /**
   * @param {Object} boxKey
   * @return {Object} new Box key
   */
  getRight(boxKey) {
    const safeKey = this.convertBounds(boxKey);
    const index = safeKey.index + 1;
    return this.finalize(index);
  }
  /**
   * @param {Object} boxKey
   * @return {Object} new Box key
   */
  getLeft(boxKey) {
    const safeKey = this.convertBounds(boxKey);
    const index = safeKey.index - 1;
    return this.finalize(index);
  }

  /**
   * @param {*} boxKey
   * @return {Object}
   */
  convertBounds(boxKey) {
    const newKey = {};
    if (this.isLeftBound(boxKey)) {
      newKey.index = this.minIndex - 1;
    } else if (this.isRightBound(boxKey)) {
      newKey.index = this.maxIndex + 1;
    } else {
      newKey.index = boxKey.index;
    }
    return newKey;
  }

  /**
   * @return {number}
   */
  get minIndex() {
    return 0;
  }

  /**
   * @return {number}
   */
  get maxIndex() {
    return this.numElements * 2 + 1;
  }

  /**
   * @param {number} num
   * @return {Object}
   */
  finalize(num) {
    if (num < this.minIndex) {
      return this.BOUND_LEFT;
    } else if (num > this.maxIndex) {
      return this.BOUND_RIGHT;
    } else {
      const isCaret = num % 2 === 0;
      return { isCaret, index: num };
    }
  }
}
