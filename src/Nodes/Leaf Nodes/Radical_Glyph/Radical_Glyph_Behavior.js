import Psuedo_Behavior from '../Variant_Glyph/Psuedo_Behavior';

/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style */
/** @typedef {import('../../Types/Metrics').default} Metrics */

export default class Radical_Glyph_Behavior extends Psuedo_Behavior {
  _desiredWidth;
  _desiredLength;
  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this.type = 'Radical_Glyph';
  }
  /**
   * checks if necessary values are set
   * @return {boolean}
   */
  _isValid() {
    const radicalBehavior = this;
    return (
      this._isStyleValid() && isDesiredLengthValid() && isDesiredWidthValid()
    );
    /**
  /**
   * @return {boolean}
   */
    function isDesiredLengthValid() {
      return radicalBehavior._desiredLength !== undefined;
    }
    /**
     * @return {boolean}
     */
    function isDesiredWidthValid() {
      return radicalBehavior._desiredWidth !== undefined;
    }
  }

  /**
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [this._desiredLength, this._desiredWidth];
  }

  /**
   * @param {number} l length in pixels
   */
  set desiredLength(l) {
    this._desiredLength = l;
    this.update();
  }
  /**
   * @param {number} w width in pixels
   */
  set desiredWidth(w) {
    this._desiredWidth = w;
    this.update();
  }
}
