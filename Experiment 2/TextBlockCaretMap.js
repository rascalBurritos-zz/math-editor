import CaretMap from './CaretMap';

export default class TextBlockCaretMap extends CaretMap {
  /**
   *
   * @param {Object} textBlockModel
   */
  constructor(textBlockModel) {
    super();
    this.numElements = textBlockModel.content.length;
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
    return this.numElements;
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
      // they are all carets
      // const viewAccess = ['elementBehaviors', (num - 1) / 2];
      // const modelAccess = ['content', (num - 1) / 2];
      return { isCaret: true, index: num };
    }
  }
}
