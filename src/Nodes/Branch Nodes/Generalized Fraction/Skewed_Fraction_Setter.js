import Typesetter from '../../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../../Abstract/Typesetter').setterSpec} setterSpec  */
/** @typedef {import('../../../Abstract/MathBehavior').default} Behavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/**
 * @typedef {Object} ScriptSetterType
 */
export default class Skewed_Fraction_Setter extends Typesetter {
  /**
   * @param {Object} spec
   * h,w,d of behavior
   * margins
   */
  constructor(spec) {
    super(spec);

    this._slashBehavior = spec.slashBehavior;

    this._mathAxis = spec.AxisHeight;
    this._skewedFractionHorizontalGap = spec.skewedFractionHorizontalGap;
    this._skewedFractionVerticalGap = spec.skewedFractionVerticalGap;
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
   * slash behavior
   */
  generateSettings(
    pxpfu,
    currentStyle,
    numeratorBehavior,
    denominatorBehavior
  ) {
    const skewedFractionSetter = this;
    const defaultTotalHeight = determineDefaultTotalHeight();
    setSlashBehavior();
    const actualTotalHeight = determineActualTotalHeight();
    const interSlashGap = calculateInterSlashGap();
    const numeratorComponentStyle = calculateNumeratorComponentStyle();
    const denominatorComponentStyle = calculateDenominatorComponentStyle();
    const metrics = calculateMetrics();
    return {
      metrics,
      numeratorComponentStyle,
      denominatorComponentStyle,
      slashBehavior: this._slashBehavior,
    };

    /**
     * @return {Metrics}
     */
    function calculateMetrics() {
      const nm = numeratorBehavior.metrics;
      const dm = numeratorBehavior.metrics;
      const height =
        actualTotalHeight / 2 + skewedFractionSetter._mathAxis * pxpfu;
      const width =
        nm.width +
        dm.width +
        skewedFractionSetter._skewedFractionHorizontalGap * pxpfu;
      const depth =
        actualTotalHeight / 2 - skewedFractionSetter._mathAxis * pxpfu;
      return new Metrics(height, width, depth);
    }

    /**
     * @return {number}
     */
    function calculateInterSlashGap() {
      const sm = skewedFractionSetter._slashBehavior.metrics;
      const horizontalGap =
        skewedFractionSetter._skewedFractionHorizontalGap * pxpfu;
      return (horizontalGap - sm.width) / 2;
    }

    /**
     * @return {Object}
     */
    function calculateNumeratorComponentStyle() {
      const nm = numeratorBehavior.metrics;
      const marginBottom = actualTotalHeight - nm.height - nm.depth;
      const marginRight = interSlashGap;
      return { marginBottom, marginRight, alignSelf: 'flex-start' };
    }
    /**
     * @return {Object}
     */
    function calculateDenominatorComponentStyle() {
      const dm = denominatorBehavior.metrics;
      const marginTop = actualTotalHeight - dm.height - dm.depth;
      const marginLeft = interSlashGap;
      return { marginTop, marginLeft, alignSelf: 'flex-end' };
    }

    /**
     * @return {number}
     */
    function determineActualTotalHeight() {
      const sm = skewedFractionSetter._slashBehavior.metrics;
      const slashTotalHeight = sm.height + sm.depth;
      return Math.max(defaultTotalHeight, slashTotalHeight);
    }

    /**
     *
     */
    function setSlashBehavior() {
      const sb = skewedFractionSetter._slashBehavior;
      sb.mathStyle = currentStyle;
      sb.desiredSize = defaultTotalHeight;
      const halfVerticalGap =
        (defaultTotalHeight - sb.metrics.height - sb.metrics.depth) / 2;
      const marginTop = halfVerticalGap > 0 ? halfVerticalGap : 0;
      sb.appendComponentStyle({ marginTop, alignSelf: 'flex-start' });
    }

    /**
     * @return {number}
     */
    function determineDefaultTotalHeight() {
      const dm = denominatorBehavior.metrics;
      const verticalGap =
        skewedFractionSetter._skewedFractionVerticalGap * pxpfu;
      return verticalGap + dm.height + dm.depth;
    }
  }
}
