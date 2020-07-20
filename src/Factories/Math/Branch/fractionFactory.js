import mathViewFactory from '../mathViewFactory';
import Fraction_Setter from '../../../Math Nodes/Branch Nodes/Generalized Fraction/Fraction_Setter';
import Spacing_Style from '../../../Math Nodes/Types/Spacing_Style';
import Fraction_Behavior from '../../../Math Nodes/Branch Nodes/Generalized Fraction/Fraction_Behavior';

/** @typedef {import('../../../Math Nodes/Branch Nodes/Generalized Fraction/Generalized_Fraction_Behavior').default} Generalized_Fraction_Behavior  */
/** @typedef {import('../mathViewFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @param {Object} dependancyOrganizer
 * @return {Generalized_Fraction_Behavior}
 */
export default function fractionFactory(
  mathList,
  fontData,
  dependancyOrganizer
) {
  const spec = generateSpec(fontData);
  const typesetter = new Fraction_Setter(spec);
  const spacingStyle = Spacing_Style.Ordinary;
  const behavior = new Fraction_Behavior({ typesetter, spacingStyle });
  behavior.numeratorBehavior = mathViewFactory(
    mathList.numerator,
    fontData,
    dependancyOrganizer
  );
  behavior.denominatorBehavior = mathViewFactory(
    mathList.denominator,
    fontData,
    dependancyOrganizer
  );
  return behavior;
}

/**
 * @param {Object} fontData
 * @return {Object}
 */
export function generateSpec(fontData) {
  const mc = fontData.MATH.MathConstants;
  const fp = {};
  fp.upm = fontData.upm;
  fp.scriptFactor = mc.ScriptPercentScaleDown;
  fp.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;

  fp.AxisHeight = mc.AxisHeight;
  fp.NumeratorShiftUp = mc.FractionNumeratorShiftUp;
  fp.NumeratorDisplayStyleShiftUp = mc.FractionNumeratorDisplayStyleShiftUp;
  fp.DenominatorShiftDown = mc.FractionDenominatorShiftDown;
  fp.DenominatorDisplayStyleShiftDown =
    mc.FractionDenominatorDisplayStyleShiftDown;
  fp.NumeratorGapMin = mc.FractionNumeratorGapMin;
  fp.NumDisplayStyleGapMin = mc.FractionNumDisplayStyleGapMin;
  fp.RuleThickness = mc.FractionRuleThickness;
  fp.DenominatorGapMin = mc.FractionDenominatorGapMin;
  fp.DenomDisplayStyleGapMin = mc.FractionDenomDisplayStyleGapMin;
  return fp;
}
