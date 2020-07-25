import caretTraverser, { DIRECTION } from './caretTraverser';
import documentViewFactory from '../src/Factories/documentViewFactory';
import verticalCaretTraverser from './verticalCaretTraverser';
import keychainToViewPoint from './getCaretView';
import getSubItem from './getSubItem';

/**
 * @param {Object} keychain
 * @param {*} model
 * @param {String} direction TYPE DIRECTION
 * @return {Array} new caret keychain
 */
export default function determineKeychain(keychain, model, direction) {
  if (isVertical(direction)) {
    const rootView = documentViewFactory(model);
    const viewChain = verticalCaretTraverser(keychain, model, direction);
    if (!viewChain[0]) {
      // out of bounds
      return keychain;
    }
    const targetViewPoint = keychainToViewPoint(rootView, viewChain);
    const caretPos = keychainToViewPoint(rootView, keychain).position;
    const relativePosition = caretPos.subtract(targetViewPoint.position);
    return [
      ...viewChain,
      ...keychainFromPosition(relativePosition, targetViewPoint.view),
    ];
  } else {
    return caretTraverser(keychain, model, direction);
  }
  /**
   * @param {String} direction
   * @return {boolean}
   */
  function isVertical(direction) {
    return direction === DIRECTION.UP || direction === DIRECTION.DOWN;
  }
}

/**
 * @param {*} startPoint relative to targetView
 * @param {*} targetView
 * @return {Array}
 */
export function keychainFromPosition(startPoint, targetView) {
  let done = false;
  const keychain = [];
  let currentView = targetView;
  let currentPoint = startPoint;
  while (!done) {
    const boxKey = currentView.getBoxKeyClosestToPoint(currentPoint);
    keychain.push(boxKey);
    if (!boxKey.isCaret) {
      const previousView = currentView;
      currentView = getSubItem(boxKey, currentView, true);
      const subViewPos = previousView.getRelativePositionOfBehavior(
        currentView
      );
      currentPoint = currentPoint.subtract(subViewPos);
    }
    done = boxKey.isCaret;
  }
  return keychain;
}
