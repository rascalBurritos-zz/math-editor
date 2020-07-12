import Text_Glyph_Setter from '../../Text Nodes/Text Glyph/Text_Glyph_Setter';
import Text_Glyph_Behavior from '../../Text Nodes/Text Glyph/Text_Glyph_Behavior';
import Leaf_Node from '../../Abstract/Leaf_Node';

/**
 * @param {Object} charInfo unicode and fontSize
 * @param {Object} fontData
 * @return {Object}
 */
export default function textGlyphFactory(charInfo, fontData) {
  const spec = generateSpec();
  const typesetter = new Text_Glyph_Setter(spec);
  const behavior = new Text_Glyph_Behavior({ typesetter });
  behavior.fontSize = charInfo.fontSize;
  const node = new Leaf_Node(behavior);
  return node;

  /**
   * @return {Object}
   */
  function generateSpec() {
    const unicode = charInfo.unicode;
    const s = {};
    s.fontFamily = fontData.fontFamily;
    s.upm = fontData.upm;
    s.asc = fontData.asc;
    s.des = fontData.des;
    const gm = fontData.glyphMetrics[unicode];
    const advanceWidth = parseInt(gm.advanceWidth, 10);
    s.glyphMetric = { bbox: gm.bbox, advanceWidth };
    s.unicode = unicode;
    return s;
  }
}
