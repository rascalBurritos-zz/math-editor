import Identity from './Identity';
import { TEXT_GLYPH_TYPE } from '../../Text Nodes/Functional/Text Glyph/textGlyphViewFactory';

/**
 * @param {String} str
 * @return {Array}
 */
export function stringToContent(str) {
  const content = [];
  for (let i = 0; i < str.length; i++) {
    const unicode = str.codePointAt(i).toString();
    content.push({ type: TEXT_GLYPH_TYPE, unicode, id: Identity.getNextId() });
  }
  return content;
}
