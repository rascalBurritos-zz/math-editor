import AsanaFontTables from "../fonts/AsanaFontData.js";
import { fontFactory } from "../src/Font/FontFactory.js";
import { GlyphComponentData } from "../src/ComponentData/GlyphComponentData.js";
import { constructExtendedGlyph } from "../src/ComponentData/Variants/constructExtendedGlyph.js";

var fontData;
beforeEach(() => {
    fontData = fontFactory(AsanaFontTables);
});

test("Constructs Glyph with proper amount of glyphs", () => {
    var unicode = 40;
    var desiredSize = 99;
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
    ).toEqual({ "overlapArray": [0.44999999999999996, 0.44999999999999996, 0.44999999999999996, 0.44999999999999996, 0.44999999999999996, 0.44999999999999996], "unicodeArray": ["9117", "9116", "9116", "9116", "9116", "9116", "9115"] });
    //dont forget italic correction
});
