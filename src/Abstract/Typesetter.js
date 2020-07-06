/** @typedef {import('../Math Nodes/Types/Math_Style.js').default} Math_Style  */
/**
 * @typedef {Object} setterSpec
 * @property {number} upm
 * @property {number} scriptFactor
 * @property {number} scriptscriptFactor
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
    this._scriptFactor = spec.scriptFactor;
    this._scriptscriptFactor = spec.scriptscriptFactor;
  }
  /**
   *
   * @param {Math_Style} mathStyle
   * @return {number} pixels per font unit
   */
  calculatePXPFU(mathStyle) {
    const scaleMap = {
      D: 1,
      T: 1,
      S: this._scriptFactor / 100,
      SS: this._scriptscriptFactor / 100,
    };
    const scaleFactor = scaleMap[mathStyle.type];
    return (mathStyle.fontSize / this._upm) * scaleFactor;
  }
}
