import getCaretMap from './getCaretMap';
import { traverse } from './caretTraverser';
/**
 * @param {Array} keychain
 * @param {*} model
 * @param {String} direction TYPE DIRECTION
 * @return {Array} new caret keychain
 */
export default function verticalCaretTraverser(keychain, model, direction) {
  const parentKeyChain = keychain.slice(0, -1);
  const parent = traverse(model, parentKeyChain);
  const caretMap = getCaretMap(parent, false);
  const caretKey = keychain[keychain.length - 1];
  const boxKey = caretMap.nextItem(direction, caretKey);
  if (caretMap.isBound(boxKey)) {
    if (parent === model) return [false];
    return verticalCaretTraverser(parentKeyChain, model, direction);
  } else {
    return [...parentKeyChain, boxKey];
  }
}
