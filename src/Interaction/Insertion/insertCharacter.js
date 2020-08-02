import { getNextCaretKeychain } from '../Movement/movement';
import { DIRECTION } from '../Tables/direction';
import produce from 'immer';
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
    const newModel = produce(prevState.model, (prevModel) => {
      insertIntoModel(prevModel, focus, character);
    });
    const keychain = getNextCaretKeychain(newModel, focus, DIRECTION.RIGHT);
    const selection = { anchor: keychain, focus: keychain };
    return { model: newModel, selection };
  } else {
    return;
  }
}
