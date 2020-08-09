import { TextEnvironment } from '../../../React-Components/Text/TextEnvironment';
import { getComponentStyle } from '../BaseView';
import {
  calculateBottomMargins,
  calculateMaxWidth,
  calculateMetrics,
  getChildIds,
} from '../Vertical List/VerticalListViewFactory';
import { TEXT_ENV_TYPE } from '../Node Types';

/**
 * @param {Object} documentList
 * @param {Object} currentView
 * @return {Object}
 */
export default function TextEnvViewFactory(documentList, currentView) {
  // lines Model -> line View -> metrics
  const childIds = getChildIds(documentList.elements, currentView);
  const metrics = getSettings(childIds, documentList, currentView);
  const view = getView(childIds, metrics);
  return view;

  /**
   * @param {*} childIds
   * @param {*} spec
   * @param {*} currentView
   * @return {Object}
   */
  function getSettings(childIds, spec, currentView) {
    const elementViews = childIds.map((id) => currentView[id]);
    const bottomMargins = calculateBottomMargins(elementViews, spec);
    const maxWidth = calculateMaxWidth(elementViews);
    addElementViewStyles(elementViews, bottomMargins);
    const metrics = calculateMetrics(elementViews, bottomMargins, maxWidth);
    return metrics;
    /**
     * @param {*} viewArray
     * @param {*} bottomMargins
     */
    function addElementViewStyles(viewArray, bottomMargins) {
      for (let i = 0; i < viewArray.length; i++) {
        viewArray[i].componentStyle.marginBottom = bottomMargins[i];
      }
    }
  }

  /**
   * @param {Array} childIds
   * @param {Metrics} metrics
   * @return {Object}
   */
  function getView(childIds, metrics) {
    const componentStyle = getComponentStyle(metrics);
    return {
      type: TEXT_ENV_TYPE,
      metrics,
      childIds,
      componentStyle,
      component: TextEnvironment,
    };
  }
}
