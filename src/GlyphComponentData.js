import { Glyph } from "./Glyph.js";
export class GlyphComponentData {
    constructor(glyphSymbol, size, glyphMetric, upm, fontFamily, asc, des) {
        this.symbol = glyphSymbol;
        var pxpfu = size / upm;
        this.innerStyle = GlyphComponentData.getInnerStyle(
            fontFamily,
            size,
            asc,
            des,
            pxpfu,
            glyphMetric
        );
        this.css = GlyphComponentData.getCSS(glyphMetric, pxpfu);
        this.height = glyphMetric.bbox.y2 * pxpfu;
        this.depth = -glyphMetric.bbox.y1 * pxpfu;
        this.width = (glyphMetric.bbox.x2 - glyphMetric.bbox.x1) * pxpfu;
        this.component = Glyph;
    }
    static getCSS(glyphMetric, pxpfu) {
        var css = {};

        css.height = (glyphMetric.bbox.y2 - glyphMetric.bbox.y1) * pxpfu + "px";
        css.width = (glyphMetric.bbox.x2 - glyphMetric.bbox.x1) * pxpfu + "px";
        css.outline = "1px solid black";
        css.boxSizing = "content-box";
        return css;
    }

    static getInnerStyle(fontFamily, size, asc, des, pxpfu, glyphMetric) {
        var innerStyle = {};
        innerStyle.lineHeight = "1";
        innerStyle.fontFamily = fontFamily;
        innerStyle.fontSize = size + "px";
        innerStyle.height = Math.floor((asc + des) * pxpfu)+ 'px';
        innerStyle.width = `${glyphMetric.advanceWidth * pxpfu}px`;
        innerStyle.position = "relative";
        innerStyle.top = `${(glyphMetric.bbox.y2 - asc) * pxpfu}px`;
        innerStyle.left = `${-glyphMetric.bbox.x1 * pxpfu}px`;
        return innerStyle;
    }
}
