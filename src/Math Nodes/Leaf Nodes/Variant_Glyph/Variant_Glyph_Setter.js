import Typesetter from '../../../Abstract/Typesetter.js';
import Spacing_Style from '../../Types/Spacing_Style.js';

/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../../../Abstract/MathBehavior').default} MathBehavior */

export default class Variant_Glyph_Setter extends Typesetter {
  /**
   * @param {Object} spec
   */
  constructor(spec) {
    super(spec);
    this._fontData = spec.fontData;

    this._mainAxisCoordinate = spec.mainAxisCoordinate;
    this._doesExtensionExist = spec.doesExtensionExist;
    /**
     * variant = {unicode, glyphMetric, italicsCorrection, accentAttachment}
     */
    this._variants = spec.variants;

    this._glyphBehaviorFactory = spec.glyphBehaviorFactory;
    this._extendedGlyphBehaviorFactory = spec.extendedGlyphBehaviorFactory;
    this._extensionSettings = spec.extensionSettings;
  }

  // Behavior w/ Typesetter
  /**
   *
   * @param {number} pxpfu
   * @param {number} desiredSize
   * @return {MathBehavior}
   */
  generateSettings(pxpfu, desiredSize) {
    const variantGlyphSetter = this;
    const premadeVariant = findBestAvailableVariant();
    const isGlyphVariant = premadeVariant.isLargeEnough
      ? true
      : !this._doesExtensionExist;

    const behavior = isGlyphVariant
      ? generateGlyphBehavior()
      : generateExtendedGlyphBehavior();

    return behavior;

    /**
     * @return {MathBehavior}
     */
    function generateExtendedGlyphBehavior() {
      return variantGlyphSetter._extendedGlyphBehaviorFactory(
        desiredSize,
        variantGlyphSetter._extensionSettings,
        variantGlyphSetter._fontData
      );
    }

    /**
     * @return {MathBehavior}
     */
    function generateGlyphBehavior() {
      const mathList = {
        type: 'Glyph', // unnecessary but here for clarity
        unicode: premadeVariant.unicode,
        spacingStyle: Spacing_Style.None,
        centered: variantGlyphSetter.isVertical(),
      };
      const glyphBehavior = variantGlyphSetter._glyphBehaviorFactory(
        mathList,
        variantGlyphSetter._fontData
      );
      return glyphBehavior;
    }
    /**
     * @return {Object}
     */
    function findBestAvailableVariant() {
      const mainAxis = variantGlyphSetter._mainAxisCoordinate;
      for (const variant of variantGlyphSetter._variants) {
        const candidateAdvance =
          (variant.glyphMetric.bbox[mainAxis + '2'] -
            variant.glyphMetric.bbox[mainAxis + '1']) *
          pxpfu;
        if (candidateAdvance > desiredSize) {
          variant.isLargeEnough = true;
          return variant;
        }
      }
      // did not find variant big enough for desired size ,
      // returns an object that contains the largest available
      const bestVariant = variantGlyphSetter._variants.slice(-1)[0];
      bestVariant.isLargeEnough = false;
      return bestVariant;
    }
  }
  /**
   * @return {boolean}
   */
  isVertical() {
    return this._mainAxisCoordinate === 'y';
  }
}
