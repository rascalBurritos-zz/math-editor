import Metrics from '../Nodes/Types/Metrics.js';
/** @typedef {import('./Typesetter.js').default} Typesetter */

/** @typedef {Object} behaviorSpec
 *  @property {Typesetter} typesetter
 */

/**
 * @class
 * @classdesc Specifies the appreance of a node
 */
export default class Behavior {
  type; // rw
  _componentStyle; // rw
  _metrics; // r
  _pxpfu; // none
  _typesetter; // none
  _component; // r

  /**
   *  @param {behaviorSpec} spec
   *  */
  constructor(spec) {
    this._componentStyle = {};
    this._metrics = new Metrics(0, 0, 0);
    this._typesetter = spec.typesetter;
  }

  /**
   * @abstract
   * @return {boolean}
   */
  _isValid() {
    return false;
  }

  /**
   * @abstract
   */
  update() {}

  /**
   * updates the css style based on the updated h,w,d _metrics
   */
  _updateComponentStyleDimensions() {
    this.componentStyle.height = this._metrics.height + this._metrics.depth;
    this.componentStyle.width = this._metrics.width;
  }

  /**
   * @return {Metrics}
   */
  get metrics() {
    if (!this._isValid()) throw new Error('Bad Metrics'); // console.warn('invalid ', this);
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
}
