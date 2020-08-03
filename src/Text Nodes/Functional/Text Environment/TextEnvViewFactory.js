import { getChildViews } from '../Vertical List/VerticalListViewFactory';
import { generateMetrics } from '../Text Block/textBlockViewFactory';
import { getViewGenerator } from '../BaseViewFactory';
import { TextEnvironment } from '../../../React-Components/Text/TextEnvironment';

export const TEXT_ENV_TYPE = 'Text_Environment';

const getView = getViewGenerator(TEXT_ENV_TYPE, TextEnvironment);

/**
 * @param {Object} documentList
 * @return {Object}
 */
export default function TextEnvFactory(documentList) {
  const childViews = getChildViews(documentList.elements);
  const { metrics, elementViews } = getSettings(childViews);
  const view = getView(metrics, elementViews);
  return view;

  /**
   * @param {Array} childViews
   * @return {Object}
   */
  function getSettings(childViews) {
    const metrics = generateMetrics(childViews);
    return { metrics, elementViews: childViews };
  }
}
