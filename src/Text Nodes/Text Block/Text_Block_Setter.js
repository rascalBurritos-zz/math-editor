/** @typedef {import('../../Abstract/MathBehavior').default} MathBehavior  */

import Metrics from '../../Math Nodes/Types/Metrics';

export default class Text_Block_Setter {
  /**
   * @param {Array} elements
   * @return {Object}
   */
  generateSettings(elements) {
    const metrics = generateMetrics();
    const elementStyles = generateStyles();

    return { metrics, elementStyles };

    /**
     * @return {Array}
     */
    function generateStyles() {
      const styleArray = elements.map((element) => {
        const marginTop = metrics.height - element.metrics.height;
        return { marginTop };
      });

      return styleArray;
    }

    /**
     * @return {Metrics}
     */
    function generateMetrics() {
      const height = elements.reduce((acc, curr) => {
        return Math.max(acc, curr.metrics.height);
      }, 0);
      const width = elements.reduce((acc, curr) => {
        return acc + curr.metrics.width;
      }, 0);
      const depth = elements.reduce((acc, curr) => {
        return Math.max(acc, curr.metrics.depth);
      }, 0);
      const metrics = new Metrics(height, width, depth);
      return metrics;
    }
  }
}
