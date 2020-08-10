import { getNextCaretKeychain } from '../Movement/movement';
import { DIRECTION } from '../Tables/direction';
import { keychainsEqual } from '../Access/keychain';
import { insertIntoModel } from './insertIntoModel';
import { TEXT_GLYPH_TYPE } from '../../Text Nodes/Functional/Text Glyph/textGlyphViewFactory';
import Identity from '../Util/Identity';
import { TEXT_BLOCK_TYPE } from '../../Text Nodes/Functional/Node Types';

/**
 * @param {Object} prevState
 * @param {String} character
 * @return {Object}
 */
export default function insertCharacter(prevState, character) {
  const anchor = prevState.selection.anchor;
  const focus = prevState.selection.focus;
  if (keychainsEqual(anchor, focus)) {
    const insert = determineModelToInsert(prevState, character);
    insertIntoModel(prevState, focus, insert);
    const keychain = getNextCaretKeychain(
      prevState.model,
      focus,
      DIRECTION.RIGHT
    );

    prevState.selection = { anchor: keychain, focus: keychain };
  } else {
    return;
  }
}

/**
 *
 * @param {*} prevState
 * @return {object}
 */
function determineModelToInsert(prevState, character) {
  const textGlyph = {
    type: TEXT_GLYPH_TYPE,
    unicode: character.codePointAt(0),
    id: Identity.getNextId(),
  };
  // const textBlock = {
  //   type: TEXT_BLOCK_TYPE,
  //   id: Identity.getNextId(),
  //   fontSize: 45,
  //   fontName: 'Asana',
  //   content: textGlyph,
  // };
  return textGlyph;
}
