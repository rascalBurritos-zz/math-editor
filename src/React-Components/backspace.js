import removeSelection from './Document/removeSelection';
import keychainsEqual from './Document/keychainsEqual';
import determineKeychain from '../../Experiment 2/determineKeychain';
import { DIRECTION } from '../../Experiment 2/caretTraverser';

/**
 * @param {Object} prevState
 * @return {Object}
 */
export default function backspace(prevState) {
  const modelCopy = JSON.parse(JSON.stringify(prevState.model));

  let focus = prevState.selection.focus;
  const anchor = prevState.selection.anchor;
  if (keychainsEqual(focus, anchor)) {
    focus = determineKeychain(focus, modelCopy, DIRECTION.LEFT);
  }
  const newState = removeSelection(focus, anchor, modelCopy);
  // actually needs to go to the leftmost keychain
  return newState;
}
