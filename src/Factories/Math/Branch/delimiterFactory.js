import Spacing_Style from '../../../Math Nodes/Types/Spacing_Style';
import Delimiter_Setter from '../../../Math Nodes/Branch Nodes/Delimiter/Delimiter_Setter';
import Delimiter_Behavior from '../../../Math Nodes/Branch Nodes/Delimiter/Delimiter_Behavior';
import variantGlyphFactory from '../Leaf/variantGlyphFactory';

/** @typedef {import('../mathViewFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @param {Object} dependancyOrganizer
 * @return {Delimiter_Behavior}
 */
export default function delimiterFactory(
  mathList,
  fontData,
  dependancyOrganizer
) {
  const spec = generateSpec(fontData);
  const typesetter = new Delimiter_Setter(spec);
  const spacingStyle = Spacing_Style.Ordinary;
  const behavior = new Delimiter_Behavior({ typesetter, spacingStyle });
  const glyphMathList = {
    unicode: mathList.unicode,
    spacingStyle: Spacing_Style.None,
  };
  behavior.glyphBehavior = variantGlyphFactory(
    glyphMathList,
    fontData,
    dependancyOrganizer
  );
  return behavior;
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
