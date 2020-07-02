import Document_Node from '../../../Abstract/Document_Node.js';
import { variantGlyphBehaviorFactory } from '../Leaf/variantGlyphFactory.js';
import { glyphBehaviorFactory } from '../Leaf/glyphFactory.js';

/** @typedef {import('../nodeFactory').MathList} MathList */

/**
 * Outputs variant if available,
 * normal glyph if not available
 * @param {MathList} mathList
 * @param {Object} fontData
 * @return {Document_Node}
 */
export default function universalGlyphFactory(mathList, fontData) {
  let behavior = variantGlyphBehaviorFactory(mathList, fontData);
  if (!behavior) {
    behavior = glyphBehaviorFactory(mathList, fontData);
  }
  const node = new Document_Node(behavior);
  return node;
}
