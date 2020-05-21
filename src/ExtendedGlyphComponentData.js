import { GlyphComponentData } from "./GlyphComponentData.js";
import { constructExtendedGlyph } from "./constructExtendedGlyph.js";
import { bestVariant } from "./bestVariant.js";
import { ExtendedGlyph } from "./ExtendedGlyph.js";

export class ExtendedGlyphComponentData {
    constructor(
        baseUnicode,
        currentFontSize,
        desiredSize,
        direction,
        fontData
    ) {
        this.component = ExtendedGlyph;
        this.css = { outline: "1px solid darkred" };
        //sets default css properties for different direction
        if (direction === "vertical") {
            this.css.display = "flex";
            this.css.flexDirection = "column";
        } else if (direction === "horizontal") {
            this.css.display = "flex";
            this.css.flexDirection = "row";
        }

        var minConnectorOverlap = parseInt(
            fontData.MATH.MathVariants.MinConnectorOverlap.value,
            10
        );
        //gets the an object containing the overlap array and the array of unicode points
        //in decimal
        var extendedGlyphMetrics = constructExtendedGlyph(
            baseUnicode,
            desiredSize,
            currentFontSize,
            direction,
            fontData.variants,
            fontData.upm,
            fontData.glyphNameToUnicode,
            minConnectorOverlap
        );

        this.italicsCorrection = extendedGlyphMetrics.italicsCorrection;
        var pxpfu = currentFontSize / fontData.upm;
        var dimensions;
        if (direction === "vertical") {
            var componentOrderUnicode = extendedGlyphMetrics.unicodeArray.reverse();
            var componentOrderOverlapArray = extendedGlyphMetrics.overlapArray.reverse();
            var mathAxis = parseInt(
                fontData.MATH.MathConstants.AxisHeight.Value.value,
                10
            );
            //dimensions does not depend on componnentOrderunicode but this
            //was a convenient place to put it (if vertical)
            dimensions = ExtendedGlyphComponentData.getDimensionsVertical(
                componentOrderUnicode,
                componentOrderOverlapArray,
                fontData.glyphMetrics,
                mathAxis,
                pxpfu
            );
            this.height = dimensions.height;
            this.depth = dimensions.depth;
            this.width = dimensions.width;
        } else if (direction === "horizontal") {
            componentOrderUnicode = extendedGlyphMetrics.unicodeArray;
            componentOrderOverlapArray = extendedGlyphMetrics.overlapArray;
            dimensions = ExtendedGlyphComponentData.getDimensionsHorizontal(
                componentOrderUnicode,
                componentOrderOverlapArray,
                fontData.glyphMetrics,
                pxpfu
            );

            this.height = dimensions.height;
            this.width = dimensions.width;
            this.depth = dimensions.depth;
        }
        this.elements = [];

        //gets inner and outer styles for the divs needed to make the extended Component
        componentOrderUnicode.forEach(ele => {
            let component = {};
            component.inner = ExtendedGlyphComponentData.getExtendedInnerStyle(
                fontData.fontFamily,
                currentFontSize,
                fontData.asc,
                fontData.des,
                pxpfu,
                fontData.glyphMetrics[ele]
            );
            component.outer = ExtendedGlyphComponentData.getExtendedOuterStyle(
                fontData.glyphMetrics[ele],
                pxpfu
            );
            component.outer.outline = "";
            component.symbol = String.fromCodePoint(ele);
            this.elements.push(component);
        });
        //adjusts marigns for overlap
        for (var i = 1; i < componentOrderUnicode.length; i++) {
            if (direction === "vertical") {
                this.elements[i].outer.marginTop =
                    -componentOrderOverlapArray[i - 1] + "px";
            } else if (direction === "horizontal") {
                this.elements[i].outer.marginLeft =
                    -componentOrderOverlapArray[i - 1] + "px";
            }
        }
        if (direction === "horizontal") {
            ExtendedGlyphComponentData.adjustElementTopMargins(
                this.elements,
                dimensions.heightArray,
                dimensions.height
            );
        }
        this.css.height = dimensions.height + dimensions.depth;
        this.css.width = dimensions.width;
    }

    static getDimensionsHorizontal(unicodeArray,overlapArray, glyphMetricMap, pxpfu) {
        var heightArray = [];
        var depthArray = [];
        var widthArray = [];
        unicodeArray.forEach(ele => {
            let bbox = glyphMetricMap[ele].bbox;
            heightArray.push(parseInt(bbox.y2, 10) * pxpfu);
            depthArray.push(-parseInt(bbox.y1, 10) * pxpfu);
            widthArray.push(
                parseInt(glyphMetricMap[ele].advanceWidth, 10) * pxpfu
            );
        });
        var height = Math.max(...heightArray);
        var depth = Math.max(...depthArray);
        var glyphWidths  = widthArray.reduce((acc, curr) => {
            return acc + curr;
        });
        var totalOvelap =  overlapArray.reduce((acc,curr)=>{
            return acc + curr;
        })
        var width = glyphWidths -totalOvelap;
        return {
            heightArray,
            depthArray,
            widthArray,
            height,
            depth,
            width
        };
        //determine total width, then in the next function, adjust the
        //top margins of the horizontal glyphs to align to baseline
    }
    static adjustElementTopMargins(elements, heightArray, heightMax) {
        heightArray.forEach((ele, index) => {
            elements[index].outer.marginTop = heightMax - heightArray[index];
        });
    }
    static getDimensionsVertical(
        unicodeArray,
        overlapArray,
        glyphMetricMap,
        mathAxisHeight,
        pxpfu
    ) {
        var totalGlyphHeight = unicodeArray.reduce((acc, curr) => {
            let bbox = glyphMetricMap[curr].bbox;
            let glyphHeight =
                (parseInt(bbox.y2, 10) - parseInt(bbox.y1, 10)) * pxpfu;
            return acc + glyphHeight;
        }, 0);

        var totalOverlapAmount = overlapArray.reduce((acc, curr) => {
            return acc + curr;
        });
        var totalHeight = totalGlyphHeight - totalOverlapAmount;
        var adjustedHeight = totalHeight / 2 + mathAxisHeight * pxpfu;
        var adjustedDepth = totalHeight / 2 - mathAxisHeight * pxpfu;
        var width =
            parseInt(glyphMetricMap[unicodeArray[0]].advanceWidth, 10) * pxpfu;
        return { height: adjustedHeight, depth: adjustedDepth, width: width };
    }
    static getExtendedInnerStyle(
        fontFamily,
        size,
        asc,
        des,
        pxpfu,
        glyphMetric
    ) {
        var innerStyle = GlyphComponentData.getInnerStyle(
            fontFamily,
            size,
            asc,
            des,
            pxpfu,
            glyphMetric
        );
        innerStyle.left = "0px";
        return innerStyle;
    }
    static getExtendedOuterStyle(glyphMetric, pxpfu) {
        var css = GlyphComponentData.getCSS(glyphMetric, pxpfu);
        css.width = glyphMetric.advanceWidth * pxpfu + "px";
        return css;
    }
}
