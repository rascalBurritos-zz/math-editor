import MathBehavior from '../../../Abstract/MathBehavior';
import Bar from '../../../React-Components/Bar';

export default class Bar_Behavior extends MathBehavior {
  _nucleusBehavior;
  _barStyle;
  _isOverbar;
  /**
   *
   * @param {Object} spec
   */
  constructor(spec) {
    super(spec);
    this.type = 'Bar';
    this._component = Bar;
  }

  /**
   * @override
   * @return {boolean}
   */
  _isValid() {
    const barBehavior = this;
    return this._isStyleValid() && isNucleusValid();
    /**
     * @return {boolean}
     */
    function isNucleusValid() {
      return barBehavior._nucleusBehavior !== undefined;
    }
  }

  /**
   * @override
   */
  _preSetterSequence() {
    const barBehavior = this;
    updateNucleusMathStyle();

    /**
     *
     */
    function updateNucleusMathStyle() {
      barBehavior._nucleusBehavior.mathStyle = barBehavior._mathStyle;
    }
  }

  /**
   * @override
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [this._nucleusBehavior];
  }

  /**
   * @override
   * @param {Object} settings
   */
  _postSetterSequence(settings) {
    this._barStyle = settings.barStyle;
    this._isOverbar = settings.isOverbar;
  }

  /**
   * @return {boolean}
   */
  get isOverbar() {
    return this._isOverbar;
  }

  /**
   * @return {Object}
   */
  get barStyle() {
    return this._barStyle;
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
  set nucleusBehavior(gb) {
    this._nucleusBehavior = gb;
    this.update();
  }

  /**
   * @return {Object}
   */
  get nucleusBehavior() {
    return this._nucleusBehavior;
  }
}
