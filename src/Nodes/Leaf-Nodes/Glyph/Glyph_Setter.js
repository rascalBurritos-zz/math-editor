import Typesetter from '../../Abstract/Typesetter.js';
import InternalCharacterBoxComponent from './InternalCharacterBoxComponent.js';
/** @typedef {typeof import('react').Component} Component */

/**
 * @typedef {Object} InternalCharacterBox
 * @property {String} unicode
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
 * @property {String} unicode
 * @property {bbox} bbox
 */

/**
 * @typedef {Object} glyphSetterType
 * @property {number} asc 
 * @property {number} des 
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
   * @return {number} depth below baseline
   */
  calculateDepth(pxpfu) {
    return this._glyphMetric.bbox.y1 * pxpfu;
  }
  /**
   * @return {InternalCharacterBox}
   */
  calculateInternalCharacterBox() {
    return { unicode: '', component: InternalCharacterBoxComponent, style: {} };
  }
}
