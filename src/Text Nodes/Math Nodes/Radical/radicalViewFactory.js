import Spacing_Style from '../../../Math Nodes/Types/Spacing_Style.js';
import { calculatePXPFU } from '../Formula/formulaViewFactory.js';
import { radicalGlyphViewFactory } from './Subfactories/radicalGlyphViewFactory.js';
import Metrics from '../../../Math Nodes/Types/Metrics.js';
import { ViewMaster } from '../../Functional/ViewMaster.js';
import Math_Style from '../../../Math Nodes/Types/Math_Style.js';
import { RADICAL_TYPE } from '../../Functional/Node Types.js';
import { getComponentStyle } from '../../Functional/BaseView.js';
import Radical from '../../../React-Components/Math/Radical.js';

/** @typedef {import('../../../Math Nodes/Leaf Nodes/Radical_Glyph/Radical_Glyph_Setter.js').radicalSetterSpec} radicalGlyphSetterSpec  */

/**
 *
 * @param {*} mathList
 * @param {*} font
 * @param {*} style
 * @param {*} collectingView
 * @param {*} dependancyOrganizer
 * @return {Object}
 */
export default function radicalViewFactory(
  mathList,
  font,
  style,
  collectingView,
  dependancyOrganizer
) {
  const spec = getSpec(font);
  const spacingStyle = Spacing_Style.Ordinary;
  const pxpfu = calculatePXPFU(style, font);
  const childStyles = getChildMathStyles(style);
  const childIds = { radicand: mathList.radicand.id };
  const radicandView = ViewMaster.generateMath(
    mathList.radicand,
    font,
    childStyles.radicandStyle,
    collectingView,
    dependancyOrganizer
  );

  const dimensions = calculateRadicalGlyphDimensions(radicandView, spec, pxpfu);
  const radicalGlyphView = radicalGlyphViewFactory(
    font,
    pxpfu,
    dimensions.desiredLength,
    dimensions.desiredWidth,
    collectingView
  );
  Object.assign(radicalGlyphView.componentStyle, dimensions.componentStyle);
  childIds.radicalGlyph = radicalGlyphView.id;
  let degreeView;
  if (mathList.degree) {
    childIds.degree = mathList.degree.id;
    degreeView = ViewMaster.generateMath(
      mathList.degree,
      font,
      childStyles.degreeStyle,
      collectingView,
      dependancyOrganizer
    );
  }

  const settings = generateSettings(
    pxpfu,
    spec,
    dimensions.radicalProps,
    radicalGlyphView,
    radicandView,
    degreeView
  );
  adjustChildViews(settings, radicandView, radicalGlyphView, degreeView);
  const view = getView(settings, childIds, mathList.id, spacingStyle);
  return view;
}

/**
 * @param {*} settings
 * @param {*} childIds
 * @param {*} id
 * @param {*} spacingStyle
 * @return {Object}
 */
function getView(settings, childIds, id, spacingStyle) {
  const componentStyle = getComponentStyle(settings.metrics);
  return {
    component: Radical,
    id,
    spacingStyle,
    type: RADICAL_TYPE,
    containerDimensions: settings.containerDimensions,
    componentStyle,
    metrics: settings.metrics,
    childIds,
  };
}

/**
 *
 * @param {*} settings
 * @param {*} radicandView
 * @param {*} radicalGlyphView
 * @param {*} degreeView
 */
function adjustChildViews(
  settings,
  radicandView,
  radicalGlyphView,
  degreeView
) {
  Object.assign(
    radicalGlyphView.componentStyle,
    settings.radicalGlyphComponentStyle
  );
  Object.assign(radicandView.componentStyle, settings.radicandComponentStyle);
  Object.assign(degreeView.componentStyle, settings.degreeComponentStyle);
}

/**
 * @param {*} currentStyle
 * @return {Object}
 */
function getChildMathStyles(currentStyle) {
  const currentType = currentStyle.type;
  const currentFontSize = currentStyle.fontSize;
  const radicandStyle = new Math_Style(currentType, currentFontSize, true);
  const degreeStyle = new Math_Style(
    'SS',
    currentFontSize,
    currentStyle.cramped
  );
  return { radicandStyle, degreeStyle };
}

/**
 *
 * @param {*} radicandView
 * @param {*} radicalSpec
 * @param {*} pxpfu
 * @return {Object}
 */
function calculateRadicalGlyphDimensions(radicandView, radicalSpec, pxpfu) {
  const extraAscender = radicalSpec.extraAscender * pxpfu;
  const { radicandClearance, verticalGap } = calculateRadicandClearance();
  const radicalProps = { extraAscender, radicandClearance, verticalGap };
  const componentStyle = {
    marginTop: extraAscender, // note scale(1,-1 ) in affect, in reality this is margin top
    position: 'absolute',
  };
  return {
    style: radicandView.style,
    desiredLength: radicandClearance,
    desiredWidth: radicandView.metrics.width,
    componentStyle,
    radicalProps,
  };
  /**
   * @return {Object} requested radical glyph height
   */
  function calculateRadicandClearance() {
    const m = radicandView.metrics;
    const subClearance = m.height + m.depth;
    const verticalGap = determineRadicandVerticalGap();
    const radicandClearance = subClearance + verticalGap;
    return { radicandClearance, verticalGap };
    /**
     * @return {number} psi in appendix g illuminated
     */
    function determineRadicandVerticalGap() {
      const verticalGap =
        radicandView.mathStyle.type === 'D'
          ? radicalSpec.displayVerticalGap
          : radicalSpec.verticalGap;
      return verticalGap * pxpfu;
    }
  }
}

/**
 * @param {Object} fontData
 * @return {Object}
 */
function getSpec(fontData) {
  const mc = fontData.MATH.MathConstants;
  const setterSpec = {};
  setterSpec.upm = fontData.upm;
  setterSpec.scriptFactor = mc.ScriptPercentScaleDown;
  setterSpec.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;

  setterSpec.mathAxis = mc.AxisHeight;
  setterSpec.verticalGap = mc.RadicalVerticalGap;
  setterSpec.displayVerticalGap = mc.RadicalDisplayStyleVerticalGap;
  setterSpec.ruleThickness = mc.RadicalRuleThickness;
  setterSpec.extraAscender = mc.RadicalExtraAscender;
  setterSpec.kernBeforeDegree = mc.RadicalKernBeforeDegree;
  setterSpec.kernAfterDegree = mc.RadicalKernAfterDegree;
  setterSpec.degreeBottomRaisePercent = mc.RadicalDegreeBottomRaisePercent;
  return setterSpec;
}

/**
 * @param {number} pxpfu
 * @param {Object} radicalSpec
 * @param {Object} radicalProps
 * @param {Object} radicalGlyphView
 * @param {Object} radicandView
 * @param {Object} degreeView
 * @return {Object}
 * contains
 * complete radical glyph behavior (properly set)
 * metrics
 * degree component Style
 * radicand component style
 * h,w of combination
 */
function generateSettings(
  pxpfu,
  radicalSpec,
  radicalProps,
  radicalGlyphView,
  radicandView,
  degreeView
) {
  // assumes radical glyph is completely set and ready
  const ruleThickness = radicalSpec.ruleThickness * pxpfu;
  const { extraAscender, verticalGap, radicandClearance } = radicalProps;
  const radicandComponentStyle = calculateRadicandComponentStyle();
  let degreeComponentStyle;
  let degreeAdjustment = { verticalAdjustment: 0, horizontalAdjustment: 0 };
  let radicalGlyphComponentStyle = {};
  if (doesDegreeExist()) {
    degreeAdjustment = calculateDegreeAdjustment();
    adjustComponentStylesforDegreeAdjustment();
  }
  const metrics = generateMetrics();
  const containerDimensions = getComponentStyle(metrics);
  return {
    containerDimensions,
    metrics,
    radicalGlyphComponentStyle,
    radicandComponentStyle,
    degreeComponentStyle,
  };
  /**
   * adjusts radical glyph and degree
   * based on degree adjustments
   */
  function adjustComponentStylesforDegreeAdjustment() {
    const radicalGlyphMarginLeft = degreeAdjustment.horizontalAdjustment;
    const radicalGlyphMarginTop =
      degreeAdjustment.verticalAdjustment > 0
        ? degreeAdjustment.verticalAdjustment + extraAscender
        : extraAscender;
    radicalGlyphComponentStyle = {
      marginLeft: radicalGlyphMarginLeft,
      marginTop: radicalGlyphMarginTop, // actually margin Top scal(1,-1)
    };
    const degreeMarginLeft = radicalSpec.kernBeforeDegree * pxpfu;
    const degreeMarginTop =
      degreeAdjustment.verticalAdjustment < 0
        ? -degreeAdjustment.verticalAdjustment
        : 0;
    degreeComponentStyle = {
      marginLeft: degreeMarginLeft,
      marginTop: degreeMarginTop,
    };
  }
  /**
   * @return {Object} amount degree is jutting out
   */
  function calculateDegreeAdjustment() {
    const horizontalAdjustment = getHorizontalAdjustment();
    const verticalAdjustment = getVerticalAdjustment();
    return { horizontalAdjustment, verticalAdjustment };
    /**
     *@return {number}
     */
    function getHorizontalAdjustment() {
      const kernLeft = radicalSpec.kernBeforeDegree * pxpfu;
      const kernRight = radicalSpec.kernAfterDegree * pxpfu;
      const horizontalCandidate =
        kernLeft + degreeView.metrics.width + kernRight;
      return horizontalCandidate > 0 ? horizontalCandidate : 0;
    }
    /**
     * @return {number}
     */
    function getVerticalAdjustment() {
      const delimiterTotalHeight =
        radicalGlyphView.metrics.height + radicalGlyphView.metrics.depth;
      const pxFromTopOfDelimiter =
        (1 - radicalSpec.degreeBottomRaisePercent / 100) * delimiterTotalHeight;
      const degreeTotalHeight =
        degreeView.metrics.height + degreeView.metrics.depth;
      const verticalAdjustment =
        degreeTotalHeight - pxFromTopOfDelimiter - extraAscender;
      return verticalAdjustment;
    }
  }
  /**
   * @return {Metrics}
   */
  function generateMetrics() {
    const rgMetrics = radicalGlyphView.metrics;
    const metricVerticalAdjustment =
      doesDegreeExist() && degreeAdjustment.verticalAdjustment > 0
        ? degreeAdjustment.verticalAdjustment
        : 0;
    const height =
      radicandComponentStyle.marginTop +
      radicandView.metrics.height +
      metricVerticalAdjustment;
    // rgMetrics.height + extraAscender + metricVerticalAdjustment;
    // const depth = rgMetrics.depth;
    const depth =
      radicandComponentStyle.marginBottom + radicandView.metrics.depth;
    const width = rgMetrics.width + degreeAdjustment.horizontalAdjustment;
    return new Metrics(height, width, depth);
  }

  /**
   * calculates top and bottom margins for radicand
   * @return {Object}
   */
  function calculateRadicandComponentStyle() {
    const rg = radicalGlyphView.metrics;
    const radicalGlyphHeight = rg.height + rg.depth - ruleThickness;
    const delta = (1 / 2) * (radicalGlyphHeight - radicandClearance);
    const marginTop = verticalGap + delta + ruleThickness + extraAscender;
    return { marginTop, marginBottom: delta, alignSelf: 'flex-end' };
  }
  /**
   * @return {boolean}
   */
  function doesDegreeExist() {
    return degreeView !== undefined;
  }
}
