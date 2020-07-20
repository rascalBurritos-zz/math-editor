import Spacing_Style from '../../../Math Nodes/Types/Spacing_Style.js';
import Formula_Setter from '../../../Math Nodes/Branch Nodes/Formula/Formula_Setter.js';
import Formula_Behavior from '../../../Math Nodes/Branch Nodes/Formula/Formula_Behavior.js';
import mathViewFactory from '../mathViewFactory.js';

/** @typedef {import('../mathViewFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @param {Object} dependancyOrganizer
 * @return {Formula_Behavior}
 */
export default function formulaFactory(
  mathList,
  fontData,
  dependancyOrganizer
) {
  const spacingStyle = Spacing_Style.None;
  const mc = fontData.MATH.MathConstants;
  const typesetter = new Formula_Setter({
    upm: fontData.upm,
    scriptFactor: mc.ScriptPercentScaleDown,
    scriptscriptFactor: mc.ScriptScriptPercentScaleDown,
  });
  const behavior = new Formula_Behavior({ typesetter, spacingStyle });
  const elementBehaviors = [];
  for (const listElement of mathList.elements) {
    elementBehaviors.push(
      mathViewFactory(listElement, fontData, dependancyOrganizer)
    );
  }
  behavior.elementBehaviors = elementBehaviors;
  return behavior;
}
