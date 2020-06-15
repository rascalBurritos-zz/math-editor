import Typesetter from '../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../Abstract/Typesetter').setterSpec} setterSpec */

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
    this._mathAxis = spec.axisHeight;
    this._italicsCorrection = spec.italicsCorrection;
    this._forceCenter = spec.forceCenter;
  }
  /**
   * @param {number} desiredSize
   * @param {number} pxpfu
   * @return {number} adjustmentAmount
   */
  calculateAdjustmentAmount(desiredSize, pxpfu) {
    return (
      desiredSize -
      this._unAdjustedViewBox[this._unAdjustedViewBox.mainAxis + 'Total'] *
        pxpfu
    );
  }
  /**
   * @param {number} adjustmentAmount
   * @param {number} pxpfu
   * @return {String}
   */
  calculatePath(adjustmentAmount, pxpfu) {
    const completePath = [];
    for (const path of this._unAdjustedStringPathArray) {
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
   * @param {number} adjustmentAmount
   * @param {number} pxpfu
   * @return {String} viewbox
   */
  calculateViewBox(adjustmentAmount, pxpfu) {
    const viewBox = Object.assign({}, this._unAdjustedViewBox);
    viewBox[viewBox.mainAxis + 'Total'] +=
      (adjustmentAmount / pxpfu) * this._unAdjustedViewBox.numberOfExtensions;
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
   * @param {number} desiredSize
   * @param {number} pxpfu
   * @return {Metrics}
   */
  calculateMetrics(desiredSize, pxpfu) {
    const extendedGlyphSetter = this;
    const metricStrategyMap = {
      x: getHorizontalMetrics,
      y: getVerticalMetrics,
      z: getHorizontalMetricsCentered,
    };
    // assumes desired size is met perfectly
    if (this._forceCenter) return metricStrategyMap.z();
    return metricStrategyMap[this._unAdjustedViewBox.mainAxis]();
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
}
