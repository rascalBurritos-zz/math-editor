import Spacing_Style from '../../Types/Spacing_Style';
import Extended_Glyph_Behavior from '../Extended_Glyph/Extended_Glyph_Behavior';
import Extended_Glyph_Setter from '../Extended_Glyph/Extended_Glyph_Setter';
import Radical_Extension_Behavior from './Radical_Extension_Behavior.js';
import Radical_Extension_Setter from './Radical_Extension_Setter.js';

import Typesetter from '../../../Abstract/Typesetter';
/** @typedef {import('../../../Abstract/Typesetter').setterSpec} setterSpec */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/** @typedef {import('../../../Abstract/MathBehavior').default} MathBehavior  */

/** @typedef {import('./Radical_Extension_Setter').extendedRadicalSetterSpec} extendedRadicalSetterSpec */
/** @typedef {import('../Extended_Glyph/Extended_Glyph_Setter').extendedGlyphSetterSpec} extendedGlyphSetterSpec */

/**
 * @typedef {Object} radicalSetterLike
 * @property {Array} variants
 * @property {Object} extended
 * @property {number} axisHeight
 * @typedef {setterSpec & radicalSetterLike} radicalSetterSpec
 */

export default class Radical_Glyph_Setter extends Typesetter {
  /**
   *
   * @param {radicalSetterSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._variants = spec.variants;
    this._extended = spec.extended;
    this._axisHeight = spec.axisHeight;
  }

  /**
   * @override
   * @param {number} pxpfu
   * @param {number} desiredLength
   * @param {number} desiredWidth
   * @return {MathBehavior}
   */
  generateSettings(pxpfu, desiredLength, desiredWidth) {
    const radicalSetter = this;
    const premadeVariant = findBestAvailableVariant();
    const isRadicalGlyph = premadeVariant.isLargeEnough;

    const behavior = isRadicalGlyph
      ? generateRadicalGlyphBehavior()
      : generateExtendedRadicalBehavior();

    return behavior;

    /**
     * @return {MathBehavior}
     */
    function generateExtendedRadicalBehavior() {
      const spacingStyle = Spacing_Style.None;
      const setterSpec = generateRadicalExtensionSetterSpec();
      const typesetter = new Radical_Extension_Setter(setterSpec);
      const behavior = new Radical_Extension_Behavior({
        typesetter,
        spacingStyle,
      });
      behavior.desiredLength = desiredLength;
      behavior.desiredWidth = desiredWidth;
      return behavior;
      /**
       * @return {extendedRadicalSetterSpec}
       */
      function generateRadicalExtensionSetterSpec() {
        return {
          upm: radicalSetter._upm,
          scriptFactor: radicalSetter._scriptFactor,
          scriptscriptFactor: radicalSetter._scriptscriptFactor,
          italicsCorrection: premadeVariant.italicsCorrection,

          unAdjustedStringPathArray: radicalSetter._extended.stringArray,
          unAdjustedViewBox: radicalSetter._extended.viewBox,
          axisHeight: radicalSetter._axisHeight,
        };
      }
    }

    /**
     * @return {MathBehavior}
     */
    function generateRadicalGlyphBehavior() {
      const setterSpec = generateRadicalGlyphSetterSpec();
      const spacingStyle = Spacing_Style.None;
      const typesetter = new Extended_Glyph_Setter(setterSpec);
      const behavior = new Extended_Glyph_Behavior({
        typesetter,
        spacingStyle,
      });
      behavior.desiredSize =
        desiredWidth + premadeVariant.viewBox.xTotal * pxpfu;
      return behavior;
      /**
       *@return {extendedGlyphSetterSpec} setterSpec
       */
      function generateRadicalGlyphSetterSpec() {
        return {
          upm: radicalSetter._upm,
          scriptFactor: radicalSetter._scriptFactor,
          scriptscriptFactor: radicalSetter._scriptscriptFactor,
          italicsCorrection: premadeVariant.italicsCorrection,

          unAdjustedStringPathArray: premadeVariant.stringArray,
          unAdjustedViewBox: premadeVariant.viewBox,
          axisHeight: radicalSetter._axisHeight,
          forceCenter: true,
        };
      }
    }

    /**
     * @return {Object}
     */
    function findBestAvailableVariant() {
      for (const variant of radicalSetter._variants) {
        const radicalHeight = variant.viewBox.yTotal * pxpfu;
        if (radicalHeight > desiredLength) {
          variant.isLargeEnough = true;
          return variant;
        }
      }
      // did not find variant big enough for desired size ,
      // returns an object that contains the largest available
      const bestVariant = radicalSetter._variants.slice(-1)[0];
      bestVariant.isLargeEnough = false;
      return bestVariant;
    }
  }
}
