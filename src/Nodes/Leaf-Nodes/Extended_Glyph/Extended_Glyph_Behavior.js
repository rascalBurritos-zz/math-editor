import { ExtendedGlyph } from '../../../React-Components/ExtendedGlyph.js';
import Leaf_Behavior from '../Leaf_Behavior.js';

/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Extended_Glyph_Behavior extends Leaf_Behavior {
  _path;
  _viewBox;
  _desiredSize;
  /**
   * @param {behaviorSpec | Object} spec
   */
  constructor(spec) {
    super(spec);
    this._component = ExtendedGlyph;
    this._type = 'Extended_Glyph';
  }

  /**
   * @return {boolean}
   */
  isValid() {
    const extendedGlyphBehavior = this;
    const valid = isMathStyleValid() && isDesiredSizeValid();
    return valid;

    /**
     * @return {boolean}
     */
    function isMathStyleValid() {
      return extendedGlyphBehavior._mathStyle !== undefined;
    }

    /**
     * @return {boolean}
     */
    function isDesiredSizeValid() {
      return extendedGlyphBehavior._desiredSize !== undefined;
    }
  }
  /**
   * Should be called with the state changes
   */
  _update() {
    if (!this.isValid()) return;
    const extendedGlyphBehavior = this;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    const adjustmentAmount = this._typesetter.calculateAdjustmentAmount(
      this._desiredSize,
      this._pxpfu
    );
    calculateSVGProperties();
    updateMetrics();
    /**
     *
     */
    function calculateSVGProperties() {
      extendedGlyphBehavior._path = extendedGlyphBehavior._typesetter.calculatePath(
        adjustmentAmount,
        extendedGlyphBehavior._pxpfu
      );
      extendedGlyphBehavior._viewBox = extendedGlyphBehavior._typesetter.calculateViewBox(
        adjustmentAmount,
        extendedGlyphBehavior._pxpfu
      );
    }
    /**
     *
     */
    function updateMetrics() {
      extendedGlyphBehavior._metrics = extendedGlyphBehavior._typesetter.calculateMetrics(
        extendedGlyphBehavior._desiredSize,
        extendedGlyphBehavior._pxpfu
      );
      extendedGlyphBehavior.updateComponentStyleDimensions();
    }
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

  /**
   * @return {number}
   */
  get desiredSize() {
    return this._desiredSize;
  }

  /**
   * @param {number} l
   */
  set desiredSize(l) {
    this._desiredSize = l;
    this._update();
  }

  /**
   * @return {String}
   */
  get viewBox() {
    return this._viewBox;
  }

  /**
   * @return {String}
   */
  get path() {
    return this._path;
  }
}
