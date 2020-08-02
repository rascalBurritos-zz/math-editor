import funcDocumentViewFactory from '../../Text Nodes/Functional/funcDocumentViewFactory';
import { traverse } from '../Access/access';
import keychainToViewPoint, { keychainFromPosition } from '../Access/keychain';
import {
  getBoundRight,
  getBoundLeft,
  isBound,
} from '../../Text Nodes/Functional/BaseModel';
import { NodeTable } from '../Tables/nodeTable';
import { DIRECTION } from '../Tables/direction';

/**
 *
 * @param {String} direction
 * @return {String} opposite direction
 */
function oppositeDirection(direction) {
  return direction === DIRECTION.LEFT ? DIRECTION.RIGHT : DIRECTION.LEFT;
}

/**
 *
 * @param {Object} model
 * @param {Array} keychain
 * @param {String} direction
 * @return {Array}
 */
export function getNextCaretKeychain(model, keychain, direction) {
  if (isVertical(direction)) {
    return getCaretKeychainVertical(model, keychain, direction);
  } else {
    return caretTraverser(model, keychain, direction);
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
 * @param {Object} model
 * @param {Array} keychain
 * @param {String} direction
 * @return {Array}
 */
function getCaretKeychainVertical(model, keychain, direction) {
  const rootView = funcDocumentViewFactory(model);
  const viewChain = modelTraverser(keychain, model, direction);
  if (!viewChain[0]) {
    return keychain;
  }
  const targetViewPoint = keychainToViewPoint(rootView, viewChain);
  const caretPos = keychainToViewPoint(rootView, keychain).position;
  const relativePosition = caretPos.subtract(targetViewPoint.position);
  return [
    ...viewChain,
    ...keychainFromPosition(targetViewPoint.view, relativePosition),
  ];
}

/**
 * @param {Object} model
 * @param {Array} keyChain
 * @param {String} direction TYPE DIRECTION
 * @return {Array} new caret keychain
 */
function caretTraverser(model, keyChain, direction) {
  const { node, finalKey, parentKeyChain, parent } = retrieveModelContext(
    model,
    keyChain
  );
  const boxKey = node.nextItemOnCaretPath(parent, finalKey, direction);
  if (isBound(boxKey)) {
    if (parent === model) {
      const safeDirection = oppositeDirection(direction);
      return caretTraverser(model, [boxKey], safeDirection);
    } else {
      return caretTraverser(model, parentKeyChain, direction);
    }
  } else if (direction === DIRECTION.UP || direction === DIRECTION.DOWN) {
    return [...parentKeyChain, boxKey];
  } else if (!boxKey.isCaret) {
    const finalBoxKey =
      direction == DIRECTION.LEFT ? getBoundRight() : getBoundLeft();
    const newKeyChain = [...parentKeyChain, boxKey, finalBoxKey];
    return caretTraverser(model, newKeyChain, direction);
  } else {
    return [...parentKeyChain, boxKey];
  }
}

/**
 * @param {Array} keychain
 * @param {*} model
 * @param {String} direction TYPE DIRECTION
 * @return {Array} new keychain
 */
function modelTraverser(keychain, model, direction) {
  const { parent, parentKeyChain, node, finalKey } = retrieveModelContext(
    model,
    keychain
  );
  const boxKey = node.nextItem(parent, finalKey, direction);
  if (isBound(boxKey)) {
    if (parent === model) return [false];
    return modelTraverser(parentKeyChain, model, direction);
  } else {
    return [...parentKeyChain, boxKey];
  }
}

/**
 * @typedef {Object} modelContext
 * @property {Array} parentKeyChain
 * @property {Object} parent
 * @property {Object} node
 * @property {Object} finalKey
 */

/**
 * @param {Object} model
 * @param {Array} keyChain
 * @return {modelContext}
 */
export function retrieveModelContext(model, keyChain) {
  const parentKeyChain = keyChain.slice(0, -1);
  const parent = traverse(model, parentKeyChain, false);
  const node = NodeTable.retrieve(parent.type);
  const finalKey = keyChain[keyChain.length - 1];
  return { parentKeyChain, parent, node, finalKey };
}
