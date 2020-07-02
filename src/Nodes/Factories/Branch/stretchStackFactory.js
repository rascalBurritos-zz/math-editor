// import Spacing_Style from '../../Types/Spacing_Style';
import nodeFactory from '../nodeFactory';
import Operator_Node from '../../Branch Nodes/Operator/Operator_Node';
import Stretch_Stack_Setter from '../../Branch Nodes/Stretch Stack/Stretch_Stack_Setter';
import Stretch_Stack_Behavior from '../../Branch Nodes/Stretch Stack/Stretch_Stack_Behavior';
import universalGlyphFactory from './universalGlyphFactory';

/** @typedef {import('../nodeFactory').MathList} MathList */
/** @typedef {import('../../../Abstract/Document_Node').default} Document_Node */

/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Operator_Node} fontData
 */
export default function stretchStackFactory(mathList, fontData) {
  const setterSpec = getSetterSpec();
  const typesetter = new Stretch_Stack_Setter(setterSpec);
  // spacing style is set in operator setter? NO!
  const spacingStyle = mathList.nucleus.spacingStyle;
  const behavior = new Stretch_Stack_Behavior({ typesetter, spacingStyle });
  const node = new Operator_Node(behavior);
  node.nucleus = universalGlyphFactory(mathList.nucleus, fontData);
  if (mathList.lowerLimit !== undefined) {
    node.lowerLimit = nodeFactory(mathList.lowerLimit, fontData);
  }
  if (mathList.upperLimit !== undefined) {
    node.upperLimit = nodeFactory(mathList.upperLimit, fontData);
  }
  return node;
  /**
   * @return {Object}
   */
  function getSetterSpec() {
    const mc = fontData.MATH.MathConstants;
    const fp = {};
    fp.upm = fontData.upm;
    fp.scriptFactor = mc.ScriptPercentScaleDown;
    fp.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;

    fp.stretchStackTopShiftUp = mc.StretchStackTopShiftUp;
    fp.stretchStackBottomShiftDown = mc.StretchStackBottomShiftDown;
    fp.stretchStackGapAboveMin = mc.StretchStackGapAboveMin;
    fp.stretchStackGapBelowMin = mc.StretchStackGapBelowMin;

    fp.alignmentMode = mathList.alignmentMode;
    return fp;
  }
}
