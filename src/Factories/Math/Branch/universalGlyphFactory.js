import Document_Node from '../../../Abstract/Document_Node.js';
import { variantGlyphBehaviorFactory } from '../Leaf/variantGlyphFactory.js';
import { glyphBehaviorFactory } from '../Leaf/glyphFactory.js';

/** @typedef {import('../mathViewFactory').MathList} MathList */

/**
 * Outputs variant if available,
 * normal glyph if not available
 * @param {MathList} mathList
 * @param {Object} fontData
 * @param {Object} dependancyOrganizer
 * @return {Document_Node}
 */
export default function universalGlyphFactory(
  mathList,
  fontData,
  dependancyOrganizer
) {
  let behavior = variantGlyphBehaviorFactory(
    mathList,
    fontData,
    dependancyOrganizer
  );
  if (!behavior) {
    behavior = glyphBehaviorFactory(mathList, fontData, dependancyOrganizer);
  }
  const node = new Document_Node(behavior);
  return node;
}
