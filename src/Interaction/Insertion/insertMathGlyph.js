import { getNextCaretKeychain } from '../Movement/movement';
import { DIRECTION } from '../Tables/direction';
import { keychainsEqual } from '../Access/keychain';
import { insertIntoModel } from './insertIntoModel';
import { TEXT_GLYPH_TYPE } from '../../Text Nodes/Functional/Text Glyph/textGlyphViewFactory';
import Identity from '../Util/Identity';
import removeSelection from '../Removal/removeSelection';
import { MATH_GLYPH_TYPE } from '../../Text Nodes/Functional/Node Types';
import Spacing_Style from '../../Math Nodes/Types/Spacing_Style';

/**
 * @param {Object} prevState
 * @param {String} character
 * @return {Object}
 */
export default function insertMathGlyph(prevState, character) {
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
  const mathGlyph = {
    type: MATH_GLYPH_TYPE,
    unicode: character.codePointAt(0),
    spacingStyle: Spacing_Style.Ordinary,
    id: Identity.getNextId(),
  };
  return mathGlyph;
}
