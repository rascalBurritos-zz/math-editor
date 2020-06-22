import { Glyph } from '../../../React-Components/Glyph.js';
import Leaf_Behavior from '../Leaf_Behavior.js';
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/** @typedef {import('./Glyph_Setter').InternalCharacterBox} InternalCharacterBox  */
/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Glyph_Behavior extends Leaf_Behavior {
  _internalCharacterBox;
  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._component = Glyph;
    this.type = 'Glyph';
  }

  /**
   * Should be called with the state changes
   */

  /**
   *@param {Object} settings
   */
  _postSetterSequence(settings) {
    this._accentAttachment = settings.accentAttachment;
    this._italicsCorrection = settings.italicsCorrection;
    this._internalCharacterBox = settings.internalCharacterBox;
  }

  /**
   * @param {Object} settings
   * updates h,w,d and corresponding css
   */
  _updateMetrics(settings) {
    this._metrics = settings.metrics;
  }
  /**
   * @return {InternalCharacterBox}
   */
  get internalCharacterBox() {
    return this._internalCharacterBox;
  }
}
