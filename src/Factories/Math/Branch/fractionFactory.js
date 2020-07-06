import mathNodeFactory from '../mathNodeFactory';
import Generalized_Fraction_Node from '../../../Math Nodes/Branch Nodes/Generalized Fraction/Generalized_Fraction_Node';
import Fraction_Setter from '../../../Math Nodes/Branch Nodes/Generalized Fraction/Fraction_Setter';
import Spacing_Style from '../../../Math Nodes/Types/Spacing_Style';
import Fraction_Behavior from '../../../Math Nodes/Branch Nodes/Generalized Fraction/Fraction_Behavior';

/** @typedef {import('../mathNodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Generalized_Fraction_Node}
 */
export default function fractionFactory(mathList, fontData) {
  const spec = generateSpec(fontData);
  const typesetter = new Fraction_Setter(spec);
  const spacingStyle = Spacing_Style.Ordinary;
  const behavior = new Fraction_Behavior({ typesetter, spacingStyle });
  const node = new Generalized_Fraction_Node(behavior);
  node.numerator = mathNodeFactory(mathList.numerator, fontData);
  node.denominator = mathNodeFactory(mathList.denominator, fontData);
  return node;
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
