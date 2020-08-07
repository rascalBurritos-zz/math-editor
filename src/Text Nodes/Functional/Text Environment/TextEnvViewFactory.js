import { TextEnvironment } from '../../../React-Components/Text/TextEnvironment';
import Metrics from '../../../Math Nodes/Types/Metrics';
import { getComponentStyle } from '../BaseView';
import {
  getChildViews,
  calculateBottomMargins,
  calculateMaxWidth,
  calculateMetrics,
} from '../Vertical List/VerticalListViewFactory';

export const TEXT_ENV_TYPE = 'Text_Environment';

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

// /**
//  *
//  * @param {Array} lines
//  * @param {number} baselineDistance
//  * @return {Array}
//  */
// function getLineViews(lines, baselineDistance) {
//   return lines.map((line, index) => {
//     const wordViews = line.map((word) => funcDocumentViewFactory(word));
//     const metrics = generateMetrics(wordViews);
//     wordViews.forEach((wordView) => {
//       wordView.componentStyle.marginTop =
//         metrics.height - wordView.metrics.height;
//     });
//     const marginBottom = index === length - 1 ? 0 : baselineDistance;
//     const componentStyle = { ...getComponentStyle(metrics), marginBottom };
//     return {
//       metrics,
//       elements: wordViews,
//       componentStyle,
//     };
//   });
// }

// /**
//  *
//  * @param {Array} lineArray
//  * @return {Metrics}
//  */
// function getMetrics(lineArray) {
//   const height = lineArray.reduce((acc, curr, index) => {
//     return (
//       acc +
//       curr.metrics.height +
//       curr.metrics.depth +
//       curr.componentStyle.marginBottom
//     );
//   }, 0);
//   const width = Math.max(...lineArray.map((line) => line.metrics.width));
//   const depth = 0;
//   return new Metrics(height, width, depth);
// }
