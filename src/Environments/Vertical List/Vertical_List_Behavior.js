import Behavior from '../../Abstract/Behavior.js';
import VerticalList from '../../React-Components/Document/VerticalList.js';
import Point from '../../Abstract/Point.js';
/** @typedef {import('../../Math Nodes/Types/Math_Style.js').default} Math_Style  */
/** @typedef {import('../../Math Nodes/Types/Spacing_Style').default} Spacing_Style  */
/** @typedef {import('../../Abstract/MathBehavior.js').behaviorSpec} behaviorSpec */

/**
 * @class
 */
export default class Vertical_List_Behavior extends Behavior {
  _settings;
  _elementBehaviors;
  /**
   *
   * @param {Object} behaviorSpec
   */
  constructor(behaviorSpec) {
    super(behaviorSpec);
    this.type = 'Vertical_List';
    this._component = VerticalList;
  }
  /**
   * @param {Behavior} nodeBehavior
   * @return {Object}
   *
   */
  getRelativePositionOfBehavior(nodeBehavior) {
    const index = this._elementBehaviors.indexOf(nodeBehavior);
    return this.getRelativePositionWithElementIndex(index);
  }

  /**
   * @param {number} index
   * @return {Object}
   */
  getRelativePositionOfCaretNode(index) {
    return this.getRelativePositionWithElementIndex(index);
  }

  /**
   * @param {Object} point
   * @return {Behavior}
   *  x, y
   */
  getBehaviorClosestToPoint(point) {
    if (!this._isValid()) return;
    let progress = 0;
    for (const [index, behavior] of this._elementBehaviors.entries()) {
      const marginBottom = this._settings.elementComponentStyles[index]
        .marginBottom;
      progress +=
        behavior.metrics.height + behavior.metrics.depth + marginBottom;
      if (point.left < progress) {
        return behavior;
      }
    }
    return this._elementBehaviors.slice(-1)[0];
  }

  /**
   * @param {number} index
   * @return {Object}
   *
   */
  getRelativePositionWithElementIndex(index) {
    if (!this._isValid()) return;
    const left =
      (this._metrics.width - this._elementBehaviors[index].metrics.width) / 2;
    const elementHeights = this._elementBehaviors
      .slice(0, index)
      .reduce((acc, curr) => {
        return acc + curr.metrics.height + curr.metrics.depth;
      }, 0);
    const bottomMargins = this._settings.elementComponentStyles
      .slice(0, index)
      .reduce((acc, curr) => {
        return acc + curr.marginBottom;
      }, 0);
    const top = elementHeights + bottomMargins;
    return new Point(top, left);
  }

  /**
   * @override
   * @return {boolean}
   */
  _isValid() {
    return this._elementBehaviors !== undefined;
  }

  /**
   *
   */
  update() {
    if (!this._isValid()) return;
    const vlb = this;
    const settings = this._typesetter.generateSettings(this._elementBehaviors);
    this._settings = settings;
    updateMetrics();
    updateElementComponentStyles();

    /**
     *
     */
    function updateMetrics() {
      vlb._metrics = settings.metrics;
      vlb._updateComponentStyleDimensions();
    }

    /**
     *
     */
    function updateElementComponentStyles() {
      for (const [index, behavior] of vlb._elementBehaviors.entries()) {
        behavior.appendComponentStyle(settings.elementComponentStyles[index]);
      }
    }
  }

  /**
   * @return {Behavior[]}
   */
  get elementBehaviors() {
    return this._elementBehaviors;
  }
  /**
   * @param {Behavior[]} behaviors
   */
  set elementBehaviors(behaviors) {
    this._elementBehaviors = behaviors;
    for (const behavior of this._elementBehaviors) {
      behavior.parentBehavior = this;
    }
    this.update();
  }
}
