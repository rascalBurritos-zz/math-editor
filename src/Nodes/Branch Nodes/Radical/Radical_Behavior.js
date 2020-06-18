import Behavior from '../../Abstract/Behavior';
import Radical from '../../../React-Components/Radical';
import Math_Style from '../../Types/Math_Style';
/** @typedef {import('../../Abstract/Behavior').behaviorSpec}behaviorSpec  */

export default class Radical_Behavior extends Behavior {
  _radicandBehavior;
  _degreeBehavior;
  _radicalGlyphBehavior;
  _containerDimensions;
  /**
   * @param {behaviorSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._component = Radical;
    this._type = 'Radical';
  }

  /**
   *@return {boolean}
   */
  isValid() {
    const radicalBehavior = this;
    return isStyleValid() && doesRadicandExist();
    /**
     * @return {boolean}
     */
    function isStyleValid() {
      return radicalBehavior._mathStyle !== undefined;
    }
    /**
     * @return {boolean}
     */
    function doesRadicandExist() {
      return radicalBehavior._radicandBehavior !== undefined;
    }
  }
  /**
   *
   */
  update() {
    if (!this.isValid()) return;
    const radicalBehavior = this;
    updateChildStyles();
    const radicalSettings = this._typesetter.calculateRadical(
      this._radicandBehavior,
      this._degreeBehavior,
      this._pxpfu
    );
    setContainerDimensions();
    updateMetrics();
    updateRadicalGlyphBehavior();
    updateRadicand(); // width radicalSettings.radicandComponentStyle
    if (doesDegreeExist()) {
      updateDegree(); // width radicalSettings.radicandComponentStyle
    }

    /**
     *
     */
    function setContainerDimensions() {
      radicalBehavior._containerDimensions =
        radicalSettings.containerDimensions;
    }

    /**
     * changes radical glyph behavior's settings
     */
    function updateRadicalGlyphBehavior() {
      radicalBehavior._radicalGlyphBehavior =
        radicalSettings.radicalGlyphBehavior;
    }

    /**
     * positions degree behaviors accordingly
     */
    function updateDegree() {
      radicalBehavior._degreeBehavior.appendComponentStyle(
        radicalSettings.degreeComponentStyle
      );
    }
    /**
     * positions radicand accordingly
     */
    function updateRadicand() {
      const styles = radicalSettings.radicandComponentStyle;
      styles.alignSelf = 'flex-end';
      radicalBehavior._radicandBehavior.appendComponentStyle(styles);
    }
    /**
     * changes behavior metrics
     */
    function updateMetrics() {
      radicalBehavior._metrics = radicalSettings.metrics;
      radicalBehavior.updateComponentStyleDimensions();
    }

    /**
     * changes degree and radicand math styles
     */
    function updateChildStyles() {
      const currentType = radicalBehavior._mathStyle.type;
      const currentFontSize = radicalBehavior._mathStyle.fontSize;

      radicalBehavior._radicandBehavior.mathStyle = new Math_Style(
        currentType,
        currentFontSize,
        true
      );
      if (doesDegreeExist()) {
        const currentCramped = radicalBehavior._mathStyle.cramped;
        radicalBehavior._degreeBehavior.mathStyle = new Math_Style(
          'SS',
          currentFontSize,
          currentCramped
        );
      }
    }
    /**
     * @return {boolean}
     */
    function doesDegreeExist() {
      return radicalBehavior._degreeBehavior !== undefined;
    }
    /**
     * @return {boolean}
     */
    function doesDegreeExist() {
      return radicalBehavior._degreeBehavior !== undefined;
    }
  }

  /**
   * @return {Math_Style}
   */
  get mathStyle() {
    return this._mathStyle;
  }
  /**
   * @param {Math_Style} ms
   */
  set mathStyle(ms) {
    this._mathStyle = ms;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    this.update();
  }

  /**
   * @param {Behavior}rb
   */
  set radicandBehavior(rb) {
    this._radicandBehavior = rb;
    this.update();
  }
  /**
   * @return {Behavior}rb
   */
  get radicandBehavior() {
    return this._radicandBehavior;
  }
  /**
   * @param {Behavior}db
   */
  set degreeBehavior(db) {
    this._degreeBehavior = db;
    this.update();
  }
  /**
   * @return {Behavior}
   */
  get degreeBehavior() {
    return this._degreeBehavior;
  }
  /**
   * @return {Behavior}
   */
  get radicalGlyphBehavior() {
    return this._radicalGlyphBehavior;
  }
  /**
   * @return {Object} h,w
   */
  get containerDimensions() {
    return this._containerDimensions;
  }
}
