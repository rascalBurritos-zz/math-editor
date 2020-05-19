import { Scripts } from "./Scripts.js";
import { FormulaComponentData } from "./FormulaComponentData.js";
export class ScriptsComponentData {
    constructor(element, style, fontData) {
        var superscriptMathList = element.superscript,
            subscriptMathList = element.subscript;
        if (
            superscriptMathList === undefined &&
            subscriptMathList === undefined
        ) {
            return;
        }
        this.css = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        };
        this.component = Scripts;
        var scriptMetrics = ScriptsComponentData.getScriptMetric(
            fontData,
            style.fontSize
        );
        var atomTypes = [
            "Ordinary",
            "Binary",
            "Relation",
            "Operator",
            "Punctuation"
        ];

        var u, v, delta;
        this.nucleus = FormulaComponentData.componentFactory(
            element.nucleus,
            style,
            fontData
        );

        var superscriptStyle = ScriptsComponentData.getScriptStyle(
            style,
            "Super"
        );
        var subscriptStyle = ScriptsComponentData.getScriptStyle(style, "Sub");
        if (atomTypes.includes(element.nucleus.type)) {
            u = v = 0;
            var pxpfu = style.fontSize / fontData.upm;
            delta = fontData.italicCorrectionMap[element.nucleus.unicode] * pxpfu;
        } else {
            u =
                this.nucleus.height -
                scriptMetrics.baselineDropMax *
                    ScriptsComponentData.getScriptFactor(
                        superscriptStyle.type,
                        fontData.MATH.MathConstants
                    );
            v =
                this.nucleus.depth -
                scriptMetrics.baselineDropMin *
                    ScriptsComponentData.getScriptFactor(
                        subscriptStyle.type,
                        fontData.MATH.MathConstants
                    );
        }
        const ss = scriptMetrics.spaceAfterScript;
        //main script logic

        //subscript only

        if (superscriptMathList === undefined) {
            this.setSoleSubscript(
                subscriptMathList,
                fontData,
                subscriptStyle,
                ss,
                v,
                scriptMetrics
            );
        } //both sub and super  or  just sub
        else {
            this.setSuperscript(
                superscriptMathList,
                fontData,
                superscriptStyle,
                delta,
                ss
            );
            u = Math.max(
                u,
                style.cramped
                    ? scriptMetrics.shiftUpCramped
                    : scriptMetrics.shiftUp,
                this.superscript.depth + Math.abs(scriptMetrics.bottomMin)
            );
            //sole super script
            if (subscriptMathList === undefined) {
                this.adjustSoleSuperScript(delta, ss, u);
            } //combo scripts
            else {
                this.subscript = new FormulaComponentData(
                    subscriptMathList,
                    fontData,
                    subscriptStyle
                );
                this.subscript.css.alignSelf = "flex-start";
                this.subscript.css.marginRight = ss;
                v = Math.max(v, scriptMetrics.shiftDown);
                //If there is !!not!! enough space between scripts,FIX IT
                if (
                    u - this.subscript.depth - (this.superscript.height - v) <
                    scriptMetrics.gapMin
                ) {
                    v =
                        this.subscript.height -
                        u +
                        this.superscript.depth +
                        scriptMetrics.gapMin;
                    let psi =
                        scriptMetrics.bottomMaxWithSub -
                        (u - this.superscript.depth);
                    if (psi > 0) {
                        u += psi;
                        v -= psi;
                    }
                }
                delta = delta ? delta : 0;

                this.width = Math.max(
                    this.superscript.width + delta + ss,
                    this.subscript.width + ss
                );
                this.height = u + this.superscript.height;
                this.css.height =
                    this.superscript.height + u + v + this.subscript.depth;
                this.depth = this.css.height - this.height;
                this.nucleus.css.marginTop = this.height - this.nucleus.height;
            }
        }
        this.css.width = this.width;
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
            D: "T",
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
    static getScriptFactor(scriptStyleType, MathConstants) {
        var scriptFactorMap = {
            D: 1,
            T: 1,
            S: parseInt(MathConstants.ScriptPercentScaleDown.value, 10) / 100,
            SS: parseInt(MathConstants.ScriptPercentScaleDown.value, 10) / 100
        };
        return scriptFactorMap[scriptStyleType];
    }
    setSoleSubscript(
        subscriptMathList,
        fontData,
        subscriptStyle,
        ss,
        v,
        scriptMetrics
    ) {
        this.subscript = new FormulaComponentData(
            subscriptMathList,
            fontData,
            subscriptStyle
        );
        this.width = this.subscript.width + ss;
        //anything as longs as its not stretch
        this.subscript.css.alignSelf = "flex-end";
        this.subscript.css.marginRight = ss;
        this.css.height = this.subscript.height + this.subscript.depth;
        this.height =
            this.subscript.height -
            Math.max(
                v,
                scriptMetrics.shiftDown,
                this.subscript.height - Math.abs(scriptMetrics.topMax)
            );
        this.depth = this.css.height - this.height;
        this.nucleus.css.marginTop = this.height - this.nucleus.height;
    }
    setSuperscript(superscriptMathList, fontData, superscriptStyle, delta, ss) {
        this.superscript = new FormulaComponentData(
            superscriptMathList,
            fontData,
            superscriptStyle
        );
        this.superscript.css.marginLeft = delta;
        this.superscript.css.marginRight = ss;
        this.superscript.css.alignSelf = "flex-start";
    }
    adjustSoleSuperScript(delta, ss, u) {
        this.width = delta + this.superscript.width + ss;
        this.css.height = this.superscript.height + this.superscript.depth;
        this.height = this.superscript.height + u;
        this.depth = this.css.height - this.height;
        this.nucleus.css.marginTop = this.height - this.nucleus.height;
    }
}
