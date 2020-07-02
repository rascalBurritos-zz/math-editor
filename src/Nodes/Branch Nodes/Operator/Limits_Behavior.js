import MathBehavior from '../../../Abstract/MathBehavior.js';
import Math_Style from '../../Types/Math_Style.js';
import Limits from '../../React-Components/Math/Limits.js';

/** @typedef {import('../../../Abstract/MathBehavior').behaviorSpec} behaviorSpec  */

export default class Limits_Behavior extends MathBehavior {
  _upperLimitBehavior;
  _nucleusBehavior;
  _containerStyle;
  _lowerLimitBehavior;

  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._component = Limits;
    this.type = 'Limits';
  }

  /**
   * @override
   * @return {boolean}
   */
  _isValid() {
    const limitsBehavior = this;
    return (
      this._isStyleValid() &&
      doesNucleusExist() &&
      (this._doesUpperLimitExist() || this._doesLowerLimitExist())
    );
    /**
     * @return {boolean}
     */
    function doesNucleusExist() {
      return limitsBehavior._nucleusBehavior !== undefined;
    }
  }

  /**
   * @override
   */
  _preSetterSequence() {
    const operatorBehavior = this;
    updateLimitStyles();

    /**
     * changes Styles of Sub and Script according
     * to the current style
     */
    function updateLimitStyles() {
      operatorBehavior._nucleusBehavior.mathStyle = operatorBehavior._mathStyle;
      if (operatorBehavior._doesLowerLimitExist()) {
        operatorBehavior._lowerLimitBehavior.mathStyle = getScriptStyle(false);
      }
      if (operatorBehavior._doesUpperLimitExist()) {
        operatorBehavior._upperLimitBehavior.mathStyle = getScriptStyle(true);
      }
      /**
       * @param {boolean} isUpperLimit
       * @return {Math_Style}
       */
      function getScriptStyle(isUpperLimit) {
        const currentStyle = operatorBehavior._mathStyle;
        const styleMap = {
          D: 'S',
          T: 'S',
          S: 'SS',
          SS: 'SS',
        };

        const isCramped = isUpperLimit ? currentStyle.cramped : true;
        return new Math_Style(
          styleMap[currentStyle.type],
          operatorBehavior._mathStyle.fontSize,
          isCramped
        );
      }
    }
  }
  /**
   * @override
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [
      this._nucleusBehavior,
      this._upperLimitBehavior,
      this._lowerLimitBehavior,
    ];
  }

  /**
   * @override
   * @param {Object} settings
   */
  _postSetterSequence(settings) {
    const operatorBehavior = this;
    updateNucleusComponentStyle();
    updateLimitsComponentStyle();
    updateContainerStyle();
    /**
     *
     */
    function updateContainerStyle() {
      operatorBehavior._containerStyle = settings.containerStyle;
    }
    /**
     * changes scriptsComponentStyle h,w, and top margin
     */
    function updateLimitsComponentStyle() {
      if (operatorBehavior._doesUpperLimitExist()) {
        operatorBehavior.upperLimitBehavior.appendComponentStyle(
          settings.upperLimitComponentStyle
        );
      }
      if (operatorBehavior._doesLowerLimitExist()) {
        operatorBehavior.lowerLimitBehavior.appendComponentStyle(
          settings.lowerLimitComponentStyle
        );
      }
    }
    /**
     *
     */
    function updateNucleusComponentStyle() {
      operatorBehavior._nucleusBehavior.appendComponentStyle(
        settings.nucleusComponentStyle
      );
    }
  }

  /**
   * @override
   * @param {Object} settings
   */
  _updateMetrics(settings) {
    this._metrics = settings.metrics;
  }

  /**
   * @return {boolean}
   */
  _doesUpperLimitExist() {
    return this._upperLimitBehavior !== undefined;
  }
  /**
   * @return {boolean}
   */
  _doesLowerLimitExist() {
    return this._lowerLimitBehavior !== undefined;
  }

  /**
   * @param {MathBehavior} behavior
   */
  set upperLimitBehavior(behavior) {
    this._upperLimitBehavior = behavior;
    this.update();
  }
  /**
   * @return {MathBehavior} behavior
   */
  get upperLimitBehavior() {
    return this._upperLimitBehavior;
  }
  /**
   * @param {MathBehavior} behavior
   */
  set nucleusBehavior(behavior) {
    this._nucleusBehavior = behavior;
    this.update();
  }
  /**
   * @return {MathBehavior} behavior
   */
  get nucleusBehavior() {
    return this._nucleusBehavior;
  }
  /**
   * @param {MathBehavior} behavior
   */
  set lowerLimitBehavior(behavior) {
    this._lowerLimitBehavior = behavior;
    this.update();
  }
  /**
   * @return {MathBehavior} behavior
   */
  get lowerLimitBehavior() {
    return this._lowerLimitBehavior;
  }

  /**
   * @return {Object}
   */
  get containerStyle() {
    return this._containerStyle;
  }
}
