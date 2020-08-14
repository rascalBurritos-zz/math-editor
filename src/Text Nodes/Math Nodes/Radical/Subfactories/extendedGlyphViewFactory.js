import Metrics from '../../../../Math Nodes/Types/Metrics';
import { getComponentStyle } from '../../../Functional/BaseView';
import { ExtendedGlyph } from '../../../../React-Components/Math/ExtendedGlyph';

/**
 *
 * @param {*} pxpfu
 * @param {*} extendedGlyphSpec
 * @param {*} desiredSize
 * @return {Object}
 */
export default function extendedGlyphViewFactory(
  pxpfu,
  extendedGlyphSpec,
  desiredSize
) {
  const view = generateView(pxpfu, extendedGlyphSpec, desiredSize);
  return view;
}

/**
 * @param {number} pxpfu
 * @param {Object} extendedGlyphSpec
 * @param {number} desiredSize
 * @return {Object} settings
 *  path
 * viewbox
 * metrics
 * accent attachment
 * italics correction
 */
function generateView(pxpfu, extendedGlyphSpec, desiredSize) {
  const adjustmentAmount = calculateAdjustmentAmount(extendedGlyphSpec);
  const path = calculatePath(extendedGlyphSpec);
  const viewBox = calculateViewBox(extendedGlyphSpec);
  const metrics = calculateMetrics(extendedGlyphSpec);
  const accentAttachment = calculateAccentAttachment(extendedGlyphSpec);
  const italicsCorrection = calculateItalicsCorrection(extendedGlyphSpec);
  const componentStyle = getComponentStyle(metrics);
  return {
    component: ExtendedGlyph,
    path,
    viewBox,
    metrics,
    componentStyle,
    accentAttachment,
    italicsCorrection,
  };

  /**
   * @param {Object} extendedGlyphSpec
   * @return {number} adjustmentAmount
   */
  function calculateAdjustmentAmount(extendedGlyphSpec) {
    return (
      desiredSize -
      extendedGlyphSpec.unAdjustedViewBox[
        extendedGlyphSpec.unAdjustedViewBox.mainAxis + 'Total'
      ] *
        pxpfu
    );
  }
  /**
   * @param {Object} extendedGlyphSpec
   * @return {String}
   */
  function calculatePath(extendedGlyphSpec) {
    const completePath = [];
    for (const path of extendedGlyphSpec.unAdjustedStringPathArray) {
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
   * @param {Object} extendedGlyphSpec
   * @return {String} viewbox
   */
  function calculateViewBox(extendedGlyphSpec) {
    const viewBox = Object.assign({}, extendedGlyphSpec.unAdjustedViewBox);
    viewBox[viewBox.mainAxis + 'Total'] +=
      (adjustmentAmount / pxpfu) *
      extendedGlyphSpec.unAdjustedViewBox.numberOfExtensions;
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
   * @param {Object} extendedGlyphSpec
   * @return {Metrics}
   */
  function calculateMetrics(extendedGlyphSpec) {
    const metricStrategyMap = {
      x: getHorizontalMetrics,
      y: getVerticalMetrics,
      z: getHorizontalMetricsCentered,
    };
    // assumes desired size is met perfectly
    if (extendedGlyphSpec.forceCenter) return metricStrategyMap.z();
    return metricStrategyMap[extendedGlyphSpec.unAdjustedViewBox.mainAxis]();
    /**
     * @return {Metrics}
     */
    function getVerticalMetrics() {
      const height = desiredSize / 2 + extendedGlyphSpec.axisHeight * pxpfu;
      const depth = desiredSize / 2 - extendedGlyphSpec.axisHeight * pxpfu;
      const width = extendedGlyphSpec.unAdjustedViewBox.xTotal * pxpfu;
      return new Metrics(height, width, depth);
    }

    /**
     * @return {Metrics}
     */
    function getHorizontalMetrics() {
      const height =
        (extendedGlyphSpec.unAdjustedViewBox.yTotal +
          extendedGlyphSpec.unAdjustedViewBox.yMin) *
        pxpfu;
      const depth = -extendedGlyphSpec.unAdjustedViewBox.yMin * pxpfu;
      const width = desiredSize;
      return new Metrics(height, width, depth);
    }
    /**
     * @return {Metrics}
     */
    function getHorizontalMetricsCentered() {
      const height =
        (extendedGlyphSpec.unAdjustedViewBox.yTotal / 2 +
          extendedGlyphSpec.axisHeight) *
        pxpfu;
      const depth =
        (extendedGlyphSpec.unAdjustedViewBox.yTotal / 2 -
          extendedGlyphSpec.axisHeight) *
        pxpfu;
      const width = desiredSize;
      return new Metrics(height, width, depth);
    }
  }
  /**
   * @param {Object} extendedGlyphSpec
   * @return {Object} accent attachment in pixels and vertical accenter height
   */
  function calculateAccentAttachment(extendedGlyphSpec) {
    const attachmentPoint = metrics.width / 2;
    // accents should only be used with horizontal glyphs this
    // parameter assumes that
    const accenterHeight =
      extendedGlyphSpec.unAdjustedViewBox.yMin +
      extendedGlyphSpec.unAdjustedViewBox.yTotal;
    return { attachmentPoint, accenterHeight };
  }
  /**
   * @param {Object} extendedGlyphSpec
   * @return {number}
   */
  function calculateItalicsCorrection(extendedGlyphSpec) {
    const ic = extendedGlyphSpec.italicsCorrection * pxpfu;
    return ic ? ic : 0;
  }
}
