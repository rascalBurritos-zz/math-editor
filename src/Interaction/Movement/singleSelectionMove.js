import { getNextCaretKeychain } from './movement';

/**
 * @param {Object} prevState
 * @param {String} direction
 */
export default function singleSelectionMove(prevState, direction) {
  const oldFocus = prevState.selection.focus;
  const model = prevState.model;
  const newFocus = getNextCaretKeychain(model, oldFocus, direction);
  const anchor = prevState.selection.anchor;
  prevState.selection = { anchor, focus: newFocus };
}
