import Behavior from '../../Abstract/Behavior';
import TextEnvironment from '../../React-Components/Document/TextBlock';

export default class Text_Block_Behavior extends Behavior {
  _elements;
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
   * @return {Behavior}
   *  x, y
   */
  getBehaviorClosestToPoint(point) {
    if (!this._isValid()) return;
    let progress = 0;
    for (let i = 0; i < this._elements.length; i++) {
      progress += this._elements[i].metrics.width;
      if (point.x < progress) {
        return this._elements[i];
      }
    }
    return this._elements.slice(-1)[0];
  }

  /**
   * @param {number} index
   * @return {Behavior}
   */
  getRelativePositionOfCaretNode(index) {
    return this.getRelativePositionWithElementIndex(index);
  }

  /**
   * @param {number} index
   * @return {Object}
   *
   */
  getRelativePositionWithElementIndex(index) {
    if (!this._isValid()) return;
    const top =
      index >= this._elements.length
        ? 0
        : this._metrics.height - this._elements[index].metrics.height;
    const left = this._elements.slice(0, index).reduce((acc, curr) => {
      return acc + curr.metrics.width;
    }, 0);
    return { top, left };
  }

  /**
   * @param {Behavior} nodeBehavior
   * @return {Object}
   *
   */
  getRelativePositionOfBehavior(nodeBehavior) {
    const index = this._elements.indexOf(nodeBehavior);
    return this.getRelativePositionWithElementIndex(index);
  }

  /**
   * @override
   * @return {boolean}
   */
  _isValid() {
    return this._elements !== undefined;
  }

  /**
   * @override
   */
  update() {
    if (!this._isValid()) return;
    const settings = this._typesetter.generateSettings(this.elements);
    this._updateElementComponentStyles(settings);
    this._updateMetrics(settings);
  }

  /**
   * @param {Object} settings
   */
  _updateElementComponentStyles(settings) {
    for (const [index, behavior] of this._elements.entries()) {
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
  get elements() {
    return this._elements;
  }
  /**
   * @param {Array} arr
   */
  set elements(arr) {
    this._elements = arr;
    this.update();
  }
}
