import Typesetter from '../../Abstract/Typesetter';
import Metrics from '../../Types/Metrics';
import { declareInterface } from '../../../../../../../.cache/typescript/3.9/node_modules/@babel/types/lib/index';

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
   * @param {number} desiredSize
   * @param {number} pxpfu
   * @param {boolean} isVertical
   * @return {number} adjustmentAmount
   */
  calculateAdjustmentAmount(desiredSize, pxpfu, isVertical) {
    const actualSize = isVertical
      ? desiredSize - this._unAdjustedViewBox.yTotal * pxpfu
      : desiredSize;
    return actualSize;
  }

  /**
   * @param {number} verticalAdjustmentAmount
   * @param {number} horizontalAdjustmentAmount
   * @param {number} pxpfu
   * @return {String}
   */
  calculatePath(verticalAdjustmentAmount, horizontalAdjustmentAmount, pxpfu) {
    const completePath = [];
    const adjustmentMap = {
      x: horizontalAdjustmentAmount,
      y: verticalAdjustmentAmount,
    };
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
   * @param {number} verticalAdjustmentAmount
   * @param {number} horizontalAdjustmentAmount
   * @param {number} pxpfu
   * @return {String} viewbox
   */
  calculateViewBox(
    verticalAdjustmentAmount,
    horizontalAdjustmentAmount,
    pxpfu
  ) {
    const viewBox = Object.assign({}, this._unAdjustedViewBox);
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
   * @param {number} desiredLength
   * @param {number} desiredWidth
   * @param {number} pxpfu
   * @return {Metrics}
   */
  calculateMetrics(desiredLength, desiredWidth, pxpfu) {
    const height = desiredLength / 2 + this._mathAxis * pxpfu;
    const depth = desiredLength / 2 - this._mathAxis * pxpfu;
    const width = desiredWidth + this._unAdjustedViewBox.xTotal * pxpfu;
    return new Metrics(height, width, depth);
  }
}
