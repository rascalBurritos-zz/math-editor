import Glyph_Behavior from './Glyph_Behavior';

export default class Centered_Glyph_Behavior extends Glyph_Behavior {
  /**
   *
   * @param {Object} spec
   */
  constructor(spec) {
    super(spec);
    this._type = 'Centered_Glyph';
  }
  /**
   * updates h,w,d and corresponding css to center the glyph
   */
  _updateMetrics() {
    this._metrics.height = this._typesetter.calculateCenteredHeight(
      this._pxpfu
    );
    this._metrics.depth = this._typesetter.calculateCenteredDepth(this._pxpfu);
    this._metrics.width = this._typesetter.calculateWidth(this._pxpfu);
    this.updateComponentStyleDimensions();
  }
}
