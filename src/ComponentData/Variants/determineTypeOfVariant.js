import { bestVariant } from './bestVariant.js';
import { GlyphComponentData } from '../GlyphComponentData.js';
import { ExtendedGlyphComponentData } from '../ExtendedGlyphComponentData.js';

/**
 * @return {any}
 *
 * @param {*} baseUnicode
 * @param {*} desiredSize
 * @param {*} currentFontSize
 * @param {*} direction
 * @param {*} fontData
 */
export function determineTypeOfVariant(
  baseUnicode,
  desiredSize,
  currentFontSize,
  direction,
  fontData
) {
  const foundVariant = bestVariant(
    baseUnicode,
    desiredSize,
    currentFontSize,
    direction,
    fontData.variants,
    fontData.upm,
    fontData.glyphNameToUnicode
  );
  if (typeof foundVariant === 'number') {
    let mathAxis = parseInt(
      fontData.MATH.MathConstants.AxisHeight.Value.value,
      10
    );
    let glyphComponent = new GlyphComponentData(
      String.fromCodePoint(foundVariant),
      currentFontSize,
      fontData.glyphMetrics[foundVariant],
      fontData.upm,
      fontData.fontFamily,
      fontData.asc,
      fontData.des,
      true,
      mathAxis
    );
    let pxpfu = currentFontSize / fontData.upm;
    glyphComponent.width =
      parseInt(fontData.glyphMetrics[foundVariant].advanceWidth, 10) * pxpfu;
    glyphComponent.css.width = glyphComponent.width + 'px';
    glyphComponent.innerStyle.left = '0px';
    glyphComponent.css.outline = '';
    return glyphComponent;
  }

  let glyphSpec = {
    baseUnicode,
    currentFontSize,
    desiredSize,
    direction,
    fontData,
    pxpfu: currentFontSize / fontData.upm,
  };
  let result = new ExtendedGlyphComponentData(glyphSpec);
  return result;
}
