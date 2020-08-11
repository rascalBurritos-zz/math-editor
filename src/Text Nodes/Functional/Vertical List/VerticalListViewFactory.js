import Metrics from '../../../Math Nodes/Types/Metrics';
import { getViewGenerator } from '../BaseViewFactory';
import { VERTICAL_LIST_TYPE } from '../Node Types';
import { ViewMaster } from '../ViewMaster';
import { Compound } from '../../../React-Components/Text/Compound';
import '../../../React-Components/Document/Styles/VerticalList';

/** @typedef {import('../BaseView').BaseView} BaseView  */

/**
 * @typedef {Object} _VerticalListView
 * @property {Array} elements
 */

/**
 * @typedef {BaseView & _VerticalListView} VerticalListView
 */

const getView = getViewGenerator(VERTICAL_LIST_TYPE, Compound);

/**
 * @param {Object} documentList
 * @param {Object} currentView
 * @return {VerticalListView}
 */
export default function verticalListFactory(documentList, currentView) {
  const childIds = getChildIds(documentList.elements, currentView);
  const metrics = getSettings(childIds, documentList);
  const view = getView(metrics, documentList.id, childIds);
  return view;

  /**
   * @param {Array} childIds
   * @param {Object} spec
   * @return {Object}
   * element component Styles
   *  bottom margins, left & right margins
   * metrics
   */
  function getSettings(childIds, spec) {
    const elementViews = childIds.map((id) => currentView[id]);
    const bottomMargins = calculateBottomMargins(elementViews, spec);
    const maxWidth = calculateMaxWidth(elementViews);
    const sideMargins = calculateSideMargins(elementViews, maxWidth);
    addElementViewStyles(elementViews, bottomMargins, sideMargins);
    return calculateMetrics(elementViews, bottomMargins, maxWidth);

    /**
     * @param {Array} elementViews
     * @param {Array} bottomMargins
     * @param {Array} sideMargins
     */
    function addElementViewStyles(elementViews, bottomMargins, sideMargins) {
      for (let i = 0; i < elementViews.length; i++) {
        const element = elementViews[i];
        element.componentStyle.marginBottom = bottomMargins[i];
        element.componentStyle.marginLeft = sideMargins[i];
        element.componentStyle.marginRight = sideMargins[i];
      }
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
  }
}

/**
 * @param {Array} elements
 * @param {Object} currentView
 * @return {Array}
 */
export function getChildIds(elements, currentView) {
  const childIds = [];
  for (let i = 0; i < elements.length; i++) {
    ViewMaster.generateView(elements[i], currentView);
    childIds.push(elements[i].id);
  }
  return childIds;
}

/**
 * @param {Array} elementViews
 * @return {number} max width
 */
export function calculateMaxWidth(elementViews) {
  return elementViews.reduce((acc, curr) => {
    return acc > curr.metrics.width ? acc : curr.metrics.width;
  }, 0);
}

/**
 * @param {Array} elementViews
 * @param {Object} spec
 * @return {number[]}
 */
export function calculateBottomMargins(elementViews, spec) {
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

/**
 * @param {Array} elementViews
 * @param {Array} bottomMargins
 * @param {number} maxWidth
 * @return {Metrics}
 */
export function calculateMetrics(elementViews, bottomMargins, maxWidth) {
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
