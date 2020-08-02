import { traverse } from '../Access/access';
import { keychainsEqual, keychainFromPosition } from '../Access/keychain';
import {
  getCommonAncestorIndex,
  getCommonAncestor,
  dangerousSetParent,
} from '../Access/getCommon';
import { removeBetween } from './removeBetween';
import produce from 'immer';
import { DangerousSetContainer } from './dangerousSetContainer';

/**
 *
 * @param {Array} keychainA
 * @param {Array} keychainB
 * @param {Object} model
 * @return {Object}
 */
export default function removeSelection(keychainA, keychainB, model) {
  if (keychainsEqual(keychainA, keychainB)) return {};
  const commonAncestorIndex = getCommonAncestorIndex(keychainA, keychainB);
  const commonAncestor = getCommonAncestor(
    model,
    keychainA,
    commonAncestorIndex,
    false
  );
  const subChainA = keychainA.slice(commonAncestorIndex + 1);
  const subChainB = keychainB.slice(commonAncestorIndex + 1);
  const newCommonAncestor = removeBetween(subChainA, subChainB, commonAncestor);
  let newModel;
  if (commonAncestorIndex === -1) {
    newModel = newCommonAncestor;
  } else {
    newModel = produce(model, (draftModel) => {
      dangerousSetParent(
        draftModel,
        keychainA.slice(0, commonAncestorIndex + 1),
        newCommonAncestor
      );
    });
  }
  const leftKeychain =
    subChainA[0].index < subChainB[0].index ? keychainA : keychainB;
  const selection = { anchor: leftKeychain, focus: leftKeychain };
  return { model: newModel, selection };
}
