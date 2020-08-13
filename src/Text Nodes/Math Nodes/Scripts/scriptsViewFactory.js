import Metrics from '../../../Math Nodes/Types/Metrics';
import { calculatePXPFU } from '../Formula/formulaViewFactory';
import { ViewMaster } from '../../Functional/ViewMaster';
import Math_Style from '../../../Math Nodes/Types/Math_Style';
import { MATH_GLYPH_TYPE, SCRIPTS_TYPE } from '../../Functional/Node Types';
import { getComponentStyle } from '../../Functional/BaseView';
import { SCRIPTS_INDEX } from './ScriptsNode';
import getFillerView from '../FillerView';
import Scripts from '../../../React-Components/Math/Scripts';
import Spacing_Style from '../../../Math Nodes/Types/Spacing_Style';

/**
 *
 * @param {*} mathList
 * @param {*} font
 * @param {*} style
 * @param {*} collectingView
 * @param {*} dependancyOrganizer
 * @return {Object}
 */
export default function scriptsFactory(
  mathList,
  font,
  style,
  collectingView,
  dependancyOrganizer
) {
  let superView;
  let subView;
  const childIds = {};
  if (mathList.subscript !== undefined) {
    childIds[SCRIPTS_INDEX.SUB] = mathList.subscript.id;
    ViewMaster.generateMath(
      mathList.subscript,
      font,
      getScriptStyle(style, false),
      collectingView,
      dependancyOrganizer
    );
    subView = collectingView[childIds[SCRIPTS_INDEX.SUB]];
  }
  if (mathList.superscript !== undefined) {
    childIds[SCRIPTS_INDEX.SUPER] = mathList.superscript.id;
    ViewMaster.generateMath(
      mathList.superscript,
      font,
      getScriptStyle(style, true),
      collectingView,
      dependancyOrganizer
    );
    superView = collectingView[childIds[SCRIPTS_INDEX.SUPER]];
  }
  if (!collectingView[mathList.nucleusId]) {
    dependancyOrganizer.registerDrain(mathList.id, { mathList, font, style });
    return getFillerView();
  }
  const nucleusView = collectingView[mathList.nucleusId];
  const pxpfu = calculatePXPFU(style, font);

  const spec = getSpec(font);
  console.log(superView, subView);
  const settings = generateSettings(
    pxpfu,
    spec,
    nucleusView,
    superView,
    subView
  );
  const spacingStyle = Spacing_Style.None;
  addElementStyles(settings, subView, superView);
  const view = getView(settings, childIds, mathList.id, spacingStyle);
  return view;
}

/**
 *
 * @param {*} settings
 * @param {*} childIds
 * @param {*} id
 * @param {*} spacingStyle
 * @return {Object}
 */
function getView(settings, childIds, id, spacingStyle) {
  // const metrics = settings.scriptContainerMetrics;
  const metrics = settings.scriptsMetrics;
  const componentStyle = getComponentStyle(metrics);
  return {
    // containerStyle: settings.scriptsComponentStyle,
    component: Scripts,
    spacingStyle,
    metrics,
    childIds,
    componentStyle,
    id,
    type: SCRIPTS_TYPE,
  };
}

/**
 * @param {*} settings
 * @param {*} subView
 * @param {*} superView
 */
function addElementStyles(settings, subView, superView) {
  if (subView) {
    Object.assign(subView.componentStyle, settings.subscriptComponentStyle);
  }
  if (superView) {
    Object.assign(superView.componentStyle, settings.superscriptComponentStyle);
  }
}

/**
 * @param {Object} currentStyle
 * @param {boolean} isSuperscript
 * @return {Math_Style}
 */
function getScriptStyle(currentStyle, isSuperscript) {
  const styleMap = {
    D: 'S',
    T: 'S',
    S: 'SS',
    SS: 'SS',
  };
  const isCramped = isSuperscript ? currentStyle.cramped : true;
  return new Math_Style(
    styleMap[currentStyle.type],
    currentStyle.fontSize,
    isCramped
  );
}

/**
 * @param {Object} fontData
 * @return {Object}
 */
export function getSpec(fontData) {
  const mc = fontData.MATH.MathConstants;
  const fp = {};
  fp.upm = fontData.upm;
  fp.scriptFactor = mc.ScriptPercentScaleDown;
  fp.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;
  fp.subscriptShiftDown = mc.SubscriptShiftDown;
  fp.subscriptTopMax = mc.SubscriptTopMax;
  fp.subscriptBaselineDropMin = mc.SubscriptBaselineDropMin;
  fp.superscriptShiftUp = mc.SuperscriptShiftUp;
  fp.superscriptShiftUpCramped = mc.SuperscriptShiftUpCramped;
  fp.superscriptBottomMin = mc.SuperscriptBottomMin;
  fp.superscriptBaselineDropMax = mc.SuperscriptBaselineDropMax;
  fp.subSuperscriptGapMin = mc.SubSuperscriptGapMin;
  fp.superscriptBottomMaxWithSubscript = mc.SuperscriptBottomMaxWithSubscript;
  fp.spaceAfterScript = mc.SpaceAfterScript;
  return fp;
}
const Script_Type = {
  SuperOnly: 'SuperOnly',
  SubOnly: 'SubOnly',
  Both: 'Both',
};

/**
 * @param {number} pxpfu
 * @param {*} spec
 * @param {*} nucleusView
 * @param {*} superView
 * @param {*} subView
 * @return {Object} result contains
 * Script Container Metrics
 * script Container css
 * script Metrics
 * script css
 * subscript css
 */
function generateSettings(pxpfu, spec, nucleusView, superView, subView) {
  // atom or Text or Formula
  const initialValues = determineScriptIntialValues(spec);
  // sub ,super, both
  const scriptType = determineScriptType();
  const scriptStrategies = {};
  scriptStrategies[Script_Type.SubOnly] = determineSubOnly;
  scriptStrategies[Script_Type.SuperOnly] = determineSuperOnly;
  scriptStrategies[Script_Type.Both] = determineBoth;
  const result = scriptStrategies[scriptType](spec);
  return result;

  /**
   * @param {Object} spec
   * @return {Object}
   * Script Container Metrics
   * script Container css
   * script Metrics
   * script css
   * subscript css
   */
  function determineSubOnly(spec) {
    const subscriptComponentStyle = {};
    subscriptComponentStyle.marginRight = spec.spaceAfterScript * pxpfu;
    const subscriptBaselineDepth = Math.max(
      initialValues.v,
      spec.subscriptShiftDown * pxpfu,
      subView.metrics.height - Math.abs(spec.subscriptTopMax) * pxpfu
    );
    const scriptsMetrics = new Metrics(
      subView.metrics.height - subscriptBaselineDepth,
      subView.metrics.width + subscriptComponentStyle.marginRight,
      subView.metrics.depth + subscriptBaselineDepth
    );
    return {
      subscriptComponentStyle,
      scriptsMetrics,
    };
  }

  /**
   * @param {Object} spec
   * @return {Object}
   */
  function determineSuperOnly(spec) {
    adjustInitialValuesForSuperscript(spec);
    const superscriptComponentStyle = {};
    superscriptComponentStyle.marginRight = spec.spaceAfterScript * pxpfu;
    superscriptComponentStyle.marginLeft = initialValues.delta;
    const scriptsMetrics = new Metrics(
      initialValues.u + superView.metrics.height,
      superView.metrics.width +
        superscriptComponentStyle.marginRight +
        superscriptComponentStyle.marginLeft,
      -(initialValues.u - superView.metrics.depth)
    );
    return {
      superscriptComponentStyle,
      scriptsMetrics,
    };
  }
  /**
   * @param {Object} spec
   * @return {Object}
   */
  function determineBoth(spec) {
    adjustInitialValuesForSuperscript(spec);
    initialValues.v = Math.max(
      initialValues.v,
      spec.subscriptShiftDown * pxpfu
    );
    // If there is !!not!! enough space between scripts,FIX IT
    correctScriptGap(spec);
    const superscriptComponentStyle = {};
    superscriptComponentStyle.marginRight = spec.spaceAfterScript * pxpfu;
    superscriptComponentStyle.marginLeft = initialValues.delta;

    const subscriptComponentStyle = {};
    subscriptComponentStyle.marginRight = spec.spaceAfterScript * pxpfu;

    const scriptsMetrics = new Metrics(
      initialValues.u + superView.metrics.height,
      Math.max(
        superView.metrics.width +
          initialValues.delta +
          spec.spaceAfterScript * pxpfu,
        subView.metrics.width + spec.spaceAfterScript * pxpfu
      ),
      initialValues.v + subView.metrics.depth
    );

    return {
      subscriptComponentStyle,
      scriptsMetrics,
      superscriptComponentStyle,
    };
  }

  /**
   * @param {Object} spec
   * adjusts initialValues such that
   * there is enough space between
   * the scripts
   */
  function correctScriptGap(spec) {
    if (
      initialValues.u -
        superView.metrics.depth +
        (initialValues.v - subView.metrics.height) <
      spec.subSuperscriptGapMin * pxpfu
    ) {
      initialValues.v =
        subView.metrics.height -
        initialValues.u +
        superView.metrics.depth +
        spec.subSuperscriptGapMin * pxpfu;
      const psi =
        spec.superscriptBottomMaxWithSubscript * pxpfu -
        (initialValues.u - superView.metrics.depth);
      if (psi > 0) {
        initialValues.u += psi;
        initialValues.v -= psi;
      }
    }
  }

  /**
   * @param {Object} spec
   * adjust {u,v,delta} becauase it is known that there
   * is a superscript
   */
  function adjustInitialValuesForSuperscript(spec) {
    let p = nucleusView.mathStyle.cramped
      ? spec.superscriptShiftUpCramped
      : spec.superscriptShiftUp;
    p = p * pxpfu;
    initialValues.u = Math.max(
      initialValues.u,
      p,
      superView.metrics.depth + Math.abs(spec.superscriptBottomMin * pxpfu)
    );
  }
  /**
   * @return {String}
   */
  function determineScriptType() {
    if (superView === undefined) {
      return Script_Type.SubOnly;
    } else if (subView === undefined) {
      return Script_Type.SuperOnly;
    } else {
      return Script_Type.Both;
    }
  }

  /**
   * @param {Object} spec
   * @return {Object} u,v,delta
   */
  function determineScriptIntialValues(spec) {
    const nucleusCategory = determineNucleusCategory(nucleusView.type);
    const categoryMap = {
      Atom: calculateAtomInitialValues,
      Formula: calculateFormulaInitialValues,
    };
    return categoryMap[nucleusCategory](spec);

    /**
     * @param {String} scriptStyleType
     * @param {Object} spec
     * @return {number} styleScaleFactor
     */
    function getScriptFactor(scriptStyleType, spec) {
      const scriptFactorMap = {
        D: 1,
        T: 1,
        S: spec.scriptFactor / 100,
        SS: spec.scriptscriptFactor / 100,
      };
      return scriptFactorMap[scriptStyleType];
    }

    /**
     * @return {Object} {u,v,delta}
     */
    function calculateAtomInitialValues() {
      // @ts-ignore
      return { u: 0, v: 0, delta: nucleusView.italicsCorrection };
    }
    /**
     * @param {Object} spec
     * @return {Object} {u,v,delta}
     */
    function calculateFormulaInitialValues(spec) {
      const u = superView
        ? nucleusView.metrics.height -
          spec.superscriptBaselineDropMax *
            getScriptFactor(superView.mathStyle.type, spec) *
            pxpfu
        : 0;

      const v = subView
        ? nucleusView.metrics.depth +
          spec.subscriptBaselineDropMin *
            getScriptFactor(subView.mathStyle.type, spec) *
            pxpfu
        : 0;
      const delta = nucleusView.italicsCorrection
        ? nucleusView.italicsCorrection
        : 0;
      return { u, v, delta };
    }

    /**
     * @param {String} type
     * @return {String} Atom, Formula, Text
     */
    function determineNucleusCategory(type) {
      // eventually add text option
      const atomTypes = [MATH_GLYPH_TYPE, 'Operator'];
      return atomTypes.includes(type) ? 'Atom' : 'Formula';
    }
  }
}
