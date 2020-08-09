import { TextEnvironment } from '../../../React-Components/Text/TextEnvironment';
import { getComponentStyle } from '../BaseView';
import {
  getChildViews,
  calculateBottomMargins,
  calculateMaxWidth,
  calculateMetrics,
} from '../Vertical List/VerticalListViewFactory';
import { TEXT_ENV_TYPE } from '../Node Types';

/**
 * @param {Object} documentList
 * @return {Object}
 */
export default function TextEnvViewFactory(documentList) {
  // lines Model -> line View -> metrics
  const childViews = getChildViews(documentList.elements);
  const { metrics, elementViews } = getSettings(childViews, documentList);
  const view = getView(elementViews, metrics);
  return view;

  /**
   *
   * @param {*} elementViews
   * @param {*} spec
   * @return {Object}
   */
  function getSettings(elementViews, spec) {
    const bottomMargins = calculateBottomMargins(elementViews, spec);
    const maxWidth = calculateMaxWidth(elementViews);
    addElementViewStyles(elementViews, bottomMargins);
    const metrics = calculateMetrics(elementViews, bottomMargins, maxWidth);
    return { elementViews, metrics };

    /**
     *
     * @param {*} viewArray
     * @param {*} bottomMargins
     */
    function addElementViewStyles(viewArray, bottomMargins) {
      for (const [i, view] of viewArray.entries()) {
        view.componentStyle.marginBottom = bottomMargins[i];
      }
    }
  }

  /**
   * @param {Array} viewArray
   * @param {Metrics} metrics
   * @return {Object}
   */
  function getView(viewArray, metrics) {
    const componentStyle = getComponentStyle(metrics);
    return {
      type: TEXT_ENV_TYPE,
      metrics,
      elements: viewArray,
      componentStyle,
      component: TextEnvironment,
    };
  }
}
