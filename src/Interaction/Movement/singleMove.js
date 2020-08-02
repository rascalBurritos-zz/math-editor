import { getNextCaretKeychain } from './movement';

/**
 * @param {Object} prevState
 * @param {String} direction
 * @return {Object} updateState
 */
export default function singleMove(prevState, direction) {
  const ck = prevState.selection.focus;
  const model = prevState.model;
  const newKeychain = getNextCaretKeychain(model, ck, direction);
  const selection = { anchor: newKeychain, focus: newKeychain };
  return { selection };
}
