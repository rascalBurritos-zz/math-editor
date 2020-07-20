import mathViewFactory from '../mathViewFactory';
import Accent_Setter from '../../../Math Nodes/Branch Nodes/Accent/Accent_Setter';
import Accent_Behavior from '../../../Math Nodes/Branch Nodes/Accent/Accent_Behavior';

/** @typedef {import('../mathViewFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @param {Object} dependancyOrganizer
 * @return {Accent_Behavior}
 */
export default function scriptsFactory(
  mathList,
  fontData,
  dependancyOrganizer
) {
  const accentSpec = generateAccentSpec();
  const typesetter = new Accent_Setter(accentSpec);
  const spacingStyle = mathList.nucleus.spacingStyle;
  const behavior = new Accent_Behavior({ typesetter, spacingStyle });
  behavior.nucleusBehavior = mathViewFactory(
    mathList.nucleus,
    fontData,
    dependancyOrganizer
  );
  behavior.accenterBehavior = mathViewFactory(
    mathList.accenter,
    fontData,
    dependancyOrganizer
  );
  return behavior;

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
