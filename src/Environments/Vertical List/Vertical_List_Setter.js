/** @typedef {import('../../Abstract/Behavior').default}  Behavior */

import Metrics from '../../Math Nodes/Types/Metrics';

export default class Vertical_List_Setter {
  /**
   * @param {Object} spec
   */
  constructor(spec) {
    this._baselineDistance = spec.baselineDistance;
    this._baselineBump = spec.baselineBump;
  }

  /**
   * @param {Behavior[]} elementBehaviors
   * @return {Object}
   * element component Styles
   *  bottom margins, left & right margins
   * metrics
   */
  generateSettings(elementBehaviors) {
    const vls = this;
    const bottomMargins = calculateBottomMargins();
    const maxWidth = calculateMaxWidth();
    const sideMargins = calculateSideMargins();
    const elementComponentStyles = calculateElementStyles();
    const metrics = calculateMetrics();
    return { metrics, elementComponentStyles };

    /**
     * @return {Array}
     */
    function calculateElementStyles() {
      const styles = [];
      for (let i = 0; i < elementBehaviors.length; i++) {
        const elementStyle = {};
        elementStyle.marginBottom = bottomMargins[i];
        elementStyle.marginLeft = sideMargins[i];
        elementStyle.marginRight = sideMargins[i];
        styles.push(elementStyle);
      }
      return styles;
    }

    /**
     * @return {Metrics}
     */
    function calculateMetrics() {
      const totalHeight =
        elementBehaviors.reduce((acc, curr) => {
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
     * @return {number[]}
     */
    function calculateSideMargins() {
      return elementBehaviors.map((behavior) => {
        return (maxWidth - behavior.metrics.width) / 2;
      });
    }

    /**
     * @return {number} max width
     */
    function calculateMaxWidth() {
      return elementBehaviors.reduce((acc, curr) => {
        return acc > curr.metrics.width ? acc : curr.metrics.width;
      }, 0);
    }

    /**
     * @return {number[]}
     */
    function calculateBottomMargins() {
      const bottomMarginArray = [];
      for (let i = 0; i < elementBehaviors.length - 1; i++) {
        const actualBaselineDistance =
          elementBehaviors[i].metrics.depth +
          elementBehaviors[i + 1].metrics.height;
        const marginBottom =
          actualBaselineDistance > vls._baselineDistance
            ? vls._baselineBump
            : vls._baselineDistance - actualBaselineDistance;
        bottomMarginArray.push(marginBottom);
      }
      bottomMarginArray.push(0);
      return bottomMarginArray;
    }

    // for the last one
    return { elementComponentStyles };
  }
}
