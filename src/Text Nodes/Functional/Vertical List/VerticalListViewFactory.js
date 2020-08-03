import Metrics from '../../../Math Nodes/Types/Metrics';
import { VerticalList } from '../../../React-Components/Document/VerticalList';
import funcDocumentViewFactory from '../funcDocumentViewFactory';
import { getViewGenerator } from '../BaseViewFactory';

/** @typedef {import('../BaseView').BaseView} BaseView  */

/**
 * @typedef {Object} _VerticalListView
 * @property {Array} elements
 */

/**
 *
 * @typedef {BaseView & _VerticalListView} VerticalListView
 */
export const VERTICAL_LIST_TYPE = 'Vertical List';
const getView = getViewGenerator(VERTICAL_LIST_TYPE, VerticalList);

/**
 * @param {Object} documentList
 * @return {VerticalListView}
 */
export default function verticalListFactory(documentList) {
  const childViews = getChildViews(documentList.elements);
  const spec = {};
  spec.baselineDistance = documentList.baselineDistance;
  spec.baselineBump = documentList.baselineBump;
  const { metrics, elementViews } = getSettings(childViews, spec);
  const view = getView(metrics, elementViews);
  return view;

  /**
   * @param {Array} elementViews
   * @param {Object} spec
   * @return {Object}
   * element component Styles
   *  bottom margins, left & right margins
   * metrics
   */
  function getSettings(elementViews, spec) {
    const bottomMargins = calculateBottomMargins(elementViews, spec);
    const maxWidth = calculateMaxWidth(elementViews);
    const sideMargins = calculateSideMargins(elementViews, maxWidth);
    const styledElementViews = addElementViewStyles(
      elementViews,
      bottomMargins,
      sideMargins
    );
    const metrics = calculateMetrics(elementViews, bottomMargins, maxWidth);
    return { metrics, elementViews: styledElementViews };

    /**
     *
     * @param {Array} elementViews
     * @param {Array} bottomMargins
     * @param {Array} sideMargins
     * @return {Array}
     */
    function addElementViewStyles(elementViews, bottomMargins, sideMargins) {
      return elementViews.map((element, index) => {
        element.componentStyle.marginBottom = bottomMargins[index];
        element.componentStyle.marginLeft = sideMargins[index];
        element.componentStyle.marginRight = sideMargins[index];
        return element;
      });
    }

    /**
     * @param {Array} elementViews
     * @param {Array} bottomMargins
     * @param {number} maxWidth
     * @return {Metrics}
     */
    function calculateMetrics(elementViews, bottomMargins, maxWidth) {
      const totalHeight =
        elementViews.reduce((acc, curr) => {
          return acc + curr.metrics.height + curr.metrics.depth;
        }, 0) +
        bottomMargins.reduce((acc, curr) => {
          return acc + curr;
        }, 0);
      const height = totalHeight / 2;
      const depth = totalHeight / 2;
      return new Metrics(height, maxWidth, depth);
    }

    /**
     * @param {Array} elementViews
     * @param {number} maxWidth
     * @return {Array}
     */
    function calculateSideMargins(elementViews, maxWidth) {
      return elementViews.map((view) => {
        return (maxWidth - view.metrics.width) / 2;
      });
    }

    /**
     * @param {Array} elementViews
     * @return {number} max width
     */
    function calculateMaxWidth(elementViews) {
      return elementViews.reduce((acc, curr) => {
        return acc > curr.metrics.width ? acc : curr.metrics.width;
      }, 0);
    }

    /**
     * @param {Array} elementViews
     * @param {Object} spec
     * @return {number[]}
     */
    function calculateBottomMargins(elementViews, spec) {
      return elementViews.map((element, index) => {
        const marginBottom =
          index + 1 < elementViews.length
            ? determineBottomMargin(element, elementViews[index + 1], spec)
            : 0;
        return marginBottom;
      });

      /**
       *
       * @param {Object} topElement
       * @param {Object} bottomElement
       * @param {Object} spec
       * @return {number}
       */
      function determineBottomMargin(topElement, bottomElement, spec) {
        const actualBaselineDistance =
          topElement.metrics.depth + bottomElement.metrics.height;
        const marginBottom =
          actualBaselineDistance > spec.baselineDistance
            ? spec.baselineBump
            : spec.baselineDistance - actualBaselineDistance;
        return marginBottom;
      }
    }
  }
}

/**
 * @param {Array} elements
 * @return {Array}
 */
export function getChildViews(elements) {
  return elements.map((element) => {
    return funcDocumentViewFactory(element);
  });
}
