import { ExtendedGlyph } from '../../../React-Components/ExtendedGlyph.js';
import Extended_Glyph_Behavior from '../Extended_Glyph/Extended_Glyph_Behavior.js';

/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Radical_Extension_Behavior extends Extended_Glyph_Behavior {
  _path;
  _viewBox;
  _desiredLength;
  _desiredWidth;
  /**
   * @param {behaviorSpec | Object} spec
   */
  constructor(spec) {
    super(spec);
    this._component = ExtendedGlyph;
    this._type = 'Extended_Radical';
  }

  /**
   * @return {boolean}
   */
  isValid() {
    const extendedRadicalBehavior = this;
    const valid =
      isMathStyleValid() && isDesiredLengthValid() && isDesiredWidthValid();
    return valid;

    /**
     * @return {boolean}
     */
    function isMathStyleValid() {
      return extendedRadicalBehavior._mathStyle !== undefined;
    }

    /**
     * @return {boolean}
     */
    function isDesiredLengthValid() {
      return extendedRadicalBehavior._desiredLength !== undefined;
    }
    /**
     * @return {boolean}
     */
    function isDesiredWidthValid() {
      return extendedRadicalBehavior._desiredWidth !== undefined;
    }
  }
  /**
   * Should be called with the state changes
   */
  update() {
    if (!this.isValid()) return;
    const extendedRadicalBehavior = this;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    const verticalAdjustmentAmount = this._typesetter.calculateAdjustmentAmount(
      this._desiredLength,
      this._pxpfu,
      true
    );
    const horizontalAdjustmentAmount = this._typesetter.calculateAdjustmentAmount(
      this._desiredWidth,
      this._pxpfu,
      false
    );
    calculateSVGProperties();
    updateMetrics();
    /**
     *
     */
    function calculateSVGProperties() {
      extendedRadicalBehavior._path = extendedRadicalBehavior._typesetter.calculatePath(
        verticalAdjustmentAmount,
        horizontalAdjustmentAmount,
        extendedRadicalBehavior._pxpfu
      );
      extendedRadicalBehavior._viewBox = extendedRadicalBehavior._typesetter.calculateViewBox(
        verticalAdjustmentAmount,
        horizontalAdjustmentAmount,
        extendedRadicalBehavior._pxpfu
      );
    }
    /**
     *
     */
    function updateMetrics() {
      extendedRadicalBehavior._metrics = extendedRadicalBehavior._typesetter.calculateMetrics(
        extendedRadicalBehavior._desiredLength,
        extendedRadicalBehavior._desiredWidth,
        extendedRadicalBehavior._pxpfu
      );
      extendedRadicalBehavior.updateComponentStyleDimensions();
    }
  }

  /**
   *@param {number} l
   */
  set desiredLength(l) {
    this._desiredLength = l;
    this.update();
  }
  /**
   *@param {number} w
   */
  set desiredWidth(w) {
    this._desiredWidth = w;
    this.update();
  }
}
