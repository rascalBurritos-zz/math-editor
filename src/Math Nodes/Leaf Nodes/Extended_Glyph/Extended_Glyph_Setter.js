import Typesetter from '../../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../../Abstract/Typesetter').setterSpec} setterSpec */

/**
 * @typedef {Object} extendedGlyphSetterLike
 * @property {Array} unAdjustedStringPathArray
 * @property {Object} unAdjustedViewBox
 * @property {number} axisHeight
 * @property {number} italicsCorrection
 * @property {boolean} forceCenter
 * @typedef {setterSpec & extendedGlyphSetterLike} extendedGlyphSetterSpec
 */

export default class Extended_Glyph_Setter extends Typesetter {
  /**
   *
   * @param {extendedGlyphSetterSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._unAdjustedStringPathArray = spec.unAdjustedStringPathArray;
    this._unAdjustedViewBox = spec.unAdjustedViewBox;
    this._italicsCorrection = spec.italicsCorrection;
    this._mathAxis = spec.axisHeight;
    this._italicsCorrection = spec.italicsCorrection;
    this._forceCenter = spec.forceCenter;
  }

  /**
   * @param {number} pxpfu
   * @param {number} desiredSize
   * @return {Object} settings
   *  path
   * viewbox
   * metrics
   * accent attachment
   * italics correction
   */
  generateSettings(pxpfu, desiredSize) {
    const extendedGlyphSetter = this;
    const adjustmentAmount = calculateAdjustmentAmount();
    const path = calculatePath();
    const viewBox = calculateViewBox();
    const metrics = calculateMetrics();
    const accentAttachment = calculateAccentAttachment();
    const italicsCorrection = calculateItalicsCorrection();
    return { path, viewBox, metrics, accentAttachment, italicsCorrection };

    /**
     * @return {number} adjustmentAmount
     */
    function calculateAdjustmentAmount() {
      return (
        desiredSize -
        extendedGlyphSetter._unAdjustedViewBox[
          extendedGlyphSetter._unAdjustedViewBox.mainAxis + 'Total'
        ] *
          pxpfu
      );
    }
    /**
     * @return {String}
     */
    function calculatePath() {
      const completePath = [];
      for (const path of extendedGlyphSetter._unAdjustedStringPathArray) {
        if (typeof path === 'string') {
          completePath.push(path);
        } else if (path.adjusted) {
          const addedPath = {};
          for (const entry in path) {
            if (entry !== path.mainAxis) {
              addedPath[entry] = path[entry];
            }
          }
          addedPath[path.mainAxis] = path[path.mainAxis].isPositive
            ? adjustmentAmount / pxpfu
            : -adjustmentAmount / pxpfu;

          const adjustedPath =
            addedPath.type + ' ' + addedPath.x + ' ' + addedPath.y + ' ';
          completePath.push(adjustedPath);
        } else {
          console.log(typeof path);
          console.warn('Wrong Path String Type');
        }
      }
      return completePath.join('');
    }
    /**
     * @return {String} viewbox
     */
    function calculateViewBox() {
      const viewBox = Object.assign({}, extendedGlyphSetter._unAdjustedViewBox);
      viewBox[viewBox.mainAxis + 'Total'] +=
        (adjustmentAmount / pxpfu) *
        extendedGlyphSetter._unAdjustedViewBox.numberOfExtensions;
      return (
        viewBox.xMin +
        ', ' +
        viewBox.yMin +
        ', ' +
        viewBox.xTotal +
        ', ' +
        viewBox.yTotal
      );
    }

    /**
     * @return {Metrics}
     */
    function calculateMetrics() {
      const metricStrategyMap = {
        x: getHorizontalMetrics,
        y: getVerticalMetrics,
        z: getHorizontalMetricsCentered,
      };
      // assumes desired size is met perfectly
      if (extendedGlyphSetter._forceCenter) return metricStrategyMap.z();
      return metricStrategyMap[
        extendedGlyphSetter._unAdjustedViewBox.mainAxis
      ]();
      /**
       * @return {Metrics}
       */
      function getVerticalMetrics() {
        const height = desiredSize / 2 + extendedGlyphSetter._mathAxis * pxpfu;
        const depth = desiredSize / 2 - extendedGlyphSetter._mathAxis * pxpfu;
        const width = extendedGlyphSetter._unAdjustedViewBox.xTotal * pxpfu;
        return new Metrics(height, width, depth);
      }

      /**
       * @return {Metrics}
       */
      function getHorizontalMetrics() {
        const height =
          (extendedGlyphSetter._unAdjustedViewBox.yTotal +
            extendedGlyphSetter._unAdjustedViewBox.yMin) *
          pxpfu;
        const depth = -extendedGlyphSetter._unAdjustedViewBox.yMin * pxpfu;
        const width = desiredSize;
        return new Metrics(height, width, depth);
      }
      /**
       * @return {Metrics}
       */
      function getHorizontalMetricsCentered() {
        const height =
          (extendedGlyphSetter._unAdjustedViewBox.yTotal / 2 +
            extendedGlyphSetter._mathAxis) *
          pxpfu;
        const depth =
          (extendedGlyphSetter._unAdjustedViewBox.yTotal / 2 -
            extendedGlyphSetter._mathAxis) *
          pxpfu;
        const width = desiredSize;
        return new Metrics(height, width, depth);
      }
    }
    /**
     * @return {object} accent attachment in pixels and vertical accenter height
     */
    function calculateAccentAttachment() {
      const attachmentPoint = metrics.width / 2;
      // accents should only be used with horizontal glyphs this
      // parameter assumes that
      const accenterHeight =
        extendedGlyphSetter._unAdjustedViewBox.yMin +
        extendedGlyphSetter._unAdjustedViewBox.yTotal;
      return { attachmentPoint, accenterHeight };
    }
    /**
     * @return {number}
     */
    function calculateItalicsCorrection() {
      return extendedGlyphSetter._italicsCorrection * pxpfu;
    }
  }
}
