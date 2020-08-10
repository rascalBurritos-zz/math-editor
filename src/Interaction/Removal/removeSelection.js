import { getCommonAncestorIndex, getCommonAncestor } from '../Access/getCommon';
import { removeBetween } from './removeBetween';
import { keychainsEqual } from '../Access/keychain';
import { updateAlongKeychain } from '../Insertion/insertIntoModel';
import { original } from 'immer';

/**
 * @param {Object} prevState
 * @return {Object}
 */
export default function removeSelection(prevState) {
  const focus = prevState.selection.focus;
  const anchor = prevState.selection.anchor;
  if (keychainsEqual(focus, anchor)) return;

  const commonAncestorIndex = getCommonAncestorIndex(focus, anchor);
  const commonAncestor = getCommonAncestor(
    prevState.model,
    focus,
    commonAncestorIndex,
    false
  );
  const subChainA = focus.slice(commonAncestorIndex + 1);
  const subChainB = anchor.slice(commonAncestorIndex + 1);
  removeBetween(subChainA, subChainB, commonAncestor);
  const leftKeychain = subChainA[0].index < subChainB[0].index ? focus : anchor;
  prevState.selection = { anchor: leftKeychain, focus: leftKeychain };
  // console.log(original(prevState));
  updateAlongKeychain(prevState, leftKeychain.slice(0, -1));
}
