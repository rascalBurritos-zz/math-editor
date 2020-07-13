export default class Point {
  /**
   *
   * @param {number} top
   * @param {number} left
   */
  constructor(top, left) {
    this.top = top;
    this.left = left;
  }

  /**
   * @param {Point} point
   * @return {Point}
   */
  add(point) {
    const top = this.top + point.top;
    const left = this.left + point.left;
    return new Point(top, left);
  }
  /**
   * @param {Point} point
   * @return {Point}
   */
  subtract(point) {
    const top = this.top - point.top;
    const left = this.left - point.left;
    return new Point(top, left);
  }
}
