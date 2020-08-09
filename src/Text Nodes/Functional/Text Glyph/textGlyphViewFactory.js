import Metrics from '../../../Math Nodes/Types/Metrics';
import { calculatePXPFU, getComponentStyle } from '../BaseView';
import InternalCharacterBox from '../../../React-Components/Math/InternalCharacterBoxComponent';
import { Glyph } from '../../../React-Components/Math/Glyph';
import { ViewMaster } from '../ViewMaster';

/**
 * @typedef {Object} characterInfo
 * @property {number} id
 * @property {String} unicode
 * @property {number} fontSize
 */

/**
 * @typedef {Object} _TextGlyphView
 * @property {Object} internalCharacterBox
 */

/**
 * @typedef {import("../BaseView").BaseView & _TextGlyphView} TextGlyphView
 */

export const TEXT_GLYPH_TYPE = 'Text_Glyph'; // used for submodel access

const glyphCache = {};

/**
 *
 * @param {number} size
 * @param {String} uni
 * @param {String} family
 * @return {String}
 */
function genKey(size, uni, family) {
  return family + size + uni;
}

/**
 * @param {characterInfo} charInfo unicode and fontSize
 * @param {Object} fontData
 * @param {Object} currentView
 * @return {TextGlyphView}
 */
export default function textGlyphViewFactory(charInfo, fontData, currentView) {
  const key = genKey(charInfo.fontSize, charInfo.unicode, fontData.fontFamily);
  if (key in glyphCache) {
    const cs = Object.assign({}, glyphCache[key].componentStyle);
    const view = Object.create(glyphCache[key], {
      id: { value: charInfo.id },
      componentStyle: { value: cs },
    });
    currentView[charInfo.id] = view;
    ViewMaster.viewPool[charInfo.id] = view;
  } else {
    const spec = generateSpec(charInfo.unicode, fontData);
    const fontSize = charInfo.fontSize;

    const pxpfu = calculatePXPFU(fontSize, spec.upm);
    const metrics = getMetrics(spec.glyphMetric, pxpfu);
    const internalCharacterBox = getInternalCharacterBox(spec, pxpfu, fontSize);
    const view = getView(metrics, internalCharacterBox, charInfo.id);
    glyphCache[key] = view;
    currentView[charInfo.id] = view;
    ViewMaster.viewPool[charInfo.id] = view;
  }

  /**
   *
   * @param {Metrics} metrics
   * @param {Object} internalCharacterBox
   * @param {number} id
   * @return {TextGlyphView}
   */
  function getView(metrics, internalCharacterBox, id) {
    const componentStyle = getComponentStyle(metrics);
    return {
      id,
      componentStyle,
      metrics,
      internalCharacterBox,
      type: TEXT_GLYPH_TYPE,
      component: Glyph,
    };
  }
  /**
   * @param {Object} spec
   * @param {number} pxpfu
   * @param {number} fontSize
   * @return {Object} internalCharacterBox
   */
  function getInternalCharacterBox(spec, pxpfu, fontSize) {
    const character = getCharacterFromUnicode(spec.unicode);
    return {
      component: InternalCharacterBox,
      style: getStyle(spec, pxpfu, fontSize),
      character,
    };
    /**
     * @param {Object} spec
     * @param {number} pxpfu
     * @param {number} fontSize
     * @return {Object} style of Internal Character Box
     */
    function getStyle(spec, pxpfu, fontSize) {
      const fontFamily = spec.fontFamily;
      const width = spec.glyphMetric.advanceWidth * pxpfu + 'px';
      const noBBox = spec.glyphMetric.bbox === undefined;
      const height = noBBox
        ? '0px'
        : Math.floor((spec.asc + spec.des) * pxpfu) + 'px';
      const top = noBBox
        ? '0px'
        : (spec.glyphMetric.bbox.y2 - spec.asc) * pxpfu + 'px';

      return { fontFamily, fontSize, width, height, top };
    }

    /**
     * @param {String} unicode
     * @return {String}
     */
    function getCharacterFromUnicode(unicode) {
      return String.fromCodePoint(parseInt(unicode, 10));
    }
  }

  /**
   * @param {Object} glyphMetric
   * @param {number} pxpfu
   * @return {Metrics}
   */
  function getMetrics(glyphMetric, pxpfu) {
    const noBBox = glyphMetric.bbox === undefined;
    const w = glyphMetric.advanceWidth * pxpfu;
    if (noBBox) return new Metrics(0, w, 0);
    const h = glyphMetric.bbox.y2 * pxpfu;
    const d = -glyphMetric.bbox.y1 * pxpfu;
    return new Metrics(h, w, d);
  }
}
/**
 *
 * @param {String} unicode
 * @param {Object} fontData
 * @return {Object}
 */
function generateSpec(unicode, fontData) {
  const s = {};
  s.fontFamily = fontData.fontFamily;
  s.upm = fontData.upm;
  s.asc = fontData.asc;
  s.des = fontData.des;
  const gm = fontData.glyphMetrics[unicode];
  const advanceWidth = parseInt(gm.advanceWidth, 10);
  s.glyphMetric = { bbox: gm.bbox, advanceWidth };
  s.unicode = unicode;
  return s;
}
