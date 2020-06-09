import Behavior from '../../Abstract/Behavior.js';
import { Glyph } from '../../../React-Components/Glyph.js';
/** @typedef {import('./Glyph_Setter').InternalCharacterBox} InternalCharacterBox  */
/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class GlyphBehavior extends Behavior {
  _internalCharacterBox;
  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._component = Glyph;
  }

  /**
   * Should be called with the state changes
   */
  _update() {
    const glyphBehavior = this;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    updateMetrics();
    updateInternalCharacterBox();
    /**
     * updates h,w,d and corresponding css
     */
    function updateMetrics() {
      glyphBehavior._metrics.height = glyphBehavior._typesetter.calculateHeight(
        glyphBehavior._pxpfu
      );
      glyphBehavior._metrics.depth = glyphBehavior._typesetter.calculateDepth(
        glyphBehavior._pxpfu
      );
      glyphBehavior._metrics.width = glyphBehavior._typesetter.calculateWidth(
        glyphBehavior._pxpfu
      );
      glyphBehavior.updateComponentStyleDimensions();
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
   * @return {InternalCharacterBox}
   */
  get internalCharacterBox() {
    return this._internalCharacterBox;
  }
  /**
   * @param {Object} mathStyle Alters the Math Style
   * and thus the font size of the glyph
   */
  set mathStyle(mathStyle) {
    this._mathStyle = mathStyle;
    this._update();
  }
}
