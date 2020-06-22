import Behavior from '../../Abstract/Behavior.js';
import Formula from '../../../React-Components/Formula.js';
/** @typedef {import('../../Types/Math_Style.js').default} Math_Style  */
/** @typedef {import('../../Types/Spacing_Style').default} Spacing_Style  */
/** @typedef {import('../../Abstract/Behavior.js').behaviorSpec} behaviorSpec */

/**
 * @class
 */
export default class Formula_Behavior extends Behavior {
  _elementBehaviors = []; // w

  /**
   * @param {behaviorSpec} behaviorSpec
   */
  constructor(behaviorSpec) {
    super(behaviorSpec);
    this._component = Formula;
    this.type = 'Formula';
  }

  /**
   * @override
   */
  _preSetterSequence() {
    const formulaBehavior = this;
    updateElementMathStyles();
    updateVariantGlyphs();
    updateRadicals();
    /**
     * sets length of variant glyphs
     */
    function updateVariantGlyphs() {
      for (const behavior of formulaBehavior._elementBehaviors) {
        if (behavior.type === 'Variant_Glyph') {
          behavior.desiredSize = 300;
        }
      }
    }
    /**
     * sets length and width of radicals
     */
    function updateRadicals() {
      for (const behavior of formulaBehavior._elementBehaviors) {
        if (behavior.type === 'Radical_Glyph') {
          behavior.desiredLength = 500;
          behavior.desiredWidth = 50;
        }
      }
    }
    /**
     * Changes Corresponding Node's Element's Behavior's
     * Style
     */
    function updateElementMathStyles() {
      formulaBehavior._elementBehaviors.forEach((behavior) => {
        behavior.mathStyle = formulaBehavior._mathStyle;
      });
    }
  }
  /**
   * @return {Array}
   */
  _generateSetterDependencies() {
    const rawTypes = this._elementBehaviors.map((ele) => ele.spacingStyle);
    const defactoSpacingTypes = calculateDefactoTypes(rawTypes);
    return [this._elementBehaviors, defactoSpacingTypes];
    /**
     * @param {Spacing_Style[]} rawTypes
     * @return {Spacing_Style[]}
     */
    function calculateDefactoTypes(rawTypes) {
      // TODO
      // should account for spacing type coercions
      return rawTypes;
    }
  }

  /**
   * @override
   */
  _postSetterSequence(settings) {
    const formulaBehavior = this;
    adjustElementBehaviorRightMargins();
    adjustElementBehaviorTopMargins();

    /**
     * changes the top margins of each element
     * behavior so that elements are aligned
     * to baseline
     */
    function adjustElementBehaviorTopMargins() {
      for (const behavior of formulaBehavior._elementBehaviors) {
        const marginTop =
          settings.metrics.height - behavior.metrics.height + 'px';
        behavior.appendComponentStyle({ marginTop });
      }
    }
    /**
     * changes the right margins of the element behaviors
     */
    function adjustElementBehaviorRightMargins() {
      const behaviors = formulaBehavior._elementBehaviors;
      for (let index = 0; index < behaviors.length - 1; index++) {
        const marginRight = settings.spacingArray[index] + 'px';
        behaviors[index].appendComponentStyle({ marginRight });
      }
    }
  }
  /**
   * @param {Object} settings
   * Changes the Height, Width, and Depth of the Metric
   */
  _updateMetrics(settings) {
    this._metrics = settings.metrics;
  }
  /**
   * @param {Array} elementBehaviors
   */
  set elementBehaviors(elementBehaviors) {
    this._elementBehaviors = elementBehaviors;
    this.update();
  }
  /**
   * @return {Array} should only be
   * used for generating react components
   */
  get elementBehaviors() {
    return this._elementBehaviors;
  }
}
