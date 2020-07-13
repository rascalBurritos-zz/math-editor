export default class CaretNode {
  /**
   *
   * @param {Object} options
   */
  constructor(options = {}) {
    this.index = options.index || null;
    // left and right are other caret nodes
    this.left = options.left || null;
    this.right = options.right || null;
    // above and below are document nodes
    // that will be searched for the closest point
    // to this caret node
    this.above = options.above || null;
    this.below = options.below || null;
    this.parentDocNode = null;
    this._dependants = options.dependants || [];
  }

  /**
   * @param {Function} dp
   */
  registerDependant(dp) {
    this._dependants.push(dp);
  }

  /**
   * @param {CaretNode} replacement
   */
  syncDependants(replacement) {
    for (const setDependantCaretNode of this._dependants) {
      setDependantCaretNode(replacement);
      replacement.registerDependant(setDependantCaretNode);
    }
    // should now be useless
  }

  /**
   * @param  {Object} options shorthand to change
   * object state
   */
  change(options) {
    for (const entry in options) {
      if (entry in this) {
        this[entry] = options[entry];
      }
    }
  }

  /**
   *
   * @param {CaretNode} target
   */
  linkLeftTo(target) {
    if (target === undefined) console.warn(target);
    this.left = target;
    target.right = this;
  }
  /**
   *
   * @param {CaretNode} target
   */
  linkRightTo(target) {
    if (target === undefined) console.warn(target);
    this.right = target;
    target.left = this;
  }
  // above;
  // below;
}
