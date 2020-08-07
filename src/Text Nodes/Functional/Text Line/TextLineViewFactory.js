import { getChildViews } from '../Vertical List/VerticalListViewFactory';
import {
  generateMetrics,
  addViewStyles,
} from '../Text Block/textBlockViewFactory';
import { getViewGenerator } from '../BaseViewFactory';
import compoundFactory from '../../../React-Components/Text/compoundFactory';
import '../../../React-Components/Text/Styles/TextLine';

export const TEXT_LINE_TYPE = 'Text Line';

const TextLine = compoundFactory('TextLine');
const getView = getViewGenerator(TEXT_LINE_TYPE, TextLine);

/**
 *
 * @param {*} docList
 * @return {Object}
 */
export function TextLineViewFactory(docList) {
  const childViews = getChildViews(docList.elements);
  const { metrics, elementViews } = getSettings(childViews);
  const view = getView(metrics, elementViews);
  return view;

  /**
   * @param {Array} viewArray
   * @return {Object}
   */
  function getSettings(viewArray) {
    const metrics = generateMetrics(viewArray);
    addViewStyles(viewArray, metrics);
    return { metrics, elementViews: viewArray };
  }
}
