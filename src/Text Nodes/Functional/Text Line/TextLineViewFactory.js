import { getChildIds } from '../Vertical List/VerticalListViewFactory';
import {
  generateMetrics,
  addViewStyles,
} from '../Text Block/textBlockViewFactory';
import { getViewGenerator } from '../BaseViewFactory';
import compoundFactory from '../../../React-Components/Text/compoundFactory';
import '../../../React-Components/Text/Styles/TextLine';
import { TEXT_LINE_TYPE } from '../Node Types';

const tl = compoundFactory('TextLine');
const TextLine = tl;
const getView = getViewGenerator(TEXT_LINE_TYPE, TextLine);

/**
 * @param {*} docList
 * @param {*} currentView
 * @return {Object}
 */
export function TextLineViewFactory(docList, currentView) {
  const childIds = getChildIds(docList.elements, currentView);
  const metrics = getSettings(childIds, currentView);
  const view = getView(metrics, childIds);
  return view;

  /**
   * @param {Array} childIds
   * @param {Object} currentView
   * @return {Object}
   */
  function getSettings(childIds, currentView) {
    const viewArray = childIds.map((id) => currentView[id]);
    const metrics = generateMetrics(viewArray);
    addViewStyles(viewArray, metrics);
    return metrics;
  }
}
