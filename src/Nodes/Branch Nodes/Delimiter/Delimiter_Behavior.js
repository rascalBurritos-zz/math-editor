import MathBehavior from '../../../Abstract/MathBehavior';
import Delimiter from '../../React-Components/Math/Delimiter';

export default class Delimiter_Behavior extends MathBehavior {
  _glyphBehavior;
  _target;
  /**
   *
   * @param {Object} spec
   */
  constructor(spec) {
    super(spec);
    this.type = 'Delimiter';
    this._component = Delimiter;
  }

  /**
   * @override
   * @return {boolean}
   */
  _isValid() {
    const delimiterBehavior = this;
    return this._isStyleValid() && isTargetValid();
    /**
     * @return {boolean}
     */
    function isTargetValid() {
      if (delimiterBehavior._target) {
        return delimiterBehavior._target._isValid();
      }
      // if no target target is valid
      return true;
    }
  }

  /**
   * @override
   */
  _preSetterSequence() {
    const delimiterBehavior = this;
    updateGlyphMathStyle();

    /**
     *
     */
    function updateGlyphMathStyle() {
      delimiterBehavior._glyphBehavior.mathStyle = delimiterBehavior._mathStyle;
    }
  }

  /**
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [this._glyphBehavior, this._target];
  }

  /**
   *
   * @param {Object} settings
   */
  _updateMetrics(settings) {
    this._metrics = settings.metrics;
  }

  /**
   * @param {Object} gb
   */
  set glyphBehavior(gb) {
    this._glyphBehavior = gb;
    this.update();
  }

  /**
   * @return {Object}
   */
  get glyphBehavior() {
    return this._glyphBehavior;
  }

  /**
   * @param {MathBehavior} t
   */
  set target(t) {
    this._target = t;
    this.update();
  }
}
