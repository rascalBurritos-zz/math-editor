import Behavior from '../Abstract/Behavior.js';
/** @typedef {import('../Types/Math_Style').default} Math_Style */

export default class Branch_Behavior extends Behavior {
  _childBehaviors = {};

  /**
   *
   * @param {String} name
   * @param {Behavior} behavior
   */
  registerChildBehavior(name, behavior) {
    this._childBehaviors[name] = behavior;
  }
  /**
   *
   * @param {Behavior} behavior
   */
  unregisterChildBehavior(behavior) {
    this._childBehaviors = this._childBehaviors.filter((child) => {
      return behavior !== child;
    });
  }

  /**
   * @abstract
   * verifies all necessary
   * behaviors exist
   * and that mathstyle
   * @return {boolean}
   */
  _doEssentialBehaviorsExist() {
    console.log('IMPLEMENT ON CHILD', this);
    return false;
  }

  /**
   * @abstract
   * updates all child math styles
   */
  updateChildMathStyles() {}
  /**
   * @abstract
   * @param {Object} settings
   * updates all child component styles
   * with settings
   */
  updateChildComponentStyles(settings) {}

  /**
   * @return {boolean}
   */
  _isValid() {
    return this._isStyleValid() && this._doEssentialBehaviorsExist();
  }

  /**
   * @override
   */
  _preSetterSequence() {
    this.updateChildMathStyles();
  }
  /**
   * @override
   */
  _postSetterSequence(settings) {
    this.updateChildComponentStyles(settings);
  }
  /**
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [this._childBehaviors, this._dependantBehaviors];
  }
}
