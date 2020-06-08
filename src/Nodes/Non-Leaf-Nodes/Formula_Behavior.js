import Behavior from '../Abstract/Behavior.js';
/** @typedef {import('../Types/Math_Style.js').default} Math_Style  */
/** @typedef {import('../Types/Spacing_Style').default} Spacing_Style  */
/** @typedef {import('../Abstract/Behavior.js').behaviorSpec} behaviorSpec */

/**
 * @class
 */
export default class Formula_Behavior extends Behavior {
  // Inherited properties
  // _componentStyle = {};//rw can write anything not h,w
  // _metrics = new Metrics(0, 0, 0); //r
  // _mathStyle;//rw
  // _spacingStyle;//r
  // _pxpfu;//none
  // _typesetter;//none
  // _component;//r

  // added Properties
  _elementBehaviors = []; // w
  // spacing between elements
  _interElementSpacing = []; // none

  /**
   * @param {behaviorSpec} behaviorSpec
   */
  constructor(behaviorSpec) {
    super(behaviorSpec);
    this._component = null;
  }

  /**
   * updates children's component style
   * current state,and this behavior's
   * metrics and h.w style
   */
  _update() {
    const formulaBehavior = this;
    if (this._isMathStyleSet()) {
      updateElementMathStyles();
      updateInterElementSpacing();
      updateMetrics();
    }
    /**
     * changes the inter element spacing array property to
     * match the current spacing style types of elements
     */
    function updateInterElementSpacing() {
      const rawTypes = formulaBehavior._elementBehaviors.map(
        (ele) => ele.spacingStyle
      );
      const defactoSpacingTypes = calculateDefactoTypes(rawTypes);
      formulaBehavior._interElementSpacing = formulaBehavior._typesetter.calculateInterElementSpacing(
        defactoSpacingTypes
      );

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
     * Changes Corresponding Node's Element's Behavior's
     * Style
     */
    function updateElementMathStyles() {
      formulaBehavior._elementBehaviors.forEach((behavior) => {
        behavior.mathStyle = formulaBehavior._mathStyle;
      });
    }
    /**
     * Changes the Height, Width, and Depth of the Metric
     */
    function updateMetrics() {
      formulaBehavior._metrics.height = calculateHeight();
      formulaBehavior._metrics.depth = calculateDepth();
      formulaBehavior._metrics.width = calculateWidth();
      formulaBehavior.updateComponentStyleDimensions();

      /**
       * @return {number} - in pixels
       * Finds Max height of child behaviors
       */
      function calculateHeight() {
        const heightArray = formulaBehavior._elementBehaviors.map(
          (ele) => ele.metrics.height
        );
        return Math.max(...heightArray);
      }
      /**
       * @return {number} min depth of child element
       * behaviors in pixels
       */
      function calculateDepth() {
        const depthArray = formulaBehavior._elementBehaviors.map(
          (ele) => ele.metrics.depth
        );
        return Math.min(...depthArray);
      }
      /**
       * @return {number} width in pixels
       * of entire formula
       */
      function calculateWidth() {
        const rawWidth = formulaBehavior._elementBehaviors.reduce(
          (acc, curr) => {
            return acc + curr.metrics.width;
          },
          0
        );
        const interElementTotal = formulaBehavior._interElementSpacing.reduce(
          (acc, curr) => {
            return acc + curr;
          },
          0
        );
        const total = rawWidth + interElementTotal;
        return total;
      }
    }
  }

  /**
   * @return {boolean}
   */
  _isMathStyleSet() {
    return this._mathStyle !== undefined;
  }

  /**
   * @param {Math_Style} style
   */
  set mathStyle(style) {
    this._mathStyle = style;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    this._update();
  }

  /**
   * @param {Behavior[]} elementBehaviors
   */
  set elementBehaviors(elementBehaviors) {
    this._elementBehaviors = elementBehaviors;
    this._update();
  }
}