export function bestVariant(
    unicode,
    desiredSize,
    fontSize,
    direction,
    fontDataVariants,
    upm,
    glyphNameToUnicode
) {
    var variantMap,
        pxpfu = fontSize / upm;
    if (direction === "vertical") {
        variantMap = fontDataVariants.vertical;
    } else if (direction === "horizontal") {
        variantMap = fontDataVariants.horizontal;
    }
    for (var variant of variantMap[unicode].MathGlyphVariantRecord) {
        let candidateAdvance =
            parseInt(variant.AdvanceMeasurement.value, 10) * pxpfu;

        if (candidateAdvance > desiredSize) {
            return parseInt(glyphNameToUnicode[variant.VariantGlyph.value], 10);
        }
    }
    //did not find variant big enough for desired size , 
    //returns an object that contains the largest available
    return {
        largestAvailable: parseInt(
            glyphNameToUnicode[variant.VariantGlyph.value],
            10
        )
    };
}
