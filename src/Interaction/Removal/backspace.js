import { keychainsEqual } from '../Access/keychain';
import { getNextCaretKeychain } from '../Movement/movement';
import { DIRECTION } from '../Tables/direction';
import removeSelection from './removeSelection';
import { original } from 'immer';

/**
 * @param {Object} prevState
 */
export default function backspace(prevState) {
  const focus = prevState.selection.focus;
  const anchor = prevState.selection.anchor;
  if (keychainsEqual(focus, anchor)) {
    prevState.selection.focus = getNextCaretKeychain(
      prevState.model,
      focus,
      DIRECTION.LEFT
    );
  }
  removeSelection(prevState);
}
