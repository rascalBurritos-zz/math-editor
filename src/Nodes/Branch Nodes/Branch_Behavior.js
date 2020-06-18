import Behavior from '../Abstract/Behavior.js';
/** @typedef {import('../Types/Math_Style').default} Math_Style */

export default class Branch_Behavior extends Behavior {
  _childBehaviors = {};
  _dependantBehaviors = [];

  /**
   *
   * @param {String} name
   * @param {Behavior} behavior
   */
  _registerChildBehavior(name, behavior) {
    this._childBehaviors[name] = behavior;
  }
  /**
   * @param {Behavior} behavior
   */
  _registerDependantBehavior(behavior) {
    this._dependantBehaviors.push(behavior);
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
   * @abstract
   * @param {Object} settings
   */
  updateMetrics(settings) {}

  /**
   * @return {boolean}
   */
  _isValid() {
    return this._isStyleValid() && this._doEssentialBehaviorsExist();
  }

  /**
   *@param {Array} dependancyChain
   * when updating dependacies ensures
   * that there are no infinite loops
   */
  update(dependancyChain = []) {
    if (!this._isValid()) return;
    this.updateChildMathStyles();
    const settings = this._typesetter.generateSettings(
      this._pxpfu,
      this._childBehaviors
    );
    this.updateChildComponentStyles(settings);
    this.updateMetrics(settings);
    this.updateComponentStyleDimensions();
    this.updateDependants(dependancyChain);
  }

  /**
   * @param {Array} dependancyChain
   * updates all dependants
   */
  updateDependants(dependancyChain) {
    dependancyChain.push(this);
    const dependantsToUpdate = this._dependantBehaviors.filter(
      (dependantOnBehavior) => {
        return dependancyChain.some((dependantOnChain) => {
          return dependantOnChain === dependantOnBehavior;
        });
      }
    );
    for (const dependant of dependantsToUpdate) {
      dependant.update();
    }
  }

  /**
   * @param {Math_Style} style
   */
  set mathStyle(style) {
    this._mathStyle = style;
    this._pxpfu = this._typesetter.calculatePXPFU(this._mathStyle);
    this.update();
  }
  /**
   * @return {Math_Style} style
   */
  get mathStyle() {
    return this._mathStyle;
  }

  /**
   * @return {boolean}
   */
  _isStyleValid() {
    return this._mathStyle !== undefined;
  }
}
