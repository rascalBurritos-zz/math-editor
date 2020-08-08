import { getNextCaretKeychain } from './movement';

/**
 * @param {Object} prevState
 * @param {String} direction
 */
export default function singleMove(prevState, direction) {
  const ck = prevState.selection.focus;
  const model = prevState.model;
  const newKeychain = getNextCaretKeychain(model, ck, direction);
  prevState.selection = { anchor: newKeychain, focus: newKeychain };
  // const selection = { anchor: newKeychain, focus: newKeychain };
  // return { selection };
}
