import Spacing_Style from '../../Types/Spacing_Style';
import Extended_Glyph_Behavior from '../../Leaf Nodes/Extended_Glyph/Extended_Glyph_Behavior';
import Extended_Glyph_Setter from '../../Leaf Nodes/Extended_Glyph/Extended_Glyph_Setter';

/**
 * @param {number} desiredSize
 * @param {Object} extensionSettings
 * @param {Object} fontData
 * @return {Extended_Glyph_Behavior}
 */
export default function extenddedGlyphBehaviorFactory(
  desiredSize,
  extensionSettings,
  fontData
) {
  const spacingStyle = Spacing_Style.None;
  const setterSpec = generateSetterSpec();
  const typesetter = new Extended_Glyph_Setter(setterSpec);
  const behavior = new Extended_Glyph_Behavior({
    typesetter,
    spacingStyle,
  });
  behavior.desiredSize = desiredSize;
  return behavior;

  /**
   * @return {Object}
   */
  function generateSetterSpec() {
    const spec = {};
    const mc = fontData.MATH.MathConstants;
    spec.upm = fontData.upm;
    spec.scriptFactor = mc.ScriptPercentScaleDown;
    spec.scriptscriptFactor = mc.ScriptScriptPercentScaleDown;
    spec.italicsCorrection = extensionSettings.italicsCorrection;
    spec.unAdjustedStringPathArray = extensionSettings.pathArray;
    spec.unAdjustedViewBox = extensionSettings.viewBox;
    spec.axisHeight = mc.AxisHeight;
    return spec;
    /**
     *@return {Object}
     */
  }
}
