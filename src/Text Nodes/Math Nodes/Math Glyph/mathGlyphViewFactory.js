import Metrics from '../../../Math Nodes/Types/Metrics';
import InternalCharacterBox from '../../../React-Components/Math/InternalCharacterBoxComponent';
import { calculatePXPFU } from '../Formula/formulaViewFactory';
import { MATH_GLYPH_TYPE } from '../../Functional/Node Types';
import { Glyph } from '../../../React-Components/Math/Glyph';
import { getComponentStyle } from '../../Functional/BaseView';

/**
 *
 * @param {*} mathList
 * @param {*} font
 * @param {*} style
 * @param {*} viewCollection
 * @return {Object}
 */
export default function mathGlyphViewFactory(
  mathList,
  font,
  style,
  viewCollection
) {
  const spacingStyle = mathList.spacingStyle;
  const spec = generateSpec(font, mathList);
  const pxpfu = calculatePXPFU(style, font);
  const settings = generateSettings(pxpfu, spec, mathList.centered);
  const view = getView(settings, mathList.id, spacingStyle);
  return view;
}

/**
 * @param {*} settings
 * @param {*} id
 * @param {*} spacingStyle
 * @return {Object}
 */
function getView(settings, id, spacingStyle) {
  const componentStyle = getComponentStyle(settings.metrics);
  const internalCharacterBox = settings.internalCharacterBox;
  return {
    spacingStyle,
    id,
    componentStyle,
    metrics: settings.metrics,
    internalCharacterBox,
    type: MATH_GLYPH_TYPE,
    component: Glyph,
    italicsCorrection: settings.italicsCorrection,
    accentAttachment: settings.accentAttachment,
  };
}

/**
 * @param {Object} font
 * @param {Object} mathList
 * @return {Object}
 */
function generateSpec(font, mathList) {
  const italicsCorrection = font.italicCorrectionMap[mathList.unicode];
  const accentAttachment = font.accentAttachment[mathList.unicode];
  const mc = font.MATH.MathConstants;
  const spec = {};
  spec.upm = font.upm;
  spec.scriptFactor = mc.ScriptPercentScaleDown;
  spec.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;
  spec.asc = font.asc;
  spec.des = font.des;
  spec.unicode = mathList.unicode;
  spec.fontFamily = font.fontFamily;
  spec.glyphMetric = font.glyphMetrics[mathList.unicode];
  spec.italicsCorrection = italicsCorrection ? italicsCorrection : 0;
  spec.accentAttachmentPoint = accentAttachment;
  spec.mathAxis = mc.AxisHeight;
  return spec;
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
function generateSettings(pxpfu, spec, isCentered = false) {
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
      const totalHeight = spec.glyphMetric.bbox.y2 - spec.glyphMetric.bbox.y1;
      return (totalHeight / 2 + spec.mathAxis) * pxpfu;
    }
    /**
     * @return {number} width across glyph
     */
    function calculateWidth() {
      return (
        Math.abs(spec.glyphMetric.bbox.x2 - spec.glyphMetric.bbox.x1) * pxpfu
      );
    }

    /**
     * @return {number} centered depth in px
     */
    function calculateCenteredDepth() {
      const totalHeight = spec.glyphMetric.bbox.y2 - spec.glyphMetric.bbox.y1;
      const x = (totalHeight / 2 - spec.mathAxis) * pxpfu;
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
      return spec.glyphMetric.bbox.y2 * pxpfu;
    }

    /**
     * @return {number} width across glyph
     */
    function calculateWidth() {
      return (
        Math.abs(spec.glyphMetric.bbox.x2 - spec.glyphMetric.bbox.x1) * pxpfu
      );
    }
    /**
     * @return {number} depth below baseline
     */
    function calculateDepth() {
      return -spec.glyphMetric.bbox.y1 * pxpfu;
    }
  }

  /**
   * @return {number} italics correction in pixels
   */
  function calculateItalicsCorrection() {
    return spec.italicsCorrection * pxpfu;
  }
  /**
   * @return {object} accent attachment in pixels and vertical accenter height
   */
  function calculateAccentAttachment() {
    const bbox = spec.glyphMetric.bbox;
    const attachmentPoint = spec.accentAttachmentPoint
      ? Math.abs(bbox.x1 - spec.accentAttachmentPoint) * pxpfu
      : (Math.abs(bbox.x2 - bbox.x1) / 2) * pxpfu;
    const accenterHeight = bbox.y2 * pxpfu;
    return { attachmentPoint, accenterHeight };
  }
  /**
   * @return {Object}
   */
  function calculateInternalCharacterBox() {
    return {
      character: String.fromCodePoint(parseInt(spec.unicode, 10)),
      component: InternalCharacterBox,
      style: getStyle(),
    };
    /**
     * @return {Object} style of Internal Character Box
     */
    function getStyle() {
      if (!spec.glyphMetric.bbox) {
        spec.glyphMetric.bbox = {
          x1: 0,
          y2: 0,
          y1: 0,
          x2: spec.glyphMetric.advanceWidth,
        };
      }
      const style = {};
      style.fontFamily = spec.fontFamily;
      const currentFontSize = spec.upm * pxpfu;
      style.fontSize = currentFontSize + 'px';
      style.height = Math.floor((spec.asc + spec.des) * pxpfu) + 'px';
      style.width = spec.glyphMetric.advanceWidth * pxpfu + 'px';
      style.top = (spec.glyphMetric.bbox.y2 - spec.asc) * pxpfu + 'px';
      style.left = -spec.glyphMetric.bbox.x1 * pxpfu + 'px';
      return style;
    }
  }
}
