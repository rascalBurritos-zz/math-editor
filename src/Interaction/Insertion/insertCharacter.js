import { getNextCaretKeychain } from '../Movement/movement';
import { DIRECTION } from '../Tables/direction';
import { keychainsEqual } from '../Access/keychain';
import { insertIntoModel } from './insertIntoModel';

/**
 * @param {Object} prevState
 * @param {String} character
 * @return {Object}
 */
export default function insertCharacter(prevState, character) {
  const anchor = prevState.selection.anchor;
  const focus = prevState.selection.focus;
  if (keychainsEqual(anchor, focus)) {
    insertIntoModel(prevState.model, focus, character);
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
