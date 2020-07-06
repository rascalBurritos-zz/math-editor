import Typesetter from '../../../Abstract/Typesetter';
import Script_Type from './Script_Type';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../Leaf Nodes/Glyph/Glyph_Behavior').default} Glyph_Behavior  */
/** @typedef {import('../../../Abstract/Typesetter').setterSpec} setterSpec  */
/** @typedef {import('../../../Abstract/MathBehavior').default} MathBehavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/**
 * @typedef {Object} ScriptSetterType
 */
export default class Script_Setter extends Typesetter {
  /**
   * @param {Object} scriptSpec
   * h,w,d of behavior
   * margins
   */
  constructor(scriptSpec) {
    super(scriptSpec);

    // font parameters
    this._scriptFactor = scriptSpec.scriptFactor;
    this._scriptscriptFactor = scriptSpec.scriptscriptFactor;

    this._subscriptShiftDown = scriptSpec.subscriptShiftDown;
    this._subscriptTopMax = scriptSpec.subscriptTopMax;
    this._subscriptBaselineDropMin = scriptSpec.subscriptBaselineDropMin;
    this._superscriptShiftUp = scriptSpec.superscriptShiftUp;
    this._superscriptShiftUpCramped = scriptSpec.superscriptShiftUpCramped;
    this._superscriptBottomMin = scriptSpec.superscriptBottomMin;
    this._superscriptBaselineDropMax = scriptSpec.superscriptBaselineDropMax;
    this._subSuperscriptGapMin = scriptSpec.subSuperscriptGapMin;
    this._superscriptBottomMaxWithSubscript =
      scriptSpec.superscriptBottomMaxWithSubscript;
    this._spaceAfterScript = scriptSpec.spaceAfterScript;
  }

  /**
   * @param {number} pxpfu
   * @param {MathBehavior} nucleusBehavior
   * @param {MathBehavior} superBehavior
   * @param {MathBehavior} subBehavior
   * @return {Object} result contains
   * Script Container Metrics
   * script Container css
   * script Metrics
   * script css
   * subscript css
   */
  generateSettings(pxpfu, nucleusBehavior, superBehavior, subBehavior) {
    const scriptsSetter = this;
    // atom or Text or Formula
    const initialValues = determineScriptIntialValues();
    // sub ,super, both
    const scriptType = determineScriptType();
    const scriptStrategies = {};
    scriptStrategies[Script_Type.SubOnly] = determineSubOnly;
    scriptStrategies[Script_Type.SuperOnly] = determineSuperOnly;
    scriptStrategies[Script_Type.Both] = determineBoth;
    const result = scriptStrategies[scriptType]();
    alignToBaseline(result);
    return result;

    /**
     * @param {Object} result
     */
    function alignToBaseline(result) {
      result.nucleusComponentStyle = {
        marginTop:
          result.scriptContainerMetrics.height - nucleusBehavior.metrics.height,
      };
      result.scriptsComponentStyle.marginTop =
        result.scriptContainerMetrics.height - result.scriptsMetrics.height;
    }
    /**
     * @return {Object}
     * Script Container Metrics
     * script Container css
     * script Metrics
     * script css
     * subscript css
     */
    function determineSubOnly() {
      const subscriptComponentStyle = {};
      subscriptComponentStyle.marginRight =
        scriptsSetter._spaceAfterScript * pxpfu;
      const subscriptBaselineDepth = Math.max(
        initialValues.v,
        scriptsSetter._subscriptShiftDown * pxpfu,
        subBehavior.metrics.height -
          Math.abs(scriptsSetter._subscriptTopMax) * pxpfu
      );
      const scriptsMetrics = new Metrics(
        subBehavior.metrics.height - subscriptBaselineDepth,
        subBehavior.metrics.width + subscriptComponentStyle.marginRight,
        subBehavior.metrics.depth + subscriptBaselineDepth
      );
      const scriptsComponentStyle = {
        height: scriptsMetrics.height + scriptsMetrics.depth,
        width: scriptsMetrics.width,
      };
      const height = nucleusBehavior.metrics.height;
      const width = scriptsComponentStyle.width + nucleusBehavior.metrics.width;
      const depth = Math.max(
        scriptsMetrics.depth,
        nucleusBehavior.metrics.depth
      );
      const scriptContainerMetrics = new Metrics(height, width, depth);
      return {
        subscriptComponentStyle,
        scriptsMetrics,
        scriptContainerMetrics,
        scriptsComponentStyle,
      };
    }

    /**
     * @return {Object}
     * calculates Script Metrics
     * script Container css
     * script css
     * superscript css
     */
    function determineSuperOnly() {
      adjustInitialValuesForSuperscript();
      const superscriptComponentStyle = {};
      superscriptComponentStyle.marginRight =
        scriptsSetter._spaceAfterScript * pxpfu;
      superscriptComponentStyle.marginLeft = initialValues.delta;
      const scriptsMetrics = new Metrics(
        initialValues.u + superBehavior.metrics.height,
        superBehavior.metrics.width +
          superscriptComponentStyle.marginRight +
          superscriptComponentStyle.marginLeft,
        -(initialValues.u - superBehavior.metrics.depth)
      );
      const scriptsComponentStyle = {
        height: scriptsMetrics.height + scriptsMetrics.depth,
        width: scriptsMetrics.width,
      };
      const height = Math.max(
        scriptsMetrics.height,
        nucleusBehavior.metrics.height
      );
      const width = nucleusBehavior.metrics.width + scriptsMetrics.width;
      const depth = nucleusBehavior.metrics.depth;
      const scriptContainerMetrics = new Metrics(height, width, depth);
      return {
        superscriptComponentStyle,
        scriptsMetrics,
        scriptContainerMetrics,
        scriptsComponentStyle,
      };
    }
    /**
     * @return {Object}
     * calculates Script Metrics
     * script Container css
     * script css
     * superscript css
     * subscript css
     */
    function determineBoth() {
      adjustInitialValuesForSuperscript();
      initialValues.v = Math.max(
        initialValues.v,
        scriptsSetter._subscriptShiftDown * pxpfu
      );
      // If there is !!not!! enough space between scripts,FIX IT
      correctScriptGap();
      const superscriptComponentStyle = {};
      superscriptComponentStyle.marginRight =
        scriptsSetter._spaceAfterScript * pxpfu;
      superscriptComponentStyle.marginLeft = initialValues.delta;

      const subscriptComponentStyle = {};
      subscriptComponentStyle.marginRight =
        scriptsSetter._spaceAfterScript * pxpfu;

      const scriptsMetrics = new Metrics(
        initialValues.u + superBehavior.metrics.height,
        Math.max(
          superBehavior.metrics.width +
            initialValues.delta +
            scriptsSetter._spaceAfterScript * pxpfu,
          subBehavior.metrics.width + scriptsSetter._spaceAfterScript * pxpfu
        ),
        initialValues.v + subBehavior.metrics.depth
      );

      const scriptsComponentStyle = {};
      scriptsComponentStyle.height =
        scriptsMetrics.height + scriptsMetrics.depth;
      scriptsComponentStyle.width = scriptsMetrics.width;

      const height = scriptsMetrics.height;
      const depth = scriptsMetrics.depth;
      const width = nucleusBehavior.metrics.width + scriptsMetrics.width;
      const scriptContainerMetrics = new Metrics(height, width, depth);
      return {
        subscriptComponentStyle,
        scriptsMetrics,
        superscriptComponentStyle,
        scriptContainerMetrics,
        scriptsComponentStyle,
      };
    }

    /**
     * adjusts initialValues such that
     * there is enough space between
     * the scripts
     */
    function correctScriptGap() {
      if (
        initialValues.u -
          superBehavior.metrics.depth +
          (initialValues.v - subBehavior.metrics.height) <
        scriptsSetter._subSuperscriptGapMin * pxpfu
      ) {
        initialValues.v =
          subBehavior.metrics.height -
          initialValues.u +
          superBehavior.metrics.depth +
          scriptsSetter._subSuperscriptGapMin * pxpfu;
        const psi =
          scriptsSetter._superscriptBottomMaxWithSubscript * pxpfu -
          (initialValues.u - superBehavior.metrics.depth);
        if (psi > 0) {
          initialValues.u += psi;
          initialValues.v -= psi;
        }
      }
    }

    /**
     * adjust {u,v,delta} becauase it is known that there
     * is a superscript
     */
    function adjustInitialValuesForSuperscript() {
      let p = nucleusBehavior.mathStyle.cramped
        ? scriptsSetter._superscriptShiftUpCramped
        : scriptsSetter._superscriptShiftUp;
      p = p * pxpfu;
      initialValues.u = Math.max(
        initialValues.u,
        p,
        superBehavior.metrics.depth +
          Math.abs(scriptsSetter._superscriptBottomMin * pxpfu)
      );
    }
    /**
     * @return {String}
     */
    function determineScriptType() {
      if (superBehavior === undefined) {
        return Script_Type.SubOnly;
      } else if (subBehavior === undefined) {
        return Script_Type.SuperOnly;
      } else {
        return Script_Type.Both;
      }
    }

    /**
     * @return {Object} u,v,delta
     */
    function determineScriptIntialValues() {
      const nucleusCategory = determineNucleusCategory(nucleusBehavior.type);
      const categoryMap = {
        Atom: calculateAtomInitialValues,
        Formula: calculateFormulaInitialValues,
      };
      return categoryMap[nucleusCategory]();

      /**
       * @param {String} scriptStyleType
       * @return {number} styleScaleFactor
       */
      function getScriptFactor(scriptStyleType) {
        const scriptFactorMap = {
          D: 1,
          T: 1,
          S: scriptsSetter._scriptFactor / 100,
          SS: scriptsSetter._scriptscriptFactor / 100,
        };
        return scriptFactorMap[scriptStyleType];
      }

      /**
       * @return {Object} {u,v,delta}
       */
      function calculateAtomInitialValues() {
        // @ts-ignore
        return { u: 0, v: 0, delta: nucleusBehavior.italicsCorrection };
      }
      /**
       * @return {Object} {u,v,delta}
       */
      function calculateFormulaInitialValues() {
        const u = superBehavior
          ? nucleusBehavior.metrics.height -
            scriptsSetter._superscriptBaselineDropMax *
              getScriptFactor(superBehavior.mathStyle.type) *
              pxpfu
          : 0;

        const v = subBehavior
          ? nucleusBehavior.metrics.depth +
            scriptsSetter._subscriptBaselineDropMin *
              getScriptFactor(subBehavior.mathStyle.type) *
              pxpfu
          : 0;
        const delta = nucleusBehavior.italicsCorrection
          ? nucleusBehavior.italicsCorrection
          : 0;
        return { u, v, delta };
      }

      /**
       * @param {String} type
       * @return {String} Atom, Formula, Text
       */
      function determineNucleusCategory(type) {
        // eventually add text option
        const atomTypes = ['Glyph', 'Operator'];
        return atomTypes.includes(type) ? 'Atom' : 'Formula';
      }
    }
  }
}
