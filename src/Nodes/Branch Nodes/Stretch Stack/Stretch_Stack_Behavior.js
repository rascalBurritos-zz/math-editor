import Math_Style from '../../Types/Math_Style.js';
import Behavior from '../../Abstract/Behavior.js';
import Stretch_Stack from '../../../React-Components/Stretch_Stack.js';

/** @typedef {import('../../Types/Metrics').default} Metrics  */
/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Stretch_Stack_Behavior extends Behavior {
  _upperLimitBehavior;
  _nucleusBehavior;
  _lowerLimitBehavior;

  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this.type = 'Stretch Stack';
    this._component = Stretch_Stack;
  }

  /**
   * @return {boolean}
   */
  _isValid() {
    const stretchStackBehavior = this;
    return this._isStyleValid() && doesNucleusExist() && doesALimitExist();
    /**
     * @return {boolean}
     */
    function doesNucleusExist() {
      return stretchStackBehavior._nucleusBehavior !== undefined;
    }

    /**
     * @return {boolean}
     */
    function doesALimitExist() {
      return (
        stretchStackBehavior.doesUpperLimitExist() ||
        stretchStackBehavior.doesLowerLimitExist()
      );
    }
  }

  /**
   * @return {boolean}
   */
  doesUpperLimitExist() {
    return this._upperLimitBehavior !== undefined;
  }
  /**
   * @return {boolean}
   */
  doesLowerLimitExist() {
    return this._lowerLimitBehavior !== undefined;
  }

  /**
   * @override
   */
  _preSetterSequence() {
    const operatorBehavior = this;
    updateChildMathStyles();
    /**
     * @override
     */
    function updateChildMathStyles() {
      operatorBehavior._nucleusBehavior.mathStyle = operatorBehavior._mathStyle;
      if (operatorBehavior.doesUpperLimitExist()) {
        operatorBehavior._upperLimitBehavior.mathStyle = getScriptStyle(true);
      }
      if (operatorBehavior.doesLowerLimitExist()) {
        operatorBehavior._lowerLimitBehavior.mathStyle = getScriptStyle(false);
      }
      /**
       * @param {boolean} isSuperscript
       * @return {Math_Style}
       */
      function getScriptStyle(isSuperscript) {
        const currentStyle = operatorBehavior._mathStyle.type;
        const styleMap = {
          D: 'S',
          T: 'S',
          S: 'SS',
          SS: 'SS',
        };

        const isCramped = isSuperscript ? currentStyle.cramped : true;
        return new Math_Style(
          styleMap[currentStyle],
          operatorBehavior._mathStyle.fontSize,
          isCramped
        );
      }
    }
  }

  /**
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [
      this._nucleusBehavior,
      this._lowerLimitBehavior,
      this._upperLimitBehavior,
    ];
  }

  /**
   *
   * @param {Object} settings
   */
  _postSetterSequence(settings) {
    this._nucleusBehavior.appendComponentStyle(settings.nucleusComponentStyle);
    if (this.doesUpperLimitExist()) {
      this._upperLimitBehavior.appendComponentStyle(
        settings.upperLimitComponentStyle
      );
    }
    if (this.doesLowerLimitExist()) {
      this._lowerLimitBehavior.appendComponentStyle(
        settings.lowerLimitComponentStyle
      );
    }
  }

  /**
   * @override
   * @param {Object} behavior
   * changes h,w,d of behavior._metrics
   */
  _updateMetrics(behavior) {
    this._metrics = behavior.metrics;
  }

  /**
   * changes the component styles of super,sub, nuclues
   */
  /**
   * @param {Behavior} behavior
   */
  set upperLimitBehavior(behavior) {
    this._upperLimitBehavior = behavior;
    this.update();
  }
  /**
   * @return {Behavior} behavior
   */
  get upperLimitBehavior() {
    return this._upperLimitBehavior;
  }
  /**
   * @param {Behavior} behavior
   */
  set nucleusBehavior(behavior) {
    this._nucleusBehavior = behavior;
    this.update();
  }
  /**
   * @return {Behavior} behavior
   */
  get nucleusBehavior() {
    return this._nucleusBehavior;
  }
  /**
   * @param {Behavior} behavior
   */
  set lowerLimitBehavior(behavior) {
    this._lowerLimitBehavior = behavior;
    this.update();
  }
  /**
   * @return {Behavior} behavior
   */
  get lowerLimitBehavior() {
    return this._lowerLimitBehavior;
  }
}
