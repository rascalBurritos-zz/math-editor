import Point from '../src/Abstract/Point';
import getSubItem from './getSubItem';

/**
 *
 * @param {Object} view
 * @param {Array} keychain
 * @return {Object} Caret Component Style
 */
export default function getCaretView(view, keychain) {
  const rootViewPoint = keychain.reduce(
    (viewPoint, boxKey) => {
      if (boxKey.isCaret) {
        const caretKeyPos = viewPoint.view.getRelativePositionOfCaretKey(
          boxKey
        );
        const completeViewPoint = {
          view: viewPoint.view,
          position: caretKeyPos.add(viewPoint.position),
        };
        if (viewPoint.view.getCaretStyle !== undefined) {
          const style = viewPoint.view.getCaretStyle();
          completeViewPoint.style = style;
        }
        return completeViewPoint;
      } else {
        const subView = getSubItem(boxKey, viewPoint.view, true);
        const relativePos = viewPoint.view.getRelativePositionOfBehavior(
          subView
        );
        return {
          view: subView,
          position: relativePos.add(viewPoint.position),
        };
      }
    },
    { view: view, position: new Point(0, 0) }
  );
  return rootViewPoint;
}
