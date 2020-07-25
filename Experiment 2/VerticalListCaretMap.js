import CaretMap from './CaretMap';

export default class VerticalListCaretMap extends CaretMap {
  /**
   * @param {Object} info
   */
  constructor(info) {
    super();
    this.numElements = info.numElements;
  }

  /**
   *
   * @param {Object} boxKey
   * @return {number}
   */
  getModelIndex(boxKey) {
    if ('outside' in boxKey) {
      console.warn('invalid model index');
    }
    return boxKey.index;
  }

  /**
   * @param {*} boxKey
   * @return {Object}
   */
  convertBounds(boxKey) {
    const newKey = {};
    if (this.isLeftBound(boxKey) || this.isUpBound()) {
      newKey.index = this.minIndex - 1;
    } else if (this.isRightBound(boxKey) || this.isDownBound()) {
      newKey.index = this.maxIndex + 1;
    } else {
      newKey.index = boxKey.index;
    }
    return newKey;
  }

  /**
   * @param {Object} boxKey
   * @return {Object} new Box key
   */
  getUp(boxKey) {
    return this.getLeft(boxKey);
  }

  /**
   * @param {Object} boxKey
   * @return {Object} new Box key
   */
  getDown(boxKey) {
    return this.getRight(boxKey);
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
   * @return {number}
   */
  get minIndex() {
    return 0;
  }

  /**
   * @return {number}
   */
  get maxIndex() {
    return this.numElements - 1;
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
      return { isCaret: false, index: num };
    }
  }
}
