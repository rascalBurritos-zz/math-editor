import Typesetter from '../../Abstract/Typesetter';

/** @typedef {import('../../Leaf Nodes/Variant_Glyph/Variant_Glyph_Behavior').default} Variant_Glyph_Behavior */
/** @typedef {import('../../Types/Math_Style').default} Metrics*/
/** @typedef {import('../../Abstract/Behavior').default} Behavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */

export default class Delimiter_Setter extends Typesetter {
  /**
   *
   * @param {Object} spec
   */
  constructor(spec) {
    super(spec);
    this._delimitedSubFormulaMinHeight = spec.delimitedSubFormulaMinHeight;
  }
  /**
   * @param {number} pxpfu
   * @param {Variant_Glyph_Behavior} glyphBehavior
   * @param {Behavior} targetBehavior
   * @return {Object} result contains
   * metrics
   * Component Style
   * nuclues componentStyle
   * accenter Component Style
   */
  generateSettings(pxpfu, glyphBehavior, targetBehavior) {
    // const delimiterSetter = this;
    const desiredSize = determineDesiredSize();
    setGlyphDesiredSize();
    const metrics = calculateMetrics();
    return { metrics };

    /**
     *
     */
    function setGlyphDesiredSize() {
      glyphBehavior.desiredSize = desiredSize;
    }

    /**
     * @return {number}
     */
    function determineDesiredSize() {
      // const scaleFactor =
      //   delimiterSetter._delimitedSubFormulaMinHeight / delimiterSetter._upm;
      return doesTargetExist()
        ? 2 *
            Math.max(
              targetBehavior.metrics.height,
              targetBehavior.metrics.depth
            )
        : 0;
    }

    /**
     * @return {boolean}
     */
    function doesTargetExist() {
      return targetBehavior !== undefined;
    }
    /**
     * @return {Metrics}
     */
    function calculateMetrics() {
      return glyphBehavior.metrics.copy();
    }
  }
}
