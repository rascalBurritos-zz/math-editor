import caretTraverser, { DIRECTION } from './caretTraverser';
import documentViewFactory from '../src/Factories/documentViewFactory';
import verticalCaretTraverser from './verticalCaretTraverser';
import keychainToViewPoint, { getSubview } from './keyChainToViewPoint';

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
function keychainFromPosition(startPoint, targetView) {
  let done = false;
  const keychain = [];
  let currentView = targetView;
  while (!done) {
    const boxKey = currentView.getBoxKeyClosestToPoint(startPoint);
    keychain.push(boxKey);
    if (!boxKey.isCaret) {
      currentView = getSubview(boxKey, currentView);
    }
    done = boxKey.isCaret;
  }
  return keychain;
}
