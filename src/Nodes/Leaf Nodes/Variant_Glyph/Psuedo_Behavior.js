import Leaf_Behavior from '../Leaf_Behavior.js';

/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../../../Abstract/MathBehavior').behaviorSpec} behaviorSpec  */
/** @typedef {import('../../Types/Metrics').default} Metrics  */

/**
 * @class
 */
export default class Psuedo_Behavior extends Leaf_Behavior {
  _behavior;

  /**
   *
   * @param {Object} behavior the settings
   * parameter in the default super class
   */
  _postSetterSequence(behavior) {
    this._behavior = behavior;
    this._behavior.mathStyle = this._mathStyle;
  }

  /**
   *
   */
  _updateMetrics() {
    this._metrics = this._behavior.metrics;
  }

  /**
   *
   * @param {Object} styles
   */
  appendComponentStyle(styles) {
    if (!this._isValidBehavior()) console.warn('invalid variant');
    this._behavior.appendComponentStyle(styles);
  }

  /**
   * @return {Object}
   */
  get componentStyle() {
    if (!this._isValidBehavior()) console.warn('invalid variant');
    return this._behavior.componentStyle;
  }

  /**
   * @return {Object} REACT COMPONENT
   */
  get component() {
    if (!this._isValidBehavior()) console.warn('invalid variant');
    return this._behavior.component;
  }

  // Extended Glyph Related

  /**
   * @return {String}
   */
  get viewBox() {
    if (!this._isValidExtendedBehavior()) console.warn('invalid variant');
    return this._behavior.viewBox;
  }

  /**
   * @return {String}
   */
  get path() {
    if (!this._isValidExtendedBehavior()) console.warn('invalid variant');
    return this._behavior.path;
  }

  // Glyph Related
  /**
   * @return {number}
   */
  get internalCharacterBox() {
    if (!this._isValidGlyphBehavior()) console.warn('invalid variant');
    return this._behavior.internalCharacterBox;
  }

  /**
   * @return {Object} accentAttachment
   */
  get accentAttachment() {
    if (!this._isValidBehavior()) console.warn('invalid variant');
    return this._behavior.accentAttachment;
  }
  /**
   * @return {Object} accentAttachment
   */
  get italicsCorrection() {
    if (!this._isValidBehavior()) console.warn('invalid variant');
    return this._behavior.italicsCorrection;
  }
  /**
   * @return {boolean}
   */
  _isValidExtendedBehavior() {
    if (!this._behavior) return false;
    const ext = this._behavior.type === 'Extended_Glyph';
    const rad = this._behavior.type === 'Extended_Radical';
    return ext || rad;
  }
  /**
   * @return {boolean}
   */
  _isValidGlyphBehavior() {
    if (!this._behavior) return false;
    return (
      this._behavior.type === 'Glyph' ||
      this._behavior.type === 'Centered_Glyph'
    );
  }
  /**
   * @return {boolean}
   */
  _isValidBehavior() {
    return this._isValidExtendedBehavior() || this._isValidGlyphBehavior();
  }
}
