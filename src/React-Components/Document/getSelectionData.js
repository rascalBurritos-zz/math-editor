import getCaretView from '../../../Experiment 2/keyChainToViewPoint';

/**
 *
 * @param {Object} rootView
 * @param {Object} selection
 * @return {Object}
 */
export default function getSelectionData(rootView, selection) {
  const primary = getCaretView(rootView, selection.focus).position;
  const secondary = getCaretView(rootView, selection.anchor).position;
  return { primary, secondary };
}
