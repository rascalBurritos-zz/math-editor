import Variant_Glyph_Setter from '../../../Leaf Nodes/Variant_Glyph/Variant_Glyph_Setter.js';
import Variant_Glyph_Behavior from '../../../Leaf Nodes/Variant_Glyph/Variant_Glyph_Behavior.js';
import Document_Node from '../../../../Abstract/Document_Node.js';
import { glyphBehaviorFactory } from './glyphFactory.js';
import extendedGlyphBehaviorFactory from './extendedGlyphBehaviorFactory.js';

/** @typedef {import('../mathNodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Document_Node}
 */
export default function variantGlyphFactory(mathList, fontData) {
  const behavior = variantGlyphBehaviorFactory(mathList, fontData);
  if (!behavior) console.warn('Invalid Behavior');
  const node = new Document_Node(behavior);
  return node;
}

/**
 * @param {Object} mathList
 * @param {Object} fontData
 * @return {Variant_Glyph_Behavior | boolean}
 */
export function variantGlyphBehaviorFactory(mathList, fontData) {
  const spacingStyle = mathList.spacingStyle;
  const setterSpec = generateSetterSpec(mathList, fontData);
  if (!setterSpec) return false;
  const typesetter = new Variant_Glyph_Setter(setterSpec);
  return new Variant_Glyph_Behavior({ typesetter, spacingStyle });
}

/**
 * @param {Object} mathList
 * @param {Object} fontData
 * @return {Object}
 */
function generateSetterSpec(mathList, fontData) {
  const variantsSettings = generateVariants();
  if (!variantsSettings) return false;
  const extensionSettings = generateExtensionProperties();
  const mc = fontData.MATH.MathConstants;
  const setterSpec = {
    upm: fontData.upm,
    scriptFactor: mc.ScriptPercentScaleDown,
    scriptscriptFactor: mc.ScriptScriptPercentScaleDown,

    fontData,

    mainAxisCoordinate: variantsSettings.mainAxisCoordinate,
    doesExtensionExist: doesExtensionExist(),

    variants: variantsSettings.variants,

    glyphBehaviorFactory,
    extendedGlyphBehaviorFactory,

    extensionSettings,
  };
  return setterSpec;
  /**
   * @return {boolean}
   */
  function doesExtensionExist() {
    return extensionSettings !== undefined;
  }
  /**
   * @return {Object}
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

    return false;
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
