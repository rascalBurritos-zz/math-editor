import getCaretMap from './getCaretMap';

export const DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

/**
 * @param {Array} keyChain
 * @param {*} model
 * @param {String} direction TYPE DIRECTION
 * @return {Array} new caret keychain
 */
export default function caretTraverser(keyChain, model, direction) {
  const parent = traverse(model, keyChain.slice(0, -1));
  const caretMap = getCaretMap(parent);
  const caretKey = keyChain[keyChain.length - 1];
  const nextItem = caretMap.getNextItem(caretKey, direction);
  if (nextItem.isCaret) {
    if ('outside' in nextItem.key) {
      return stepOutOfCurrentParent(keyChain, model, direction);
    }
    return [...keyChain.slice(0, -1), nextItem.key];
  }

  const subModelKey = nextItem.key.slice(-1)[0];
  const subModel = parent[subModelKey];
  if (isBranch(subModel)) {
    return stepIntoBranch(subModelKey, keyChain, model, direction);
  }
  const newCaretKey = caretMap.directMove(caretKey, direction);
  const newKeyChain = [...keyChain.slice(0, -1), newCaretKey];
  if (newCaretKey.substring(0, 5) !== 'Caret') {
    // step over leaf
    // BASE CONDITION
    return newKeyChain;
  } else {
    return stepOutOfCurrentParent(keyChain, model, direction);
  }

  /**
   * @param {Object} model
   * @return {boolean}
   */
  function isBranch(model) {
    const leafTypes = { TextGlyph: 'TextGlyph' };
    return !(model.type in leafTypes);
  }

  /**
   *
   * @param {String} subModelKey
   * @param {String[]} keyChain
   * @param {Object} model
   * @param {String} direction  Direction Type
   * @return {Array}
   */
  function stepIntoBranch(subModelKey, keyChain, model, direction) {
    // opposites bc when going right intro a branch you need to go in
    // the leftmost part of it
    const directionString = DIRECTION.RIGHT === direction ? 'Left' : 'Right';
    // new keychain is one longer than what we started with
    const newKeyChain = [
      ...keyChain.slice(0, -1),
      subModelKey,
      { outside: directionString },
    ];
    return caretTraverser(newKeyChain, model, direction);
  }

  /**
   * @param {Array} keyChain
   * @param {Object} model
   * @param {String} direction
   * @return {Array}
   */
  function stepOutOfCurrentParent(keyChain, model, direction) {
    if (keyChain.length < 3) {
      console.log('no grandparent');
      return keyChain;
    }
    const grandKeyChain = keyChain.slice(0, -2);
    const grandparent = traverse(model, grandKeyChain);
    const parentKey = keyChain[keyChain.length - 2];
    const grandCaretMap = getCaretMap(grandparent);
    const newCaretKey = grandCaretMap.closestCaretKey(
      parentKey,
      direction,
      grandparent
    );
    const newKeyChain = [...grandKeyChain, newCaretKey];
    return caretTraverser(newKeyChain, model, direction);
  }
}

/**
 *
 * @param {Object} model
 * @param {Array} keychain
 * @return {Object}
 */
function traverse(model, keychain) {
  return keychain.reduce((submodel, key) => {
    return submodel[key];
  }, model);
}
