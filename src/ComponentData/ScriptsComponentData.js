import { MathStyle } from "./MathStyle.js";
import { Scripts } from "../React-Components/Scripts.js";
import { FormulaComponentData } from "./FormulaComponentData.js";
export class ScriptsComponentData {
    constructor(element, style, fontData) {
        this.component = Scripts;
        var superscriptMathList = element.superscript,
            subscriptMathList = element.subscript;
        if (
            superscriptMathList === undefined &&
            subscriptMathList === undefined
        ) {
            return;
        }
        //returns script metrics (from math constants table) scaled to
        //proper font size
        var scriptMetrics = ScriptsComponentData.getScriptMetric(
            fontData,
            style.fontSize
        );

        // u represents height above baseline of the super baseline
        // v represents depth below baseline of the subscript baseline
        // delta is the italice correction(used for superscript)
        var u, v, delta;
        //constructs the nucleus component of the script
        this.nucleus = FormulaComponentData.componentFactory(
            element.nucleus,
            style,
            fontData
        );

        //get the styles for the corresponding scripts based on super/sub
        var superscriptStyle = ScriptsComponentData.getScriptStyle(
            style,
            "Super"
        );
        var subscriptStyle = ScriptsComponentData.getScriptStyle(style, "Sub");

        //determine u,v and delta based nucleus type
        var { u, v, delta } = ScriptsComponentData.determineScriptIntialValues(
            element.nucleus,
            this.nucleus,
            style.fontSize,
            fontData,
            scriptMetrics,
            superscriptStyle,
            subscriptStyle
        );
        //main script logic
        //determine the h,w,d,css of scripts container
        var {
            scriptsHeight,
            scriptsWidth,
            scriptsDepth,
            scriptsCSS,
            superscript,
            subscript
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

        this.nucleus.css.marginTop = this.height - this.nucleus.height + "px";
        this.scriptsCSS.marginTop = this.height - scriptsHeight + "px";

        this.scriptsCSS.display = "flex";
        this.scriptsCSS.flexDirection = "column";
        this.scriptsCSS.justifyContent = "space-between";

        //starting css for scripts container and script element within scripts container
        this.css = {
            display: "flex",
            flexDirection: "row",
            height: this.height + this.depth + "px",
            width: this.width + "px"
        };
        //subscript only

        // this.scriptsCSS.width = this.width;
    }

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
        var atomTypes = [
            "Ordinary",
            "Binary",
            "Relation",
            "Operator",
            "Punctuation"
        ];

        var pxpfu = fontSize / fontData.upm;
        var u, v, delta;
        if (
            atomTypes.includes(nucleusSpec.type) &&
            nucleusSpec.extension !== "Extended"
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
            if (nucleusSpec.extension === "Extended") {
                delta = nucleusComponent.italicsCorrection
                    ? nucleusComponent.italicsCorrection * pxpfu
                    : 0;
            } else {
                delta = 0;
            }
        }
        return { u, v, delta };
    }

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
            var superscript = ScriptsComponentData.setSuperscript(
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
        var subscript = new FormulaComponentData(
            subscriptMathList,
            fontData,
            subscriptStyle
        );
        subscript.css.alignSelf = "flex-start";
        subscript.css.marginRight = ss;
        var v = Math.max(currentV, scriptMetrics.shiftDown);
        var u = currentU;
        //If there is !!not!! enough space between scripts,FIX IT
        if (
            currentU - subscript.depth - (superscript.height - v) <
            scriptMetrics.gapMin
        ) {
            v =
                subscript.height -
                currentU +
                superscript.depth +
                scriptMetrics.gapMin;
            let psi = scriptMetrics.bottomMaxWithSub - (u - superscript.depth);
            if (psi > 0) {
                u += psi;
                v -= psi;
            }
        }
        var delta = currentDelta ? currentDelta : 0;
        var height = u + superscript.height;
        var depth = v + subscript.depth;
        var width = Math.max(
            superscript.width + delta + ss,
            subscript.width + ss
        );
        var css = {};
        css.height = height + depth + "px";
        css.width = width + "px";
        return {
            scriptsHeight: height,
            scriptsWidth: width,
            scriptsDepth: depth,
            scriptsCSS: css,
            subscript: subscript,
            superscript: superscript
        };
        // nucleus.css.marginTop = height - this.nucleus.height;
    }
    static getScriptMetric(fontData, size) {
        var mc = fontData.MATH.MathConstants;
        //script values
        var scriptMetrics = {
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
            spaceAfterScript: mc.SpaceAfterScript.Value.value
        };

        var pxpfu = size / fontData.upm;
        //scale properly
        for (var d in scriptMetrics) {
            scriptMetrics[d] = parseInt(scriptMetrics[d], 10) * pxpfu;
        }
        return scriptMetrics;
    }
    static getScriptStyle(currentStyle, superOrSub) {
        var scriptStyle;
        var styleMap = {
            D: "S",
            T: "S",
            S: "SS",
            SS: "SS"
        };
        if (superOrSub === "Super") {
            scriptStyle = currentStyle.changeType(
                styleMap[currentStyle.type],
                currentStyle.cramped
            );
        } else if (superOrSub === "Sub") {
            scriptStyle = currentStyle.changeType(
                styleMap[currentStyle.type],
                true
            );
        }
        return scriptStyle;
    }
    static setSoleSubscript(
        subscriptMathList,
        fontData,
        subscriptStyle,
        ss,
        v,
        scriptMetrics
    ) {
        var subscript = new FormulaComponentData(
            subscriptMathList,
            fontData,
            subscriptStyle
        );

        //anything as longs as its not stretch
        subscript.css.alignSelf = "flex-end";
        subscript.css.marginRight = ss;

        var css = {};
        css.height = subscript.height + subscript.depth;
        var subscriptBaselineDepth = Math.max(
            v,
            scriptMetrics.shiftDown,
            subscript.height - Math.abs(scriptMetrics.topMax)
        );
        var height = subscript.height - subscriptBaselineDepth;
        var width = subscript.width + ss;
        var depth = subscript.depth + subscriptBaselineDepth;
        return {
            scriptsHeight: height,
            scriptsWidth: width,
            scriptsDepth: depth,
            scriptsCSS: css,
            subscript: subscript
        };
    }
    static setSuperscript(
        superscriptMathList,
        fontData,
        superscriptStyle,
        delta,
        ss
    ) {
        var superscript = new FormulaComponentData(
            superscriptMathList,
            fontData,
            superscriptStyle
        );
        superscript.css.marginLeft = delta;
        superscript.css.marginRight = ss;
        superscript.css.alignSelf = "flex-start";
        return superscript;
    }
    static setSoleSuperScript(delta, ss, u, superscript) {
        var width = delta + superscript.width + ss;
        var height = superscript.height + u;
        var depth = css.height - height;

        var css = {};
        css.height = superscript.height + superscript.depth;
        css.width = width;

        return {
            scriptsHeight: height,
            scriptsWidth: width,
            scriptsDepth: depth,
            scriptsCSS: css,
            superscript: superscript
        };
        // nucleus.css.marginTop = height - nucleus.height;
    }
}
