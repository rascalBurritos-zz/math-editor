import Behavior from '../../Abstract/Behavior.js';
/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */
/**
 * @extends Behavior
 */
export default class GlyphBehavior extends Behavior {
  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
  }

  /**
   * Should be called with the state changes
   */
  _update() {
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    this._updateMetrics();
  }
  /**
   * Updates height,width, and depth of glyph
   * Updates the ComponentStyle to match CSS H and W
   */
  _updateMetrics() {
    this._metrics.height = this._typesetter.calculateHeight(this._pxpfu);
    this._metrics.depth = this._typesetter.calculateDepth(this._pxpfu);
    this._metrics.width = this._typesetter.calculateWidth(this._pxpfu);
    this.updateComponentStyleDimensions();
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
