/**
 * @param {Object} prevState
 * @param {String} character
 * @return {Object}
 */
export default function insertCharacter(prevState, character) {
  const anchor = prevState.selection.anchor;
  const focus = prevState.selection.focus;
  const modelCopy = JSON.parse(JSON.stringify(prevState.model));
  if (keychainsEqual(anchor, focus)) {
    insertIntoModel(focus, modelCopy, character);
    const keychain = determineKeychain(focus, modelCopy, DIRECTION.RIGHT);
    const selection = { anchor: keychain, focus: keychain };
    return { model: modelCopy, selection };
  } else {
    return;
  }
}
