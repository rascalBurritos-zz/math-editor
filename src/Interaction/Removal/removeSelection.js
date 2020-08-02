import { traverse } from '../Access/access';
import { keychainsEqual } from '../Access/keychain';
import { getCommonAncestorIndex, getCommonAncestor } from '../Access/getCommon';
import { removeBetween } from './removeBetween';
import { CompoundTable } from '../Tables/nodeTable';
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
  const subChainA = keychainA.slice(commonAncestorIndex);
  const subChainB = keychainB.slice(commonAncestorIndex);
  const newCommonAncestor = removeBetween(subChainA, subChainB, commonAncestor);
  let newModel;
  if (commonAncestorIndex === 0) {
    newModel = newCommonAncestor;
  } else {
    newModel = produce(model, (draftModel) => {
      const commonAncestorParent = traverse(
        draftModel,
        keychainA.slice(0, commonAncestorIndex - 1),
        false
      );
      const dangerSetParent = DangerousSetContainer.retrieve(
        commonAncestorParent.type,
        false
      );
      dangerSetParent(
        commonAncestorParent,
        keychainA[commonAncestorIndex - 1],
        newCommonAncestor
      );
    });
  }
  const leftKeychain =
    subChainA[0].index < subChainB[0].index ? keychainA : keychainB;
  const selection = { anchor: leftKeychain, focus: leftKeychain };
  return { model: newModel, selection };
}
