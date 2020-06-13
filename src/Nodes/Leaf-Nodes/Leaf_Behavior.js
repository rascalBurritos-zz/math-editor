import Behavior from '../Abstract/Behavior.js';
/** @typedef {import('../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Leaf_Behavior extends Behavior {
  _italicsCorrection;
  _accentAttachmentPoint;

  /**
   * @return {number}
   */
  get italicsCorrection() {
    return this._italicsCorrection;
  }
  /**
   * @return {number}
   */
  get accentAttachmentPoint() {
    return this._accentAttachmentPoint;
  }
}
