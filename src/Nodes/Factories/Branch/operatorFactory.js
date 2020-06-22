import Spacing_Style from '../../Types/Spacing_Style';
import nodeFactory from '../nodeFactory';
import Operator_Setter from '../../Branch Nodes/Operator/Operator_Setter';
import Operator_Behavior from '../../Branch Nodes/Operator/Operator_Behavior';
import Operator_Node from '../../Branch Nodes/Operator/Operator_Node';

/** @typedef {import('../nodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Operator_Node} fontData
 */
export default function operatorFactory(mathList, fontData) {
  const setterSpec = getSetterSpec(fontData);
  const typesetter = new Operator_Setter(setterSpec);
  // spacing style is set in operator setter? NO!
  const spacingStyle = Spacing_Style.Operator;
  const behavior = new Operator_Behavior({ typesetter, spacingStyle });
  const node = new Operator_Node(behavior);
  node.nucleus = nodeFactory(mathList.nucleus, fontData);
  if (mathList.lowerLimit !== undefined) {
    node.lowerLimit = nodeFactory(mathList.lowerLimit, fontData);
  }
  if (mathList.upperLimit !== undefined) {
    node.upperLimit = nodeFactory(mathList.upperLimit, fontData);
  }
  return node;
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
