import MathBehavior from '../../Abstract/MathBehavior.js';
/** @typedef {import('../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../../Abstract/MathBehavior').behaviorSpec} behaviorSpec  */

export default class Leaf_Behavior extends MathBehavior {
  _italicsCorrection;
  _accentAttachment;

  /**
   * @return {number}
   */
  get italicsCorrection() {
    return this._italicsCorrection;
  }
  /**
   * @return {Object}
   */
  get accentAttachment() {
    return this._accentAttachment;
  }
}
