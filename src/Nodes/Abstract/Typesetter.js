/** @typedef {import('../Types/Math_Style.js').default} Math_Style  */
/**
 * @typedef {Object} setterSpec
 * @property {number} upm
 */

/**
 * @class
 */
export default class Typesetter {
  /**
   * @param {setterSpec} spec
   */
  constructor(spec) {
    this._upm = spec.upm;
  }
  /**
   *
   * @param {Math_Style} mathStyle
   * @return {number} pixels per font unit
   */
  calculatePXPFU(mathStyle) {
    return mathStyle.fontSize / this._upm;
  }
}
