import { GlyphComponentData } from './GlyphComponentData.js';
import { interElementSpacingTable } from './leftRightTable.js';
import { Formula } from '../React-Components/Formula.js';
import { MathStyle } from './MathStyle.js';
import { ScriptsComponentData } from './ScriptsComponentData.js';
import { ExtendedGlyphComponentData } from './ExtendedGlyphComponentData';
import { determineTypeOfVariant } from './Variants/determineTypeOfVariant.js';
import { RadicalComponentData } from './RadicalComponentData.js';

export class FormulaComponentData {
  /**
   *
   * @param {*} mathList
   * @param {*} fontData
   * @param {*} style
   */
  constructor(mathList, fontData, style) {
    this.style = style;
    this.elements = [];
    mathList.forEach((ele) => {
      this.elements.push(
        FormulaComponentData.componentFactory(ele, style, fontData)
      );
    });
    let spacingArray = FormulaComponentData.getInterElementSpacing(
      mathList,
      this.style
    );
    let heightArray = FormulaComponentData.getDimensionEachElement(
      'height',
      this.elements
    );
    let depthArray = FormulaComponentData.getDimensionEachElement(
      'depth',
      this.elements
    );
    let widthArray = FormulaComponentData.getDimensionEachElement(
      'width',
      this.elements
    );

    let topMargins = FormulaComponentData.getTopMarginsForBaselineAlign(
      heightArray
    );
    this.elements = FormulaComponentData.adjustMarginsOfElements(
      this.elements,
      topMargins,
      spacingArray
    );
    this.css = {};
    this.css.height = FormulaComponentData.getCSSHeight(
      heightArray,
      depthArray
    );
    this.css.width = FormulaComponentData.getCSSWidth(spacingArray, widthArray);
    this.css.display = 'flex';
    this.css.flexDirection = 'row';
    this.css.position = 'relative';
    this.height = Math.max(...heightArray);
    this.depth = Math.max(...depthArray);
    this.width = this.css.width;
    this.component = Formula;
  }
  /**
   * @return {Object}
   */
  static adjustMarginsOfElements(elementArray, topMargins, rightMargins) {
    let adjustedElementArray = [];
    elementArray.forEach((ele, index) => {
      if (ele.css !== undefined) {
        let topMargin = topMargins[index] ? topMargins[index] + 'px' : '0';
        ele.css.marginTop = topMargin;
        let rightMargin = rightMargins[index]
          ? rightMargins[index] + 'px'
          : '0px';
        ele.css.marginRight = rightMargin;
      }
      adjustedElementArray.push(ele);
    });
    return adjustedElementArray;
  }
  /**
   * @return {Object}
   */
  static getDimensionEachElement(dimensionToGet, elementArray) {
    let dimensionArray = [];
    elementArray.forEach((ele) => {
      if (ele[dimensionToGet] !== undefined) {
        dimensionArray.push(ele[dimensionToGet]);
      }
    });
    return dimensionArray;
  }
  /**
   * @return {Object}
   */
  static componentFactory(element, style, fontData) {
    let currentFontSize = style.getStylizedSize(fontData.MATH.MathConstants);
    if (element.type === 'Script') {
      return new ScriptsComponentData(element, style, fontData);
    } else if (element.type === 'Radical') {
      let pxpfu = currentFontSize / fontData.upm;
      let mathSpec = {
        fontData: fontData,
        mathList: element,
        pxpfu: pxpfu,
        style: style,
      };
      return new RadicalComponentData(mathSpec);
    } else if (element.extension === 'Extended') {
      return determineTypeOfVariant(
        element.unicode,
        element.desiredSize,
        currentFontSize,
        element.direction,
        fontData
      );
    } else {
      return new GlyphComponentData(
        String.fromCodePoint(element.unicode),
        currentFontSize,
        fontData.glyphMetrics[element.unicode],
        fontData.upm,
        fontData.fontFamily,
        fontData.asc,
        fontData.des
      );
    }
  }
  /**
   * @return {Object}
   */
  static getTopMarginsForBaselineAlign(heightArray) {
    let maxHeight = Math.max(...heightArray);
    let topMargins = [];
    heightArray.forEach((ele) => {
      topMargins.push(maxHeight - ele);
    });
    return topMargins;
  }
  /**
   * @return {Object}
   */
  static getInterElementSpacing(mathList, style) {
    //TODO incorporate style
    let mu = (1 / 18) * style.fontSize;
    let thinmu = 3 * mu,
      medmu = 4 * mu,
      thickmu = 5 * mu;
    let spacingArray = [];
    let muMap = { '0': 0, '1': thinmu, '2': medmu, '3': thickmu };
    for (let i = 1; i < mathList.length; i++) {
      let atomTypes = ['Ordinary', 'Binary', 'Relation', 'Punctuation'];
      let right = atomTypes.includes(mathList[i].type) ? mathList[i].type : 0;
      let left = atomTypes.includes(mathList[i - 1].type)
        ? mathList[i - 1].type
        : 0;
      {
        //make fix the orientation :/
        if (atomTypes.includes(left) && atomTypes.includes(right)) {
          let code = interElementSpacingTable[right][left];

          spacingArray.push(muMap[code.charAt(0)]);
        } else {
          spacingArray.push('0');
        }
      }
    }
    return spacingArray;
  }

  /**
   * @return {Object}
   */
  static getCSSWidth(widthArray, spacingArray) {
    let width = 0;
    widthArray.forEach((ele) => {
      width += ele;
    });
    spacingArray.forEach((ele) => {
      width += ele;
    });
    return width;
  }
  /**
   * @return {Object}
   */
  static getCSSHeight(heightArray, depthArray) {
    let maxHeight = Math.max(...heightArray);
    let maxDepth = Math.max(...depthArray);
    return maxHeight + maxDepth;
  }
}
