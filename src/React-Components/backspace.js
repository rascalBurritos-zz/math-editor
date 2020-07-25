import removeSelection from './Document/removeSelection';

/**
 * @param {Object} prevState
 * @return {Object}
 */
export default function backspace(prevState) {
  const focus = prevState.selection.focus;
  const modelCopy = JSON.parse(JSON.stringify(prevState.model));
  const anchor = prevState.selection.anchor;
  const newModel = removeSelection(focus, anchor, modelCopy).model;
  const selection = { anchor: focus, focus };
  // actually needs to go to the leftmost keychain
  return { model: newModel, selection };
}
