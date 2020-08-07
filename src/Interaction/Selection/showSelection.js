import keychainToViewPoint, {
  keychainsEqual,
} from '../../Interaction/Access/keychain';
import { manifestSelection } from '../../Interaction/Selection/manifestSelection';
import { getCommonAncestorIndex, getCommonAncestor } from '../Access/getCommon';
import { getSubItem } from '../Access/access';
import { NodeTable } from '../Tables/nodeTable';

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
  const subChainA = keychainA.slice(commonAncestorIndex + 1);
  const subChainB = keychainB.slice(commonAncestorIndex + 1);
  const rectangles = manifestSelection(
    subChainA,
    subChainB,
    commonModelAncestor,
    commonViewAncestor
  );
  expandRectangles(
    view,
    keychainA.slice(0, commonAncestorIndex + 1),
    rectangles
  );
  const relativePos = keychainToViewPoint(
    view,
    keychainA.slice(0, commonAncestorIndex + 1)
  ).position;
  for (const rect of rectangles) {
    rect.addToOrigin(relativePos);
  }
  return rectangles;
}

/**
 * @param {*} rootView
 * @param {*} keychain
 * @param {*} rects
 */
function expandRectangles(rootView, keychain, rects) {
  let subView = rootView;
  for (const boxKey of keychain) {
    subView = getSubItem(subView, boxKey, true);
    const node = NodeTable.retrieve(subView.type);
    if ('expandSelection' in node) {
      node.expandSelection(subView, rects);
      break;
    }
  }
}
