import Text_Block_Behavior from '../../Text Nodes/Text Block/Text_Block_Behavior';
import Text_Block_Setter from '../../Text Nodes/Text Block/Text_Block_Setter';
import textGlyphFactory from './textGlyphFactory';
import fontMapper from './fontMapper';

/** @typedef {import('../../Abstract/Behavior').default}  Behavior */

/**
 * @param {Object} documentList
 * @return {Behavior}
 */
export default function textBlockFactory(documentList) {
  const typesetter = new Text_Block_Setter();
  const behavior = new Text_Block_Behavior({ typesetter });
  const elements = [];
  for (const char of documentList.content) {
    const unicode = char.codePointAt(0);
    const fontSize = documentList.fontSize;
    const font = fontMapper(documentList.fontName);
    const tg = textGlyphFactory({ unicode, fontSize }, font);
    elements.push(tg);
  }
  behavior.elementBehaviors = elements;
  return behavior;
}
