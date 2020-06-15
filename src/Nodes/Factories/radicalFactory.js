import Document_Node from '../Abstract/Document_Node.js';
import Radical_Setter from '../Leaf-Nodes/Radical_Glyph/Radical_Setter.js';
import Radical_Behavior from '../Leaf-Nodes/Radical_Glyph/Radical_Behavior.js';

/** @typedef {import('./nodeFactory').MathList} MathList */
/** @typedef {import('../Leaf-Nodes/Radical_Glyph/Radical_Setter.js').radicalSetterSpec} radicalSetterSpec  */
/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Document_Node}
 */
export default function variantGlyphFactory(mathList, fontData) {
  const spacingStyle = mathList.spacingStyle;
  const setterSpec = generateSetterSpec();
  const typesetter = new Radical_Setter(setterSpec);
  const behavior = new Radical_Behavior({ typesetter, spacingStyle });
  const node = new Document_Node(behavior);
  return node;

  /**
   * @return {radicalSetterSpec}
   */
  function generateSetterSpec() {
    const mc = fontData.MATH.MathConstants;
    return {
      upm: fontData.upm,
      scriptFactor: mc.ScriptPercentScaleDown,
      scriptscriptFactor: mc.ScriptScriptPercentScaleDown,
      variants: getVariants(),
      extended: fontData.extendable.radicals.extended,
      axisHeight: mc.AxisHeight,
    };
  }
  /**
   * retreives the singly extended radicals
   * @return {Array}
   */
  function getVariants() {
    const variants = [];
    for (const unicode in fontData.extendable.radicals) {
      if (unicode !== 'extended') {
        variants.push(fontData.extendable.radicals[unicode]);
      }
    }
    return variants;
  }
}
