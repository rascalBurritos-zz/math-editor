import MathBehavior from '../../../Abstract/MathBehavior.js';
import Math_Style from '../../Types/Math_Style.js';
import Accent from '../../../React-Components/Accent.js';

/** @typedef {import('../../../Abstract/MathBehavior').behaviorSpec} behaviorSpec  */

export default class Accent_Behavior extends MathBehavior {
  _accenterBehavior;
  _nucleusBehavior;

  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._component = Accent;
    this.type = 'Accent';
  }

  /**
   * @return {boolean}
   */
  isValid() {
    const accentBehavior = this;
    return this._isStyleValid() && doesAccenterExist() && doesNucleusExist();
    /**
     * @return {boolean}
     */
    function doesAccenterExist() {
      return accentBehavior._accenterBehavior !== undefined;
    }
    /**
     * @return {boolean}
     */
    function doesNucleusExist() {
      return accentBehavior._nucleusBehavior !== undefined;
    }
  }

  /**
   * @override
   */
  _preSetterSequence() {
    const accentBehavior = this;
    updateChildMathStyles();
    /**
     * changes nucleus Math Style
     */
    function updateChildMathStyles() {
      const type = accentBehavior._mathStyle.type;
      const fontSize = accentBehavior._mathStyle.fontSize;
      accentBehavior._nucleusBehavior.mathStyle = new Math_Style(
        type,
        fontSize,
        true
      );
      accentBehavior._accenterBehavior.mathStyle = accentBehavior._mathStyle;
    }
  }

  /**
   * @override
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [this._nucleusBehavior, this._accenterBehavior];
  }

  /**
   * @override
   */
  _postSetterSequence(accentSettings) {
    const accentBehavior = this;
    updateNucleusComponentStyle();
    updateAccenterComponentStyle();
    /**
     * changes the component styles
     */
    function updateNucleusComponentStyle() {
      accentBehavior._nucleusBehavior.appendComponentStyle(
        accentSettings.nucleusComponentStyle
      );
    }

    /**
     * changes componet styles of accent
     */
    function updateAccenterComponentStyle() {
      accentBehavior._accenterBehavior.appendComponentStyle(
        accentSettings.accenterComponentStyle
      );
    }
  }

  /**
   * @override
   */
  _updateMetrics(settings) {
    this._metrics = settings.metrics;
  }

  /**
   * @param {Behavior} behavior
   */
  set accenterBehavior(behavior) {
    this._accenterBehavior = behavior;
    this.update();
  }
  /**
   * @return {Behavior} behavior
   */
  get accenterBehavior() {
    return this._accenterBehavior;
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
}
