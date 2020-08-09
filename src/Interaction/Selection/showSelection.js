import keychainToViewPoint, {
  keychainsEqual,
} from '../../Interaction/Access/keychain';
import { manifestSelection } from '../../Interaction/Selection/manifestSelection';
import { getCommonAncestorIndex, getCommonAncestor } from '../Access/getCommon';
import { getSubItem } from '../Access/access';
import { NodeTable } from '../Tables/nodeTable';
import Point from '../../Abstract/Point';

/**
 *
 * @param {Object} model
 * @param {Object} viewCollection
 * @param {Object} rootId
 * @param {Array} keychainA
 * @param {Array} keychainB
 * @return {Object}
 */
export default function showSelection(
  model,
  viewCollection,
  rootId,
  keychainA,
  keychainB
) {
  if (keychainsEqual(keychainA, keychainB)) return {};
  const commonAncestorIndex = getCommonAncestorIndex(keychainA, keychainB);
  const commonViewAncestor = getCommonAncestor(
    viewCollection[rootId],
    keychainA,
    commonAncestorIndex,
    viewCollection
  );
  const commonModelAncestor = getCommonAncestor(
    model,
    keychainA,
    commonAncestorIndex
  );
  const subChainA = keychainA.slice(commonAncestorIndex + 1);
  const subChainB = keychainB.slice(commonAncestorIndex + 1);
  const rectangles = manifestSelection(
    subChainA,
    subChainB,
    commonModelAncestor,
    commonViewAncestor,
    viewCollection
  );
  const targetIndex = expandRectangles(
    viewCollection,
    rootId,
    keychainA.slice(0, commonAncestorIndex + 1),
    rectangles
  );
  const relativePos = keychainToViewPoint(
    rootId,
    viewCollection,
    keychainA.slice(0, targetIndex + 1)
  ).position;
  for (const rect of rectangles) {
    rect.addToOrigin(relativePos);
  }
  return rectangles;
}

/**
 * @param {*} viewCollection
 * @param {*} rootId
 * @param {*} keychain
 * @param {*} rects
 * @return {number}
 */
function expandRectangles(viewCollection, rootId, keychain, rects) {
  let subView = viewCollection[rootId];
  for (const [index, boxKey] of keychain.entries()) {
    subView = getSubItem(subView, boxKey, viewCollection);
    const node = NodeTable.retrieve(subView.type);
    if ('expandSelection' in node) {
      node.expandSelection(subView, rects);
      const relPos = keychainToViewPoint(
        subView.id,
        viewCollection,
        keychain.slice(index + 1)
      );
      for (const rect of rects) {
        rect.addToOrigin(new Point(0, relPos.position.left));
      }
      return index;
    }
  }
  return keychain.length - 1;
}
