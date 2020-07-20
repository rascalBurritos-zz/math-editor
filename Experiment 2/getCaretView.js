import Point from '../src/Abstract/Point';

/**
 *
 * @param {Object} view
 * @param {Array} keychain
 * @return {Object} Caret Component Style
 */
export default function getCaretView(view, keychain) {
  const parentKeyChain = keychain.slice(0, -1);
  const parentViewPoint = parentKeyChain.reduce(
    (viewPoint, subKeychain) => {
      const subView = subKeychain.reduce((view, key) => {
        return view[key];
      }, viewPoint.currentView);
      const relativePos = viewPoint.currentView.getRelativePositionOfBehavior(
        subView
      );
      return {
        currentView: subView,
        position: relativePos.add(viewPoint.position),
      };
    },
    { currentView: view, position: new Point(0, 0) }
  );
  const caretKeyPos = parentViewPoint.currentView.getRelativePositionOfCaretKey(
    keychain[keychain.length - 1]
  );
  // Caret position
  const { top, left } = caretKeyPos.add(parentViewPoint.position);
  return { top, left };
}
