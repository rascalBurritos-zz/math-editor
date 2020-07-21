import Point from '../src/Abstract/Point';

/**
 *
 * @param {Object} view
 * @param {Array} keychain
 * @return {Object} Caret Component Style
 */
export default function keychainToViewPoint(view, keychain) {
  const rootViewPoint = keychain.reduce(
    (viewPoint, boxKey) => {
      if (boxKey.isCaret) {
        const caretKeyPos = viewPoint.view.getRelativePositionOfCaretKey(
          boxKey
        );
        return {
          view: viewPoint.view,
          position: caretKeyPos.add(viewPoint.position),
        };
      } else {
        const subView = getSubview(boxKey, viewPoint.view);
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

/**
 * @param {*} boxKey
 * @param {*} view
 * @return {*} subview
 */
export function getSubview(boxKey, view) {
  return boxKey.viewAccess.reduce((partition, key) => {
    return partition[key];
  }, view);
}
