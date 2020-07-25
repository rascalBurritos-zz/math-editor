import Point from '../../Abstract/Point';
import documentViewFactory from '../../Factories/documentViewFactory';
import { keychainFromPosition } from '../../../Experiment 2/determineKeychain';

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
  const rootView = documentViewFactory(prevState.model);
  const keychain = keychainFromPosition(relativePoint, rootView);
  let selection;
  if (resetAnchor) {
    selection = { anchor: keychain, focus: keychain };
  } else {
    selection = { anchor: prevState.selection.anchor, focus: keychain };
  }
  return { selection };
}
