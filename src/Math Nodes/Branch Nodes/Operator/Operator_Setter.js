import Typesetter from '../../../Abstract/Typesetter';
import { getScriptFontParameters } from '../../../Factories/Math/Branch/scriptsFactory';
import Scripts_Setter from '../Scripts/Scripts_Setter';
import Spacing_Style from '../../Types/Spacing_Style';
import Scripts_Behavior from '../Scripts/Scripts_Behavior';
import limitsBehaviorFactory from '../../../Factories/Math/Branch/limitsBehaviorFactory';

/** @typedef {import('../../Leaf Nodes/Variant_Glyph/Variant_Glyph_Behavior').default} Variant_Glyph_Behavior  */
/** @typedef {import('../../Leaf Nodes/Glyph/Glyph_Behavior').default} Glyph_Behavior  */
/** @typedef {import('../../../Abstract/Typesetter').setterSpec} setterSpec  */
/** @typedef {import('../../../Abstract/MathBehavior').default} MathBehavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/**
 * @typedef {Object} ScriptSetterType
 */
export default class Operator_Setter extends Typesetter {
  /**
   * @param {Object} spec
   * h,w,d of behavior
   * margins
   */
  constructor(spec) {
    super(spec);
    this._displayOperatorMinHeight = spec.displayOperatorMinHeight;
    this._fontData = spec.fontData;
  }

  /**
   * @param {number} pxpfu
   * @param {Variant_Glyph_Behavior} nucleusBehavior // will set nucleus desired size
   * @param {MathBehavior} lowerlimitBehavior
   * @param {MathBehavior} upperlimitBehavior
   * @param {MathBehavior} targetBehavior
   * @return {Object} result contains
   * resultant Behavior = Scripts | Limits
   */
  generateSettings(
    pxpfu,
    nucleusBehavior,
    lowerlimitBehavior,
    upperlimitBehavior,
    targetBehavior
  ) {
    const operatorSetter = this;
    const desiredSize = calculateDesiredSize();
    setNucleusSize();
    const behavior = determineOperatorBehavior();
    return behavior;

    /**
     * @return {MathBehavior}
     */
    function determineOperatorBehavior() {
      if (nucleusBehavior.mathStyle.type === 'D') {
        return generateLimitsBehavior();
      }
      return generateScriptsBehavior();

      /**
       * @return {MathBehavior}
       */
      function generateLimitsBehavior() {
        const limitsBehavior = limitsBehaviorFactory(operatorSetter._fontData);
        limitsBehavior.upperLimitBehavior = upperlimitBehavior;
        limitsBehavior.nucleusBehavior = nucleusBehavior;
        limitsBehavior.lowerLimitBehavior = lowerlimitBehavior;
        return limitsBehavior;
      }

      /**
       * @return {MathBehavior}
       */
      function generateScriptsBehavior() {
        const spec = getScriptFontParameters(operatorSetter._fontData);
        const typesetter = new Scripts_Setter(spec);
        const spacingStyle = Spacing_Style.Operator;
        const scriptsBehavior = new Scripts_Behavior({
          typesetter,
          spacingStyle,
        });
        scriptsBehavior.nucleusBehavior = nucleusBehavior;
        if (doesUpperLimitExist()) {
          scriptsBehavior.superBehavior = upperlimitBehavior;
        }
        if (doesLowerLimitExist()) {
          scriptsBehavior.subBehavior = lowerlimitBehavior;
        }
        return scriptsBehavior;
      }
    }

    /**
     * @return {boolean}
     */
    function doesUpperLimitExist() {
      return upperlimitBehavior !== undefined;
    }
    /**
     * @return {boolean}
     */
    function doesLowerLimitExist() {
      return lowerlimitBehavior !== undefined;
    }
    /**
     *
     */
    function setNucleusSize() {
      nucleusBehavior.desiredSize = desiredSize;
    }
    /**
     * @return {number}
     */
    function calculateDesiredSize() {
      if (doesTargetExist()) {
        const maxLength = Math.max(
          targetBehavior.metrics.height,
          targetBehavior.metrics.depth
        );
        return maxLength * 2;
      }
      if (nucleusBehavior.mathStyle.type === 'D') {
        return operatorSetter._displayOperatorMinHeight * pxpfu;
      }
      // should target the smallest variant
      return 0;
    }

    /**
     * @return {boolean}
     */
    function doesTargetExist() {
      return targetBehavior !== undefined;
    }
  }
}
