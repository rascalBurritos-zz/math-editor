import Glyph_Setter from '../Leaf-Nodes/Glyph/Glyph_Setter';
import Glyph_Behavior from '../Leaf-Nodes/Glyph/Glyph_Behavior';
import Centered_Glyph_Setter from '../Leaf-Nodes/Glyph/Centered_Glyph_Setter';
import Centered_Glyph_Behavior from '../Leaf-Nodes/Glyph/Centered_Glyph_Behavior.js';
import Document_Node from '../Abstract/Document_Node';
/** @typedef {import('./nodeFactory').MathList} MathList  */
/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Glyph_Node}
 */
export default function glyphFactory(mathList, fontData) {
  const spacingStyle = mathList.spacingStyle;
  const italicsCorrection = fontData.italicCorrectionMap[mathList.unicode];
  const mc = fontData.MATH.MathConstants;
  const accentAttachment = fontData.accentAttachment[mathList.unicode];
  const setterSpec = {
    upm: fontData.upm,
    scriptFactor: mc.ScriptPercentScaleDown,
    scriptscriptFactor: mc.ScriptScriptPercentScaleDown,
    asc: fontData.asc,
    des: fontData.des,
    unicode: mathList.unicode,
    fontFamily: fontData.fontFamily,
    glyphMetric: fontData.glyphMetrics[mathList.unicode],
    italicsCorrection: italicsCorrection ? italicsCorrection : 0,
    accentAttachmentPoint: accentAttachment,
  };
  let typesetter;
  let glyphBehavior;
  if (mathList.centered) {
    setterSpec.mathAxis = mc.AxisHeight;
    // @ts-ignore
    typesetter = new Centered_Glyph_Setter(setterSpec);
    glyphBehavior = new Centered_Glyph_Behavior({ typesetter, spacingStyle });
  } else {
    typesetter = new Glyph_Setter(setterSpec);
    glyphBehavior = new Glyph_Behavior({ typesetter, spacingStyle });
  }
  const glyphNode = new Document_Node(glyphBehavior);
  return glyphNode;
}
