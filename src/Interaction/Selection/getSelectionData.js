import showSelection from './showSelection';
import keychainToViewPoint, { keychainsEqual } from '../Access/keychain';

/**
 *
 * @param {Object} rootModel
 * @param {Object} rootView
 * @param {Object} selection
 * @return {Object}
 */
export default function getSelectionData(rootModel, rootView, selection) {
  const pcv = keychainToViewPoint(rootView, selection.focus);
  if (keychainsEqual(selection.focus, selection.anchor)) {
    const primary = wrapCaret(pcv, true);
    return { primary };
  } else {
    const selectionRects = showSelection(
      rootModel,
      rootView,
      selection.focus,
      selection.anchor
    );
    const scv = keychainToViewPoint(rootView, selection.anchor);
    const primary = wrapCaret(pcv, false);
    const secondary = wrapCaret(scv, false);
    // return { primary, secondary };
    return { primary, secondary, selectionRects };
  }

  /**
   * @param {Object} caretView
   * @param {boolean} isBlinking
   * @return {Object}
   */
  function wrapCaret(caretView, isBlinking) {
    const p = caretView.position;
    return {
      style: {
        transform: `translate(${p.left}px,${p.top}px)`,
        ...caretView.style,
      },
      isBlinking,
    };
  }
}
