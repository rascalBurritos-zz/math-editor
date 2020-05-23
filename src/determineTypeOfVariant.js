import { bestVariant } from "./bestVariant.js";
import { GlyphComponentData } from "./GlyphComponentData.js";
import { ExtendedGlyphComponentData } from "./ExtendedGlyphComponentData.js";

export function determineTypeOfVariant(
    baseUnicode,
    desiredSize,
    currentFontSize,
    direction,
    fontData
) {
    var foundVariant = bestVariant(
        baseUnicode,
        desiredSize,
        currentFontSize,
        direction,
        fontData.variants,
        fontData.upm,
        fontData.glyphNameToUnicode
    );
    if (typeof foundVariant === "number") {
        let glyphComponent = new GlyphComponentData(
            String.fromCodePoint(foundVariant),
            currentFontSize,
            fontData.glyphMetrics[foundVariant],
            fontData.upm,
            fontData.fontFamily,
            fontData.asc,
            fontData.des
        );
        let pxpfu = currentFontSize / fontData.upm;
        glyphComponent.width =
            parseInt(fontData.glyphMetrics[foundVariant].advanceWidth, 10) *
            pxpfu;
        glyphComponent.css.width = glyphComponent.width + "px";
        glyphComponent.innerStyle.left = '0px'
        console.log(glyphComponent)
        console.log(pxpfu)
        glyphComponent.css.outline = ""
        return glyphComponent;
    }
    return new ExtendedGlyphComponentData(
        baseUnicode,
        currentFontSize,
        desiredSize,
        direction,
        fontData
    );
}
