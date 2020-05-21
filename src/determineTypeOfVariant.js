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
        return new GlyphComponentData(
            String.fromCodePoint(foundVariant),
            currentFontSize,
            fontData.glyphMetrics[foundVariant],
            fontData.upm,
            fontData.fontFamily,
            fontData.asc,
            fontData.des
        );
    }
    return new ExtendedGlyphComponentData(
        baseUnicode,
        currentFontSize,
        desiredSize,
        direction,
        fontData
    );
}
