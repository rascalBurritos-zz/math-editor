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
    this.type = 'Extended_Radical';
  }

  /**
   * @return {boolean}
   */
  _isValid() {
    const extendedRadicalBehavior = this;
    const valid =
      this._isStyleValid() && isDesiredLengthValid() && isDesiredWidthValid();
    return valid;

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
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [this._desiredLength, this._desiredWidth];
  }

  /**
   * @param {Object} settings
   */
  _postSetterSequence(settings) {
    this._path = settings.path;
    this._viewBox = settings.viewBox;
  }

  /**
   * @param {Object} settings
   */
  _updateMetrics(settings) {
    this._metrics = settings.metrics;
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
