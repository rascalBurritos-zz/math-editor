import Behavior from '../../Abstract/Behavior.js';
import VerticalList from '../../React-Components/Document/VerticalList.js';
import Point from '../../Abstract/Point.js';
import Rectangle from '../../Abstract/Rectangle.js';
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
   *
   * @param {number} leftIndex
   * @param {number} rightIndex
   * @return {Rectangle[]}
   * NOTE: inclusive, i.e. includes endpoints
   */
  getSelectionRects(leftIndex, rightIndex) {
    let top = 0;
    let height = 0;
    for (let i = 0; i <= rightIndex; i++) {
      const currentMetric = this._elementBehaviors[i].metrics;
      const marginBottom = this._settings.elementComponentStyles[i]
        .marginBottom;
      if (i < leftIndex) {
        top += currentMetric.height + currentMetric.depth + marginBottom;
      } else {
        height += this._elementBehaviors[i].metrics.height + marginBottom;
      }
    }
    const left = 0;
    const width = this.metrics.width;
    return [new Rectangle(new Point(top, left), height, width)];
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
   * @param {Object} caretKey
   * @return {Object}
   * s
   */
  getRelativePositionOfCaretKey(caretKey) {
    console.log('Should Not be called! ');
    return this.getRelativePositionWithElementIndex(
      caretKey.rungIndex,
      caretKey.onLeft
    );
  }

  /**
   * @param {Object} point
   * @return {Behavior}
   *  x, y
   */
  getBoxKeyClosestToPoint(point) {
    if (!this._isValid()) return;
    let progress = 0;
    for (const [index, behavior] of this._elementBehaviors.entries()) {
      const marginBottom = this._settings.elementComponentStyles[index]
        .marginBottom;
      progress +=
        behavior.metrics.height + behavior.metrics.depth + marginBottom;
      if (point.top < progress) {
        return boxWrap(index);
      }
    }
    return boxWrap(this._elementBehaviors.length - 1);

    /**
     * @param {number} num
     * @return {Object}
     */
    function boxWrap(num) {
      return { isCaret: false, index: num };
    }
  }

  /**
   * @param {number} index
   * @param {boolean} toLeft
   * @return {Object}
   */
  getRelativePositionWithElementIndex(index, toLeft = true) {
    if (!this._isValid()) return;
    const elementWidth = this._elementBehaviors[index].metrics.width;
    const totalWidth = this._metrics.width;
    const leftMargin = (totalWidth - elementWidth) / 2;
    const left = toLeft ? leftMargin : leftMargin + elementWidth;
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
