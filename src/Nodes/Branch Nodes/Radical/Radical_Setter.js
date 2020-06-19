import Typesetter from '../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../Leaf Nodes/Glyph/Glyph_Behavior').default} Glyph_Behavior  */
/** @typedef {import('../../Abstract/Typesetter').setterSpec} setterSpec  */
/** @typedef {import('../../Abstract/Behavior').default} Behavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */

/**
 */
export default class Radical_Setter extends Typesetter {
  /**
   *
   * @param {Object} setterSpec
   */
  constructor(setterSpec) {
    super(setterSpec);
    this._mathAxis = setterSpec.mathAxis;
    this._verticalGap = setterSpec.verticalGap;
    this._displayVerticalGap = setterSpec.displayVerticalGap;
    this._ruleThickness = setterSpec.ruleThickness;
    this._extraAscender = setterSpec.extraAscender;
    this._kernBeforeDegree = setterSpec.kernBeforeDegree;
    this._kernAfterDegree = setterSpec.kernAfterDegree;
    this._degreeBottomRaisePercent = setterSpec.degreeBottomRaisePercent;

    this._radicalGlyphBehavior = setterSpec.radicalGlyphBehavior;
  }

  /**
   * @param {number} pxpfu
   * @param {Behavior} radicandBehavior
   * @param {Behavior} degreeBehavior
   * @return {Object}
   * contains
   * complete radical glyph behavior (properly set)
   * metrics
   * degree component Style
   * radicand component style
   * h,w of combination
   */
  generateSettings(pxpfu, radicandBehavior, degreeBehavior) {
    const radicalSetter = this;
    const radicalGlyphBehavior = this._radicalGlyphBehavior;
    const ruleThickness = radicalSetter._ruleThickness * pxpfu;
    const extraAscender = radicalSetter._extraAscender * pxpfu;
    const { radicandClearance, verticalGap } = calculateRadicandClearance();
    adjustRadicalGlyphBehavior();
    // assumes radical glyph is completely set and ready
    const radicandComponentStyle = calculateRadicandComponentStyle();
    let degreeComponentStyle;
    let degreeAdjustment = { verticalAdjustment: 0, horizontalAdjustment: 0 };
    if (doesDegreeExist()) {
      degreeAdjustment = calculateDegreeAdjustment();
      adjustComponentStylesforDegreeAdjustment();
    }
    const metrics = generateMetrics();
    const containerDimensions = generateContainerDimensions();
    return {
      containerDimensions,
      metrics,
      radicalGlyphBehavior,
      radicandComponentStyle,
      degreeComponentStyle,
    };
    /**
     * @return {Object} Container
     */
    function generateContainerDimensions() {
      const height = metrics.height + metrics.depth;
      return { height, width: metrics.width };
    }
    /**
     * adjusts radical glyph and degree
     * based on degree adjustments
     */
    function adjustComponentStylesforDegreeAdjustment() {
      const radicalGlyphMarginLeft = degreeAdjustment.horizontalAdjustment;
      const radicalGlyphMarginTop =
        degreeAdjustment.verticalAdjustment > 0
          ? degreeAdjustment.verticalAdjustment + extraAscender
          : extraAscender;
      radicalGlyphBehavior.appendComponentStyle({
        marginLeft: radicalGlyphMarginLeft,
        marginTop: radicalGlyphMarginTop, // actually margin Top scal(1,-1)
      });
      const degreeMarginLeft = radicalSetter._kernBeforeDegree * pxpfu;
      const degreeMarginTop =
        degreeAdjustment.verticalAdjustment < 0
          ? -degreeAdjustment.verticalAdjustment
          : 0;
      degreeComponentStyle = {
        marginLeft: degreeMarginLeft,
        marginTop: degreeMarginTop,
      };
    }
    /**
     * @return {Object} amount degree is jutting out
     */
    function calculateDegreeAdjustment() {
      const horizontalAdjustment = getHorizontalAdjustment();
      const verticalAdjustment = getVerticalAdjustment();
      return { horizontalAdjustment, verticalAdjustment };
      /**
       *@return {number}
       */
      function getHorizontalAdjustment() {
        const kernLeft = radicalSetter._kernBeforeDegree * pxpfu;
        const kernRight = radicalSetter._kernAfterDegree * pxpfu;
        const horizontalCandidate =
          kernLeft + degreeBehavior.metrics.width + kernRight;
        return horizontalCandidate > 0 ? horizontalCandidate : 0;
      }
      /**
       * @return {number}
       */
      function getVerticalAdjustment() {
        const delimiterTotalHeight =
          radicalGlyphBehavior.metrics.height +
          radicalGlyphBehavior.metrics.depth;
        const pxFromTopOfDelimiter =
          (1 - radicalSetter._degreeBottomRaisePercent / 100) *
          delimiterTotalHeight;
        const degreeTotalHeight =
          degreeBehavior.metrics.height + degreeBehavior.metrics.depth;
        const verticalAdjustment =
          degreeTotalHeight - pxFromTopOfDelimiter - extraAscender;
        return verticalAdjustment;
      }
    }
    /**
     * @return {Metrics}
     */
    function generateMetrics() {
      const rgMetrics = radicalSetter._radicalGlyphBehavior.metrics;
      const metricVerticalAdjustment =
        doesDegreeExist() && degreeAdjustment.verticalAdjustment > 0
          ? degreeAdjustment.verticalAdjustment
          : 0;
      const height =
        radicandComponentStyle.marginTop +
        radicandBehavior.metrics.height +
        metricVerticalAdjustment;
      // rgMetrics.height + extraAscender + metricVerticalAdjustment;
      // const depth = rgMetrics.depth;
      const depth =
        radicandComponentStyle.marginBottom + radicandBehavior.metrics.depth;
      const width = rgMetrics.width + degreeAdjustment.horizontalAdjustment;
      return new Metrics(height, width, depth);
    }

    /**
     * calculates top and bottom margins for radicand
     * @return {Object}
     */
    function calculateRadicandComponentStyle() {
      const rg = radicalSetter._radicalGlyphBehavior.metrics;
      const radicalGlyphHeight = rg.height + rg.depth - ruleThickness;
      const delta = (1 / 2) * (radicalGlyphHeight - radicandClearance);
      const marginTop = verticalGap + delta + ruleThickness + extraAscender;
      return { marginTop, marginBottom: delta };
    }
    /**
     * updates radicand glyph to fit radicand
     */
    function adjustRadicalGlyphBehavior() {
      radicalGlyphBehavior.mathStyle = radicandBehavior.mathStyle;
      radicalGlyphBehavior.desiredLength = radicandClearance;
      radicalGlyphBehavior.desiredWidth = radicandBehavior.metrics.width;
      radicalGlyphBehavior.appendComponentStyle({
        marginTop: extraAscender, // note scale(1,-1 ) in affect, in reality this is margin top
        position: 'absolute',
      });
    }
    /**
     * @return {Object} requested radical glyph height
     */
    function calculateRadicandClearance() {
      const m = radicandBehavior.metrics;
      const subClearance = m.height + m.depth;
      const verticalGap = determineRadicandVerticalGap();
      const radicandClearance = subClearance + verticalGap;
      return { radicandClearance, verticalGap };
      /**
       * @return {number} psi in appendix g illuminated
       */
      function determineRadicandVerticalGap() {
        const verticalGap =
          radicandBehavior.mathStyle.type === 'D'
            ? radicalSetter._displayVerticalGap
            : radicalSetter._verticalGap;
        return verticalGap * pxpfu;
      }
    }
    /**
     * @return {boolean}
     */
    function doesDegreeExist() {
      return degreeBehavior !== undefined;
    }
  }
}
