import Psuedo_Behavior from './Psuedo_Behavior.js';

/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */
/** @typedef {import('../../Types/Metrics').default} Metrics  */

/**
 * @class
 * @classdesc More of a pseudo Behavior in that it relegates
 * normal behavior attirbutes to other behaviors, it is repsonsible
 * for relegating a behavior {Glyph | Extended} Depending on the desiredSize
 */
export default class Variant_Glyph_Behavior extends Psuedo_Behavior {
  _desiredSize;
  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this.type = 'Variant_Glyph';
  }

  /**
   * checks if necessary values are set
   * @return {boolean}
   */
  _isValid() {
    const variantGlyphBehavior = this;
    return this._isStyleValid() && isdesiredSizeValid();
    /**
     * @return {boolean}
     */
    function isdesiredSizeValid() {
      return variantGlyphBehavior._desiredSize !== undefined;
    }
  }

  /**
   * @override
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [this._desiredSize];
  }

  /**
   * @param {number} l
   */
  set desiredSize(l) {
    this._desiredSize = l;
    this.update();
  }
}
