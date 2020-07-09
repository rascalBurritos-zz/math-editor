import { isDeclareFunction } from '../../../../.cache/typescript/3.9/node_modules/@babel/types/lib/index';

export default class Formula {
  _elements = [];

  /**
   * @return {Array}
   */
  get elements() {
    return this._elements;
  }

  /**
   * @param {Array} e
   */
  set elements(e) {
    this._elements = e;
  }

  /**
   *
   * @param  {...any} args
   */
  push(...args) {
    this._elements.push(...args);
  }

  /**
   * @return {Object}
   */
  getRightMostCaret() {
    return this._elements.slice(-1)[0].getRightMostLeaf();
  }

  /**
   * @param {Number} startingIndex
   * @return {Object} node left of base node
   */
  moveLeft(startingIndex) {
    const formula = this;
    if (withinBounds(startingIndex - 1)) {
      const leftNode = this.elements[startingIndex - 1];
      if (leftNode.isLeaf()) {
        return { index: startingIndex - 1, parent: this };
      } else {
        return leftNode.getRightMostCaret();
      }
    } else {
      this.parent.getLeftOf(this);
    }

    /**
     * @param {*} num
     * @return {boolean}
     */
    function withinBounds(num) {
      const l = formula._elements.length;
      return num > -1 && num < l;
    }
  }
}
