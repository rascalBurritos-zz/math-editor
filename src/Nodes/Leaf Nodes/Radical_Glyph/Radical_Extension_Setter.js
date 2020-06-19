import Typesetter from '../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../Abstract/Typesetter').setterSpec} setterSpec */

/**
 * @typedef {Object} extendedRadicalSetterLike
 * @property {Array} unAdjustedStringPathArray
 * @property {Object} unAdjustedViewBox
 * @property {number} axisHeight
 * @property {number} italicsCorrection
 * @typedef {setterSpec & extendedRadicalSetterLike} extendedRadicalSetterSpec
 */

export default class Extended_Glyph_Setter extends Typesetter {
  /**
   *
   * @param {extendedRadicalSetterSpec} spec
   */
  constructor(spec) {
    super(spec);
    this._unAdjustedStringPathArray = spec.unAdjustedStringPathArray;
    this._unAdjustedViewBox = spec.unAdjustedViewBox;
    this._mathAxis = spec.axisHeight;
    this._italicsCorrection = spec.italicsCorrection;
  }

  /**
   * @param {number} pxpfu
   * @param {number} desiredLength
   * @param {number} desiredWidth
   * @return {Object}
   * path
   * viewbox
   * metrics
   *
   */
  generateSettings(pxpfu, desiredLength, desiredWidth) {
    const radicalExtensionSetter = this;
    const verticalAdjustmentAmount = calculateAdjustmentAmount(
      desiredLength,
      true
    );
    const horizontalAdjustmentAmount = calculateAdjustmentAmount(
      desiredWidth,
      false
    );
    const path = calculatePath();
    const viewBox = calculateViewBox();
    const metrics = calculateMetrics();
    return { path, viewBox, metrics };
    /**
     * @param {number} desiredSize
     * @param {boolean} isVertical
     * @return {number} adjustmentAmount
     */
    function calculateAdjustmentAmount(desiredSize, isVertical) {
      const actualSize = isVertical
        ? desiredSize - radicalExtensionSetter._unAdjustedViewBox.yTotal * pxpfu
        : desiredSize;
      return actualSize;
    }
    /**
     * @return {String}
     */
    function calculatePath() {
      const completePath = [];
      const adjustmentMap = {
        x: horizontalAdjustmentAmount,
        y: verticalAdjustmentAmount,
      };
      for (const path of radicalExtensionSetter._unAdjustedStringPathArray) {
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
            ? adjustmentMap[path.mainAxis] / pxpfu
            : -adjustmentMap[path.mainAxis] / pxpfu;

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
      const viewBox = Object.assign(
        {},
        radicalExtensionSetter._unAdjustedViewBox
      );
      viewBox.xTotal += horizontalAdjustmentAmount / pxpfu;
      viewBox.yTotal += verticalAdjustmentAmount / pxpfu;
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
      const height =
        desiredLength / 2 + radicalExtensionSetter._mathAxis * pxpfu;
      const depth =
        desiredLength / 2 - radicalExtensionSetter._mathAxis * pxpfu;
      const width =
        desiredWidth + radicalExtensionSetter._unAdjustedViewBox.xTotal * pxpfu;
      return new Metrics(height, width, depth);
    }
  }
}
