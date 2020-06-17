import Typesetter from '../../Abstract/Typesetter';
import Script_Type from './Script_Type';
import Metrics from '../../Types/Metrics';

/** @typedef {import('../../Leaf Nodes/Glyph/Glyph_Behavior').default} Glyph_Behavior  */
/** @typedef {import('../../Abstract/Typesetter').setterSpec} setterSpec  */
/** @typedef {import('../../Abstract/Behavior').default} Behavior  */
/** @typedef {import('../../Types/Math_Style').default} Math_Style  */
/**
 * @typedef {Object} ScriptSetterType
 */
export default class Script_Setter extends Typesetter {
  /**
   * @param {Object} scriptSpec
   * h,w,d of behavior
   * margins
   */
  constructor(scriptSpec) {
    super(scriptSpec);
  }

  /**
   * @param {number} pxpfu
   * @param {Behavior} nucleusBehavior
   * @param {Behavior} targetBehavior
   * @param {Behavior} upperLimitBehavior
   * @param {Behavior} lowerLimitBehavior
   * @return {Object} result contains
   * Metrics
   * script Container css
   * script Metrics
   * script css
   * subscript css
   */
  calculateScripts(
    pxpfu,
    nucleusBehavior,
    targetBehavior,
    upperLimitBehavior,
    lowerLimitBehavior
  ) {}
}
