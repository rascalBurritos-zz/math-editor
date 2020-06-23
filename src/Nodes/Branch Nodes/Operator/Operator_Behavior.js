import Math_Style from '../../Types/Math_Style.js';
import Behavior from '../../Abstract/Behavior.js';

/** @typedef {import('../../Types/Metrics').default} Metrics  */
/** @typedef {import('./Limits_Behavior').default} Limits_Behavior  */
/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Operator_Behavior extends Behavior {
  _upperLimitBehavior;
  _nucleusBehavior;
  _lowerLimitBehavior;
  _target;

  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this.type = 'Operator';
  }

  /**
   * @return {boolean}
   */
  _isValid() {
    const operatorBehavior = this;
    return this._isStyleValid() && doesNucleusExist() && isTargetValid();
    /**
     * @return {boolean}
     */
    function doesNucleusExist() {
      return operatorBehavior._nucleusBehavior !== undefined;
    }

    /**
     * @return {boolean}
     */
    function isTargetValid() {
      if (operatorBehavior._target) {
        return operatorBehavior._target._isValid();
      }
      // if no target target is valid
      return true;
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
      this._target,
    ];
  }

  /**
   *
   * @param {Limits_Behavior} behavior
   */
  _postSetterSequence(behavior) {
    this._behavior = behavior;
    this._behavior.mathStyle = this._mathStyle;
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

  /**
   * @return {Behavior}
   */
  get subBehavior() {
    return this._lowerLimitBehavior;
  }
  /**
   * @return {Behavior}
   */
  get superBehavior() {
    return this._upperLimitBehavior;
  }

  /**
   * @param {Behavior} behavior
   */
  set target(behavior) {
    this._target = behavior;
    this.update();
  }
  /**
   * @return {Behavior} behavior
   */
  get target() {
    return this._target;
  }

  /**
   * @return {Object}
   */
  get component() {
    if (!this._isValidBehavior()) console.warn('Invalid Behavior');
    return this._behavior.component;
  }
  /**
   * @return {Object}
   */
  get componentStyle() {
    if (!this._isValidBehavior()) console.warn('Invalid Behavior');
    return this._behavior.componentStyle;
  }

  /**
   * @return {Object}
   */
  get containerStyle() {
    if (!this._isValidBehavior()) console.warn('Invalid Behavior');
    return this._behavior._containerStyle;
  }

  /**
   * @return {boolean}
   */
  _isValidBehavior() {
    return this._isScriptsType() || this._isLimitsType();
  }
  /**
   * @return {boolean}
   */
  _isScriptsType() {
    return this._behavior.type === 'Scripts';
  }
  /**
   * @return {boolean}
   */
  _isLimitsType() {
    return this._behavior.type === 'Limits';
  }

  /**
   * @param {Array} styles
   */
  appendComponentStyle(styles) {
    this._behavior.appendComponentStyle(styles);
  }

  /**
   * @return {Metrics}
   */
  get metrics() {
    if (!this._isValidBehavior()) console.warn('Invalid Behavior');
    return this._behavior.metrics;
  }
}
