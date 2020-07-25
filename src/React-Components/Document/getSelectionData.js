import getCaretView from '../../../Experiment 2/getCaretView';
import keychainsEqual from './keychainsEqual';

/**
 *
 * @param {Object} rootView
 * @param {Object} selection
 * @return {Object}
 */
export default function getSelectionData(rootView, selection) {
  const pcv = getCaretView(rootView, selection.focus);
  if (keychainsEqual(selection.focus, selection.anchor)) {
    const primary = wrapCaret(pcv, true);
    return { primary };
  } else {
    const scv = getCaretView(rootView, selection.anchor);
    const primary = wrapCaret(pcv, false);
    const secondary = wrapCaret(scv, false);
    return { primary, secondary };
  }

  /**
   * @param {Object} caretView
   * @param {boolean} isBlinking
   * @return {Object}
   */
  function wrapCaret(caretView, isBlinking) {
    return { style: { ...caretView.position, ...caretView.style }, isBlinking };
  }
}
