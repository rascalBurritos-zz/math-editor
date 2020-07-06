import Document_Node from '../../Abstract/Document_Node';
import Text_Block_Behavior from '../../Text Nodes/Text Block/Text_Block_Behavior';
import Text_Block_Setter from '../../Text Nodes/Text Block/Text_Block_Setter';
import textGlyphFactory from './textGlyphFactory';
import Text_Block_Node from '../../Text Nodes/Text Block/Text_Block_Node';

/**
 * @param {Object} documentList
 * @return {Document_Node}
 */
export default function textBlockFactory(documentList) {
  const typesetter = new Text_Block_Setter();
  const behavior = new Text_Block_Behavior({ typesetter });
  const elements = [];
  for (const char of documentList.content) {
    const unicode = char.codePointAt(0);
    const fontSize = documentList.fontSize;
    const tg = textGlyphFactory({ unicode, fontSize }, documentList.fontData);
    elements.push(tg);
  }
  const node = new Text_Block_Node(behavior);
  node.elements = elements;
  return node;
}
