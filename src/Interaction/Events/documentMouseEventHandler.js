import Point from '../../Abstract/Point';
import { keychainFromPosition } from '../Access/keychain';
import funcDocumentViewFactory from '../../Text Nodes/Functional/funcDocumentViewFactory';

/**
 * @param {*} event
 * @param {*} prevState
 * @param {String} docID
 * @param {boolean} resetAnchor
 * @param {Object} docRootView
 * @return {Object}
 */
export default function documentMouseEventHandler(
  event,
  prevState,
  docID,
  resetAnchor,
  docRootView
) {
  const mousePoint = new Point(event.pageY, event.pageX);
  const docRect = document.getElementById(docID).getBoundingClientRect();
  const docPoint = new Point(docRect.top, docRect.left);
  const relativePoint = mousePoint.subtract(docPoint);
  const rootView = docRootView
    ? docRootView
    : funcDocumentViewFactory(prevState.model);
  const keychain = keychainFromPosition(rootView, relativePoint);
  let selection;
  if (resetAnchor) {
    selection = { anchor: keychain, focus: keychain };
  } else {
    selection = { anchor: prevState.selection.anchor, focus: keychain };
  }
  return { selection };
}
