// n scope -- fontsize, font metric
// import asanafontdata from '../fonts/asanafontdata.js';
// var fontfamily = 'asana'
import { GlyphComponentData } from "../src/ComponentData/GlyphComponentData.js";
// fontmetric = asanafontdata;
var exGlyphMetric,
    gc,
    fontSize,
    pxpfu,
    upm,
    asc,
    des,
    fontFamily,
    fontFamily,
    exSymbol;
beforeEach(() => {
    fontSize = 30;
    fontFamily = "Asana";

    exSymbol = "A";
    (upm = 1000), (asc = 750);
    des = 150;
    pxpfu = fontSize / upm;
    exGlyphMetric = {
        bbox: {
            y1: 200,
            y2: 500,
            x1: 100,
            x2: 350
        },
        advanceWidth: 400
    };
    gc = GlyphComponentData;
});
test("returns proper CSS Data", () => {
    expect(gc.getCSS(exGlyphMetric, pxpfu)).toEqual({
        height: 300 * pxpfu + "px",
        width: 250 * pxpfu + "px",
        outline: "1px solid black",
        boxSizing: "content-box"
    });
});
test("returns proper inner style", () => {
    expect(
        gc.getInnerStyle(fontFamily, fontSize, asc, des, pxpfu, exGlyphMetric)
    ).toEqual({
        lineHeight: "1",
        fontFamily: "Asana",
        fontSize: fontSize + "px",
        height: (asc + des) * pxpfu + "px",
        width: exGlyphMetric.advanceWidth * pxpfu + "px",
        position: "relative",
        top: (500 - 750) * pxpfu + "px",
        left: (-exGlyphMetric.bbox.x1 * pxpfu) + 'px'
    });
});
// test("glyph returns proper css", () => {
//     expect(gc).toEqual({
//         symbol: exSymbol,
//         height: exGlyphMetric.bbox.y2 * pxpfu,
//         width: (exGlyphMetric.bbox.x2 - exGlyphMetric.bbox.x1) * pxpfu,
//         depth: exGlyphMetric.bbox.y1 * pxpfu,
//         css: {
//             height: 300 * pxpfu + "px",
//             width: 250 * pxpfu + "px",
//             outline: "1px solid black",
//             boxSizing: "content-box"
//         },
//         innerStyle: {
//             lineHeight: "1",
//             fontFamily: "Asana",
//             fontSize: `${fontSize}px`,
//             height: `${Math.floor(
//                 (exGlyphMetric.asc + exGlyphMetric.des) * pxpfu
//             )}px`,
//             width: `${exGlyphMetric.advanceWidth * pxpfu}px`,
//             position: `relative`,
//             top: `${(exGlyphMetric.bbox.y2 - exGlyphMetric.asc) * pxpfu}px`,
//             left: `${-exGlyphMetric.bbox.x1 * pxpfu}px`
//         }
//     });
// });
// var testmln = [
//     {
//         type: "binary",
//         unicode: "65"
//     },
//     {
//         type: "ordinary",
//         unicode: "66"
//     },
// ];
// var testresult = [
//     {component: glyph,
//         symbol: 'a',
//         css: {
//             height :
//             width :
//             boxsizing: 'content-box'
//             outline: '1px solid black',
//         },
//         innerstyle: {

//             lineheight: 1,
//             fontfamily: fontfamily,
//             fontsize : fontsize,
//             height: math.floor((glyphmetric.asc + glyphmetric.des) * pxpfu),
//             width:
//             position:
//             top:
//             left:
//         }
//     },

// }
// ]

// test("Glyph Data translates object into proper Style", () => {
//     expect(generateLineData(testMLN)).toEqual()
// });
