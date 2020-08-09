import showSelection from './showSelection';
import keychainToViewPoint, { keychainsEqual } from '../Access/keychain';

/**
 *
 * @param {Object} rootModel
 * @param {Object} rootId
 * @param {Object} viewCollection
 * @param {Object} selection
 * @return {Object}
 */
export default function getSelectionData(
  rootModel,
  rootId,
  viewCollection,
  selection
) {
  const pcv = keychainToViewPoint(rootId, viewCollection, selection.focus);
  if (keychainsEqual(selection.focus, selection.anchor)) {
    const primary = wrapCaret(pcv, true);
    return { primary };
  } else {
    const selectionRects = showSelection(
      rootModel,
      viewCollection,
      rootId,
      selection.focus,
      selection.anchor
    );
    return { selectionRects };
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
