import Typesetter from '../../../Abstract/Typesetter.js';
import SpacingTable from './InterElementSpacingTable.js';
import Spacing_Style from '../../Types/Spacing_Style.js';
import Metrics from '../../Types/Metrics.js';

/** @typedef {import('../../../Abstract/MathBehavior').default} Behavior  */

export default class Formula_Setter extends Typesetter {
  /**
   * @param {Object} setSpec
   */
  constructor(setSpec) {
    super(setSpec);
  }

  /**
   * @param {number} pxpfu
   * @param {Behavior[]} elementBehaviors
   * @param {string[]} spacingTypeArray
   * @return {Object}
  //  * @property {number[]} spacing in px between each elemen
   **/
  generateSettings(pxpfu, elementBehaviors, spacingTypeArray) {
    const formulaSetter = this;
    const spacingArray = [];
    for (let i = 1; i < spacingTypeArray.length; i++) {
      const left = spacingTypeArray[i - 1];
      const right = spacingTypeArray[i];
      if (left === Spacing_Style.None || right === Spacing_Style.None) {
        spacingArray.push(0);
      } else {
        spacingArray.push(parseSpacingTable(SpacingTable[right][left], pxpfu));
      }
    }
    const metrics = calculateMetrics();
    return { spacingArray, metrics };
    /**
     * @param {String} code - Table Code
     * @param {number} pxpfu
     *@return {number} font unit spacing
     */
    function parseSpacingTable(code, pxpfu) {
      if (code === '*') {
        console.warn('Invalid Adjacent Spacing Styles');
        return 0;
      }
      const mu = (1 / 18) * formulaSetter._upm;
      const thinmu = 3 * mu;
      const medmu = 4 * mu;
      const thickmu = 5 * mu;
      const muMap = { '0': 0, '1': thinmu, '2': medmu, '3': thickmu };
      return muMap[code.charAt(0)] * pxpfu;
    }

    /**
     * @return {Metrics}
     */
    function calculateMetrics() {
      const height = calculateHeight();
      const width = calculateWidth();
      const depth = calculateDepth();
      return new Metrics(height, width, depth);
      /**
       * @return {number} - in pixels
       * Finds Max height of child behaviors
       */
      function calculateHeight() {
        const heightArray = elementBehaviors.map((ele) => ele.metrics.height);
        return Math.max(...heightArray);
      }
      /**
       * @return {number} min depth of child element
       * behaviors in pixels
       */
      function calculateDepth() {
        const depthArray = elementBehaviors.map((ele) => ele.metrics.depth);
        return Math.max(...depthArray);
      }
      /**
       * @return {number} width in pixels
       * of entire formula
       */
      function calculateWidth() {
        const rawWidth = elementBehaviors.reduce((acc, curr) => {
          return acc + curr.metrics.width;
        }, 0);
        const interElementTotal = spacingArray.reduce((acc, curr) => {
          return acc + curr;
        }, 0);
        const total = rawWidth + interElementTotal;
        return total;
      }
    }
  }
}
