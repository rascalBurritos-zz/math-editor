import Spacing_Style from '../../../Math Nodes/Types/Spacing_Style';
import mathViewFactory from '../mathViewFactory';
import Operator_Setter from '../../../Math Nodes/Branch Nodes/Operator/Operator_Setter';
import Operator_Behavior from '../../../Math Nodes/Branch Nodes/Operator/Operator_Behavior';
import Operator_Node from '../../../Math Nodes/Branch Nodes/Operator/Operator_Node';
import variantGlyphFactory from '../Leaf/variantGlyphFactory';
import MathBehavior from '../../../Abstract/MathBehavior';

/** @typedef {import('../mathViewFactory').MathList} MathList */
/** @typedef {import('../../../Abstract/Document_Node').default} Document_Node */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @param {Object} dependancyOrganizer
 * @return {Operator_Behavior} fontData
 */
export default function operatorFactory(
  mathList,
  fontData,
  dependancyOrganizer
) {
  const setterSpec = getSetterSpec(fontData);
  const typesetter = new Operator_Setter(setterSpec);
  // spacing style is set in operator setter? NO!
  const spacingStyle = Spacing_Style.Operator;
  const behavior = new Operator_Behavior({ typesetter, spacingStyle });
  behavior.nucleusBehavior = generateNucleus();
  if (mathList.lowerLimit !== undefined) {
    behavior.lowerLimitBehavior = mathViewFactory(
      mathList.lowerLimit,
      fontData,
      dependancyOrganizer
    );
  }
  if (mathList.upperLimit !== undefined) {
    behavior.upperLimitBehavior = mathViewFactory(
      mathList.upperLimit,
      fontData,
      dependancyOrganizer
    );
  }
  return node;

  /**
   * @return {MathBehavior}
   */
  function generateNucleus() {
    const nucleusMathList = {
      type: 'Variant_Glyph',
      unicode: mathList.unicode,
      spacingStyle: Spacing_Style.None,
    };
    return variantGlyphFactory(nucleusMathList, fontData, dependancyOrganizer);
  }
}

/**
 * @param {Object} fontData
 * @return {Object}
 */
export function getSetterSpec(fontData) {
  const mc = fontData.MATH.MathConstants;
  const fp = {};
  fp.upm = fontData.upm;
  fp.scriptFactor = mc.ScriptPercentScaleDown;
  fp.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;
  fp.fontData = fontData;
  fp.displayOperatorMinHeight = mc.DisplayOperatorMinHeight;
  return fp;
}
