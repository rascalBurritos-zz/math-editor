import Behavior from '../../Abstract/Behavior.js';
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
    this._type = 'Glyph';
  }

  /**
   * Should be called with the state changes
   */
  _update() {
    const glyphBehavior = this;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    this._updateMetrics();
    updateInternalCharacterBox();
    updateItalicsCorrection();
    updateAccentAttachmentPoint();

    /**
     * updates accent attachment to match current font size (pxpfu)
     */
    function updateAccentAttachmentPoint() {
      glyphBehavior._accentAttachmentPoint = glyphBehavior._typesetter.calculateAccentAttachmentPoint(
        glyphBehavior._pxpfu
      );
    }
    /**
     * updates italics correction to match current font size (pxpfu)
     */
    function updateItalicsCorrection() {
      glyphBehavior._italicsCorrection = glyphBehavior._typesetter.calculateItalicsCorrection(
        glyphBehavior._pxpfu
      );
    }
    /**
     * changes the internal character box to match current
     * size and pxpfu
     */
    function updateInternalCharacterBox() {
      glyphBehavior._internalCharacterBox = glyphBehavior._typesetter.calculateInternalCharacterBox(
        glyphBehavior._mathStyle.fontSize,
        glyphBehavior._pxpfu
      );
    }
  }

  /**
   * updates h,w,d and corresponding css
   */
  _updateMetrics() {
    this._metrics.height = this._typesetter.calculateHeight(this._pxpfu);
    this._metrics.depth = this._typesetter.calculateDepth(this._pxpfu);
    this._metrics.width = this._typesetter.calculateWidth(this._pxpfu);
    this.updateComponentStyleDimensions();
  }
  /**
   * @return {InternalCharacterBox}
   */
  get internalCharacterBox() {
    return this._internalCharacterBox;
  }
  /**
   * @param {Math_Style} mathStyle Alters the Math Style
   * and thus the font size of the glyph
   */
  set mathStyle(mathStyle) {
    this._mathStyle = mathStyle;
    this._update();
  }
  /**
   * @return {Math_Style}
   */
  get mathStyle() {
    return this._mathStyle;
  }
}
