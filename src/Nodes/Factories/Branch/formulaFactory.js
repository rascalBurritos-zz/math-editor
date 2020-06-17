import Spacing_Style from '../../Types/Spacing_Style.js';
import Formula_Setter from '../../Branch Nodes/Formula/Formula_Setter.js';
import Formula_Behavior from '../../Branch Nodes/Formula/Formula_Behavior.js';
import Formula_Node from '../../Branch Nodes/Formula/Formula_Node.js';
import nodeFactory from '../nodeFactory.js';

/** @typedef {import('../nodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Formula_Node}
 */
export default function formulaFactory(mathList, fontData) {
  const spacingStyle = Spacing_Style.None;
  const mc = fontData.MATH.MathConstants;
  const typesetter = new Formula_Setter({
    upm: fontData.upm,
    scriptFactor: mc.ScriptPercentScaleDown,
    scriptscriptFactor: mc.ScriptScriptPercentScaleDown,
  });
  const formulaBehavior = new Formula_Behavior({ typesetter, spacingStyle });
  const formulaNode = new Formula_Node(formulaBehavior);
  const elementNodes = [];
  for (const listElement of mathList.elements) {
    elementNodes.push(nodeFactory(listElement, fontData));
  }
  formulaNode.elements = elementNodes;
  return formulaNode;
}
