import { Glyph } from '../React-Components/Glyph.js';

export class GlyphComponentData {
  /** */
  constructor(
    glyphSymbol,
    size,
    glyphMetric,
    upm,
    fontFamily,
    asc,
    des,
    centered = false,
    mathAxis = 0
  ) {
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
    if (centered) {
      let totalHeight =
        this.getHeight(glyphMetric, pxpfu) + this.getDepth(glyphMetric, pxpfu);
      this.height = totalHeight / 2 + mathAxis * pxpfu;
      this.depth = totalHeight / 2 - mathAxis * pxpfu;
    } else {
      this.height = this.getHeight(glyphMetric, pxpfu);
      this.depth = this.getDepth(glyphMetric, pxpfu);
    }
    this.width = (glyphMetric.bbox.x2 - glyphMetric.bbox.x1) * pxpfu;
    this.component = Glyph;
  }
  getDepth(glyphMetric, pxpfu) {
    return -glyphMetric.bbox.y1 * pxpfu;
  }

  getHeight(glyphMetric, pxpfu) {
    return glyphMetric.bbox.y2 * pxpfu;
  }
  static getCSS(glyphMetric, pxpfu) {
    var css = {};

    css.height = (glyphMetric.bbox.y2 - glyphMetric.bbox.y1) * pxpfu + 'px';
    css.width = (glyphMetric.bbox.x2 - glyphMetric.bbox.x1) * pxpfu + 'px';
    css.boxSizing = 'content-box';
    return css;
  }

  static getInnerStyle(fontFamily, size, asc, des, pxpfu, glyphMetric) {
    var innerStyle = {};
    innerStyle.lineHeight = '1';
    innerStyle.fontFamily = fontFamily;
    innerStyle.fontSize = size + 'px';
    innerStyle.height = Math.floor((asc + des) * pxpfu) + 'px'; //(asc+des)*pxpfu +"px";M
    innerStyle.width = `${glyphMetric.advanceWidth * pxpfu}px`;
    innerStyle.position = 'relative';
    innerStyle.top = `${(glyphMetric.bbox.y2 - asc) * pxpfu}px`;
    innerStyle.left = `${-glyphMetric.bbox.x1 * pxpfu}px`;
    return innerStyle;
  }
}
