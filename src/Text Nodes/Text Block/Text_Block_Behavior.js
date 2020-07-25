import Behavior from '../../Abstract/Behavior';
import TextEnvironment from '../../React-Components/Document/TextBlock';
import Point from '../../Abstract/Point';

export default class Text_Block_Behavior extends Behavior {
  _elementBehaviors;
  /**
   *
   * @param {Object} behaviorSpec
   */
  constructor(behaviorSpec) {
    super(behaviorSpec);
    this.type = 'Text_Block';
    this._component = TextEnvironment;
  }

  /**
   *
   * @param {Object} point
   * @return {Object}
   *  x, y
   */
  getBoxKeyClosestToPoint(point) {
    if (!this._isValid()) return;
    let progress = 0;
    for (let i = 0; i < this._elementBehaviors.length; i++) {
      progress += this._elementBehaviors[i].metrics.width / 2;
      if (point.left < progress) {
        return { isCaret: true, index: i * 2 };
      }
      progress += this._elementBehaviors[i].metrics.width / 2;
    }
    return { isCaret: true, index: this._elementBehaviors.length * 2 };
  }

  /**
   * @param {Object} caretKey
   * @return {Point}
   */
  getRelativePositionOfCaretKey(caretKey) {
    const index = Math.floor(caretKey.index / 2);
    return this.getRelativePositionWithElementIndex(index);
  }

  /**
   * @param {number} index
   * @return {Point}
   *
   */
  getRelativePositionWithElementIndex(index) {
    if (!this._isValid()) return;
    const top =
      index >= this._elementBehaviors.length
        ? 0
        : this._metrics.height - this._elementBehaviors[index].metrics.height;
    const left = this._elementBehaviors.slice(0, index).reduce((acc, curr) => {
      return acc + curr.metrics.width;
    }, 0);
    return new Point(top, left);
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
   * @override
   * @return {boolean}
   */
  _isValid() {
    return this._elementBehaviors !== undefined;
  }

  /**
   * @override
   */
  update() {
    if (!this._isValid()) return;
    const settings = this._typesetter.generateSettings(this.elementBehaviors);
    this._updateElementComponentStyles(settings);
    this._updateMetrics(settings);
  }

  /**
   * @param {Object} settings
   */
  _updateElementComponentStyles(settings) {
    for (const [index, behavior] of this._elementBehaviors.entries()) {
      behavior.appendComponentStyle(settings.elementStyles[index]);
    }
  }

  /**
   * @param {Object} settings
   */
  _updateMetrics(settings) {
    this._metrics = settings.metrics;
    this._updateComponentStyleDimensions();
  }

  /**
   * @return {Array}
   */
  get elementBehaviors() {
    return this._elementBehaviors;
  }
  /**
   * @param {Array} arr
   */
  set elementBehaviors(arr) {
    this._elementBehaviors = arr;
    for (const behavior of this._elementBehaviors) {
      behavior.parentBehavior = this;
    }
    this.update();
  }
}
