import Behavior from '../../Abstract/Behavior.js';
import Math_Style from '../../Types/Math_Style.js';

/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Generalized_Fraction_Behavior extends Behavior {
  _numeratorBehavior;
  _denominatorBehavior;

  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this.type = 'Generalized_Fraction';
  }

  /**
   * @override
   * @return {boolean}
   */
  _isValid() {
    const generalizedFractionBehavior = this;
    return (
      this._isStyleValid() && doesNumeratorExist() && doesDenominatorExist()
    );
    /**
     * @return {boolean}
     */
    function doesNumeratorExist() {
      return generalizedFractionBehavior._numeratorBehavior !== undefined;
    }
    /**
     * @return {boolean}
     */
    function doesDenominatorExist() {
      return generalizedFractionBehavior._denominatorBehavior !== undefined;
    }
  }

  /**
   * @override
   */
  _preSetterSequence() {
    const generalizedFractionBehavior = this;
    updateChildMathStyles();

    /**
     * changes Styles of Sub and Script according
     * to the current style
     */
    function updateChildMathStyles() {
      generalizedFractionBehavior._numeratorBehavior.mathStyle = getFractionStyle(
        true
      );
      generalizedFractionBehavior._denominatorBehavior.mathStyle = getFractionStyle(
        false
      );

      /**
       * @return {Math_Style}
       * @param {boolean} isNumerator
       */
      function getFractionStyle(isNumerator) {
        const ms = generalizedFractionBehavior._mathStyle;
        if (ms.type === 'D') {
          const isCramped = isNumerator ? ms.cramped : true;
          return new Math_Style('T', ms.fontSize, isCramped);
        } else {
          return getScriptStyle(isNumerator);
        }
        /**
         * @param {boolean} isSuperscript
         * @return {Math_Style}
         */
        function getScriptStyle(isSuperscript) {
          const styleMap = {
            D: 'S',
            T: 'S',
            S: 'SS',
            SS: 'SS',
          };

          const isCramped = isSuperscript ? ms.cramped : true;
          return new Math_Style(styleMap[ms.type], ms.fontSize, isCramped);
        }
      }
    }
  }
  /**
   * @override
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [
      this._mathStyle,
      this._numeratorBehavior,
      this._denominatorBehavior,
    ];
  }

  /**
   * @param {Object} settings
   */
  updateNumAndDenomComponentStyles(settings) {
    const generalizedFractionBehavior = this;
    updateNumeratorComponentStyle();
    updateDenominatorComponentStyle();
    /**
     * changes scriptsComponentStyle h,w, and top margin
     */
    function updateNumeratorComponentStyle() {
      generalizedFractionBehavior._numeratorBehavior.appendComponentStyle(
        settings.numeratorComponentStyle
      );
    }
    /**
     * changes scriptsComponentStyle h,w, and top margin
     */
    function updateDenominatorComponentStyle() {
      generalizedFractionBehavior._denominatorBehavior.appendComponentStyle(
        settings.denominatorComponentStyle
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
   * @param {Behavior} behavior
   */
  set numeratorBehavior(behavior) {
    this._numeratorBehavior = behavior;
    this.update();
  }
  /**
   * @return {Behavior} behavior
   */
  get numeratorBehavior() {
    return this._numeratorBehavior;
  }
  /**
   * @param {Behavior} behavior
   */
  set denominatorBehavior(behavior) {
    this._denominatorBehavior = behavior;
    this.update();
  }
  /**
   * @return {Behavior} behavior
   */
  get denominatorBehavior() {
    return this._denominatorBehavior;
  }
}
