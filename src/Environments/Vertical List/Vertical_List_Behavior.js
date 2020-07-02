import MathBehavior from '../../Abstract/MathBehavior.js';
import Vertical_List from '../../../React-Components/Vertical_List.js';
/** @typedef {import('../../Nodes/Types/Math_Style.js').default} Math_Style  */
/** @typedef {import('../../Nodes/Types/Spacing_Style').default} Spacing_Style  */
/** @typedef {import('../../Abstract/MathBehavior.js').behaviorSpec} behaviorSpec */

/**
 * @class
 */
export default class Vertical_List_Behavior extends MathBehavior {
  _elementBehaviors = []; // w

  /**
   * @param {behaviorSpec} behaviorSpec
   */
  constructor(behaviorSpec) {
    super(behaviorSpec);
    this._component = Vertical_List;
    this.type = 'Vertical_List';
  }

  /**
   * @override
   */
  _preSetterSequence() {
    const verticalListBehavior = this;
    updateElementMathStyles();

    /**
     * Changes Corresponding Node's Element's Behavior's
     * Style
     */
    function updateElementMathStyles() {
      verticalListBehavior._elementBehaviors.forEach((behavior) => {
        behavior.mathStyle = verticalListBehavior._mathStyle;
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
    const verticalListBehavior = this;
    adjustElementBehaviorRightMargins();
    adjustElementBehaviorTopMargins();

    /**
     * changes the top margins of each element
     * behavior so that elements are aligned
     * to baseline
     */
    function adjustElementBehaviorTopMargins() {
      for (const behavior of verticalListBehavior._elementBehaviors) {
        const marginTop =
          settings.metrics.height - behavior.metrics.height + 'px';
        behavior.appendComponentStyle({ marginTop });
      }
    }
    /**
     * changes the right margins of the element behaviors
     */
    function adjustElementBehaviorRightMargins() {
      const behaviors = verticalListBehavior._elementBehaviors;
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
