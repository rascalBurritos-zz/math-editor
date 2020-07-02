import Overbar_Setter from '../../../Branch Nodes/Bars/Overbar_Setter';
import Underbar_Setter from '../../../Branch Nodes/Bars/Underbar_Setter';
import Bar_Behavior from '../../../Branch Nodes/Bars/Bar_Behavior';
import Bar_Node from '../../../Branch Nodes/Bars/Bar_Node';
import mathNodeFactory from '../mathNodeFactory';

/** @typedef {import('../mathNodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Bar_Node}
 */
export default function barFactory(mathList, fontData) {
  const typesetter =
    mathList.type === 'Overbar'
      ? new Overbar_Setter(generateOverbarSpec())
      : new Underbar_Setter(generateUnderbarSpec());
  const spacingStyle = mathList.nucleus.spacingStyle;
  const behavior = new Bar_Behavior({ typesetter, spacingStyle });
  const node = new Bar_Node(behavior);
  node.nucleus = mathNodeFactory(mathList.nucleus, fontData);
  return node;
  /**
   * @return {Object}
   */
  function generateOverbarSpec() {
    const mc = fontData.MATH.MathConstants;
    const fp = {};
    fp.upm = fontData.upm;
    fp.scriptFactor = mc.ScriptPercentScaleDown;
    fp.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;

    fp.overbarVerticalGap = mc.OverbarVerticalGap;
    fp.overbarRuleThickness = mc.OverbarRuleThickness;
    fp.overbarExtraAscender = mc.OverbarExtraAscender;
    return fp;
  }
  /**
   * @return {Object}
   */
  function generateUnderbarSpec() {
    const mc = fontData.MATH.MathConstants;
    const fp = {};
    fp.upm = fontData.upm;
    fp.scriptFactor = mc.ScriptPercentScaleDown;
    fp.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;

    fp.underbarVerticalGap = mc.UnderbarVerticalGap;
    fp.underbarRuleThickness = mc.UnderbarRuleThickness;
    fp.underbarExtraDescender = mc.UnderbarExtraDescender;

    return fp;
  }
}
