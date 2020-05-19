import AsanaFontTables from "../fonts/AsanaFontData.js";
import { fontFactory } from "../src/Font/FontFactory.js";
import { GlyphComponentData } from "../src/GlyphComponentData.js";
import { constructExtendedGlyph } from "../src/constructExtendedGlyph.js";

var fontData;
beforeEach(() => {
    fontData = fontFactory(AsanaFontTables);
});

test("Constructs Glyph with proper amount of glyphs", () => {
    var unicode = 40;
    var desiredSize = 100;
    var fontSize = 30;
    var direction = "vertical";
    var minConnectorOverlap = parseInt(
        fontData.MATH.MathVariants.MinConnectorOverlap.value,
        10
    );

    expect(
        constructExtendedGlyph(
            unicode,
            desiredSize,
            fontSize,
            direction,
            fontData.variants,
            fontData.upm,
            fontData.glyphNameToUnicode,
            minConnectorOverlap
        )
    ).toEqual([]);
    //dont forget italic correction
});
