import Typesetter from '../../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../../Abstract/MathBehavior').default} Behavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */

export default class Underbar_Setter extends Typesetter {
  /**
   *
   * @param {Object} spec
   */
  constructor(spec) {
    super(spec);

    this._underbarVerticalGap = spec.underbarVerticalGap;
    this._underbarRuleThickness = spec.underbarRuleThickness;
    this._underbarExtraDescender = spec.underbarExtraDescender;
  }
  /**
   * @param {number} pxpfu
   * @param {Behavior} nucleusBehavior
   * @return {Object} result contains
   * overbar style
   * metrics
   * component
   */
  generateSettings(pxpfu, nucleusBehavior) {
    const underbarSetter = this;
    const barStyle = calculateUnderbarStyle();
    const metrics = calculateMetrics();
    return { metrics, barStyle, isOverbar: false };

    /**
     * @return {Object}
     */
    function calculateUnderbarStyle() {
      const marginBottom = underbarSetter._underbarExtraDescender * pxpfu;
      const marginTop = underbarSetter._underbarVerticalGap * pxpfu;
      const height = underbarSetter._underbarRuleThickness * pxpfu;
      return { marginBottom, marginTop, height };
    }
    /**
     * @return {Metrics}
     */
    function calculateMetrics() {
      const gm = nucleusBehavior.metrics;
      const us = barStyle;
      const height = gm.height;
      const width = gm.width;
      const depth = gm.depth + us.marginTop + us.height + us.marginBottom;
      return new Metrics(height, width, depth);
    }
  }
}
