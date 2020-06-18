import Behavior from '../../Abstract/Behavior';

/** @typedef {import('../../Abstract/Behavior').behaviorSpec} behaviorSpec  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style */
/** @typedef {import('../../Types/Metrics').default} Metrics */

export default class Radical_Glyph_Behavior extends Behavior {
  _behavior;
  _desiredWidth;
  _desiredLength;
  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this.type = 'Radical_Glyph';
  }
  /**
   * checks if necessary values are set
   * @return {boolean}
   */
  isValid() {
    const radicalBehavior = this;
    return (
      isMathStyleValid() && isDesiredLengthValid() && isDesiredWidthValid()
    );
    /**
     * @return {boolean}
     */
    function isMathStyleValid() {
      return radicalBehavior._mathStyle !== undefined;
    }
    /**
  /**
   * @return {boolean}
   */
    function isDesiredLengthValid() {
      return radicalBehavior._desiredLength !== undefined;
    }
    /**
     * @return {boolean}
     */
    function isDesiredWidthValid() {
      return radicalBehavior._desiredWidth !== undefined;
    }
  }
  /**
   * Should be called with the state changes
   */
  update() {
    if (!this.isValid()) return;
    const radicalBehavior = this;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    updateBehavior();
    this._component = this._behavior.component;

    /**
     *changes behavior to match desired size
     */
    function updateBehavior() {
      radicalBehavior._behavior = radicalBehavior._typesetter.getBehavior(
        radicalBehavior._desiredLength,
        radicalBehavior._desiredWidth,
        radicalBehavior._pxpfu,
        radicalBehavior._mathStyle
      );
    }
  }

  /**
   * @param {number} l length in pixels
   */
  set desiredLength(l) {
    this._desiredLength = l;
    this.update();
  }
  /**
   * @param {number} w width in pixels
   */
  set desiredWidth(w) {
    this._desiredWidth = w;
    this.update();
  }

  /**
   * @param {Math_Style} s
   */
  set mathStyle(s) {
    this._mathStyle = s;
    this.update();
  }

  /**
   * @return {Object}
   */
  get componentStyle() {
    if (!this.isValid()) return;
    return this._behavior.componentStyle;
  }
  /**
   * @param {Array} styles styles
   */
  appendComponentStyle(styles) {
    if (!this.isValid()) return;
    this._behavior.appendComponentStyle(styles);
  }

  /**
   * @return {Object}
   */
  get component() {
    if (!this.isValid()) return;
    return this._behavior.component;
  }
  /**
   * @return {Metrics}
   */
  get metrics() {
    if (!this.isValid()) console.warn('invalid variant');
    return this._behavior.metrics;
  }
  /**
   * @return {String}
   */
  get viewBox() {
    if (!this.isValid()) console.warn('invalid variant');
    return this._behavior.viewBox;
  }
  /**
   * @return {String}
   */
  get path() {
    if (!this.isValid()) console.warn('invalid variant');
    return this._behavior.path;
  }
}
