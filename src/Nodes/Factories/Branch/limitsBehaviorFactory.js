/** @typedef {import('../nodeFactory').MathList} MathList */

import Limits_Behavior from '../../Branch Nodes/Operator/Limits_Behavior';
import Limits_Setter from '../../Branch Nodes/Operator/Limits_Setter';
import Spacing_Style from '../../Types/Spacing_Style';

/**
 * @param {Object} fontData
 * @return {Limits_Behavior}
 */
export default function limitsBehaviorFactory(fontData) {
  const setterSpec = getSetterSpec(fontData);
  const typesetter = new Limits_Setter(setterSpec);
  const spacingStyle = Spacing_Style.Operator;
  const limitsBehavior = new Limits_Behavior({ typesetter, spacingStyle });
  return limitsBehavior;
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
  fp.upperLimitGapMin = mc.UpperLimitGapMin;
  fp.upperLimitBaselineRiseMin = mc.UpperLimitBaselineRiseMin;
  fp.lowerLimitGapMin = mc.LowerLimitGapMin;
  fp.lowerLimitBaselineDropMin = mc.LowerLimitBaselineDropMin;
  return fp;
}
