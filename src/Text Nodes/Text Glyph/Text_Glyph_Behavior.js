import Behavior from '../../Abstract/Behavior';
import { Glyph } from '../../React-Components/Math/Glyph';

export default class Text_Glyph_Behavior extends Behavior {
  _internalCharacterBox;
  _fontSize;
  /**
   * @param {Object} spec
   */
  constructor(spec) {
    super(spec);
    this._component = Glyph;
    this.type = 'Text_Glyph';
  }

  /**
   * @param {number} index caret index
   * @return {Object}
   */
  getRelativePositionOfCaretNode(index) {
    if (!this._isValid()) return;
    const left = index === 0 ? 0 : this._metrics.width;
    const top = 0;
    return { top, left };
  }

  /**
   * @return {number}
   */
  get fontSize() {
    return this._fontSize;
  }
  /**
   * @param {number} fs
   */
  set fontSize(fs) {
    this._fontSize = fs;
    this.update();
  }
  /**
   * @param {Object} point
   */
  getCaretNodeClosestToPoint(point) {
    this.parent.getRelativePositionOfBehavior;
  }

  /**
   * @return {boolean}
   */
  _isValid() {
    return this.fontSize !== undefined;
  }

  /**
   * @override
   */
  update() {
    if (!this._isValid()) return;
    const pxpfu = this._typesetter.calculatePXPFU(this.fontSize);
    const settings = this._typesetter.generateSettings(pxpfu);
    this._internalCharacterBox = settings.internalCharacterBox;
    this._updateMetrics(settings);
  }

  /**
   * @param {Object} settings
   * updates h,w,d and corresponding css
   */
  _updateMetrics(settings) {
    this._metrics = settings.metrics;
    this._updateComponentStyleDimensions();
  }
  /**
   * @return {Object}
   */
  get internalCharacterBox() {
    return this._internalCharacterBox;
  }
}
