import mathNodeFactory from '../mathNodeFactory';
import Accent_Setter from '../../../Math Nodes/Branch Nodes/Accent/Accent_Setter';
import Accent_Node from '../../../Math Nodes/Branch Nodes/Accent/Accent_Node';
import Accent_Behavior from '../../../Math Nodes/Branch Nodes/Accent/Accent_Behavior';

/** @typedef {import('../mathNodeFactory').MathList} MathList */

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
  node.nucleus = mathNodeFactory(mathList.nucleus, fontData);
  node.accenter = mathNodeFactory(mathList.accenter, fontData);
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
