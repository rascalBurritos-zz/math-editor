import Typesetter from '../../Abstract/Typesetter.js';
import SpacingTable from './InterElementSpacingTable.js';
import Spacing_Style from '../../Types/Spacing_Style.js';

export default class Formula_Setter extends Typesetter {
  /**
   * @param {Object} setSpec
   */
  constructor(setSpec) {
    super(setSpec);
  }

  /**
   * @param {string[]} spacingTypeArray
   * @param {number} pxpfu
   * @return {number[]} spacing in px between each elemen
   **/
  calculateInterElementSpacing(spacingTypeArray, pxpfu) {
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
    return spacingArray;
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
  }
}
