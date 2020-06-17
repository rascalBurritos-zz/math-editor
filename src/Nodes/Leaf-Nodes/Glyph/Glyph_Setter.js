import Typesetter from '../../Abstract/Typesetter.js';
import InternalCharacterBoxComponent from '../../../React-Components/InternalCharacterBoxComponent.js';
/** @typedef {typeof import('react').Component} Component */

/**
 * @typedef {Object} InternalCharacterBox
 * @property {String} character
 * @property {Component} component
 * @property {Object} style
 */

/**
 * @typedef {Object} bbox
 * @property {number} x1
 * @property {number} y1
 * @property {number} x2
 * @property {number} y2
 */

/**
 * @typedef {Object} glyphMetric
 * @property {number} advanceWidth
 * @property {String} glyphName
 * @property {String} unicode unformatted unicode "U0X1234"
 * @property {bbox} bbox
 */

/**
 * @typedef {Object} glyphSetterType
 * @property {number} asc 
 * @property {number} des 
 * @property {String} unicode formatted base 10 , A-65
 * @property {String} fontFamily
 * @property {Object} glyphMetric 
 * @property {number} italicsCorrection
 * @property {number} accentAttachmentPoint
 * @typedef {import('../../Abstract/Typesetter.js').setterSpec 
  & glyphSetterType} glyphSetterSpec
 */

/**
 * @class
 */
export default class Glyph_Setter extends Typesetter {
  /**
   * @param {glyphSetterSpec} spec whut
   */
  constructor(spec) {
    super(spec);
    this._asc = spec.asc;
    this._des = spec.des;
    this._unicode = spec.unicode;
    this._fontFamily = spec.fontFamily;
    this._glyphMetric = spec.glyphMetric;
    this._italicsCorrection = spec.italicsCorrection;
    this._accentAttachmentPoint = spec.accentAttachmentPoint;
  }
  /**
   * @param {number} pxpfu
   * @return {number} height above baseline of glyph
   */
  calculateHeight(pxpfu) {
    return this._glyphMetric.bbox.y2 * pxpfu;
  }

  /**
   * @param {number} pxpfu
   * @return {number} width across glyph
   */
  calculateWidth(pxpfu) {
    return (
      Math.abs(this._glyphMetric.bbox.x2 - this._glyphMetric.bbox.x1) * pxpfu
    );
  }

  /**
   * @param {number} pxpfu
   * @return {number} italics correction in pixels
   */
  calculateItalicsCorrection(pxpfu) {
    return this._italicsCorrection * pxpfu;
  }

  /**
   * @param {number} pxpfu
   * @return {object} accent attachment in pixels and vertical accenter height
   */
  calculateAccentAttachment(pxpfu) {
    const bbox = this._glyphMetric.bbox;
    const attachmentPoint = this._accentAttachmentPoint
      ? Math.abs(bbox.x1 - this._accentAttachmentPoint) * pxpfu
      : (Math.abs(bbox.x2 - bbox.x1) / 2) * pxpfu;
    const accenterHeight = bbox.y2 * pxpfu;
    return { attachmentPoint, accenterHeight };
  }

  /**
   * @param {number} pxpfu
   * @return {number} depth below baseline
   */
  calculateDepth(pxpfu) {
    return -this._glyphMetric.bbox.y1 * pxpfu;
  }
  /**
   * @param {number} fontSize
   * @param {number} pxpfu
   * @return {InternalCharacterBox}
   */
  calculateInternalCharacterBox(fontSize, pxpfu) {
    const glyphSetter = this;

    return {
      character: String.fromCodePoint(parseInt(this._unicode, 10)),
      component: InternalCharacterBoxComponent,
      style: getStyle(),
    };
    /**
     * @return {Object} style of Internal Character Box
     */
    function getStyle() {
      const style = {};
      style.fontFamily = glyphSetter._fontFamily;
      const currentFontSize = glyphSetter._upm * pxpfu;
      style.fontSize = currentFontSize + 'px';
      style.height =
        Math.floor((glyphSetter._asc + glyphSetter._des) * pxpfu) + 'px';
      style.width = glyphSetter._glyphMetric.advanceWidth * pxpfu + 'px';
      style.top =
        (glyphSetter._glyphMetric.bbox.y2 - glyphSetter._asc) * pxpfu + 'px';
      style.left = -glyphSetter._glyphMetric.bbox.x1 * pxpfu + 'px';
      return style;
    }
  }
}
