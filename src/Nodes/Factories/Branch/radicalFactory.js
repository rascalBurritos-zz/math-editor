import Radical_Glyph_Setter from '../../Leaf-Nodes/Radical_Glyph/Radical_Glyph_Setter.js';
import Radical_Glyph_Behavior from '../../Leaf-Nodes/Radical_Glyph/Radical_Glyph_Behavior.js';
import Spacing_Style from '../../Types/Spacing_Style.js';
import Radical_Node from '../../Non-Leaf-Nodes/Radical/Radical_Node.js';
import Radical_Behavior from '../../Non-Leaf-Nodes/Radical/Radical_Behavior.js';
import Radical_Setter from '../../Non-Leaf-Nodes/Radical/Radical_Setter.js';
import nodeFactory from '../nodeFactory.js';

/** @typedef {import('../nodeFactory').MathList} MathList */
/** @typedef {import('../../Leaf-Nodes/Radical_Glyph/Radical_Glyph_Setter.js').radicalSetterSpec} radicalGlyphSetterSpec  */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 *@return {Radical_Node}
 */
export default function radicalFactory(mathList, fontData) {
  const spacingStyle = Spacing_Style.Ordinary;
  const setterSpec = generateSetterSpec();
  const typesetter = new Radical_Setter(setterSpec);
  const behavior = new Radical_Behavior({ typesetter, spacingStyle });
  const node = new Radical_Node(behavior);
  node.radicand = nodeFactory(mathList.radicand, fontData);
  if (mathList.degree) {
    node.degree = nodeFactory(mathList.degree, fontData);
  }
  return node;

  /**
   * @return {Object}
   */
  function generateSetterSpec() {
    const mc = fontData.MATH.MathConstants;
    const setterSpec = {};
    setterSpec.upm = fontData.upm;
    setterSpec.scriptFactor = mc.ScriptPercentScaleDown;
    setterSpec.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;

    setterSpec.mathAxis = mc.AxisHeight;
    setterSpec.verticalGap = mc.RadicalVerticalGap;
    setterSpec.displayVerticalGap = mc.RadicalDisplayStyleVerticalGap;
    setterSpec.ruleThickness = mc.RadicalRuleThickness;
    setterSpec.extraAscender = mc.RadicalExtraAscender;
    setterSpec.kernBeforeDegree = mc.RadicalKernBeforeDegree;
    setterSpec.kernAfterDegree = mc.RadicalKernAfterDegree;
    setterSpec.degreeBottomRaisePercent = mc.RadicalDegreeBottomRaisePercent;
    setterSpec.radicalGlyphBehavior = radicalGlyphBehaviorFactory(fontData);
    return setterSpec;
  }
}

/**
 * @param {Object} fontData
 * @return {Radical_Glyph_Behavior}
 */
function radicalGlyphBehaviorFactory(fontData) {
  const setterSpec = generateSetterSpec();
  const spacingStyle = Spacing_Style.None;
  const typesetter = new Radical_Glyph_Setter(setterSpec);
  const behavior = new Radical_Glyph_Behavior({ typesetter, spacingStyle });
  return behavior;

  /**
   * @return {radicalGlyphSetterSpec}
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
