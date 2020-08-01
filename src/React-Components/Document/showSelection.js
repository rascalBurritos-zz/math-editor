import keychainToViewPoint, {
  keychainsEqual,
} from '../../Interaction/Access/keychain';
import { manifestSelection } from '../../Interaction/Selection/manifestSelection';
import {
  getCommonAncestorIndex,
  getCommonAncestor,
} from '../../Interaction/Selection/getCommon';

/**
 *
 * @param {Object} model
 * @param {Object} view
 * @param {Array} keychainA
 * @param {Array} keychainB
 * @return {Object}
 */
export default function showSelection(model, view, keychainA, keychainB) {
  if (keychainsEqual(keychainA, keychainB)) return {};
  const commonAncestorIndex = getCommonAncestorIndex(keychainA, keychainB);
  const commonViewAncestor = getCommonAncestor(
    view,
    keychainA,
    commonAncestorIndex,
    true
  );
  const commonModelAncestor = getCommonAncestor(
    model,
    keychainA,
    commonAncestorIndex,
    false
  );
  const subChainA = keychainA.slice(commonAncestorIndex);
  const subChainB = keychainB.slice(commonAncestorIndex);
  let rectangles = manifestSelection(
    subChainA,
    subChainB,
    commonModelAncestor,
    commonViewAncestor
  );
  // let rectangles = showSelectionDirectly(subChainA, subChainB, commonAncestor);
  const relativePos = keychainToViewPoint(
    view,
    keychainA.slice(0, commonAncestorIndex)
  ).position;
  rectangles = rectangles.map((rect) => {
    return rect.addToOrigin(relativePos);
  });
  return rectangles;
}
