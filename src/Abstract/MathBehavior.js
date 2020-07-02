import Behavior from './Behavior.js';
/** @typedef {import('../Nodes/Types/Math_Style.js').default} Math_Style */
/** @typedef {import('../Nodes/Types/Spacing_Style.js').default} Spacing_Style */
/** @typedef {import('./Typesetter.js').default} Typesetter */

/** @typedef {Object} behaviorSpec
 *  @property {Typesetter} typesetter
 *  @property {Spacing_Style} spacingStyle
 */

/**
 * @class
 * @classdesc Specifies the appreance of a node
 */
export default class MathBehavior extends Behavior {
  _mathStyle; // rw
  _spacingStyle; // r
  _pxpfu; // none
  _dependantBehaviors; // rw

  /**
   *  @param {behaviorSpec} spec
   *  */
  constructor(spec) {
    super(spec);
    this._spacingStyle = spec.spacingStyle;
    this._dependantBehaviors = [];
  }

  /**
   * @return {boolean}
   */
  _isValid() {
    return this._isStyleValid();
  }
  /**
   * @return {boolean}
   */
  _isStyleValid() {
    return this._mathStyle !== undefined;
  }

  /**
   *
   */
  _preSetterSequence() {}
  /**
   *
   * @param {Object} settings
   */
  _postSetterSequence(settings) {}
  /**
   * @abstract
   * @return {Array}
   */
  _generateSetterDependencies() {
    return [];
  }
  /**
   * @abstract
   * @param {Object} settings
   */
  _updateMetrics(settings) {}
  /**
   *
   * @param {Array} dependancyChain
   */
  update(dependancyChain = []) {
    if (!this._isValid()) return;
    this._preSetterSequence();
    const setterDependencies = this._generateSetterDependencies();
    const settings = this._typesetter.generateSettings(
      this._pxpfu,
      ...setterDependencies
    );
    this._postSetterSequence(settings);
    this._updateMetrics(settings);
    this._updateComponentStyleDimensions();
    this._updateDependants(dependancyChain);
  }

  /**
   * @return {Spacing_Style}
   */
  get spacingStyle() {
    return this._spacingStyle;
  }

  /**
   * @param {Array} behaviors
   */
  registerDependantBehavior(...behaviors) {
    this._dependantBehaviors.push(...behaviors);
    this.update();
  }

  /**
   *
   * @param {MathBehavior} behavior
   */
  unregisterDependantBehavior(behavior) {
    this._dependantBehaviors = this._dependantBehaviors.filter((dependant) => {
      return behavior !== dependant;
    });
  }
  /**
   * @param {Array} dependancyChain
   * updates all dependants
   */
  _updateDependants(dependancyChain) {
    dependancyChain.push(this);
    const dependantsToUpdate = this._dependantBehaviors.filter(
      (dependantOnBehavior) => {
        return !dependancyChain.some((dependantOnChain) => {
          return dependantOnChain === dependantOnBehavior;
        });
      }
    );
    for (const dependant of dependantsToUpdate) {
      dependant.update(dependancyChain);
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
}
