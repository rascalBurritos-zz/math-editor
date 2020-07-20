import Overbar_Setter from '../../../Math Nodes/Branch Nodes/Bars/Overbar_Setter';
import Underbar_Setter from '../../../Math Nodes/Branch Nodes/Bars/Underbar_Setter';
import Bar_Behavior from '../../../Math Nodes/Branch Nodes/Bars/Bar_Behavior';
import mathViewFactory from '../mathViewFactory';

/** @typedef {import('../mathViewFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @param {Object} dependancyOrganizer
 * @return {Bar_Behavior}
 */
export default function barFactory(mathList, fontData, dependancyOrganizer) {
  const typesetter =
    mathList.type === 'Overbar'
      ? new Overbar_Setter(generateOverbarSpec())
      : new Underbar_Setter(generateUnderbarSpec());
  const spacingStyle = mathList.nucleus.spacingStyle;
  const behavior = new Bar_Behavior({ typesetter, spacingStyle });
  behavior.nucleusBehavior = mathViewFactory(
    mathList.nucleus,
    fontData,
    dependancyOrganizer
  );
  return behavior;
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
