import { FormulaComponentData } from "../src/ComponentData/FormulaComponentData.js";
import { MathStyle } from "../src/ComponentData/MathStyle.js";
import { GlyphComponentData } from "../src/ComponentData/GlyphComponentData.js";
import { fontFactory } from "../src/Font/FontFactory.js";
import AsanaFontTables from "../fonts/AsanaFontData.js";

jest.mock("../src/GlyphComponentData.js");

var AsanaFontData = fontFactory(AsanaFontTables);
var exStyle;

var exMathList = [
    { type: "Ordinary", unicode: "65" },
    { type: "Relation", unicode: "66" },
    { type: "Ordinary", unicode: "67" },
    { type: "Binary", unicode: "68" }
];
//test component Creation
// test("formula component creation", () => {
//     var myStyle;
//     GlyphComponentData.mockImplementation(() => {
//         return {
//             height: 10,
//             width: 11,
//             depth: 12
//         };
//     });
//     expect(
//         new FormulaComponentData(exMathList, AsanaFontData, 30, myStyle)
//     ).toBe({});
// });
//static methods of formula component
var fc;
beforeEach(() => {
    exStyle = new MathStyle("D", 30, false);
    // fc = new FormulaComponentData(exMathList);
    fc = FormulaComponentData;
});

test("adjustMarginsOfElements", () => {
    var exElementArray = [{ css: {} }, { css: {} }];
    var topMargins = [10, 20];
    var rightMargins = [15];
    expect(
        fc.adjustMarginsOfElements(exElementArray, topMargins, rightMargins)
    ).toEqual([
        { css: { marginTop: "10px", marginRight: "15px" } },
        { css: { marginTop: "20px", marginRight: "0px" } }
    ]);
});
test("getDimensionEachElement", () => {
    var exElementArray = [{ height: 10 }, { height: 20 }, { height: 30 }];
    expect(fc.getDimensionEachElement("height", exElementArray)).toEqual([
        10,
        20,
        30
    ]);
});
test("Component Factory output Glyph", () => {
    fc.componentFactory(exMathList[0], exStyle, AsanaFontData);
    expect(GlyphComponentData).toHaveBeenCalled();
});

var fontSize = 30;
var mu = (1 / 18) * fontSize;
var thinmu = 3 * mu,
    medmu = 4 * mu,
    thickmu = 5 * mu;

test("Verify horizontal spacing", () => {
    expect(fc.getInterElementSpacing(exMathList, exStyle)).toEqual([
        thickmu,
        thickmu,
        medmu
    ]);
});

test("Verify Top Margins for Baseline", () => {
    var heightArray = [10, 30, 40, 25];
    expect(fc.getTopMarginsForBaselineAlign(heightArray)).toEqual([
        30,
        10,
        0,
        15
    ]);
});

test("Verify CSS  Width", () => {
    var glyphWidthArray = [20, 30, 40];
    var spacingArray = [10, 20];
    expect(fc.getCSSWidth(glyphWidthArray, spacingArray)).toEqual(120);
});

test("Verify CSS  Height", () => {
    var glyphHeightArray = [20, 30, 40];
    var glyphDepthArray = [10, 20];
    expect(fc.getCSSHeight(glyphHeightArray, glyphDepthArray)).toEqual(60);
});
