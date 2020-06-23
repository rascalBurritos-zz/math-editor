import Metrics from '../Types/Metrics.js';
/** @typedef {import('../Types/Math_Style.js').default} Math_Style */
/** @typedef {import('../Types/Spacing_Style.js').default} Spacing_Style */
/** @typedef {import('./Typesetter.js').default} Typesetter */

/** @typedef {Object} behaviorSpec
 *  @property {Typesetter} typesetter
 *  @property {Spacing_Style} spacingStyle
 */

/**
 * @class
 * @classdesc Specifies the appreance of a node
 */
export default class Behavior {
  type; // rw
  _componentStyle; // rw
  _metrics; // r
  _mathStyle; // rw
  _spacingStyle; // r
  _pxpfu; // none
  _typesetter; // none
  _component; // r
  _dependantBehaviors; // rw

  /**
   *  @param {behaviorSpec} spec
   *  */
  constructor(spec) {
    this._componentStyle = {};
    this._metrics = new Metrics(0, 0, 0);
    this._typesetter = spec.typesetter;
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
   * updates the css style based on the updated h,w,d _metrics
   */
  _updateComponentStyleDimensions() {
    this.componentStyle.height = this._metrics.height + this._metrics.depth;
    this.componentStyle.width = this._metrics.width;
  }

  /**
   * @return {Spacing_Style}
   */
  get spacingStyle() {
    return this._spacingStyle;
  }

  /**
   * @return {Metrics}
   */
  get metrics() {
    if (!this._isValid()) console.warn('invalid ', this);
    return this._metrics;
  }

  /**
   * @return {Object} represents CSS of behavior
   */
  get componentStyle() {
    return this._componentStyle;
  }
  /**
   * @param {Object} addedStyles sets the current CSS excluding
   * height and width
   * one key value pair
   */
  appendComponentStyle(addedStyles) {
    for (const property in addedStyles) {
      if (!['height', 'width', 'depth'].includes(property)) {
        this._componentStyle[property] = addedStyles[property];
      } else {
        console.warn('SET DIMENSION IN SET', this);
      }
    }
  }

  /**
   * @return {React.Component}
   */
  get component() {
    return this._component;
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
   * @param {Behavior} behavior
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

  /**
   * @return {boolean}
   */
  _isStyleValid() {
    return this._mathStyle !== undefined;
  }
}
