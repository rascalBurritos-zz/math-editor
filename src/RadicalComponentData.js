import { Radical } from "./Radical.js";
//formula component for component Factory
import { FormulaComponentData } from "./FormulaComponentData.js";
import { determineTypeOfVariant } from "./determineTypeOfVariant.js";

export class RadicalComponentData {
    constructor(mathSpec) {
        this.mathSpec = mathSpec;
        this.setMathList(mathSpec);
    }

    setMathList(mathSpec) {
        this.component = Radical;
        this.css = this.getDefaultCSS();
        this.radicalConstants = this.getConstants();
        this.degree = this.generateDegree();
        this.radicand = this.generateRadicand();
        this.delimiter = this.generateDelimiter();
        console.log(this.delimiter.height)
        this.rule = this.generateRule();
        this.positionRadicand();
        this.positionDegree();
        this.radicandContainerCSS = this.getRadicandContainerCSS();
        this.addExtraAscenderToMargins();
        this.setDimensions()
    }

    setDimensions(){
        this.height = 30; 
        this.width = 40;
    }
    getRadicandContainerCSS() {
        let radicandHeight = this.radicandClearance + 2*this.radicandDelta + this.radicalConstants.ruleThickness*this.mathSpec.pxpfu
        return {
            display: "flex",
            flexDirection: "column",
            height: radicandHeight
        };
    }
    addExtraAscenderToMargins() {
        this.delimiter.css.marginTop =
            this.radicalConstants.extraAscender * this.mathSpec.pxpfu + "px";
        this.radicandContainerCSS.marginTop =
            this.radicalConstants.extraAscender * this.mathSpec.pxpfu + "px";
    }
    positionDegree() {
        this.degree.css.marginLeft =
            this.radicalConstants.kernBeforeDegree * this.mathSpec.pxpfu;
        this.degree.css.marginRight =
            this.radicalConstants.kernAfterDegree * this.mathSpec.pxpfu;
        this.degree.css.marginTop = this.getDegreeMarginTop();
    }
    getDegreeMarginTop() {
        let delimiterTotalHeight = this.delimiter.height + this.delimiter.depth;
        let pxDownFromTopOfDelimiter =
            100 -
            this.radicalConstants.degreeBottomRaisePercent *
                delimiterTotalHeight;
        let extraAscender = this.radicalConstants.extraAscender;
        return extraAscender + pxDownFromTopOfDelimiter;
    }
    positionRadicand() {
        let delimiterDescender =
            this.delimiter.height +
            this.delimiter.depth -
            this.radicalConstants.ruleThickness *this.mathSpec.pxpfu;
        let delta = (1 / 2) * (delimiterDescender - this.radicandClearance);
        this.radicandDelta = delta;
        let verticalGap = this.determineRadicandVerticalGap();
        let marginTop = verticalGap + delta;
        this.radicand.css.marginTop = marginTop;
    }
    getConstants() {
        let mathConstants = this.mathSpec.fontData.MATH.MathConstants;
        let preParseConstants = {
            verticalGap: mathConstants.RadicalVerticalGap,
            displayVerticalGap: mathConstants.RadicalDisplayStyleVerticalGap,
            ruleThickness: mathConstants.RadicalRuleThickness,
            extraAscender: mathConstants.RadicalExtraAscender,
            kernBeforeDegree: mathConstants.RadicalKernBeforeDegree,
            kernAfterDegree: mathConstants.RadicalKernAfterDegree,
            degreeBottomRaisePercent:
                mathConstants.RadicalDegreeBottomRaisePercent
        };
        let radicalConstants = {};
        for (var constant in preParseConstants) {
            if (preParseConstants[constant].Value) {
                radicalConstants[constant] = parseInt(
                    preParseConstants[constant].Value.value,
                    10
                );
            } else {
                radicalConstants[constant] = parseInt(
                    preParseConstants[constant].value,
                    10
                );
            }
        }
        return radicalConstants;
    }
    getDefaultCSS() {
        return {
            display: "flex",
            flexDirection: "row"
        };
    }

    generateDegree() {
        return new FormulaComponentData(
            this.mathSpec.mathList.degree,
            this.mathSpec.fontData,
            this.mathSpec.style
        );
    }

    generateRule() {
        return {
            alignSelf: "stretch",
            backgroundColor: "black",
            height: this.radicalConstants.ruleThickness * this.mathSpec.pxpfu
        };
    }
    generateRadicand() {
        let radicand = new FormulaComponentData(
            this.mathSpec.mathList.radicand,
            this.mathSpec.fontData,
            this.mathSpec.style
        );
        this.radicandClearance = this.calculateRadicandClearance(radicand);

        return radicand;
    }

    calculateRadicandClearance(radicand) {
        let subClearance = radicand.height + radicand.depth;
        return subClearance + this.determineRadicandVerticalGap();
    }
    determineRadicandVerticalGap() {
        let verticalGap =
            this.mathSpec.style.type === "D"
                ? this.radicalConstants.displayVerticalGap
                : this.radicalConstants.verticalGap;
        return verticalGap * this.mathSpec.pxpfu;
    }
    generateDelimiter() {
        let unicode = "8730";
        let desiredSize = this.radicandClearance;
        let fontSize = this.mathSpec.style.fontSize;
        let direction = "vertical";
        let fontData = this.mathSpec.fontData;

        return determineTypeOfVariant(
            unicode,
            desiredSize,
            fontSize,
            direction,
            fontData
        );
    }
}
