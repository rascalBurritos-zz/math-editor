import Metrics from '../../Math Nodes/Types/Metrics';
import InternalCharacterBox from '../../React-Components/Math/InternalCharacterBoxComponent';

export default class Text_Glyph_Setter {
  /**
   *
   * @param {Object} spec
   */
  constructor(spec) {
    this._fontFamily = spec.fontFamily;
    this._upm = spec.upm;
    this._asc = spec.asc;
    this._des = spec.des;

    this._glyphMetric = spec.glyphMetric;
    this._unicode = spec.unicode;
  }

  /**
   * @param {number} fontSize
   * @return {number}
   */
  calculatePXPFU(fontSize) {
    return fontSize / this._upm;
  }

  /**
   * @param {number} pxpfu
   * @return {Object}
   * Metrics
   * InternalCharacterBox
   */
  generateSettings(pxpfu) {
    const glyphSetter = this;
    const metrics = getMetrics();
    const internalCharacterBox = getInternalCharacterBox();
    return { internalCharacterBox, metrics };

    /**
     * @return {Object} internalCharacterBox
     */
    function getInternalCharacterBox() {
      const character = String.fromCodePoint(
        parseInt(glyphSetter._unicode, 10)
      );
      return { component: InternalCharacterBox, style: getStyle(), character };
    }

    /**
     * @return {boolean}
     */
    function hasBBox() {
      return glyphSetter._glyphMetric.bbox !== undefined;
    }

    /**
     * @return {Metrics}
     */
    function getMetrics() {
      const w = glyphSetter._glyphMetric.advanceWidth * pxpfu;
      if (!hasBBox()) return new Metrics(0, w, 0);
      const h = glyphSetter._glyphMetric.bbox.y2 * pxpfu;
      const d = -glyphSetter._glyphMetric.bbox.y1 * pxpfu;
      return new Metrics(h, w, d);
    }
    /**
     * @return {Object} style of Internal Character Box
     */
    function getStyle() {
      const style = {};
      style.fontFamily = glyphSetter._fontFamily;
      const currentFontSize = glyphSetter._upm * pxpfu;
      style.fontSize = currentFontSize + 'px';
      style.width = glyphSetter._glyphMetric.advanceWidth * pxpfu + 'px';
      if (hasBBox()) {
        style.height =
          Math.floor((glyphSetter._asc + glyphSetter._des) * pxpfu) + 'px';
        style.top =
          (glyphSetter._glyphMetric.bbox.y2 - glyphSetter._asc) * pxpfu + 'px';
      } else {
        style.height = '0px';
        style.top = '0px';
      }

      return style;
    }
  }
}
