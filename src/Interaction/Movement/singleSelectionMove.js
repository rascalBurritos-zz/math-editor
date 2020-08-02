import { getNextCaretKeychain } from './movement';

/**
 * @param {Object} prevState
 * @param {String} direction
 * @return {Object} updateState
 */
export default function singleSelectionMove(prevState, direction) {
  const oldFocus = prevState.selection.focus;
  const model = prevState.model;
  const newFocus = getNextCaretKeychain(model, oldFocus, direction);
  const anchor = prevState.selection.anchor;
  const selection = { anchor, focus: newFocus };
  return { selection };
}
