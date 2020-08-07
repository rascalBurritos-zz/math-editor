/**
 * @class Metrics
 * @classdesc stores height, width, depth
 */
export default class Metrics {
  /**
   * @param {number} height
   * @param {number} width
   * @param {number} depth
   */
  constructor(height = 0, width = 0, depth = 0) {
    this.height = height;
    this.depth = depth;
    this.width = width;
  }

  /**
   * @return {Metrics}
   */
  copy() {
    return new Metrics(this.height, this.width, this.depth);
  }

  /**
   *
   * @param {Metrics} other
   */
  equal(other) {
    const h = this.height === other.height;
    const w = this.width === other.width;
    const d = this.depth === other.depth;
    return h && w && d;
  }
}
