import Behavior from '../../Abstract/Behavior.js';
import Math_Style from '../../Types/Math_Style.js';
import Accent from '../../../React-Components/Accent.js';

/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */

export default class Accent_Behavior extends Behavior {
  _accenterBehavior;
  _nucleusBehavior;

  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._component = Accent;
    this._type = 'Accent';
  }

  /**
   * @return {boolean}
   */
  isValid() {
    const accentBehavior = this;
    return isStyleValid() && doesAccenterExist() && doesNucleusExist();
    /**
     * @return {boolean}
     */
    function isStyleValid() {
      return accentBehavior._mathStyle !== undefined;
    }
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
   *
   */
  update() {
    if (!this.isValid()) return;
    const accentBehavior = this;
    updateChildMathStyles();
    const accentSettings = this._typesetter.calculateAccent(
      this._pxpfu,
      this._nucleusBehavior,
      this._accenterBehavior
    );
    /*
     * metrics
     * accenter component Style
     * nucleus component Style
     */
    updateMetrics();
    updateNucleusComponentStyle();
    updateAccenterComponentStyle();

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

    /**
     * changes h,w,d of behavior._metrics
     */
    function updateMetrics() {
      accentBehavior._metrics = accentSettings.metrics;
      accentBehavior.updateComponentStyleDimensions();
    }

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

  /**
   * @param {Math_Style} style
   */
  set mathStyle(style) {
    this._mathStyle = style;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    this.update();
  }
  /**
   * @return {Math_Style} style
   */
  get mathStyle() {
    return this._mathStyle;
  }
}
