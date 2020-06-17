import nodeFactory from '../nodeFactory';
import Accent_Setter from '../../Non-Leaf-Nodes/Accent/Accent_Setter';
import Accent_Node from '../../Non-Leaf-Nodes/Accent/Accent_Node';
import Accent_Behavior from '../../Non-Leaf-Nodes/Accent/Accent_Behavior';

/** @typedef {import('../nodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Accent_Node}
 */
export default function scriptsFactory(mathList, fontData) {
  const accentSpec = generateAccentSpec();
  const typesetter = new Accent_Setter(accentSpec);
  const spacingStyle = mathList.nucleus.spacingStyle;
  const behavior = new Accent_Behavior({ typesetter, spacingStyle });
  const node = new Accent_Node(behavior);
  node.nucleus = nodeFactory(mathList.nucleus, fontData);
  node.accenter = nodeFactory(mathList.accenter, fontData);
  return node;

  /**
   * @return {Object}
   */
  function generateAccentSpec() {
    const mc = fontData.MATH.MathConstants;
    const spec = {};
    spec.upm = fontData.upm;
    spec.upm = fontData.upm;
    spec.scriptFactor = mc.ScriptPercentScaleDown;
    spec.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;
    spec.accentBaseHeight = mc.AccentBaseHeight;
    spec.flattenedAccentBaseHeight = mc.FlattenedAccentBaseHeight;
    return spec;
  }
}
