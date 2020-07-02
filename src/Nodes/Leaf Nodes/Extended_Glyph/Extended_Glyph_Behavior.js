import { ExtendedGlyph } from '../../React-Components/Math/ExtendedGlyph.js';
import Leaf_Behavior from '../Leaf_Behavior.js';

/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../../../Abstract/MathBehavior').behaviorSpec} behaviorSpec  */

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
    this.type = 'Extended_Glyph';
  }

  /**
   * @return {boolean}
   */
  _isValid() {
    const extendedGlyphBehavior = this;
    const valid = this._isStyleValid() && isDesiredSizeValid();
    return valid;

    /**
     * @return {boolean}
     */
    function isDesiredSizeValid() {
      return extendedGlyphBehavior._desiredSize !== undefined;
    }
  }

  /**
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [this._desiredSize];
  }

  /**
   * @override
   * @param {Object} settings
   */
  _postSetterSequence(settings) {
    this._path = settings.path;
    this._viewBox = settings.viewBox;
    this._accentAttachment = settings.accentAttachment;
    this._italicsCorrection = settings.italicsCorrection;
  }

  /**
   * @override
   * @param {Object} settings
   */
  _updateMetrics(settings) {
    this._metrics = settings.metrics;
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
    this.update();
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
