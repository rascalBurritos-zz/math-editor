import Glyph_Setter from '../Leaf-Nodes/Glyph/Glyph_Setter';
import Glyph_Behavior from '../Leaf-Nodes/Glyph/Glyph_Behavior';
import Glyph_Node from '../Leaf-Nodes/Glyph/Glyph_Node';
/** @typedef {import('./nodeFactory').MathList} MathList  */
/**
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Glyph_Node}
 */
export default function glyphFactory(mathList, fontData) {
  const spacingStyle = mathList.spacingStyle;
  const italicsCorrection = fontData.italicCorrectionMap[mathList.unicode];
  const typesetter = new Glyph_Setter({
    upm: fontData.upm,
    asc: fontData.asc,
    des: fontData.des,
    glyphMetric: fontData.glyphMetrics[mathList.unicode],
    italicsCorrection: italicsCorrection ? italicsCorrection : 0,
    accentAttachmentPoint: 0,
  });
  const glyphBehavior = new Glyph_Behavior({ typesetter, spacingStyle });
  const glyphNode = new Glyph_Node(glyphBehavior);
  return glyphNode;
}
