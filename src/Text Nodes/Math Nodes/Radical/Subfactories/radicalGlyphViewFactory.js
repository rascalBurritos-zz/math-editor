import { extendedRadicalViewFactory } from './extendedRadicalViewFactory';
import variantRadicalGlyphViewFactory from './variantRadicalGlyphViewFactory';
import Identity from '../../../../Interaction/Util/Identity';

/**
 * @param {*} fontData
 * @param {*} pxpfu
 * @param {*} desiredLength
 * @param {*} desiredWidth
 * @param {*} collectingView
 * @return {Object}
 */
export function radicalGlyphViewFactory(
  fontData,
  pxpfu,
  desiredLength,
  desiredWidth,
  collectingView
) {
  const spec = generateSetterSpec(fontData);
  // const spacingStyle = Spacing_Style.None;
  const view = generateView(pxpfu, spec, desiredLength, desiredWidth);
  addId(view);
  collectingView[view.id] = view;
  return view;

  /**
   * @param {*} view
   */
  function addId(view) {
    view.id = Identity.getNextId();
  }

  /**
   * @param {Object} fontData
   * @return {Object}
   */
  function generateSetterSpec(fontData) {
    const mc = fontData.MATH.MathConstants;
    return {
      upm: fontData.upm,
      scriptFactor: mc.ScriptPercentScaleDown,
      scriptscriptFactor: mc.ScriptScriptPercentScaleDown,
      variants: getVariants(fontData),
      extended: fontData.extendable.radicals.extended,
      axisHeight: mc.AxisHeight,
    };
  }
  /**
   * retrieves the singly extended radicals
   * @param {Object} fontData
   * @return {Array}
   */
  function getVariants(fontData) {
    const variants = [];
    for (const unicode in fontData.extendable.radicals) {
      if (unicode !== 'extended') {
        variants.push(fontData.extendable.radicals[unicode]);
      }
    }
    return variants;
  }
  /**
   * @override
   * @param {number} pxpfu
   * @param {Object} radicalSpec contains extended and variants
   * @param {number} desiredLength
   * @param {number} desiredWidth
   * @return {Object}
   */
  function generateView(pxpfu, radicalSpec, desiredLength, desiredWidth) {
    const premadeVariant = findBestAvailableVariant(spec);
    const isRadicalGlyph = premadeVariant.isLargeEnough;
    const desiredSize = desiredWidth + premadeVariant.viewBox.xTotal * pxpfu;
    const view = isRadicalGlyph
      ? variantRadicalGlyphViewFactory(
          radicalSpec,
          premadeVariant,
          pxpfu,
          desiredSize
        )
      : extendedRadicalViewFactory(
          radicalSpec,
          premadeVariant,
          pxpfu,
          desiredLength,
          desiredSize
        );

    return view;

    /**
     * @param {Object} spec
     * @return {Object}
     */
    function findBestAvailableVariant(spec) {
      for (const variant of spec.variants) {
        const radicalHeight = variant.viewBox.yTotal * pxpfu;
        if (radicalHeight > desiredLength) {
          variant.isLargeEnough = true;
          return variant;
        }
      }
      // did not find variant big enough for desired size ,
      // returns an object that contains the largest available
      const bestVariant = spec.variants.slice(-1)[0];
      bestVariant.isLargeEnough = false;
      return bestVariant;
    }
  }
}
