import {
  getNextCaretKeychain,
  retrieveModelContext,
} from '../Movement/movement';
import { DIRECTION } from '../Tables/direction';
import { keychainsEqual } from '../Access/keychain';
import { insertIntoModel } from './insertIntoModel';
import { TEXT_GLYPH_TYPE } from '../../Text Nodes/Functional/Text Glyph/textGlyphViewFactory';
import Identity from '../Util/Identity';
import {
  TEXT_BLOCK_TYPE,
  TEXT_LINE_TYPE,
} from '../../Text Nodes/Functional/Node Types';
import { original } from 'immer';
import removeSelection from '../Removal/removeSelection';

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
    removeSelection(prevState);
    return;
  }
}

/**
 *
 * @param {*} prevState
 * @param {*} character
 * @return {object}
 */
function determineModelToInsert(prevState, character) {
  const textGlyph = {
    type: TEXT_GLYPH_TYPE,
    unicode: character.codePointAt(0),
    id: Identity.getNextId(),
  };
  return textGlyph;
}
