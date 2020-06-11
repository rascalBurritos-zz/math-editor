import { MathStyle } from './MathStyle.js';
import { Scripts } from '../React-Components/Scripts.js';
import { FormulaComponentData } from './FormulaComponentData.js';
export class ScriptsComponentData {
  /**
   *
   * @param {*} element
   * @param {*} style
   * @param {*} fontData
   */
  constructor(element, style, fontData) {
    this.component = Scripts;
    let superscriptMathList = element.superscript,
      subscriptMathList = element.subscript;
    if (superscriptMathList === undefined && subscriptMathList === undefined) {
      return;
    }
    //returns script metrics (from math constants table) scaled to
    //proper font size
    let scriptMetrics = ScriptsComponentData.getScriptMetric(
      fontData,
      style.fontSize
    );

    // u represents height above baseline of the super baseline
    // v represents depth below baseline of the subscript baseline
    // delta is the italice correction(used for superscript)
    //constructs the nucleus component of the script
    this.nucleus = FormulaComponentData.componentFactory(
      element.nucleus,
      style,
      fontData
    );

    //get the styles for the corresponding scripts based on super/sub
    let superscriptStyle = ScriptsComponentData.getScriptStyle(style, 'Super');
    let subscriptStyle = ScriptsComponentData.getScriptStyle(style, 'Sub');

    //determine u,v and delta based nucleus type
    let nucleusMeasure = ScriptsComponentData.determineScriptIntialValues(
      element.nucleus,
      this.nucleus,
      style.fontSize,
      fontData,
      scriptMetrics,
      superscriptStyle,
      subscriptStyle
    );

    let u = nucleusMeasure.u,
      v = nucleusMeasure.v,
      delta = nucleusMeasure.delta;
    //main script logic
    //determine the h,w,d,css of scripts container
    let {
      scriptsHeight,
      scriptsWidth,
      scriptsDepth,
      scriptsCSS,
      superscript,
      subscript,
    } = ScriptsComponentData.determineScripts(
      scriptMetrics,
      subscriptMathList,
      superscriptMathList,
      subscriptStyle,
      superscriptStyle,
      fontData,
      u,
      v,
      delta,
      style
    );

    this.superscript = superscript;
    this.subscript = subscript;
    this.scriptsCSS = scriptsCSS;
    this.height = Math.max(this.nucleus.height, scriptsHeight);
    this.depth = Math.max(this.nucleus.depth, scriptsDepth);
    this.width = this.nucleus.width + scriptsWidth;

    this.nucleus.css.marginTop = this.height - this.nucleus.height + 'px';
    this.scriptsCSS.marginTop = this.height - scriptsHeight + 'px';

    this.scriptsCSS.display = 'flex';
    this.scriptsCSS.flexDirection = 'column';
    this.scriptsCSS.justifyContent = 'space-between';

    //starting css for scripts container and script element within scripts container
    this.css = {
      display: 'flex',
      flexDirection: 'row',
      height: this.height + this.depth + 'px',
      width: this.width + 'px',
    };
    //subscript only

    // this.scriptsCSS.width = this.width;
  }

  /**
   *
   * @param {*} nucleusSpec
   * @param {*} nucleusComponent
   * @param {*} fontSize
   * @param {*} fontData
   * @param {*} scriptMetrics
   * @param {*} superscriptStyle
   * @param {*} subscriptStyle
   */
  static determineScriptIntialValues(
    nucleusSpec,
    nucleusComponent,
    fontSize,
    fontData,
    scriptMetrics,
    superscriptStyle,
    subscriptStyle
  ) {
    //needed to determine initial script placement
    //and delta (italics correction)
    let atomTypes = [
      'Ordinary',
      'Binary',
      'Relation',
      'Operator',
      'Punctuation',
    ];

    let pxpfu = fontSize / fontData.upm;
    let u, v, delta;
    if (
      atomTypes.includes(nucleusSpec.type) &&
      nucleusSpec.extension !== 'Extended'
    ) {
      u = v = 0;
      delta = fontData.italicCorrectionMap[nucleusSpec.unicode] * pxpfu;
    } else {
      u =
        nucleusComponent.height -
        scriptMetrics.baselineDropMax *
          MathStyle.getScriptFactor(
            superscriptStyle.type,
            fontData.MATH.MathConstants
          );
      v =
        nucleusComponent.depth +
        scriptMetrics.baselineDropMin *
          MathStyle.getScriptFactor(
            subscriptStyle.type,
            fontData.MATH.MathConstants
          );
      if (nucleusSpec.extension === 'Extended') {
        delta = nucleusComponent.italicsCorrection
          ? nucleusComponent.italicsCorrection * pxpfu
          : 0;
      } else {
        delta = 0;
      }
    }
    return { u, v, delta };
  }

  /**
   *
   * @param {*} scriptMetrics
   * @param {*} subscriptMathList
   * @param {*} superscriptMathList
   * @param {*} subscriptStyle
   * @param {*} superscriptStyle
   * @param {*} fontData
   * @param {*} u
   * @param {*} v
   * @param {*} delta
   * @param {*} currentStyle
   */
  static determineScripts(
    scriptMetrics,
    subscriptMathList,
    superscriptMathList,
    subscriptStyle,
    superscriptStyle,
    fontData,
    u,
    v,
    delta,
    currentStyle
  ) {
    const ss = scriptMetrics.spaceAfterScript;
    if (superscriptMathList === undefined) {
      return ScriptsComponentData.setSoleSubscript(
        subscriptMathList,
        fontData,
        subscriptStyle,
        ss,
        v,
        scriptMetrics
      );
    } //both sub and super  or  just sub
    else {
      let superscript = ScriptsComponentData.setSuperscript(
        superscriptMathList,
        fontData,
        superscriptStyle,
        delta,
        ss
      );
      u = Math.max(
        u,
        currentStyle.cramped
          ? scriptMetrics.shiftUpCramped
          : scriptMetrics.shiftUp,
        superscript.depth + Math.abs(scriptMetrics.bottomMin)
      );
      //sole super script
      if (subscriptMathList === undefined) {
        return ScriptsComponentData.setSoleSuperScript(
          delta,
          ss,
          u,
          superscript
        );
      } //combo scripts
      else {
        return ScriptsComponentData.setComboScripts(
          subscriptMathList,
          fontData,
          subscriptStyle,
          ss,
          scriptMetrics,
          v,
          u,
          superscript,
          delta
        );
      }
    }
  }
  /**
   *
   * @param {*} subscriptMathList
   * @param {*} fontData
   * @param {*} subscriptStyle
   * @param {*} ss
   * @param {*} scriptMetrics
   * @param {*} currentV
   * @param {*} currentU
   * @param {*} superscript
   * @param {*} currentDelta
   */
  static setComboScripts(
    subscriptMathList,
    fontData,
    subscriptStyle,
    ss,
    scriptMetrics,
    currentV,
    currentU,
    superscript,
    currentDelta
  ) {
    let subscript = new FormulaComponentData(
      subscriptMathList,
      fontData,
      subscriptStyle
    );
    subscript.css.alignSelf = 'flex-start';
    subscript.css.marginRight = ss;
    let v = Math.max(currentV, scriptMetrics.shiftDown);
    let u = currentU;
    //If there is !!not!! enough space between scripts,FIX IT
    if (
      currentU - subscript.depth - (superscript.height - v) <
      scriptMetrics.gapMin
    ) {
      v =
        subscript.height - currentU + superscript.depth + scriptMetrics.gapMin;
      let psi = scriptMetrics.bottomMaxWithSub - (u - superscript.depth);
      if (psi > 0) {
        u += psi;
        v -= psi;
      }
    }
    let delta = currentDelta ? currentDelta : 0;
    let height = u + superscript.height;
    let depth = v + subscript.depth;
    let width = Math.max(superscript.width + delta + ss, subscript.width + ss);
    let css = {};
    css.height = height + depth + 'px';
    css.width = width + 'px';
    return {
      scriptsHeight: height,
      scriptsWidth: width,
      scriptsDepth: depth,
      scriptsCSS: css,
      subscript: subscript,
      superscript: superscript,
    };
    // nucleus.css.marginTop = height - this.nucleus.height;
  }
  /**
   *
   * @param {*} fontData
   * @param {*} size
   */
  static getScriptMetric(fontData, size) {
    let mc = fontData.MATH.MathConstants;
    //script values
    let scriptMetrics = {
      //for atoms
      shiftUp: mc.SuperscriptShiftUp.Value.value,
      shiftUpCramped: mc.SuperscriptShiftUpCramped.Value.value,
      shiftDown: mc.SubscriptShiftDown.Value.value,
      //for subformulas
      baselineDropMax: mc.SuperscriptBaselineDropMax.Value.value,
      baselineDropMin: mc.SubscriptBaselineDropMin.Value.value,
      //extrema
      bottomMin: mc.SuperscriptBottomMin.Value.value,
      topMax: mc.SubscriptTopMax.Value.value,
      //both scripts
      bottomMaxWithSub: mc.SuperscriptBottomMaxWithSubscript.Value.value,
      gapMin: mc.SubSuperscriptGapMin.Value.value,
      spaceAfterScript: mc.SpaceAfterScript.Value.value,
    };

    let pxpfu = size / fontData.upm;
    //scale properly
    for (let d in scriptMetrics) {
      scriptMetrics[d] = parseInt(scriptMetrics[d], 10) * pxpfu;
    }
    return scriptMetrics;
  }
  /**
   *
   * @param {*} currentStyle
   * @param {*} superOrSub
   */
  static getScriptStyle(currentStyle, superOrSub) {
    let scriptStyle;
    let styleMap = {
      D: 'S',
      T: 'S',
      S: 'SS',
      SS: 'SS',
    };
    if (superOrSub === 'Super') {
      scriptStyle = currentStyle.changeType(
        styleMap[currentStyle.type],
        currentStyle.cramped
      );
    } else if (superOrSub === 'Sub') {
      scriptStyle = currentStyle.changeType(styleMap[currentStyle.type], true);
    }
    return scriptStyle;
  }
  /**
   *
   * @param {*} subscriptMathList
   * @param {*} fontData
   * @param {*} subscriptStyle
   * @param {*} ss
   * @param {*} v
   * @param {*} scriptMetrics
   */
  static setSoleSubscript(
    subscriptMathList,
    fontData,
    subscriptStyle,
    ss,
    v,
    scriptMetrics
  ) {
    let subscript = new FormulaComponentData(
      subscriptMathList,
      fontData,
      subscriptStyle
    );

    //anything as longs as its not stretch
    subscript.css.alignSelf = 'flex-end';
    subscript.css.marginRight = ss;

    let css = {};
    css.height = subscript.height + subscript.depth;
    let subscriptBaselineDepth = Math.max(
      v,
      scriptMetrics.shiftDown,
      subscript.height - Math.abs(scriptMetrics.topMax)
    );
    let height = subscript.height - subscriptBaselineDepth;
    let width = subscript.width + ss;
    let depth = subscript.depth + subscriptBaselineDepth;
    return {
      scriptsHeight: height,
      scriptsWidth: width,
      scriptsDepth: depth,
      scriptsCSS: css,
      subscript: subscript,
    };
  }
  static setSuperscript(
    superscriptMathList,
    fontData,
    superscriptStyle,
    delta,
    ss
  ) {
    let superscript = new FormulaComponentData(
      superscriptMathList,
      fontData,
      superscriptStyle
    );
    superscript.css.marginLeft = delta;
    superscript.css.marginRight = ss;
    superscript.css.alignSelf = 'flex-start';
    return superscript;
  }
  static setSoleSuperScript(delta, ss, u, superscript) {
    let css = {};
    css.height = superscript.height + superscript.depth;
    css.width = delta + superscript.width + ss;

    let width = css.width;
    let height = superscript.height + u;
    let depth = css.height - height;

    return {
      scriptsHeight: height,
      scriptsWidth: width,
      scriptsDepth: depth,
      scriptsCSS: css,
      superscript: superscript,
    };
    // nucleus.css.marginTop = height - nucleus.height;
  }
}
