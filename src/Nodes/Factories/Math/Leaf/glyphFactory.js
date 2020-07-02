import Glyph_Setter from '../../../Leaf Nodes/Glyph/Glyph_Setter';
import Glyph_Behavior from '../../../Leaf Nodes/Glyph/Glyph_Behavior';
import Centered_Glyph_Behavior from '../../../Leaf Nodes/Glyph/Centered_Glyph_Behavior.js';
import Document_Node from '../../../../Abstract/Document_Node';
/** @typedef {import('../mathNodeFactory').MathList} MathList  */
/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Document_Node}
 */
export default function glyphFactory(mathList, fontData) {
  const glyphBehavior = glyphBehaviorFactory(mathList, fontData);
  const glyphNode = new Document_Node(glyphBehavior);
  return glyphNode;
}

/**
 * @param {Object} mathList
 * @param {Object} fontData
 * @return {Glyph_Behavior}
 */
export function glyphBehaviorFactory(mathList, fontData) {
  const spacingStyle = mathList.spacingStyle;
  const italicsCorrection = fontData.italicCorrectionMap[mathList.unicode];
  const mc = fontData.MATH.MathConstants;
  const accentAttachment = fontData.accentAttachment[mathList.unicode];
  const setterSpec = generateSetterSpec();
  const typesetter = new Glyph_Setter(setterSpec);
  const glyphBehavior = mathList.centered
    ? new Centered_Glyph_Behavior({ typesetter, spacingStyle })
    : new Glyph_Behavior({ typesetter, spacingStyle });
  return glyphBehavior;
  /**
   * @return {Object}
   */
  function generateSetterSpec() {
    const spec = {};
    spec.upm = fontData.upm;
    spec.scriptFactor = mc.ScriptPercentScaleDown;
    spec.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;
    spec.asc = fontData.asc;
    spec.des = fontData.des;
    spec.unicode = mathList.unicode;
    spec.fontFamily = fontData.fontFamily;
    spec.glyphMetric = fontData.glyphMetrics[mathList.unicode];
    spec.italicsCorrection = italicsCorrection ? italicsCorrection : 0;
    spec.accentAttachmentPoint = accentAttachment;
    spec.mathAxis = mc.AxisHeight;
    return spec;
  }
}
