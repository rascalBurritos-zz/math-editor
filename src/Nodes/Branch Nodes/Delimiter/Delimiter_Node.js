import Document_Node from '../../../Abstract/Document_Node';

export default class Delimiter_Node extends Document_Node {
  _glyph;

  /**
   * @param {Object} g
   */
  set glyph(g) {
    this._glyph = g;
    this._behavior.glyphBehavior = g.behavior;
  }

  /**
   * @return {Object}
   */
  get glyph() {
    return this._glyph;
  }
}
