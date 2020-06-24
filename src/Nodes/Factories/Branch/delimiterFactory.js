import Spacing_Style from '../../Types/Spacing_Style';
import Delimiter_Node from '../../Branch Nodes/Delimiter/Delimiter_Node';
import Delimiter_Setter from '../../Branch Nodes/Delimiter/Delimiter_Setter';
import Delimiter_Behavior from '../../Branch Nodes/Delimiter/Delimiter_Behavior';
import variantGlyphFactory from '../Leaf/variantGlyphFactory';

/** @typedef {import('../nodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Delimiter_Node}
 */
export default function delimiterFactory(mathList, fontData) {
  const spec = generateSpec(fontData);
  const typesetter = new Delimiter_Setter(spec);
  const spacingStyle = Spacing_Style.Ordinary;
  const behavior = new Delimiter_Behavior({ typesetter, spacingStyle });
  const node = new Delimiter_Node(behavior);
  const glyphMathList = {
    unicode: mathList.unicode,
    spacingStyle: Spacing_Style.None,
  };
  node.glyph = variantGlyphFactory(glyphMathList, fontData);
  return node;
}

/**
 * @param {Object} fontData
 * @return {Object}
 */
export function generateSpec(fontData) {
  const mc = fontData.MATH.MathConstants;
  const fp = {};
  fp.upm = fontData.upm;
  fp.scriptFactor = mc.ScriptPercentScaleDown;
  fp.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;

  fp.delimitedSubFormulaMinHeight = mc.DelimitedSubFormulaMinHeight;

  return fp;
}
