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
