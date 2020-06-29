import Typesetter from '../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../Abstract/Behavior').default} Behavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */

export default class Overbar_Setter extends Typesetter {
  /**
   *
   * @param {Object} spec
   */
  constructor(spec) {
    super(spec);
    this._overbarVerticalGap = spec.overbarVerticalGap;
    this._overbarRuleThickness = spec.overbarRuleThickness;
    this._overbarExtraAscender = spec.overbarExtraAscender;
  }
  /**
   * @param {number} pxpfu
   * @param {Behavior} nucleusBehavior
   * @return {Object} result contains
   * overbar style
   * metrics
   */
  generateSettings(pxpfu, nucleusBehavior) {
    const overbarSetter = this;
    const barStyle = calculateOverbarStyle();
    const metrics = calculateMetrics();
    return { metrics, barStyle, isOverbar: true };

    /**
     * @return {Object}
     */
    function calculateOverbarStyle() {
      const marginBottom = overbarSetter._overbarVerticalGap * pxpfu;
      const marginTop = overbarSetter._overbarExtraAscender * pxpfu;
      const height = overbarSetter._overbarRuleThickness * pxpfu;
      return { marginBottom, marginTop, height };
    }
    /**
     * @return {Metrics}
     */
    function calculateMetrics() {
      const gm = nucleusBehavior.metrics;
      const os = barStyle;
      const height = gm.height + os.marginBottom + os.height + os.marginTop;
      const width = gm.width;
      const depth = gm.depth;
      return new Metrics(height, width, depth);
    }
  }
}
