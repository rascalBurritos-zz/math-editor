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
    this.origin = this.origin.add(point);
  }

  /**
   * @return {Object};
   */
  toStyle() {
    const top = this.origin.top;
    const left = this.origin.left;
    const transform = ` translate(${left}px,${top}px) scale(${this.width},${this.height})`;
    return { transform };
  }
}
