import mathNodeFactory from '../mathNodeFactory';
import Generalized_Fraction_Node from '../../../Branch Nodes/Generalized Fraction/Generalized_Fraction_Node';
import Spacing_Style from '../../../Types/Spacing_Style';
import { variantGlyphBehaviorFactory } from '../Leaf/variantGlyphFactory';
import Skewed_Fraction_Setter from '../../../Branch Nodes/Generalized Fraction/Skewed_Fraction_Setter';
import Skewed_Fraction_Behavior from '../../../Branch Nodes/Generalized Fraction/Skewed_Fraction_Behavior';

/** @typedef {import('../../../../Abstract/MathBehavior').default} MathBehavior  */

/** @typedef {import('../mathNodeFactory').MathList} MathList */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Generalized_Fraction_Node}
 */
export default function skewedFractionFactory(mathList, fontData) {
  const spec = generateSpec(fontData);
  const typesetter = new Skewed_Fraction_Setter(spec);
  const spacingStyle = Spacing_Style.Ordinary;
  const behavior = new Skewed_Fraction_Behavior({ typesetter, spacingStyle });
  const node = new Generalized_Fraction_Node(behavior);
  node.numerator = mathNodeFactory(mathList.numerator, fontData);
  node.denominator = mathNodeFactory(mathList.denominator, fontData);
  return node;
  /**
   * @param {Object} fontData
   * @return {Object}
   */
  function generateSpec(fontData) {
    const mc = fontData.MATH.MathConstants;
    const fp = {};
    fp.upm = fontData.upm;
    fp.scriptFactor = mc.ScriptPercentScaleDown;
    fp.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;

    fp.slashBehavior = generateSlashBehavior();

    fp.AxisHeight = mc.AxisHeight;
    fp.skewedFractionHorizontalGap = mc.SkewedFractionHorizontalGap;
    fp.skewedFractionVerticalGap = mc.SkewedFractionVerticalGap;
    return fp;
  }
  /**
   * @return {MathBehavior | boolean}
   */
  function generateSlashBehavior() {
    const slashMathList = {
      spacingStyle: Spacing_Style.None,
      unicode: '47',
    };
    return variantGlyphBehaviorFactory(slashMathList, fontData);
  }
}
