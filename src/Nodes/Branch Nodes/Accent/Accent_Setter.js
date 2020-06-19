import Typesetter from '../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../Leaf Nodes/Glyph/Glyph_Behavior').default} Glyph_Behavior  */
/** @typedef {import('../../Leaf Nodes/Leaf_Behavior').default} Leaf_Behavior */
/** @typedef {import('../../Abstract/Typesetter').setterSpec} setterSpec  */
/** @typedef {import('../../Abstract/Behavior').default} Behavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/**
 * @typedef {Object} AccenentSetterType
 */
export default class Accent_Setter extends Typesetter {
  /**
   * @param {Object} spec
   * h,w,d of behavior
   * margins
   */
  constructor(spec) {
    super(spec);
    this._accentBaseHeight = spec.accentBaseHeight;
    this._flattenedAccentBaseHeight = spec.flattenedAccentBaseHeight;
  }

  /**
   * @param {number} pxpfu
   * @param {Leaf_Behavior} nucleusBehavior
   * @param {Leaf_Behavior} accenterBehavior
   * @return {Object} result contains
   * metrics
   * Component Style
   * nuclues componentStyle
   * accenter Component Style
   */
  generateSettings(pxpfu, nucleusBehavior, accenterBehavior) {
    const accentSetter = this;
    const alignment = calculateAlignment();
    const nucleusComponentStyle = calculateNucleusComponentStyle();
    const accenterComponentStyle = calculateAccenterComponentStyle();
    const metrics = calculateMetrics();
    return {
      nucleusComponentStyle,
      accenterComponentStyle,
      metrics,
    };

    /**
     * @return {Metrics}
     */
    function calculateMetrics() {
      const nb = nucleusBehavior.metrics;
      const height =
        accenterBehavior.accentAttachment.accenterHeight -
        alignment.vertical +
        nb.height;
      return new Metrics(height, nb.width, nb.depth);
    }

    /**
     * @return {Object}
     */
    function calculateAccenterComponentStyle() {
      const left = alignment.horizontal;
      const accenterHeight =
        accenterBehavior.accentAttachment.accenterHeight - alignment.vertical;
      const ab = accenterBehavior.metrics;
      const totalAccenterHeight = ab.height + ab.depth;
      const bottom =
        accenterHeight -
        totalAccenterHeight +
        nucleusBehavior.metrics.depth +
        nucleusBehavior.metrics.height;
      return { left, bottom, position: 'absolute' };
    }

    /**
     * @return {Object}
     */
    function calculateAlignment() {
      const horizontal = calculateHorizontal();
      const vertical = calculateVertical();
      return { horizontal, vertical };
      /**
       * @return {number}
       */
      function calculateVertical() {
        const overlap = Math.min(
          nucleusBehavior.metrics.height,
          accentSetter._accentBaseHeight * pxpfu
        );
        return overlap;
      }
      /**
       * @return {number}
       */
      function calculateHorizontal() {
        const nb = nucleusBehavior.accentAttachment.attachmentPoint;
        const ab = accenterBehavior.accentAttachment.attachmentPoint;
        const horizontalAmount = nb - ab;
        return horizontalAmount;
      }
    }
    /**
     * @return {Object}
     */
    function calculateNucleusComponentStyle() {
      return { position: 'absolute', bottom: '0' };
    }
  }
}
