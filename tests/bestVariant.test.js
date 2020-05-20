import AsanaFontTables from "../fonts/AsanaFontData.js";
import { fontFactory } from "../src/Font/FontFactory.js";
import { GlyphComponentData } from "../src/GlyphComponentData.js";
import { bestVariant } from "../src/bestVariant.js";

var fontData;
beforeEach(() => {
    fontData = fontFactory(AsanaFontTables);
});

test("selects best variant", () => {
    var unicode = 40;
    var desiredSize = 20;
    var fontSize = 30;
    var direction = "vertical";
    expect(
        bestVariant(
            unicode,
            desiredSize,
            fontSize,
            direction,
            fontData.variants,
            fontData.upm,
            fontData.glyphNameToUnicode
        )
    ).toBe(40);
});

test("selects best variant 2", () => {
    var unicode = 40;
    var desiredSize = 75;
    var fontSize = 30;
    var direction = "vertical";
    expect(
        bestVariant(
            unicode,
            desiredSize,
            fontSize,
            direction,
            fontData.variants,
            fontData.upm,
            fontData.glyphNameToUnicode
        )
    ).toBe(1114102);
});
test("returns false for too large", () => {
    var unicode = 40;
    var desiredSize = 100;
    var fontSize = 30;
    var direction = "vertical";
    expect(
        bestVariant(
            unicode,
            desiredSize,
            fontSize,
            direction,
            fontData.variants,
            fontData.upm,
            fontData.glyphNameToUnicode
        )
    ).toEqual({largestAvailable:1114102});
});
test("works on horizontal glyphs", () => {
    var unicode = 770;
    var desiredSize = 13;
    var fontSize = 30;
    var direction = "horizontal";
    expect(
        bestVariant(
            unicode,
            desiredSize,
            fontSize,
            direction,
            fontData.variants,
            fontData.upm,
            fontData.glyphNameToUnicode
        )
    ).toBe(1114022);
});
