import Typesetter from '../../Abstract/Typesetter.js';
import Glyph_Behavior from '../Glyph/Glyph_Behavior.js';
import Glyph_Setter from '../Glyph/Glyph_Setter.js';
import Centered_Glyph_Behavior from '../Glyph/Centered_Glyph_Behavior.js';
import Centered_Glyph_Setter from '../Glyph/Centered_Glyph_Setter.js';
import Spacing_Style from '../../Types/Spacing_Style.js';
import Extended_Glyph_Behavior from '../Extended_Glyph/Extended_Glyph_Behavior.js';
import Extended_Glyph_Setter from '../Extended_Glyph/Extended_Glyph_Setter.js';

/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../../Abstract/Behavior').default} Behavior */

export default class Variant_Glyph_Setter extends Typesetter {
  /**
   * @param {Object} spec
   */
  constructor(spec) {
    super(spec);
    this._mainAxisCoordinate = spec.mainAxisCoordinate;
    /**
     * variant = {unicode, glyphMetric, italicsCorrection, accentAttachment}
     */
    this._variants = spec.variants;

    this._axisHeight = spec.axisHeight;
    this._asc = spec.asc;
    this._des = spec.des;
    this._fontFamily = spec.fontFamily;

    this._extendedItalicsCorrection = spec.extendedItalicsCorrection;
    this._unAdjustedStringPathArray = spec.unAdjustedPathArray;
    this._unAdjustedViewBox = spec.unAdjustedViewBox;
  }

  // Behavior w/ Typesetter
  /**
   *
   * @param {number} desiredSize
   * @param {number} pxpfu
   * @param {Math_Style} mathStyle
   * @return {Behavior}
   */
  getBehavior(desiredSize, pxpfu, mathStyle) {
    const variantGlyphSetter = this;
    const premadeVariant = findBestAvailableVariant();
    const isGlyphVariant = premadeVariant.isLargeEnough
      ? true
      : !doesExtensionExist();

    const behavior = isGlyphVariant
      ? generateGlyphBehavior()
      : generateExtendedGlyphBehavior();

    /**
     * triggers update on behavior which sets
     * all uninitialized values
     */
    behavior.mathStyle = mathStyle;
    return behavior;

    /**
     * @return {Behavior}
     */
    function generateExtendedGlyphBehavior() {
      const spacingStyle = Spacing_Style.None;
      const setterSpec = {
        upm: variantGlyphSetter._upm,

        scriptFactor: variantGlyphSetter._scriptFactor,
        scriptscriptFactor: variantGlyphSetter._scriptscriptFactor,
        italicsCorrection: variantGlyphSetter._extendedItalicsCorrection,
        unAdjustedStringPathArray:
          variantGlyphSetter._unAdjustedStringPathArray,
        unAdjustedViewBox: variantGlyphSetter._unAdjustedViewBox,
        axisHeight: variantGlyphSetter._axisHeight,
      };
      const typesetter = new Extended_Glyph_Setter(setterSpec);
      const behavior = new Extended_Glyph_Behavior({
        typesetter,
        spacingStyle,
      });
      behavior.desiredSize = desiredSize;
      return behavior;
    }

    /**
     * @return {Behavior}
     */
    function generateGlyphBehavior() {
      const setterSpec = generateGlyphSetterSpec();
      let typesetter;
      let glyphBehavior;
      const spacingStyle = Spacing_Style.None;
      if (variantGlyphSetter.isVertical()) {
        setterSpec.mathAxis = variantGlyphSetter._axisHeight;
        typesetter = new Centered_Glyph_Setter(setterSpec);
        glyphBehavior = new Centered_Glyph_Behavior({
          typesetter,
          spacingStyle,
        });
      } else {
        typesetter = new Glyph_Setter(setterSpec);
        glyphBehavior = new Glyph_Behavior({ typesetter, spacingStyle });
      }
      return glyphBehavior;
      /**
       *@return {Object} setterSpec
       */
      function generateGlyphSetterSpec() {
        return {
          upm: variantGlyphSetter._upm,
          scriptFactor: variantGlyphSetter._scriptFactor,
          scriptscriptFactor: variantGlyphSetter._scriptscriptFactor,
          asc: variantGlyphSetter._asc,
          des: variantGlyphSetter._des,
          unicode: premadeVariant.unicode,
          fontFamily: variantGlyphSetter._fontFamily,
          glyphMetric: premadeVariant.glyphMetric,
          italicsCorrection: premadeVariant.italicsCorrection,
          accentAttachmentPoint: premadeVariant.accentAttachmentPoint,
        };
      }
    }
    /**
     * @return {boolean}
     */
    function doesExtensionExist() {
      return variantGlyphSetter._unAdjustedStringPathArray !== undefined;
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
