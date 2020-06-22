import Typesetter from '../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../Leaf Nodes/Variant_Glyph/Variant_Glyph_Behavior').default} Variant_Glyph_Behavior  */
/** @typedef {import('../../Leaf Nodes/Glyph/Glyph_Behavior').default} Glyph_Behavior  */
/** @typedef {import('../../Abstract/Typesetter').setterSpec} setterSpec  */
/** @typedef {import('../../Abstract/Behavior').default} Behavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/**
 */
export default class Limits_Setter extends Typesetter {
  /**
   * @param {Object} spec
   * h,w,d of behavior
   * margins
   */
  constructor(spec) {
    super(spec);
    this._upperLimitGapMin = spec.upperLimitGapMin;
    this._upperLimitBaselineRiseMin = spec.upperLimitBaselineRiseMin;
    this._lowerLimitGapMin = spec.lowerLimitGapMin;
    this._lowerLimitBaselineDropMin = spec.lowerLimitBaselineDropMin;
    // font parameters
  }

  /**
   * @param {number} pxpfu
   * @param {Variant_Glyph_Behavior} nucleusBehavior
   * @param {Behavior} upperLimitBehavior
   * @param {Behavior} lowerLimitBehavior
   * @return {Object} result contains
   * metrics
   * container componentStyle
   * upper limit component Style
   * nucleus limit component Style
   * lower limit component Style
   */
  generateSettings(
    pxpfu,
    nucleusBehavior,
    upperLimitBehavior,
    lowerLimitBehavior
  ) {
    const limitsSetter = this;
    const totalWidth = calculateTotalWidth();
    const margins = calculateBaseMargins();
    // calculate metrics
    // calculate margins from metrics

    let aboveNucleusHeight = 0;
    let upperLimitJut = 0;
    let upperLimitComponentStyle = {};
    if (doesUpperLimitExist()) {
      calculateUpperLimit();
    }
    let belowNucluesDepth = 0;
    let lowerLimitJut = 0;
    let lowerLimitComponentStyle = {};
    if (doesLowerLimitExist()) {
      calculateLowerLimit();
    }
    const metrics = calculateMetrics();
    const nucleusComponentStyle = calculateNucleusComponentStyle();
    const containerStyle = calculateContainerStyle();
    return {
      upperLimitComponentStyle,
      lowerLimitComponentStyle,
      nucleusComponentStyle,
      metrics,
      containerStyle,
    };

    /**
     * @return {number}
     */
    function calculateTotalWidth() {
      const nm = nucleusBehavior.metrics;
      const um = doesUpperLimitExist()
        ? upperLimitBehavior.metrics
        : new Metrics(0, 0, 0);
      const lm = doesLowerLimitExist()
        ? lowerLimitBehavior.metrics
        : new Metrics(0, 0, 0);
      const width = Math.max(nm.width, um.width, lm.width);
      return width;
    }
    /**
     * @return {Object}
     */
    function calculateBaseMargins() {
      const nucleusMargin = (totalWidth - nucleusBehavior.metrics.width) / 2;
      const upperLimitMargin = doesUpperLimitExist()
        ? (totalWidth - upperLimitBehavior.metrics.width) / 2
        : 0;
      const lowerLimitMargin = doesLowerLimitExist()
        ? (totalWidth - lowerLimitBehavior.metrics.width) / 2
        : 0;
      return { nucleusMargin, upperLimitMargin, lowerLimitMargin };
    }

    /**
     *
     */
    function calculateUpperLimit() {
      const upperLimitBottomMargin = calculateUpperLimitBottomMargin();
      upperLimitJut = calculateHalfItalicsCorrection();
      aboveNucleusHeight =
        upperLimitBottomMargin +
        upperLimitBehavior.metrics.height +
        upperLimitBehavior.metrics.depth;
      upperLimitComponentStyle = {
        marginRight: margins.upperLimitMargin,
        marginBottom: upperLimitBottomMargin,
        alignSelf: 'flex-end',
      };
      /**
       * @return {number}
       */
      function calculateUpperLimitBottomMargin() {
        const gapMin = limitsSetter._upperLimitGapMin * pxpfu;
        const baselineRise =
          limitsSetter._upperLimitBaselineRiseMin * pxpfu -
          upperLimitBehavior.metrics.depth;
        return Math.max(gapMin, baselineRise);
      }
    }

    /**
     *
     */
    function calculateLowerLimit() {
      const lowerLimitTopMargin = calculateLowerLimitTopMargin();
      lowerLimitJut = calculateHalfItalicsCorrection();
      belowNucluesDepth =
        lowerLimitTopMargin +
        lowerLimitBehavior.metrics.height +
        lowerLimitBehavior.metrics.depth;
      lowerLimitComponentStyle = {
        marginTop: lowerLimitTopMargin,
        marginLeft: margins.lowerLimitMargin,
        alignSelf: 'flex-start',
      };
      /**
       * @return {number}
       */
      function calculateLowerLimitTopMargin() {
        const gapMin = limitsSetter._lowerLimitGapMin * pxpfu;
        const baselineDrop =
          limitsSetter._lowerLimitBaselineDropMin * pxpfu -
          lowerLimitBehavior.metrics.height;
        return Math.max(gapMin, baselineDrop);
      }
    }

    /**
     * @return {Object}
     */
    function calculateContainerStyle() {
      const nm = nucleusBehavior.metrics;
      const height =
        aboveNucleusHeight + nm.height + nm.depth + belowNucluesDepth;
      const width =
        lowerLimitJut + 2 * margins.nucleusMargin + nm.width + upperLimitJut;
      return { height, width, marginLeft: -lowerLimitJut };
    }

    /**
     * @return {Metrics}
     */
    function calculateMetrics() {
      const nm = nucleusBehavior.metrics;
      const height = nm.height + aboveNucleusHeight;
      const depth = nm.depth + belowNucluesDepth;
      return new Metrics(height, totalWidth, depth);
    }

    /**
     * @return {Object} Component Style
     */
    function calculateNucleusComponentStyle() {
      return {
        marginLeft: lowerLimitJut + margins.nucleusMargin,
        marginRight: upperLimitJut + margins.nucleusMargin,
      };
    }
    /**
     * @return {number}
     */
    function calculateHalfItalicsCorrection() {
      return nucleusBehavior.italicsCorrection / 2;
    }

    /**
     * @return {boolean}
     */
    function doesUpperLimitExist() {
      return upperLimitBehavior !== undefined;
    }
    /**
     * @return {boolean}
     */
    function doesLowerLimitExist() {
      return lowerLimitBehavior !== undefined;
    }
  }
}
