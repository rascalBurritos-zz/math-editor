import Behavior from '../../Abstract/Behavior.js';
import { Operator } from '../../../React-Components/Operator.js';
import Math_Style from '../../Types/Math_Style.js';

/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Operator_Behavior extends Behavior {
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
  isValid() {
    const operatorBehavior = this;
    return isStyleValid();
    /**
     * @return {boolean}
     */
    function isStyleValid() {
      return operatorBehavior._mathStyle !== undefined;
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
   *
   */
  _update() {
    if (!this.isValid()) return;
    const operatorBehavior = this;
    updateChildMathStyles();
    const operatorSettings = this._typesetter.calculateOperator(
      this._pxpfu,
      this._nucleusBehavior,
      this._targetBehavior,
      this._upperLimitBehavior,
      this._lowerLimitBehavior
    );
    /*
     * metrics
     * script Container css
     * script css
     * subscript css*/
    updateMetrics();
    updateChildComponentStyles();

    /**
     * changes h,w,d of behavior._metrics
     */
    function updateMetrics() {
      operatorBehavior._metrics = operatorSettings.metrics;
      operatorBehavior.updateComponentStyleDimensions();
    }

    /**
     * changes the component styles of super,sub, nuclues
     */
    function updateChildComponentStyles() {
      operatorBehavior._nucleusBehavior.appendComponentStyle(
        operatorSettings.nucleusComponentStyle
      );
      operatorBehavior._targetBehavior.appendComponentStyle(
        operatorSettings.targetComponentStyle
      );
      if (operatorBehavior.doesUpperLimitExist()) {
        operatorBehavior._upperLimitBehavior.appendComponentStyle(
          operatorSettings.upperLimitComponentStyle
        );
      }
      if (operatorBehavior.doesLowerLimitExist()) {
        operatorBehavior._lowerLimitBehavior.appendComponentStyle(
          operatorSettings.lowerLimitComponentStyle
        );
      }
    }

    /**
     * changes Styles of Sub and Script according
     * to the current style
     */
    function updateChildMathStyles() {
      operatorBehavior._nucleusBehavior.mathStyle = operatorBehavior._mathStyle;
      if (operatorBehavior.doesTargetExist()) {
        operatorBehavior._targetBehavior.mathStyle =
          operatorBehavior._mathStyle;
      }
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
   * @param {Behavior} behavior
   */
  set upperLimitBehavior(behavior) {
    this._upperLimitBehavior = behavior;
    this._update();
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
    this._update();
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
    this._update();
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
    this._update();
  }
  /**
   * @return {Behavior} behavior
   */
  get targetBehavior() {
    return this._targetBehavior;
  }

  /**
   * @param {Math_Style} style
   */
  set mathStyle(style) {
    this._mathStyle = style;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    this._update();
  }
  /**
   * @return {Math_Style} style
   */
  get mathStyle() {
    return this._mathStyle;
  }
}
