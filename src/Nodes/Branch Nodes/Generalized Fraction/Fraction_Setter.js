import Typesetter from '../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../Leaf Nodes/Glyph/Glyph_Behavior').default} Glyph_Behavior  */
/** @typedef {import('../../Abstract/Typesetter').setterSpec} setterSpec  */
/** @typedef {import('../../Abstract/Behavior').default} Behavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/**
 * @typedef {Object} ScriptSetterType
 */
export default class Fraction_Setter extends Typesetter {
  /**
   * @param {Object} spec
   * h,w,d of behavior
   * margins
   */
  constructor(spec) {
    super(spec);

    this._mathAxis = spec.AxisHeight;
    this._NumeratorShiftUp = spec.NumeratorShiftUp;
    this._NumeratorDisplayStyleShiftUp = spec.NumeratorDisplayStyleShiftUp;
    this._DenominatorShiftDown = spec.DenominatorShiftDown;
    this._DenominatorDisplayStyleShiftDown =
      spec.DenominatorDisplayStyleShiftDown;
    this._NumeratorGapMin = spec.NumeratorGapMin;
    this._NumDisplayStyleGapMin = spec.NumDisplayStyleGapMin;
    this._RuleThickness = spec.RuleThickness;
    this._DenominatorGapMin = spec.DenominatorGapMin;
    this._DenomDisplayStyleGapMin = spec.DenomDisplayStyleGapMin;
  }

  /**
   * @param {number} pxpfu
   * @param {Math_Style} currentStyle
   * @param {Behavior} numeratorBehavior
   * @param {Behavior} denominatorBehavior
   * @return {Object} result contains
   * metrics
   * numerator component style
   * denominator component style
   * rule height
   */
  generateSettings(
    pxpfu,
    currentStyle,
    numeratorBehavior,
    denominatorBehavior
  ) {
    const fractionSetter = this;
    const numeratorGap = determineNumeratorGap();
    const denominatorGap = determineDenominatorGap();
    const totalWidth = determineTotalWidth();
    const numeratorComponentStyle = determineNumeratorComponentStyle();
    const denominatorComponentStyle = determineDenominatorComponentStyle();
    const ruleHeight = calculateRuleHeight();
    const ruleStyle = { height: ruleHeight };
    const metrics = calculateMetrics();
    return {
      metrics,
      numeratorComponentStyle,
      denominatorComponentStyle,
      ruleStyle,
    };

    /**
     * @return {Object} component style
     */
    function determineNumeratorComponentStyle() {
      const marginLeft = (totalWidth - numeratorBehavior.metrics.width) / 2;
      return {
        marginBottom: numeratorGap,
        marginLeft,
      };
    }
    /**
     * @return {Object} component style
     */
    function determineDenominatorComponentStyle() {
      const marginLeft = (totalWidth - denominatorBehavior.metrics.width) / 2;
      return {
        marginTop: denominatorGap,
        marginLeft,
      };
    }

    /**
     * @return {number}
     */
    function determineTotalWidth() {
      return Math.max(
        numeratorBehavior.metrics.width,
        denominatorBehavior.metrics.width
      );
    }

    /**
     * @return {Metrics}
     */
    function calculateMetrics() {
      const nm = numeratorBehavior.metrics;
      const dm = denominatorBehavior.metrics;
      const setMathAxis = fractionSetter._mathAxis * pxpfu;
      const height =
        nm.height + nm.depth + numeratorGap + ruleHeight / 2 + setMathAxis;
      const width = totalWidth;
      const depth =
        ruleHeight / 2 + denominatorGap + dm.height + dm.depth - setMathAxis;
      return new Metrics(height, width, depth);
    }

    /**
     * @return {number}
     */
    function calculateRuleHeight() {
      return fractionSetter._RuleThickness * pxpfu;
    }

    /**
     * @return {number}
     */
    function determineNumeratorGap() {
      const minClearance = determineNumeratorMinClearance();
      const defaultGap = determineNumeratorDefaultGap();
      return Math.max(defaultGap, minClearance);
      /**
       * @return {number}
       */
      function determineNumeratorDefaultGap() {
        const setMathAxis = fractionSetter._mathAxis * pxpfu;
        const baselineShiftUp =
          (currentStyle.type === 'D'
            ? fractionSetter._NumeratorDisplayStyleShiftUp
            : fractionSetter._NumeratorShiftUp) * pxpfu;
        return baselineShiftUp - numeratorBehavior.metrics.depth - setMathAxis;
      }
      /**
       * @return {number}
       */
      function determineNumeratorMinClearance() {
        return (
          (currentStyle.type === 'D'
            ? fractionSetter._NumDisplayStyleGapMin
            : fractionSetter._NumeratorGapMin) * pxpfu
        );
      }
    }
    /**
     * @return {number}
     */
    function determineDenominatorGap() {
      const minClearance = determineDenominatorMinClearance();
      const defaultGap = determineDenominatorDefaultGap();
      return Math.max(defaultGap, minClearance);
      /**
       * @return {number}
       */
      function determineDenominatorDefaultGap() {
        const setMathAxis = fractionSetter._mathAxis * pxpfu;
        const baselineShiftDown =
          (currentStyle.type === 'D'
            ? fractionSetter._DenominatorDisplayStyleShiftDown
            : fractionSetter._DenominatorShiftDown) * pxpfu;
        return (
          baselineShiftDown - denominatorBehavior.metrics.height - setMathAxis
        );
      }
      /**
       * @return {number}
       */
      function determineDenominatorMinClearance() {
        const minClearance =
          (currentStyle.type === 'D'
            ? fractionSetter._DenomDisplayStyleGapMin
            : fractionSetter._DenominatorGapMin) * pxpfu;
        return minClearance;
      }
    }
  }
}
