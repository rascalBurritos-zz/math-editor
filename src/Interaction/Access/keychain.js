import { getSubItem } from './access';
import Point from '../../Abstract/Point';
import { NodeTable } from '../Tables/nodeTable';

/**
 * @param {Object} viewCollection
 * @param {Object} targetId
 * @param {Point} startPoint relative to targetView
 * @return {Array}
 */
export function keychainFromPosition(viewCollection, targetId, startPoint) {
  let done = false;
  const keychain = [];
  let currentView = viewCollection[targetId];
  let currentPoint = startPoint;
  while (!done) {
    const node = NodeTable.retrieve(currentView.type);
    const boxKey = node.getBoxKeyClosestToPoint(
      viewCollection,
      currentView.id,
      currentPoint,
      true
    );
    keychain.push(boxKey);
    if (!boxKey.isCaret) {
      const previousView = currentView;
      currentView = getSubItem(currentView, boxKey, viewCollection);
      const subViewPos = node.getRelativePositionOfBox(
        viewCollection,
        previousView.id,
        boxKey
      );
      currentPoint = currentPoint.subtract(subViewPos);
    }
    done = boxKey.isCaret;
  }
  return keychain;
}

/**
 *
 * @param {Object} rootId
 * @param {Object} viewCollection
 * @param {Array} keychain
 * @return {Object} Caret Component Style
 */
export default function keychainToViewPoint(rootId, viewCollection, keychain) {
  const rootViewPoint = keychain.reduce(
    (viewPoint, boxKey) => {
      const node = NodeTable.retrieve(viewPoint.view.type);
      if (boxKey.isCaret) {
        const caretKeyPos = node.getRelativePositionOfBox(
          viewCollection,
          viewPoint.view.id,
          boxKey
        );
        const completeViewPoint = {
          view: viewPoint.view,
          position: caretKeyPos.add(viewPoint.position),
        };
        if ('getCaretStyle' in node) {
          const style = node.getCaretStyle(
            viewCollection,
            viewPoint.view,
            boxKey
          );
          completeViewPoint.style = style;
        }
        return completeViewPoint;
      } else {
        const subView = getSubItem(viewPoint.view, boxKey, viewCollection);
        const relativePos = node.getRelativePositionOfBox(
          viewCollection,
          viewPoint.view.id,
          boxKey
        );
        return {
          view: subView,
          position: relativePos.add(viewPoint.position),
        };
      }
    },
    { view: viewCollection[rootId], position: new Point(0, 0) }
  );
  return rootViewPoint;
}

/**
 * @param {Array} keychainA
 * @param {Array} keychainB
 * @return {boolean}
 */
export function keychainsEqual(keychainA, keychainB) {
  if (keychainA.length !== keychainB.length) return false;
  for (let i = 0; i < keychainA.length; i++) {
    if (!boxKeyEquals(keychainA[i], keychainB[i])) {
      return false;
    }
  }
  return true;
}

/**
 * @param {*} boxKeyA
 * @param {*} boxKeyB
 * @return {boolean}
 */
export function boxKeyEquals(boxKeyA, boxKeyB) {
  return JSON.stringify(boxKeyA) === JSON.stringify(boxKeyB);
}
