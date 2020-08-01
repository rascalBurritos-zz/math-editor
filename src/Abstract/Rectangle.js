/** @typedef {import('./Point').default} Point */

export default class Rectangle {
  /**
   *
   * @param {Point} startPoint top left point
   * @param {number} height
   * @param {number} width
   */
  constructor(startPoint, height, width) {
    this.origin = startPoint;
    this.height = height;
    this.width = width;
  }

  /**
   * @param {Point} point
   * @return {Rectangle}
   */
  addToOrigin(point) {
    return new Rectangle(this.origin.add(point), this.height, this.width);
  }

  /**
   * @return {Object};
   */
  toStyle() {
    const top = this.origin.top;
    const left = this.origin.left;
    return { top, left, height: this.height, width: this.width };
  }
}
