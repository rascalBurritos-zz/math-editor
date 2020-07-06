import Typesetter from '../../../Abstract/Typesetter.js';
import InternalCharacterBoxComponent from '../../../React-Components/Math/InternalCharacterBoxComponent.js';
import Metrics from '../../Types/Metrics.js';
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
 * @property {number} mathAxis
 * @property {String} unicode formatted base 10 , A-65
 * @property {String} fontFamily
 * @property {Object} glyphMetric 
 * @property {number} italicsCorrection
 * @property {number} accentAttachmentPoint
 * @typedef {import('../../../Abstract/Typesetter.js').setterSpec 
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
    this._mathAxis = spec.mathAxis;
    this._unicode = spec.unicode;
    this._fontFamily = spec.fontFamily;
    this._glyphMetric = spec.glyphMetric;
    this._italicsCorrection = spec.italicsCorrection;
    this._accentAttachmentPoint = spec.accentAttachmentPoint;
  }

  /**
   * @param {number} pxpfu
   * @param {boolean} isCentered
   * @return {Object}
   *  metrics,
   *  internal character box
   * accent attachment
   * italics correction
   */
  generateSettings(pxpfu, isCentered = false) {
    const glyphSetter = this;
    const internalCharacterBox = calculateInternalCharacterBox();
    const accentAttachment = calculateAccentAttachment();
    const italicsCorrection = calculateItalicsCorrection();
    const metrics = isCentered ? generateCenteredMetrics() : generateMetrics();
    return {
      metrics,
      internalCharacterBox,
      accentAttachment,
      italicsCorrection,
    };

    /**
     * @return {Metrics}
     */
    function generateCenteredMetrics() {
      const height = calculateCenteredHeight();
      const width = calculateWidth();
      const depth = calculateCenteredDepth();
      return new Metrics(height, width, depth);
      /**
       * @return {number} centered height in px
       */
      function calculateCenteredHeight() {
        const totalHeight =
          glyphSetter._glyphMetric.bbox.y2 - glyphSetter._glyphMetric.bbox.y1;
        return (totalHeight / 2 + glyphSetter._mathAxis) * pxpfu;
      }
      /**
       * @return {number} width across glyph
       */
      function calculateWidth() {
        return (
          Math.abs(
            glyphSetter._glyphMetric.bbox.x2 - glyphSetter._glyphMetric.bbox.x1
          ) * pxpfu
        );
      }

      /**
       * @return {number} centered depth in px
       */
      function calculateCenteredDepth() {
        const totalHeight =
          glyphSetter._glyphMetric.bbox.y2 - glyphSetter._glyphMetric.bbox.y1;
        const x = (totalHeight / 2 - glyphSetter._mathAxis) * pxpfu;
        return x;
      }
    }
    /**
     * @return {Metrics}
     */
    function generateMetrics() {
      const height = calculateHeight();
      const width = calculateWidth();
      const depth = calculateDepth();
      return new Metrics(height, width, depth);
      /**
       * @return {number} height above baseline of glyph
       */
      function calculateHeight() {
        return glyphSetter._glyphMetric.bbox.y2 * pxpfu;
      }

      /**
       * @return {number} width across glyph
       */
      function calculateWidth() {
        return (
          Math.abs(
            glyphSetter._glyphMetric.bbox.x2 - glyphSetter._glyphMetric.bbox.x1
          ) * pxpfu
        );
      }
      /**
       * @return {number} depth below baseline
       */
      function calculateDepth() {
        return -glyphSetter._glyphMetric.bbox.y1 * pxpfu;
      }
    }

    /**
     * @return {number} italics correction in pixels
     */
    function calculateItalicsCorrection() {
      return glyphSetter._italicsCorrection * pxpfu;
    }
    /**
     * @return {object} accent attachment in pixels and vertical accenter height
     */
    function calculateAccentAttachment() {
      const bbox = glyphSetter._glyphMetric.bbox;
      const attachmentPoint = glyphSetter._accentAttachmentPoint
        ? Math.abs(bbox.x1 - glyphSetter._accentAttachmentPoint) * pxpfu
        : (Math.abs(bbox.x2 - bbox.x1) / 2) * pxpfu;
      const accenterHeight = bbox.y2 * pxpfu;
      return { attachmentPoint, accenterHeight };
    }
    /**
     * @return {InternalCharacterBox}
     */
    function calculateInternalCharacterBox() {
      return {
        character: String.fromCodePoint(parseInt(glyphSetter._unicode, 10)),
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
}
