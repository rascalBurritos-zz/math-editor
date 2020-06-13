import Leaf_Behavior from '../Leaf_Behavior.js';

/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

/**
 * @class
 * @classdesc More of a pseudo Behavior in that it relegates
 * normal behavior attirbutes to other behaviors, it is repsonsible
 * for relegating a behavior {Glyph | Extended} Depending on the desiredSize
 */
export default class Variant_Glyph_Behavior extends Leaf_Behavior {
  _desiredSize;
  _behavior;
  _behaviorProperties = {};
  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this.type = 'Variant_Glyph';
  }

  /**
   * @return {boolean}
   */
  isDesiredSizeValid() {
    return this._desiredSize !== undefined;
  }
  /**
   * @param {number} l
   */
  set desiredSize(l) {
    this._desiredSize = l;
    this._update();
  }

  /**
   * Should be called with the state changes
   */
  _update() {
    if (!this.isMathStyleValid() || !this.isDesiredSizeValid()) return;
    const variantGlyphBehavior = this;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    updateBehavior();
    this._component = this._behavior.component;
    updateMetrics();

    /**
     *changes behavior to match desired size
     */
    function updateBehavior() {
      variantGlyphBehavior._behavior = variantGlyphBehavior._typesetter.getBehavior(
        variantGlyphBehavior._desiredSize,
        variantGlyphBehavior._pxpfu
      );
      variantGlyphBehavior._behavior.mathStyle =
        variantGlyphBehavior._mathStyle;
      variantGlyphBehavior._behavior.desiredSize =
        variantGlyphBehavior._desiredSize;
    }
    /**
     * updates h,w,d and corresponding css
     */
    function updateMetrics() {
      variantGlyphBehavior._metrics.height =
        variantGlyphBehavior._behavior.metrics.height;
      variantGlyphBehavior._metrics.depth =
        variantGlyphBehavior._behavior.metrics.depth;
      variantGlyphBehavior._metrics.width =
        variantGlyphBehavior._behavior.metrics.width;
    }
  }

  /**
   * @return {boolean}
   */
  isMathStyleValid() {
    return this._mathStyle !== undefined;
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
   * @return {Object}
   */
  get componentStyle() {
    return this._behavior.componentStyle;
  }
  /**
   * @param {Object} style
   */
  appendComponentStyle(style) {
    this._behavior.appendComponentStyle(style);
  }

  /**
   * @return {Object} REACT COMPONENT
   */
  get component() {
    return this._behavior.component;
  }
  /**
   * @return {String}
   */
  get viewBox() {
    return this._behavior.viewBox;
  }

  /**
   * @return {String}
   */
  get path() {
    return this._behavior.path;
  }
  /**
   * @return {number}
   */
  get internalCharacterBox() {
    return this._behavior.internalCharacterBox;
  }
}
