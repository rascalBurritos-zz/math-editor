import Spacing_Style from '../../../Math Nodes/Types/Spacing_Style';
import Metrics from '../../../Math Nodes/Types/Metrics';
import { calculatePXPFU } from '../Formula/formulaViewFactory';
import { ViewMaster } from '../../Functional/ViewMaster';
import Math_Style from '../../../Math Nodes/Types/Math_Style';
import Fraction from '../../../React-Components/Math/Fraction';
import { getComponentStyle } from '../../Functional/BaseView';
import { FRACTION_TYPE } from '../../Functional/Node Types';

/** @typedef {import('../../../Math Nodes/Branch Nodes/Generalized Fraction/Generalized_Fraction_Behavior').default} Generalized_Fraction_Behavior  */

/**
 *
 * @param {*} mathList
 * @param {*} font
 * @param {*} style
 * @param {*} collectingView
 * @param {*} dependancyOrganizer
 * @return {Object}
 */
export default function fractionViewFactory(
  mathList,
  font,
  style,
  collectingView,
  dependancyOrganizer
) {
  const spec = generateSpec(font);
  const pxpfu = calculatePXPFU(style, font);
  const spacingStyle = Spacing_Style.Ordinary;
  const numStyle = getFractionStyle(style, true);
  const numView = ViewMaster.generateMath(
    mathList.numerator,
    font,
    numStyle,
    collectingView,
    dependancyOrganizer
  );
  const denomStyle = getFractionStyle(style, false);
  const denomView = ViewMaster.generateMath(
    mathList.denominator,
    font,
    denomStyle,
    collectingView,
    dependancyOrganizer
  );
  const settings = generateSettings(pxpfu, spec, style, numView, denomView);

  addElementStyles(settings, numView, denomView);
  const view = getView(settings, mathList.id, numView, denomView, spacingStyle);
  return view;
}
/**
 * @param {*} settings
 * @param {*} id
 * @param {*} numView
 * @param {*} denomView
 * @param {*} spacingStyle
 * @return {Object}
 */
function getView(settings, id, numView, denomView, spacingStyle) {
  const componentStyle = getComponentStyle(settings.metrics);
  return {
    ruleStyle: settings.ruleStyle,
    spacingStyle,
    id,
    type: FRACTION_TYPE,
    component: Fraction,
    componentStyle,
    metrics: settings.metrics,
    childIds: { num: numView.id, denom: denomView.id },
  };
}

/**
 *
 * @param {Object} settings
 * @param {*} numView
 * @param {*} denomView
 */
function addElementStyles(settings, numView, denomView) {
  Object.assign(numView.componentStyle, settings.numeratorComponentStyle);
  Object.assign(denomView.componentStyle, settings.denominatorComponentStyle);
}

/**
 * @param {Object} fontData
 * @return {Object}
 */
export function generateSpec(fontData) {
  const mc = fontData.MATH.MathConstants;
  const fp = {};
  fp.upm = fontData.upm;
  fp.scriptFactor = mc.ScriptPercentScaleDown;
  fp.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;

  fp.AxisHeight = mc.AxisHeight;
  fp.NumeratorShiftUp = mc.FractionNumeratorShiftUp;
  fp.NumeratorDisplayStyleShiftUp = mc.FractionNumeratorDisplayStyleShiftUp;
  fp.DenominatorShiftDown = mc.FractionDenominatorShiftDown;
  fp.DenominatorDisplayStyleShiftDown =
    mc.FractionDenominatorDisplayStyleShiftDown;
  fp.NumeratorGapMin = mc.FractionNumeratorGapMin;
  fp.NumDisplayStyleGapMin = mc.FractionNumDisplayStyleGapMin;
  fp.RuleThickness = mc.FractionRuleThickness;
  fp.DenominatorGapMin = mc.FractionDenominatorGapMin;
  fp.DenomDisplayStyleGapMin = mc.FractionDenomDisplayStyleGapMin;
  return fp;
}

/**
 * @param {number} pxpfu
 * @param {Object} spec
 * @param {*} currentStyle
 * @param {*} numeratorBehavior
 * @param {*} denominatorBehavior
 * @return {Object} result contains
 * metrics
 * numerator component style
 * denominator component style
 * rule height
 */
function generateSettings(
  pxpfu,
  spec,
  currentStyle,
  numeratorBehavior,
  denominatorBehavior
) {
  const numeratorGap = determineNumeratorGap(spec);
  const denominatorGap = determineDenominatorGap(spec);
  const totalWidth = determineTotalWidth();
  const numeratorComponentStyle = determineNumeratorComponentStyle();
  const denominatorComponentStyle = determineDenominatorComponentStyle();
  const ruleHeight = calculateRuleHeight(spec);
  const ruleStyle = { height: ruleHeight };
  const metrics = calculateMetrics(spec.AxisHeight);
  return {
    metrics,
    numeratorComponentStyle,
    denominatorComponentStyle,
    ruleStyle,
  };

  /**
   * @return {Object} component style
   */
  function determineNumeratorComponentStyle() {
    const marginLeft = (totalWidth - numeratorBehavior.metrics.width) / 2;
    return {
      marginBottom: numeratorGap,
      marginLeft,
    };
  }
  /**
   * @return {Object} component style
   */
  function determineDenominatorComponentStyle() {
    const marginLeft = (totalWidth - denominatorBehavior.metrics.width) / 2;
    return {
      marginTop: denominatorGap,
      marginLeft,
    };
  }

  /**
   * @return {number}
   */
  function determineTotalWidth() {
    return Math.max(
      numeratorBehavior.metrics.width,
      denominatorBehavior.metrics.width
    );
  }

  /**
   * @param {number} mathAxis
   * @return {Metrics}
   */
  function calculateMetrics(mathAxis) {
    const nm = numeratorBehavior.metrics;
    const dm = denominatorBehavior.metrics;
    const setMathAxis = mathAxis * pxpfu;
    const height =
      nm.height + nm.depth + numeratorGap + ruleHeight / 2 + setMathAxis;
    const width = totalWidth;
    const depth =
      ruleHeight / 2 + denominatorGap + dm.height + dm.depth - setMathAxis;
    return new Metrics(height, width, depth);
  }

  /**
   * @param {Object} spec
   * @return {number}
   */
  function calculateRuleHeight(spec) {
    return spec.RuleThickness * pxpfu;
  }

  /**
   * @param {Object} spec
   * @return {number}
   */
  function determineNumeratorGap(spec) {
    const minClearance = determineNumeratorMinClearance(spec);
    const defaultGap = determineNumeratorDefaultGap(spec);
    return Math.max(defaultGap, minClearance);
    /**
     * @param {Object} spec
     * @return {number}
     */
    function determineNumeratorDefaultGap(spec) {
      const setMathAxis = spec.AxisHeight * pxpfu;
      const baselineShiftUp =
        (currentStyle.type === 'D'
          ? spec.NumeratorDisplayStyleShiftUp
          : spec.NumeratorShiftUp) * pxpfu;
      return baselineShiftUp - numeratorBehavior.metrics.depth - setMathAxis;
    }
    /**
     * @param {Object} spec
     * @return {number}
     */
    function determineNumeratorMinClearance(spec) {
      return (
        (currentStyle.type === 'D'
          ? spec.NumDisplayStyleGapMin
          : spec.NumeratorGapMin) * pxpfu
      );
    }
  }
  /**
   * @param {Object} spec
   * @return {number}
   */
  function determineDenominatorGap(spec) {
    const minClearance = determineDenominatorMinClearance(spec);
    const defaultGap = determineDenominatorDefaultGap(spec);
    return Math.max(defaultGap, minClearance);
    /**
     * @param {Object} spec
     * @return {number}
     */
    function determineDenominatorDefaultGap(spec) {
      const setMathAxis = spec.AxisHeight * pxpfu;
      const baselineShiftDown =
        (currentStyle.type === 'D'
          ? spec.DenominatorDisplayStyleShiftDown
          : spec.DenominatorShiftDown) * pxpfu;
      return (
        baselineShiftDown - denominatorBehavior.metrics.height - setMathAxis
      );
    }
    /**
     * @param {Object} spec
     * @return {number}
     */
    function determineDenominatorMinClearance(spec) {
      const minClearance =
        (currentStyle.type === 'D'
          ? spec.DenomDisplayStyleGapMin
          : spec.DenominatorGapMin) * pxpfu;
      return minClearance;
    }
  }
}

/**
 * @return {Math_Style}
 * @param {Object} currentStyle
 * @param {boolean} isNumerator
 */
function getFractionStyle(currentStyle, isNumerator) {
  const ms = currentStyle;
  if (ms.type === 'D') {
    const isCramped = isNumerator ? ms.cramped : true;
    return new Math_Style('T', ms.fontSize, isCramped);
  } else {
    return getScriptStyle(isNumerator);
  }
  /**
   * @param {boolean} isSuperscript
   * @return {Math_Style}
   */
  function getScriptStyle(isSuperscript) {
    const styleMap = {
      D: 'S',
      T: 'S',
      S: 'SS',
      SS: 'SS',
    };

    const isCramped = isSuperscript ? ms.cramped : true;
    return new Math_Style(styleMap[ms.type], ms.fontSize, isCramped);
  }
}
