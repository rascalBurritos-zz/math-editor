import Spacing_Style from '../../../Math Nodes/Types/Spacing_Style';
import { ViewMaster } from '../../Functional/ViewMaster';
import SpacingTable from '../../../Math Nodes/Branch Nodes/Formula/InterElementSpacingTable';
import Metrics from '../../../Math Nodes/Types/Metrics';
import { getViewGenerator } from '../../Functional/BaseViewFactory';
import { FORMULA_TYPE } from '../../Functional/Node Types';
import { Compound } from '../../../React-Components/Text/Compound';

const getView = getViewGenerator(FORMULA_TYPE, Compound);

/**
 *
 * @param {*} mathList
 * @param {*} font
 * @param {*} style
 * @param {*} collectingView
 * @return {Object}
 */
export default function formulaFactory(mathList, font, style, collectingView) {
  const childIds = getChildIds(mathList.elements, font, style, collectingView);
  const pxpfu = calculatePXPFU(style, font);
  const elementViews = getChildViews(childIds, collectingView);
  const spacingTypeArray = getSpacingTypes(elementViews);
  const settings = generateSettings(
    pxpfu,
    font.upm,
    elementViews,
    spacingTypeArray
  );

  addElementViews(settings, elementViews);

  const view = getView(settings.metrics, mathList.id, childIds);
  view.spacingStyle = Spacing_Style.None;
  return view;
}

/**
 *
 * @param {*} settings
 * @param {*} childViews
 */
function addElementViews(settings, childViews) {
  for (let i = 0; i < childViews.length; i++) {
    const view = childViews[i];
    const marginTop = settings.metrics.height - view.metrics.height + 'px';
    view.componentStyle.marginTop = marginTop;
    const marginRight = settings.spacingArray[i];
    view.componentStyle.marginRight = marginRight;
  }
}

/**
 * @param {*} childViews
 * @return {Array}
 */
function getSpacingTypes(childViews) {
  const rawTypes = childViews.map((ele) => ele.spacingStyle);
  return rawTypes;
}

/**
 *
 * @param {*} childIds
 * @param {*} collectingView
 * @return {Array}
 */
function getChildViews(childIds, collectingView) {
  return childIds.map((id) => collectingView[id]);
}

/**
 *
 * @param {*} elements
 * @param {*} font
 * @param {*} style
 * @param {*} collectingView
 * @return {Array};
 */
function getChildIds(elements, font, style, collectingView) {
  const childIds = [];
  for (let i = 0; i < elements.length; i++) {
    ViewMaster.generateMath(elements[i], font, style, collectingView);
    childIds.push(elements[i].id);
  }
  return childIds;
}

/**
   * @param {number} pxpfu
   * @param {number} upm
   * @param {MathBehavior[]} elementBehaviors
   * @param {string[]} spacingTypeArray
   * @return {Object}
  //  * @property {number[]} spacing in px between each elemen
   **/
function generateSettings(pxpfu, upm, elementBehaviors, spacingTypeArray) {
  const spacingArray = [];
  for (let i = 1; i < spacingTypeArray.length; i++) {
    const left = spacingTypeArray[i - 1];
    const right = spacingTypeArray[i];
    if (left === Spacing_Style.None || right === Spacing_Style.None) {
      spacingArray.push(0);
    } else {
      spacingArray.push(
        parseSpacingTable(SpacingTable[right][left], pxpfu, upm)
      );
    }
  }
  const metrics = calculateMetrics();
  return { spacingArray, metrics };
  /**
   * @param {String} code - Table Code
   * @param {number} pxpfu
   * @param {number} upm
   *@return {number} font unit spacing
   */
  function parseSpacingTable(code, pxpfu, upm) {
    if (code === '*') {
      console.warn('Invalid Adjacent Spacing Styles');
      return 0;
    }
    const mu = (1 / 18) * upm;
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

/**
 * @param {*} mathStyle
 * @param {Object} font
 * @return {number} pixels per font unit
 */
export function calculatePXPFU(mathStyle, font) {
  const mc = font.MATH.MathConstants;
  const upm = font.upm;
  const scriptFactor = mc.ScriptPercentScaleDown;
  const scriptscriptFactor = mc.ScriptScriptPercentScaleDown;

  const scaleMap = {
    D: 1,
    T: 1,
    S: scriptFactor / 100,
    SS: scriptscriptFactor / 100,
  };
  const scaleFactor = scaleMap[mathStyle.type];
  return (mathStyle.fontSize / upm) * scaleFactor;
}
