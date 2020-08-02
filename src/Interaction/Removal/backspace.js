import { keychainsEqual } from '../Access/keychain';
import { getNextCaretKeychain } from '../Movement/movement';
import { DIRECTION } from '../Tables/direction';
import removeSelection from './removeSelection';

/**
 * @param {Object} prevState
 * @return {Object}
 */
export default function backspace(prevState) {
  // const modelCopy = JSON.parse(JSON.stringify(prevState.model));
  const modelCopy = prevState.model;
  let focus = prevState.selection.focus;
  const anchor = prevState.selection.anchor;
  if (keychainsEqual(focus, anchor)) {
    focus = getNextCaretKeychain(modelCopy, focus, DIRECTION.LEFT);
  }
  const newState = removeSelection(focus, anchor, modelCopy);
  return newState;
}
