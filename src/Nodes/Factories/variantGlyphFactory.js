import Variant_Glyph_Setter from '../Leaf-Nodes/Variant_Glyph/Variant_Glyph_Setter.js';
import Variant_Glyph_Behavior from '../Leaf-Nodes/Variant_Glyph/Variant_Glyph_Behavior.js';
import Document_Node from '../Abstract/Document_Node.js';

/** @typedef {import('./nodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Document_Node}
 */
export default function variantGlyphFactory(mathList, fontData) {
  const spacingStyle = mathList.spacingStyle;
  const setterSpec = generateSetterSpec(mathList, fontData);
  const typesetter = new Variant_Glyph_Setter(setterSpec);
  const behavior = new Variant_Glyph_Behavior({ typesetter, spacingStyle });
  const node = new Document_Node(behavior);
  return node;
}

/**
 * @param {Object} mathList
 * @param {Object} fontData
 * @return {Object}
 */
function generateSetterSpec(mathList, fontData) {
  const mc = fontData.MATH.MathConstants;
  const variantsSettings = generateVariants();
  const extensionSettings = generateExtensionProperties();
  const setterSpec = {
    upm: fontData.upm,
    scriptFactor: mc.ScriptPercentScaleDown,
    scriptscriptFactor: mc.ScriptScriptPercentScaleDown,
    mainAxisCoordinate: variantsSettings.mainAxisCoordinate,
    spacingStyle: mathList.spacingStyle,

    variants: variantsSettings.variants,

    axisHeight: mc.AxisHeight,
    des: fontData.des,
    asc: fontData.asc,
    fontFamily: fontData.fontFamily,

    extendedItalicsCorrection: extensionSettings.italicsCorrection,
    unAdjustedPathArray: extensionSettings.pathArray,
    unAdjustedViewBox: extensionSettings.viewBox,
  };
  return setterSpec;

  /**
   *@return {Object}
   */
  function generateExtensionProperties() {
    for (const mode in fontData.extendable) {
      if (fontData.extendable[mode][mathList.unicode] !== undefined) {
        const extendableEntry = fontData.extendable[mode][mathList.unicode];
        const pathArray = extendableEntry.stringArray;
        const viewBox = extendableEntry.viewBox;
        const italicsCorrection = parseInt(
          fontData.variants[mode][mathList.unicode].GlyphAssembly
            .ItalicsCorrection.Value.value,
          10
        );
        return { italicsCorrection, pathArray, viewBox };
      }
    }
    return undefined;
  }
  /**
   * @return {Object}
   */
  function generateVariants() {
    for (const mode in fontData.variants) {
      if (fontData.variants[mode][mathList.unicode] !== undefined) {
        const glyphEntry = fontData.variants[mode][mathList.unicode];
        const variantRecord = glyphEntry.MathGlyphVariantRecord;
        const variantArray = [];
        for (const variantGlyph of variantRecord) {
          const glyphName = variantGlyph.VariantGlyph.value;
          const unicode = fontData.glyphNameToUnicode[glyphName];
          const glyphMetric = fontData.glyphMetrics[unicode];
          const italicsCorrection = fontData.italicCorrectionMap[unicode]
            ? fontData.italicCorrectionMap[unicode]
            : 0;
          const accentAttachmentPoint = fontData.accentAttachment[unicode];
          variantArray.push({
            unicode,
            glyphMetric,
            italicsCorrection,
            accentAttachmentPoint,
          });
        }
        return {
          mainAxisCoordinate: determineMainAxisCoordinate(mode),
          variants: variantArray,
        };
      }
    }
    console.warn('DOESNT EXIST in variant glyph factory');
    return {};
    /**
     * @param {String} mode
     * @return {String}
     */
    function determineMainAxisCoordinate(mode) {
      const modeMap = {
        vertical: 'y',
        horizontal: 'x',
      };
      return modeMap[mode];
    }
  }
}
