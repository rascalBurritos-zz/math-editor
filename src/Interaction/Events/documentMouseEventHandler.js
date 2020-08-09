import Point from '../../Abstract/Point';
import { keychainFromPosition } from '../Access/keychain';
import { ViewMaster } from '../../Text Nodes/Functional/ViewMaster';

/**
 * @param {*} event
 * @param {*} prevState
 * @param {String} docID
 * @param {boolean} resetAnchor
 * @return {Object}
 */
export default function documentMouseEventHandler(
  event,
  prevState,
  docID,
  resetAnchor
) {
  const mousePoint = new Point(event.pageY, event.pageX);
  const docRect = document.getElementById(docID).getBoundingClientRect();
  const docPoint = new Point(docRect.top, docRect.left);
  const relativePoint = mousePoint.subtract(docPoint);
  const viewMaster = new ViewMaster(prevState.model);
  const viewCollection = viewMaster.viewCollection;
  const rootId = viewMaster.rootId;
  const keychain = keychainFromPosition(viewCollection, rootId, relativePoint);
  let selection;
  if (resetAnchor) {
    selection = { anchor: keychain, focus: keychain };
  } else {
    selection = { anchor: prevState.selection.anchor, focus: keychain };
  }
  return { selection };
}
