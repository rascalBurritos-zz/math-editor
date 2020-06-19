import Operator from '../../../React-Components/Operator.js';
import Math_Style from '../../Types/Math_Style.js';
import Branch_Behavior from '../Branch_Behavior.js';

/** @typedef {import('../../Abstract/Behavior').default} Behavior  */
/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Operator_Behavior extends Branch_Behavior {
  _upperLimitBehavior;
  _nucleusBehavior;
  _lowerLimitBehavior;
  _targetBehavior;

  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._component = Operator;
    this._type = 'Operator';
  }

  /**
   * @return {boolean}
   */
  _doEssentialBehaviorsExist() {
    const operatorBehavior = this;
    return doesNucleusExist();
    /**
     * @return {boolean}
     */
    function doesNucleusExist() {
      return operatorBehavior._nucleusBehavior !== undefined;
    }
  }
  /**
   * @return {boolean}
   */
  doesTargetExist() {
    return this._targetBehavior !== undefined;
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
  updateChildMathStyles() {
    const operatorBehavior = this;
    this._nucleusBehavior.mathStyle = this._mathStyle;
    if (this.doesTargetExist()) {
      this._targetBehavior.mathStyle = this._mathStyle;
    }
    if (this.doesUpperLimitExist()) {
      this._upperLimitBehavior.mathStyle = getScriptStyle(true);
    }
    if (this.doesLowerLimitExist()) {
      this._lowerLimitBehavior.mathStyle = getScriptStyle(false);
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
  /**
   * @override
   * @param {Object} settings
   */
  updateChildComponentStyles(settings) {
    this._nucleusBehavior.appendComponentStyle(settings.nucleusComponentStyle);
    this._targetBehavior.appendComponentStyle(settings.targetComponentStyle);
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
   * @param {Object} settings
   * changes h,w,d of behavior._metrics
   */
  updateMetrics(settings) {
    this._metrics = settings.metrics;
    this.updateComponentStyleDimensions();
  }

  /**
   * changes the component styles of super,sub, nuclues
   */
  /**
   * @param {Behavior} behavior
   */
  set upperLimitBehavior(behavior) {
    this._upperLimitBehavior = behavior;
    this._registerChildBehavior('upperLimit', behavior);
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
    this._registerChildBehavior('nucleus', behavior);
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
    this._registerChildBehavior('lowerLimit', behavior);
    this.update();
  }
  /**
   * @return {Behavior} behavior
   */
  get lowerLimitBehavior() {
    return this._lowerLimitBehavior;
  }
  /**
   * @param {Behavior} behavior
   */
  set targetBehavior(behavior) {
    this._targetBehavior = behavior;
    this._registerDependantBehavior(behavior);
    this.update();
  }
  /**
   * @return {Behavior} behavior
   */
  get targetBehavior() {
    return this._targetBehavior;
  }
}
