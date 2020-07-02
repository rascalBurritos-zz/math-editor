import Typesetter from '../../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../Leaf Nodes/Glyph/Glyph_Behavior').default} Glyph_Behavior  */
/** @typedef {import('../../../Abstract/Typesetter').setterSpec} setterSpec  */
/** @typedef {import('../../../Abstract/MathBehavior').default} Behavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/**
 * @typedef {Object} ScriptSetterType
 */
export default class Stack_Setter extends Typesetter {
  /**
   * @param {Object} spec
   * h,w,d of behavior
   * margins
   */
  constructor(spec) {
    super(spec);

    this._stackTopShiftUp = spec.stackTopShiftUp;
    this._stackTopDisplayStyleShiftUp = spec.stackTopDisplayStyleShiftUp;
    this._stackBottomShiftDown = spec.stackBottomShiftDown;
    this._stackBottomDisplayStyleShiftDown =
      spec.stackBottomDisplayStyleShiftDown;
    this._stackGapMin = spec.stackGapMin;
    this._stackDisplayStyleGapMin = spec.stackDisplayStyleGapMin;
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
    const stackSetter = this;
    const shifts = determineShifts();
    const totalWidth = determineTotalWidth();
    const numeratorComponentStyle = determineNumeratorComponentStyle();
    const denominatorComponentStyle = determineDenominatorComponentStyle();
    const metrics = calculateMetrics();
    return {
      metrics,
      numeratorComponentStyle,
      denominatorComponentStyle,
    };

    /**
     * @return {Object}
     */
    function determineShifts() {
      let numShiftUp;
      let denomShiftDown;
      let gapMin;
      if (currentStyle.type === 'D') {
        numShiftUp = stackSetter._stackTopDisplayStyleShiftUp * pxpfu;
        denomShiftDown = stackSetter._stackBottomDisplayStyleShiftDown * pxpfu;
        gapMin = stackSetter._stackDisplayStyleGapMin * pxpfu;
      } else {
        numShiftUp = stackSetter._stackTopShiftUp * pxpfu;
        denomShiftDown = stackSetter._stackBottomShiftDown * pxpfu;
        gapMin = stackSetter._stackGapMin * pxpfu;
      }
      const defaultGap =
        numShiftUp -
        numeratorBehavior.metrics.depth +
        (denomShiftDown - denominatorBehavior.metrics.height);
      const gap = Math.max(defaultGap, gapMin);
      const gapDifference = gapMin - defaultGap;
      const num =
        gapMin > defaultGap ? numShiftUp + gapDifference / 2 : numShiftUp;
      const den =
        gapMin > defaultGap
          ? denomShiftDown + gapDifference / 2
          : denomShiftDown;
      return { gap, num, den };
    }

    /**
     * @return {Object} component style
     */
    function determineNumeratorComponentStyle() {
      const marginLeft = (totalWidth - numeratorBehavior.metrics.width) / 2;
      return {
        marginBottom: shifts.gap,
        marginLeft,
      };
    }
    /**
     * @return {Object} component style
     */
    function determineDenominatorComponentStyle() {
      const marginLeft = (totalWidth - denominatorBehavior.metrics.width) / 2;
      return { marginLeft };
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
      const height = nm.height + shifts.num;
      const width = totalWidth;
      const depth = shifts.den + dm.depth;
      return new Metrics(height, width, depth);
    }
  }
}
