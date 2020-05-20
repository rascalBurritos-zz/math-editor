import { GlyphComponentData } from "./GlyphComponentData.js";
import { constructExtendedGlyph } from "./constructExtendedGlyph.js";
import { bestVariant } from "./bestVariant.js";
import { ExtendedGlyph } from "./ExtendedGlyph.js"

export class ExtendedGlyphComponentData {
    constructor(
        baseUnicode,
        currentFontSize,
        desiredSize,
        direction,
        fontData
    ) {
       this.component = ExtendedGlyph; 
        var minConnectorOverlap = parseInt(
            fontData.MATH.MathVariants.MinConnectorOverlap.value,
            10
        );
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

        var topDownUnicode = extendedGlyphMetrics.unicodeArray.reverse();
        var topDownOverlapArray = extendedGlyphMetrics.overlapArray.reverse();
        this.elements = [];
        var pxpfu = currentFontSize / fontData.upm;
        topDownUnicode.forEach(ele => {
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
            this.elements.push(component);
            component.symbol = String.fromCodePoint(ele)
        });
        for (var i = 1; i < topDownUnicode.length; i++) {
            this.elements[i].outer.marginTop =
                -topDownOverlapArray[i - 1] + "px";
        }
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
