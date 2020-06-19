import Glyph_Behavior from './Glyph_Behavior';

export default class Centered_Glyph_Behavior extends Glyph_Behavior {
  /**
   * @param {Object} spec
   */
  constructor(spec) {
    super(spec);
    this._type = 'Centered_Glyph';
  }

  /**
   * @return {Array}
   */
  _generateSetterDependencies() {
    const isCentered = true;
    return [isCentered];
  }
}
