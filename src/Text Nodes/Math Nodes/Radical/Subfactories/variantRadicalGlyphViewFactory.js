import extendedGlyphViewFactory from './extendedGlyphViewFactory';

/**
 *
 * @param {*} completeRadicalSpec
 * @param {*} premadeVariant
 * @param {*} pxpfu
 * @param {*} desiredWidth
 * @return {Object}
 */
export default function variantRadicalGlyphViewFactory(
  completeRadicalSpec,
  premadeVariant,
  pxpfu,
  desiredWidth
) {
  const variantRadicalGlyphSpec = generateRadicalGlyphVariantSpec(
    completeRadicalSpec,
    premadeVariant
  );

  return extendedGlyphViewFactory(pxpfu, variantRadicalGlyphSpec, desiredWidth);
  // const spacingStyle = Spacing_Style.None;
  /**
   *@param {Object} completeRadicalSpec
   *@param {Object} premadeVariant
   *@return {Object} setterSpec
   */
  function generateRadicalGlyphVariantSpec(
    completeRadicalSpec,
    premadeVariant
  ) {
    return {
      upm: completeRadicalSpec.upm,
      scriptFactor: completeRadicalSpec.scriptFactor,
      scriptscriptFactor: completeRadicalSpec.scriptscriptFactor,
      italicsCorrection: premadeVariant.italicsCorrection,
      unAdjustedStringPathArray: premadeVariant.stringArray,
      unAdjustedViewBox: premadeVariant.viewBox,
      axisHeight: completeRadicalSpec.axisHeight,
      forceCenter: true,
    };
  }
}
