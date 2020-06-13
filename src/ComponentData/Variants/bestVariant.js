/**
 *  @return {any}
 * @param {*} unicode
 * @param {*} desiredSize
 * @param {*} fontSize
 * @param {*} direction
 * @param {*} fontDataVariants
 * @param {*} upm
 * @param {*} glyphNameToUnicode
 */
export function bestVariant(
  unicode,
  desiredSize,
  fontSize,
  direction,
  fontDataVariants,
  upm,
  glyphNameToUnicode
) {
  let variantMap;
  const pxpfu = fontSize / upm;
  if (direction === 'vertical') {
    variantMap = fontDataVariants.vertical;
  } else if (direction === 'horizontal') {
    variantMap = fontDataVariants.horizontal;
  }
  for (const variant of variantMap[unicode].MathGlyphVariantRecord) {
    const candidateAdvance =
      parseInt(variant.AdvanceMeasurement.value, 10) * pxpfu;

    if (candidateAdvance > desiredSize) {
      return parseInt(glyphNameToUnicode[variant.VariantGlyph.value], 10);
    }
  }
  // did not find variant big enough for desired size ,
  // returns an object that contains the largest available
  return {
    largestAvailable: parseInt(
      glyphNameToUnicode[variant.VariantGlyph.value],
      10
    ),
  };
}
