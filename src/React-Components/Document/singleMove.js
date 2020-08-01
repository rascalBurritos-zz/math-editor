/**
 * @param {Object} prevState
 * @param {String} direction
 * @return {Object} updateState
 */
export default function singleMove(prevState, direction) {
  const ck = prevState.selection.focus;
  const model = prevState.model;
  const newKeychain = determineKeychain(ck, model, direction);
  const selection = { anchor: newKeychain, focus: newKeychain };
  return { selection };
}
