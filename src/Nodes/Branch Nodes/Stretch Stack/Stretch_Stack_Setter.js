import Typesetter from '../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../Leaf Nodes/Variant_Glyph/Variant_Glyph_Behavior').default} Variant_Glyph_Behavior  */
/** @typedef {import('../../Leaf Nodes/Glyph/Glyph_Behavior').default} Glyph_Behavior  */
/** @typedef {import('../../Abstract/Typesetter').setterSpec} setterSpec  */
/** @typedef {import('../../Abstract/Behavior').default} Behavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/**
 * @typedef {Object} ScriptSetterType
 */
export default class Stretch_Stack_Setter extends Typesetter {
  /**
   * @param {Object} spec
   * h,w,d of behavior
   * margins
   */
  constructor(spec) {
    super(spec);

    this._stretchStackTopShiftUp = spec.stretchStackTopShiftUp;
    this._stretchStackBottomShiftDown = spec.stretchStackBottomShiftDown;
    this._stretchStackGapAboveMin = spec.stretchStackGapAboveMin;
    this._stretchStackGapBelowMin = spec.stretchStackGapBelowMin;
  }

  /**
   * @param {number} pxpfu
   * @param {Variant_Glyph_Behavior} nucleusBehavior // will set nucleus desired size
   * @param {Behavior} lowerlimitBehavior
   * @param {Behavior} upperlimitBehavior
   * @return {Object} result contains
   * resultant Behavior = Scripts | Limits
   */
  generateSettings(
    pxpfu,
    nucleusBehavior,
    lowerlimitBehavior,
    upperlimitBehavior
  ) {
    const stretchStackSetter = this;
    updateNucleusSize();
    const totalWidth = calculateTotalWidth();
    const upperGap = doesUpperLimitExist() ? getUpperGap() : 0;
    const lowerGap = doesLowerLimitExist() ? getLowerGap() : 0;
    const upperLimitComponentStyle = doesUpperLimitExist()
      ? calculateUpperLimitComponentyStyle()
      : {};
    const lowerLimitComponentStyle = doesLowerLimitExist()
      ? calculateLowerLimitComponentStyle()
      : {};
    const nucleusComponentStyle = calculateNucleusComponentStyle();
    const metrics = calculateMetrics();
    return {
      metrics,
      upperLimitComponentStyle,
      nucleusComponentStyle,
      lowerLimitComponentStyle,
    };

    /**
     *
     */
    function updateNucleusSize() {
      if (nucleusBehavior.type === 'Variant_Glyph') {
        const upperWidth = doesUpperLimitExist()
          ? upperlimitBehavior.metrics.width
          : 0;
        const lowerWidth = doesLowerLimitExist()
          ? lowerlimitBehavior.metrics.width
          : 0;
        const maxWidth = Math.max(upperWidth, lowerWidth);
        nucleusBehavior.desiredSize = maxWidth;
      }
    }

    /**
     * @return {Object}
     */
    function calculateNucleusComponentStyle() {
      const marginLeft = (totalWidth - nucleusBehavior.metrics.width) / 2;
      return { marginLeft };
    }
    /**
     * @return {Object}
     */
    function calculateUpperLimitComponentyStyle() {
      const marginBottom = upperGap;
      const marginLeft = (totalWidth - upperlimitBehavior.metrics.width) / 2;
      return { marginBottom, marginLeft };
    }
    /**
     * @return {Object}
     */
    function calculateLowerLimitComponentStyle() {
      const marginTop = lowerGap;
      const marginLeft = (totalWidth - lowerlimitBehavior.metrics.width) / 2;
      return { marginTop, marginLeft };
    }

    /**
     * @return {number}
     */
    function calculateTotalWidth() {
      const nucleusWidth = nucleusBehavior.metrics.width;
      const upperWidth = doesUpperLimitExist()
        ? upperlimitBehavior.metrics.width
        : 0;
      const lowerWidth = doesLowerLimitExist()
        ? lowerlimitBehavior.metrics.width
        : 0;
      return Math.max(nucleusWidth, upperWidth, lowerWidth);
    }

    /**
     * @return {Metrics}
     */
    function calculateMetrics() {
      const nm = nucleusBehavior.metrics;
      const um = upperlimitBehavior.metrics;
      const lm = lowerlimitBehavior.metrics;
      const height = nm.height + upperGap + um.depth + um.height;
      const width = totalWidth;
      const depth = nm.depth + lowerGap + lm.height + lm.depth;
      return new Metrics(height, width, depth);
    }

    /**
     * @return {number}
     */
    function getUpperGap() {
      const minUpperGap = stretchStackSetter._stretchStackGapAboveMin * pxpfu;
      const defaultGap =
        stretchStackSetter._stretchStackTopShiftUp * pxpfu -
        upperlimitBehavior.metrics.depth;
      return Math.max(defaultGap, minUpperGap);
    }
    /**
     * @return {number}
     */
    function getLowerGap() {
      const minLowerGap = stretchStackSetter._stretchStackGapBelowMin * pxpfu;
      const defaultGap =
        stretchStackSetter._stretchStackBottomShiftDown * pxpfu -
        upperlimitBehavior.metrics.height;
      return Math.max(defaultGap, minLowerGap);
    }

    /**
     * @return {boolean}
     */
    function doesUpperLimitExist() {
      return upperlimitBehavior !== undefined;
    }
    /**
     * @return {boolean}
     */
    function doesLowerLimitExist() {
      return lowerlimitBehavior !== undefined;
    }
  }
}
