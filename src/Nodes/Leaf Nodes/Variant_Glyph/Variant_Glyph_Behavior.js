import Leaf_Behavior from '../Leaf_Behavior.js';

/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */
/** @typedef {import('../../Types/Metrics').default} Metrics  */

/**
 * @class
 * @classdesc More of a pseudo Behavior in that it relegates
 * normal behavior attirbutes to other behaviors, it is repsonsible
 * for relegating a behavior {Glyph | Extended} Depending on the desiredSize
 */
export default class Variant_Glyph_Behavior extends Leaf_Behavior {
  _desiredSize;
  _behavior;
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
  isValid() {
    const variantGlyphBehavior = this;
    return isMathStyleValid() && isdesiredSizeValid();
    /**
     * @return {boolean}
     */
    function isMathStyleValid() {
      return variantGlyphBehavior._mathStyle !== undefined;
    }
    /**
  /**
   * @return {boolean}
   */
    function isdesiredSizeValid() {
      return variantGlyphBehavior._desiredSize !== undefined;
    }
  }

  /**
   * @param {Math_Style} mathStyle Alters the Math Style
   * and thus the font size of the glyph
   */
  set mathStyle(mathStyle) {
    this._mathStyle = mathStyle;
    this.update();
  }

  /**
   * @param {number} l
   */
  set desiredSize(l) {
    this._desiredSize = l;
    this.update();
  }

  /**
   * Should be called with the state changes
   */
  update() {
    if (!this.isValid()) return;
    const variantGlyphBehavior = this;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    updateBehavior();
    this._component = this._behavior.component;

    /**
     *changes behavior to match desired size
     */
    function updateBehavior() {
      variantGlyphBehavior._behavior = variantGlyphBehavior._typesetter.getBehavior(
        variantGlyphBehavior._desiredSize,
        variantGlyphBehavior._pxpfu,
        variantGlyphBehavior._mathStyle
      );
    }
  }

  /**
   * @return {Metrics}
   */
  get metrics() {
    if (!this.isValid()) console.warn('invalid variant');
    return this._behavior.metrics;
  }
  /**
   *
   * @param {Object} styles
   */
  appendComponentStyle(styles) {
    if (!this.isValid()) console.warn('invalid variant');
    if (this._behavior) {
      this._behavior.appendComponentStyle(styles);
    } else {
      console.warn('invalid variant behavior');
    }
  }

  /**
   * @return {Math_Style}
   */
  get mathStyle() {
    if (!this.isValid()) console.warn('invalid variant');
    return this._mathStyle;
  }

  /**
   * @return {Object}
   */
  get componentStyle() {
    if (!this.isValid()) console.warn('invalid variant');
    return this._behavior.componentStyle;
  }

  /**
   * @return {Object} REACT COMPONENT
   */
  get component() {
    if (!this.isValid()) console.warn('invalid variant');
    return this._behavior.component;
  }

  // Extended Glyph Related

  /**
   * @return {String}
   */
  get viewBox() {
    if (!this.isValid()) console.warn('invalid variant');
    return this._behavior.viewBox;
  }

  /**
   * @return {String}
   */
  get path() {
    if (!this.isValid()) console.warn('invalid variant');
    return this._behavior.path;
  }

  // Glyph Related
  /**
   * @return {number}
   */
  get internalCharacterBox() {
    if (!this.isValid()) console.warn('invalid variant');
    return this._behavior.internalCharacterBox;
  }

  /**
   * @return {Object} accentAttachment
   */
  get accentAttachment() {
    if (!this.isValid()) console.warn('invalid variant');
    return this._behavior.accentAttachment;
  }
}
