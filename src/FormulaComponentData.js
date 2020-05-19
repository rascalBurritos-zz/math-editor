import { GlyphComponentData } from "./GlyphComponentData.js";
import { interElementSpacingTable } from "./leftRightTable.js";
import { Formula } from "./Formula.js";
import { MathStyle } from "./MathStyle.js";
import { ScriptsComponentData } from "./ScriptsComponentData.js";

export class FormulaComponentData {
    constructor(mathList, fontData, style) {
        this.style = style;
        this.elements = [];
        mathList.forEach(ele => {
            this.elements.push(
                FormulaComponentData.componentFactory(ele, style, fontData)
            );
        });
        var spacingArray = FormulaComponentData.getInterElementSpacing(
            mathList,
            this.style
        );
        var heightArray = FormulaComponentData.getDimensionEachElement(
            "height",
            this.elements
        );
        var depthArray = FormulaComponentData.getDimensionEachElement(
            "depth",
            this.elements
        );
        var widthArray = FormulaComponentData.getDimensionEachElement(
            "width",
            this.elements
        );

        var topMargins = FormulaComponentData.getTopMarginsForBaselineAlign(
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
        this.css.width = FormulaComponentData.getCSSWidth(
            spacingArray,
            widthArray
        );
        this.css.display = "flex";
        this.css.flexDirection = "row";
        this.css.position = "relative";

        this.height = Math.max(...heightArray);
        this.depth = Math.max(...depthArray);
        this.width = this.css.width;
        this.component = Formula;
    }
    static adjustMarginsOfElements(elementArray, topMargins, rightMargins) {
        var adjustedElementArray = [];
        elementArray.forEach((ele, index) => {
            if (ele.css !== undefined) {
                var topMargin = topMargins[index]
                    ? topMargins[index] + "px"
                    : "0";
                ele.css.marginTop = topMargin;
                var rightMargin = rightMargins[index]
                    ? rightMargins[index] + "px"
                    : "0px";
                ele.css.marginRight = rightMargin;
            }
            adjustedElementArray.push(ele);
        });
        return adjustedElementArray;
    }
    static getDimensionEachElement(dimensionToGet, elementArray) {
        var dimensionArray = [];
        elementArray.forEach(ele => {
            if (ele[dimensionToGet] !== undefined) {
                dimensionArray.push(ele[dimensionToGet]);
            }
        });
        return dimensionArray;
    }
    static componentFactory(element, style, fontData) {
        if (element.type === "Script") {
            return new ScriptsComponentData(element, style, fontData);
        } else {
            return new GlyphComponentData(
                String.fromCodePoint(element.unicode),
                style.fontSize,
                fontData.glyphMetrics[element.unicode],
                fontData.upm,
                fontData.fontFamily,
                fontData.asc,
                fontData.des
            );
        }
    }
    static getTopMarginsForBaselineAlign(heightArray) {
        var maxHeight = Math.max(...heightArray);
        var topMargins = [];
        heightArray.forEach(ele => {
            topMargins.push(maxHeight - ele);
        });
        return topMargins;
    }
    static getInterElementSpacing(mathList, style) {
        //TODO incorporate style
        var mu = (1 / 18) * style.fontSize;
        var thinmu = 3 * mu,
            medmu = 4 * mu,
            thickmu = 5 * mu;
        var spacingArray = [];
        var muMap = { "0": 0, "1": thinmu, "2": medmu, "3": thickmu };
        for (var i = 1; i < mathList.length; i++) {
            var atomTypes = ["Ordinary", "Binary", "Relation", "Punctuation"];
            var right = atomTypes.includes(mathList[i].type)
                ? mathList[i].type
                : mathList[i].nucleus.type;
            var left = atomTypes.includes(mathList[i - 1].type)
                ? mathList[i - 1].type
                : mathList[i - 1].nucleus.type;
            {
                //make fix the orientation :/
                var code = interElementSpacingTable[right][left];
                spacingArray.push(muMap[code.charAt(0)]);
            }
        }
        return spacingArray;
    }

    static getCSSWidth(widthArray, spacingArray) {
        var width = 0;
        widthArray.forEach(ele => {
            width += ele;
        });
        spacingArray.forEach(ele => {
            width += ele;
        });
        return width;
    }
    static getCSSHeight(heightArray, depthArray) {
        var maxHeight = Math.max(...heightArray);
        var maxDepth = Math.max(...depthArray);
        return maxHeight + maxDepth;
    }
}
