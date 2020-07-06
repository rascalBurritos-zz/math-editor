import Scripts_Setter from '../../../Math Nodes/Branch Nodes/Scripts/Scripts_Setter';
import Scripts_Behavior from '../../../Math Nodes/Branch Nodes/Scripts/Scripts_Behavior.js';
import Scripts_Node from '../../../Math Nodes/Branch Nodes/Scripts/Scripts_Node';
import mathNodeFactory from '../mathNodeFactory';

/** @typedef {import('../mathNodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Scripts_Node}
 */
export default function scriptsFactory(mathList, fontData) {
  const setterSpec = getScriptFontParameters(fontData);
  const typesetter = new Scripts_Setter(setterSpec);
  const spacingStyle = mathList.nucleus.spacingStyle;
  const scriptsBehavior = new Scripts_Behavior({ typesetter, spacingStyle });
  const scriptsNode = new Scripts_Node(scriptsBehavior);
  scriptsNode.nucleus = mathNodeFactory(mathList.nucleus, fontData);
  if (mathList.subscript !== undefined) {
    scriptsNode.subscript = mathNodeFactory(mathList.subscript, fontData);
  }
  if (mathList.superscript !== undefined) {
    scriptsNode.superscript = mathNodeFactory(mathList.superscript, fontData);
  }
  return scriptsNode;
}

/**
 * @param {Object} fontData
 * @return {Object}
 */
export function getScriptFontParameters(fontData) {
  const mc = fontData.MATH.MathConstants;
  const fp = {};
  fp.upm = fontData.upm;
  fp.scriptFactor = mc.ScriptPercentScaleDown;
  fp.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;
  fp.subscriptShiftDown = mc.SubscriptShiftDown;
  fp.subscriptTopMax = mc.SubscriptTopMax;
  fp.subscriptBaselineDropMin = mc.SubscriptBaselineDropMin;
  fp.superscriptShiftUp = mc.SuperscriptShiftUp;
  fp.superscriptShiftUpCramped = mc.SuperscriptShiftUpCramped;
  fp.superscriptBottomMin = mc.SuperscriptBottomMin;
  fp.superscriptBaselineDropMax = mc.SuperscriptBaselineDropMax;
  fp.subSuperscriptGapMin = mc.SubSuperscriptGapMin;
  fp.superscriptBottomMaxWithSubscript = mc.SuperscriptBottomMaxWithSubscript;
  fp.spaceAfterScript = mc.SpaceAfterScript;
  return fp;
}
