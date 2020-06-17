import Glyph_Setter from './Glyph_Setter';

/** @typedef {import('./Glyph_Setter').glyphSetterSpec} glyphSetterSpec */

/**
 * @typedef {Object} centeredType
 * @property {number} mathAxis
 * @typedef {glyphSetterSpec & centeredType} centeredGlyphSetterSpec
 */

export default class Centered_Glyph_Setter extends Glyph_Setter {
  _mathAxis;
  /**
   *
   * @param {centeredGlyphSetterSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._mathAxis = spec.mathAxis;
  }

  /**
   * @param {number} pxpfu
   * @return {number} centered height in px
   */
  calculateCenteredHeight(pxpfu) {
    const totalHeight = this._glyphMetric.bbox.y2 - this._glyphMetric.bbox.y1;
    return (totalHeight / 2 + this._mathAxis) * pxpfu;
  }

  /**
   * @param {number} pxpfu
   * @return {number} centered depth in px
   */
  calculateCenteredDepth(pxpfu) {
    const totalHeight = this._glyphMetric.bbox.y2 - this._glyphMetric.bbox.y1;
    const x = (totalHeight / 2 - this._mathAxis) * pxpfu;
    return x;
  }
}
