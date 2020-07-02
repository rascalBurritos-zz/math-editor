import MathBehavior from '../../../Abstract/MathBehavior';
import Radical from '../../React-Components/Math/Radical';
import Math_Style from '../../Types/Math_Style';
/** @typedef {import('../../../Abstract/MathBehavior').behaviorSpec}behaviorSpec  */

export default class Radical_Behavior extends MathBehavior {
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
    this.type = 'Radical';
  }

  /**
   *@return {boolean}
   */
  _isValid() {
    const radicalBehavior = this;
    return this._isStyleValid() && doesRadicandExist();
    /**
     * @return {boolean}
     */
    function doesRadicandExist() {
      return radicalBehavior._radicandBehavior !== undefined;
    }
  }
  /**
   * @override
   */
  _preSetterSequence() {
    const radicalBehavior = this;
    updateChildStyles();
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
      if (radicalBehavior._doesDegreeExist()) {
        const currentCramped = radicalBehavior._mathStyle.cramped;
        radicalBehavior._degreeBehavior.mathStyle = new Math_Style(
          'SS',
          currentFontSize,
          currentCramped
        );
      }
    }
  }

  /**
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [this._radicandBehavior, this._degreeBehavior];
  }

  /**
   * @override
   */
  _postSetterSequence(radicalSettings) {
    const radicalBehavior = this;
    setContainerDimensions();
    updateRadicalGlyphBehavior();
    updateRadicand(); // width radicalSettings.radicandComponentStyle
    if (this._doesDegreeExist()) {
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
  }

  /**
   *
   * @param {Object} settings
   */
  _updateMetrics(settings) {
    this._metrics = settings.metrics;
  }

  /**
   * @return {boolean}
   */
  _doesDegreeExist() {
    return this._degreeBehavior !== undefined;
  }

  /**
   * @param {MathBehavior}rb
   */
  set radicandBehavior(rb) {
    this._radicandBehavior = rb;
    this.update();
  }
  /**
   * @return {MathBehavior}rb
   */
  get radicandBehavior() {
    return this._radicandBehavior;
  }
  /**
   * @param {MathBehavior}db
   */
  set degreeBehavior(db) {
    this._degreeBehavior = db;
    this.update();
  }
  /**
   * @return {MathBehavior}
   */
  get degreeBehavior() {
    return this._degreeBehavior;
  }
  /**
   * @return {MathBehavior}
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
