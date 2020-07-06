import mathNodeFactory from '../mathNodeFactory';
import Generalized_Fraction_Node from '../../../Math Nodes/Branch Nodes/Generalized Fraction/Generalized_Fraction_Node';
import Spacing_Style from '../../../Math Nodes/Types/Spacing_Style';
import Stack_Setter from '../../../Math Nodes/Branch Nodes/Generalized Fraction/Stack_Setter';
import Stack_Behavior from '../../../Math Nodes/Branch Nodes/Generalized Fraction/Stack_Behavior';

/** @typedef {import('../mathNodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Generalized_Fraction_Node}
 */
export default function stackFactory(mathList, fontData) {
  const spec = generateSpec(fontData);
  const typesetter = new Stack_Setter(spec);
  const spacingStyle = Spacing_Style.Ordinary;
  const behavior = new Stack_Behavior({ typesetter, spacingStyle });
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

  fp.stackTopShiftUp = mc.StackTopShiftUp;
  fp.stackTopDisplayStyleShiftUp = mc.StackTopDisplayStyleShiftUp;
  fp.stackBottomShiftDown = mc.StackBottomShiftDown;
  fp.stackBottomDisplayStyleShiftDown = mc.StackBottomDisplayStyleShiftDown;
  fp.stackGapMin = mc.StackGapMin;
  fp.stackDisplayStyleGapMin = mc.StackDisplayStyleGapMin;
  return fp;
}
