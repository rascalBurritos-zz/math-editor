import { getSubItem } from './access';
import Point from '../../Abstract/Point';
import { NodeTable } from '../Tables/nodeTable';

/**
 * @param {Object} targetView
 * @param {Point} startPoint relative to targetView
 * @return {Array}
 */
export function keychainFromPosition(targetView, startPoint) {
  let done = false;
  const keychain = [];
  let currentView = targetView;
  let currentPoint = startPoint;
  while (!done) {
    const node = NodeTable.retrieve(currentView.type);
    const boxKey = node.getBoxKeyClosestToPoint(currentView, currentPoint);
    keychain.push(boxKey);
    if (!boxKey.isCaret) {
      const previousView = currentView;
      currentView = getSubItem(currentView, boxKey, true);
      const subViewPos = node.getRelativePositionOfBox(previousView, boxKey);
      currentPoint = currentPoint.subtract(subViewPos);
    }
    done = boxKey.isCaret;
  }
  return keychain;
}

/**
 *
 * @param {Object} view
 * @param {Array} keychain
 * @return {Object} Caret Component Style
 */
export default function keychainToViewPoint(view, keychain) {
  const rootViewPoint = keychain.reduce(
    (viewPoint, boxKey) => {
      const node = NodeTable.retrieve(viewPoint.view.type);
      if (boxKey.isCaret) {
        const caretKeyPos = node.getRelativePositionOfBox(
          viewPoint.view,
          boxKey
        );
        const completeViewPoint = {
          view: viewPoint.view,
          position: caretKeyPos.add(viewPoint.position),
        };
        if ('getCaretStyle' in node) {
          const style = node.getCaretStyle(viewPoint.view);
          completeViewPoint.style = style;
        }
        return completeViewPoint;
      } else {
        const subView = getSubItem(viewPoint.view, boxKey, true);
        const relativePos = node.getRelativePositionOfBox(
          viewPoint.view,
          boxKey
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
function boxKeyEquals(boxKeyA, boxKeyB) {
  return JSON.stringify(boxKeyA) === JSON.stringify(boxKeyB);
}
