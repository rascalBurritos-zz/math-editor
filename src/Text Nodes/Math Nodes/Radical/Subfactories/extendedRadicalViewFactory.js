import Metrics from '../../../../Math Nodes/Types/Metrics';
import { getComponentStyle } from '../../../Functional/BaseView';
import { ExtendedGlyph } from '../../../../React-Components/Math/ExtendedGlyph';

/**
 * @param {Object} completeRadicalSpec
 * @param {Object} premadeVariant
 * @param {number} pxpfu
 * @param {number} desiredLength
 * @param {number} desiredWidth
 * @return {Object}
 */
export function extendedRadicalViewFactory(
  completeRadicalSpec,
  premadeVariant,
  pxpfu,
  desiredLength,
  desiredWidth
) {
  // const spacingStyle = Spacing_Style.None;
  const extensionSpec = generateRadicalExtensionSetterSpec(completeRadicalSpec);
  const view = generateView(pxpfu, extensionSpec, desiredLength, desiredWidth);
  return view;

  /**
   * @param {number} pxpfu
   * @param {Object} spec
   * @param {number} desiredLength
   * @param {number} desiredWidth
   * @return {Object}
   * path
   * viewbox
   * metrics
   */
  function generateView(pxpfu, spec, desiredLength, desiredWidth) {
    const verticalAdjustmentAmount = calculateAdjustmentAmount(
      spec,
      desiredLength,
      true
    );
    const horizontalAdjustmentAmount = calculateAdjustmentAmount(
      spec,
      desiredWidth,
      false
    );
    const path = calculatePath(spec);
    const viewBox = calculateViewBox(spec);
    const metrics = calculateMetrics(spec);
    const componentStyle = getComponentStyle(metrics);
    return { path, viewBox, metrics, componentStyle, component: ExtendedGlyph };
    /**
     * @param {Object} spec
     * @param {number} desiredSize
     * @param {boolean} isVertical
     * @return {number} adjustmentAmount
     */
    function calculateAdjustmentAmount(spec, desiredSize, isVertical) {
      const actualSize = isVertical
        ? desiredSize - spec.unAdjustedViewBox.yTotal * pxpfu
        : desiredSize;
      return actualSize;
    }
    /**
     * @param {Object} spec
     * @return {String}
     */
    function calculatePath(spec) {
      const completePath = [];
      const adjustmentMap = {
        x: horizontalAdjustmentAmount,
        y: verticalAdjustmentAmount,
      };
      for (const path of spec.unAdjustedStringPathArray) {
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
     * @param {Object} spec
     * @return {String} viewbox
     */
    function calculateViewBox(spec) {
      const viewBox = Object.assign({}, spec.unAdjustedViewBox);
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
     * @param {Object} spec
     * @return {Metrics}
     */
    function calculateMetrics(spec) {
      const height = desiredLength / 2 + spec.axisHeight * pxpfu;
      const depth = desiredLength / 2 - spec.axisHeight * pxpfu;
      const width = desiredWidth + spec.unAdjustedViewBox.xTotal * pxpfu;
      return new Metrics(height, width, depth);
    }
  }

  /**
   * @param {Object} radicalExtensionSpec
   * @return {Object}
   */
  function generateRadicalExtensionSetterSpec(radicalExtensionSpec) {
    return {
      upm: radicalExtensionSpec.upm,
      scriptFactor: radicalExtensionSpec.scriptFactor,
      scriptscriptFactor: radicalExtensionSpec.scriptscriptFactor,
      italicsCorrection: premadeVariant.italicsCorrection,

      unAdjustedStringPathArray: radicalExtensionSpec.extended.stringArray,
      unAdjustedViewBox: radicalExtensionSpec.extended.viewBox,
      axisHeight: radicalExtensionSpec.axisHeight,
    };
  }
}
